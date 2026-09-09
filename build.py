#!/usr/bin/env python3
"""Bundle the site into one self-contained HTML file.

    python3 build.py                 -> dist/english-media-lab.html
    python3 build.py --inline-images -> the same, with every thumbnail embedded
                                        as a data URI (no external image hosts)

The second form is what gets published, since some hosts block remote images.
"""
import base64, io, json, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
INLINE = '--inline-images' in sys.argv
CACHE = os.environ.get('IMG_CACHE', '')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                    'AppleWebKit/537.36 Chrome/120 Safari/537.36'}


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding='utf-8') as f:
        return f.read()


def as_data_uri(url, name):
    """Fetch (or reuse a cached copy of) an image and shrink it for embedding."""
    path = os.path.join(CACHE, name) if CACHE else None
    if path and os.path.exists(path):
        raw = open(path, 'rb').read()
    else:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
            raw = r.read()
        if path:
            open(path, 'wb').write(raw)
    try:
        from PIL import Image
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        im.thumbnail((640, 640))
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=72, optimize=True)
        raw = buf.getvalue()
    except ImportError:
        pass
    return 'data:image/jpeg;base64,' + base64.b64encode(raw).decode()


def inline_images(js):
    """Swap the two thumbnail helpers and the quiz `thumb` fields for data URIs."""
    ids = re.findall(r"id: '([\w-]{11})'", js)
    table = {i: as_data_uri(f'https://i.ytimg.com/vi/{i}/maxresdefault.jpg', f'yt_{i}.jpg') for i in ids}
    js = re.sub(r"export const youtubeThumb\s*=.*\n", 'export const youtubeThumb = (id) => THUMBS[id];\n', js)
    js = re.sub(r"export const youtubeThumbAlt\s*=.*\n", 'export const youtubeThumbAlt = (id) => THUMBS[id];\n', js)
    js = 'const THUMBS = ' + json.dumps(table) + ';\n\n' + js
    return js


data, app = read('assets', 'js', 'data.js'), read('assets', 'js', 'app.js')
if INLINE:
    data = inline_images(data)

# one classic script: data.js first, with the import that joined them removed.
# Classic rather than a module so the file also works opened straight from disk.
script = re.sub(r'^export ', '', data, flags=re.M) + '\n' + re.sub(r"^import .*?from '\./data\.js';\n", '', app, flags=re.M | re.S)

html = read('index.html')
html = html.replace('  <link rel="stylesheet" href="assets/css/style.css" />\n',
                    '  <style>\n' + read('assets', 'css', 'style.css') + '  </style>\n')
html = html.replace('  <script type="module" src="assets/js/app.js"></script>\n',
                    '  <script>\n' + script + '  </script>\n')

os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
out = os.path.join(ROOT, 'dist', 'english-media-lab.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'{out}  {os.path.getsize(out) / 1024:.0f} KB')
