"""Build spot-the-difference pairs by moving real pixels: an object is cloned over
with its own background (it disappears) or copied somewhere plausible (it appears)."""
import json, os, sys
from PIL import Image, ImageDraw, ImageFilter

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = '/Users/drkmlv/Development/eng-media-lab/assets/img'
W, H = 640, 480

def feather(size, pad=4):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rectangle((pad, pad, size[0] - 1 - pad, size[1] - 1 - pad), fill=255)
    return m.filter(ImageFilter.GaussianBlur(pad * 0.9))

def build(name, source, title, edits):
    im = Image.open(os.path.join(SRC, source)).convert('RGB').resize((W, H), Image.LANCZOS)
    edited = im.copy()
    spots = []
    for src, dst in edits:
        patch = im.crop(src)                      # always sample the untouched photo
        size = (src[2] - src[0], src[3] - src[1])
        edited.paste(patch, (dst[0], dst[1]), feather(size))
        cx, cy = dst[0] + size[0] / 2, dst[1] + size[1] / 2
        spots.append({
            "x": round(cx / W * 100, 1), "y": round(cy / H * 100, 1),
            "rx": round(max(size[0] / 2 + 14, 26) / W * 100, 1),
            "ry": round(max(size[1] / 2 + 14, 26) / H * 100, 1),
        })
    im.save(f'{OUT}/diff-{name}-a.jpg', 'JPEG', quality=86, optimize=True)
    edited.save(f'{OUT}/diff-{name}-b.jpg', 'JPEG', quality=86, optimize=True)
    return {"title": title, "a": f"assets/img/diff-{name}-a.jpg",
            "b": f"assets/img/diff-{name}-b.jpg", "spots": spots}, im, edited

def zoom_sheet(scenes, path):
    """Each difference, before and after, side by side and enlarged."""
    pad, cell = 10, 190
    rows = sum(len(sc[0]['spots']) for sc in scenes)
    sheet = Image.new('RGB', (cell * 2 + pad * 3, rows * (cell + pad) + pad), '#e8edf3')
    d = ImageDraw.Draw(sheet)
    row = 0
    for scene, before, after in scenes:
        for i, s in enumerate(scene['spots']):
            cx, cy = s['x'] / 100 * W, s['y'] / 100 * H
            r = 70
            box = (int(cx - r), int(cy - r), int(cx + r), int(cy + r))
            y = pad + row * (cell + pad)
            sheet.paste(before.crop(box).resize((cell, cell)), (pad, y))
            sheet.paste(after.crop(box).resize((cell, cell)), (cell + pad * 2, y))
            d.text((pad + 4, y + 4), f"{scene['title']} #{i + 1}", fill='#ffffff')
            row += 1
    sheet.save(path)

if __name__ == '__main__':
    from spec import SCENES
    built = [build(*s) for s in SCENES]
    json.dump([b[0] for b in built], open(os.path.join(SRC, 'scenes.json'), 'w'), indent=1)
    zoom_sheet(built, os.path.join(SRC, 'zoom.png'))
    print('scenes:', [b[0]['title'] for b in built])
