#!/usr/bin/env python3
"""Build spot-the-difference pairs where a whole object goes, or arrives.

Each scene has its subjects on a smooth ground — sky, mostly. The ground is
estimated with a wide median, so anything small enough to fly through it stands out
as a silhouette. An object is then taken away by filling exactly its own silhouette
with ground borrowed from the same rows further along, shifted onto the local tone
so the join cannot be seen. Adding one works the other way round.

Because the fill follows the silhouette rather than a box, nothing nearby is
disturbed, and no part of the object is left standing. Every removal is checked
afterwards and rejected if anything of it survives.
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

W, H = 640, 480


def background(img, span=15):
    """The picture with the small things taken out: a wide median keeps the gradient
    of a sky but loses whatever is flying in it."""
    def resize(a, size, how):
        return np.stack([np.asarray(Image.fromarray(a[:, :, c].astype('uint8')).resize(size, how), float)
                         for c in range(3)], axis=2)
    small = resize(img, (W // 8, H // 8), Image.BOX)
    smooth = np.stack([ndimage.median_filter(small[:, :, c], size=span, mode='nearest')
                       for c in range(3)], axis=2)
    return resize(smooth, (W, H), Image.BICUBIC)


def foreground(img, bg, threshold, least=28):
    """Everything standing clear of the ground, with compression speckle dropped."""
    mask = np.linalg.norm(img - bg, axis=2) > threshold
    mask = ndimage.binary_closing(mask, np.ones((3, 3)))
    labels, count = ndimage.label(mask, np.ones((3, 3)))
    if count:
        sizes = ndimage.sum(mask, labels, range(1, count + 1))
        mask[np.isin(labels, np.flatnonzero(sizes < least) + 1)] = False
    return mask


def silhouette(mask, seed, grow):
    """The one object the seed lands on, or the nearest, taken whole. Labelling a
    shrunken copy first keeps two birds that overlap at the wingtip apart."""
    core = ndimage.binary_erosion(mask, np.ones((3, 3)))
    labels, count = ndimage.label(core, np.ones((3, 3)))
    if not count:
        return None
    x, y = seed
    tag = labels[y, x]
    if tag == 0:
        ys, xs = np.nonzero(core)
        if not len(ys):
            return None
        near = np.argmin((xs - x) ** 2 + (ys - y) ** 2)
        tag = labels[ys[near], xs[near]]
    piece = ndimage.binary_dilation(labels == tag, np.ones((3, 3)), iterations=2) & mask
    return ndimage.binary_dilation(piece, np.ones((grow, grow)))


def bounds(piece):
    ys, xs = np.nonzero(piece)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def in_zone(box, zone, margin=0):
    return (box[0] >= zone[0] + margin and box[1] >= zone[1] + margin
            and box[2] <= zone[2] - margin and box[3] <= zone[3] - margin)


def blend(canvas, donor, piece, soften=1.6):
    alpha = Image.fromarray((piece * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(soften))
    canvas.paste(Image.fromarray(np.clip(donor, 0, 255).astype('uint8')), (0, 0), alpha)


def shift_to(img, bg, move):
    """The picture slid by (dx, dy), lifted onto the tone it is landing on."""
    rolled = np.roll(np.roll(img, move[0], axis=1), move[1], axis=0)
    rolled_bg = np.roll(np.roll(bg, move[0], axis=1), move[1], axis=0)
    return rolled + (bg - rolled_bg)


def offsets(box, zone, step=6, lift=140):
    """Moves that keep the object inside the part we may touch, nearest first."""
    w, h = box[2] - box[0], box[3] - box[1]
    out = []
    for dy in range(-min(box[1] - zone[1], lift), min(zone[3] - box[3], lift) + 1, step):
        for dx in range(-(box[0] - zone[0]), zone[2] - box[2] + 1, step):
            if abs(dx) > w // 2 + 8 or abs(dy) > h // 2 + 8:
                out.append((dx, dy))
    return sorted(out, key=lambda d: d[0] ** 2 + d[1] ** 2)


def take_away(canvas, bg, mask, piece, zone, threshold, report=None):
    """Fill the object's own silhouette with ground borrowed from further along the
    same rows. Each attempt is judged on a copy, so a failure never disturbs what is
    already done."""
    for widen in range(5):
        if widen:
            piece = ndimage.binary_dilation(piece, np.ones((5, 5)))   # it was wider than it looked
        got = one_pass(canvas, bg, mask, piece, zone, threshold, report)
        if got is not None:
            return got
    return None


def one_pass(canvas, bg, mask, piece, zone, threshold, report=None):
    box = bounds(piece)
    room = ndimage.binary_dilation(mask, np.ones((9, 9)))
    tried = 0
    for dx, dy in offsets(box, zone):
        if (piece & np.roll(np.roll(room, -dx, axis=1), -dy, axis=0)).any():
            continue                                   # the ground over there is busy
        tried += 1
        here = np.asarray(canvas, float)               # borrow from the picture as it stands
        trial = canvas.copy()
        blend(trial, shift_to(here, bg, (-dx, -dy)), piece)
        x0, y0, x1, y1 = box
        left = foreground(np.asarray(trial, float)[y0:y1, x0:x1], bg[y0:y1, x0:x1],
                          threshold, least=10)
        # ask about the object and the halo around it, discounting whatever else
        # was standing there in the first place
        near = ndimage.binary_dilation(piece, np.ones((7, 7))) & ~(mask & ~piece)
        left &= near[y0:y1, x0:x1]
        if left.sum() < 20:
            canvas.paste(trial, (0, 0))
            return box
        if report is not None:
            report.append(((dx, dy), int(left.sum())))
    if report is not None:
        report.append(('offsets with clear ground', tried))
    return None


def put_down(canvas, img, bg, mask, piece, zone):
    box = bounds(piece)
    room = ndimage.binary_dilation(mask, np.ones((13, 13)))
    for dx, dy in offsets(box, zone):
        landing = np.roll(np.roll(piece, dx, axis=1), dy, axis=0)
        if (landing & room).any():
            continue
        moved = bounds(landing)
        if not in_zone(moved, zone, margin=14):      # never half off the edge
            continue
        blend(canvas, shift_to(img, bg, (dx, dy)), landing)
        return moved
    return None


def build(name, source, title, removals, additions, zone, threshold=20, grow=5):
    im = Image.open(source).convert('RGB').resize((W, H), Image.LANCZOS)
    arr = np.asarray(im, float)
    bg = background(arr)
    mask = foreground(arr, bg, threshold)
    mask[:zone[1]] = mask[zone[3]:] = False
    mask[:, :zone[0]] = mask[:, zone[2]:] = False

    canvas = im.copy()
    spots = []
    for seed in removals:
        piece = silhouette(mask, seed, grow)
        if piece is None:
            print(f'  ! {title}: nothing at {seed}'); continue
        notes = []
        box = take_away(canvas, bg, mask, piece, zone, threshold, notes)
        if box is None:
            print(f'  ! {title}: could not cover {seed} — {notes[:3]}'); continue
        spots.append(box)
        mask &= ~piece                                  # it is gone; the room is free now

    for seed in additions:
        piece = silhouette(mask, seed, grow)
        if piece is None:
            print(f'  ! {title}: nothing to copy at {seed}'); continue
        box = put_down(canvas, arr, bg, mask, piece, zone)
        if box is None:
            print(f'  ! {title}: nowhere to put a copy of {seed}'); continue
        spots.append(box)
        was = bounds(piece)
        mask |= np.roll(np.roll(piece, box[0] - was[0], axis=1), box[1] - was[1], axis=0)

    im.save(f'assets/img/diff-{name}-a.jpg', 'JPEG', quality=88, optimize=True)
    canvas.save(f'assets/img/diff-{name}-b.jpg', 'JPEG', quality=88, optimize=True)
    print(f'  {title}: {len(spots)} differences')
    return {
        "title": title,
        "a": f"assets/img/diff-{name}-a.jpg",
        "b": f"assets/img/diff-{name}-b.jpg",
        "spots": [{
            "x": round((b[0] + b[2]) / 2 / W * 100, 1),
            "y": round((b[1] + b[3]) / 2 / H * 100, 1),
            "rx": round(max((b[2] - b[0]) / 2 + 12, 24) / W * 100, 1),
            "ry": round(max((b[3] - b[1]) / 2 + 12, 24) / H * 100, 1),
        } for b in spots],
    }, im, canvas


def zoom_sheet(built, path):
    from PIL import ImageDraw
    cell, pad = 190, 10
    rows = sum(len(s[0]['spots']) for s in built)
    sheet = Image.new('RGB', (cell * 2 + pad * 3, max(rows, 1) * (cell + pad) + pad), '#e8edf3')
    d = ImageDraw.Draw(sheet)
    row = 0
    for scene, before, after in built:
        for i, s in enumerate(scene['spots']):
            cx, cy = s['x'] / 100 * W, s['y'] / 100 * H
            r = max(s['rx'] / 100 * W, s['ry'] / 100 * H) + 20
            box = (int(cx - r), int(cy - r), int(cx + r), int(cy + r))
            y = pad + row * (cell + pad)
            sheet.paste(before.crop(box).resize((cell, cell)), (pad, y))
            sheet.paste(after.crop(box).resize((cell, cell)), (cell + pad * 2, y))
            d.text((pad + 4, y + 4), f"{scene['title']} #{i + 1}", fill='#ffffff')
            row += 1
    sheet.save(path)


if __name__ == '__main__':
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from diff_scenes import SCENES, SHEET
    built = [build(*s) for s in SCENES]
    json.dump([b[0] for b in built], open('tools/diff-scenes.json', 'w'), indent=1)
    zoom_sheet(built, SHEET)
