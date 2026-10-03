#!/usr/bin/env python3
"""Draw the spot-the-difference scenes.

Earlier versions edited photographs, which meant hunting for objects and patching
the hole they left. Drawing the scenes instead makes every change exact: the second
picture is the same list of things with one taken out, one added or one painted a
different colour, so nothing is ever half erased.
"""
import json, math, os, random
from PIL import Image, ImageDraw

W, H, SS = 640, 480, 2          # drawn at double size, then shrunk, for clean edges

SKY_TOP, SKY_LOW = (150, 200, 238), (214, 234, 248)
GRASS, GRASS_DARK = (124, 176, 104), (104, 156, 88)
SEA, SEA_DARK = (86, 150, 186), (70, 130, 168)
ROAD, PAVING = (120, 124, 132), (196, 196, 198)
WHITE, DARK = (252, 252, 250), (40, 54, 66)
RED, BLUE, GOLD, GREEN, PLUM = (206, 76, 64), (58, 110, 176), (226, 170, 60), (82, 150, 96), (150, 96, 150)


def sky(d, horizon):
    for y in range(horizon):
        k = y / max(horizon - 1, 1)
        d.line((0, y, W * SS, y), fill=tuple(round(a + (b - a) * k) for a, b in zip(SKY_TOP, SKY_LOW)))


# --- the things that can stand in a scene -----------------------------------
def cloud(d, x, y, s, _c=None):
    for dx, dy, r in ((-0.6, .1, .5), (0, -.2, .62), (.6, .1, .46), (0, .2, .5)):
        d.ellipse((x + (dx - r) * s, y + (dy - r) * s, x + (dx + r) * s, y + (dy + r) * s), fill=WHITE)


def sun(d, x, y, s, _c=None):
    d.ellipse((x - s, y - s, x + s, y + s), fill=(250, 216, 112))


def tree(d, x, y, s, c=None):
    d.rectangle((x - s * .13, y - s * .1, x + s * .13, y + s), fill=(126, 94, 66))
    for dx, dy, r in ((0, -.95, .62), (-.45, -.55, .5), (.45, -.55, .5)):
        d.ellipse((x + (dx - r) * s, y + (dy - r) * s, x + (dx + r) * s, y + (dy + r) * s), fill=c or GREEN)


def pine(d, x, y, s, c=None):
    d.rectangle((x - s * .1, y - s * .15, x + s * .1, y + s), fill=(126, 94, 66))
    for i, k in enumerate((1.0, .76, .52)):
        top = y - s * (.5 + i * .55)
        d.polygon([(x, top - s * .62), (x - s * k * .6, top), (x + s * k * .6, top)], fill=c or (72, 134, 90))


def house(d, x, y, s, c=None):
    body = (x - s * .7, y - s * .9, x + s * .7, y + s)
    d.rectangle(body, fill=c or (236, 226, 208), outline=DARK, width=SS)
    d.polygon([(x - s * .86, y - s * .9), (x + s * .86, y - s * .9), (x, y - s * 1.7)], fill=RED)
    d.rectangle((x - s * .18, y - s * .42, x + s * .18, y + s), fill=(126, 94, 66))
    for side in (-1, 1):
        d.rectangle((x + side * s * .46 - s * .18, y - s * .66, x + side * s * .46 + s * .18, y - s * .3),
                    fill=(176, 212, 232), outline=DARK, width=SS)


def bird(d, x, y, s, c=None):
    w = SS * 3
    d.arc((x - s, y - s * .6, x, y + s * .4), 200, 340, fill=c or DARK, width=w)
    d.arc((x, y - s * .6, x + s, y + s * .4), 200, 340, fill=c or DARK, width=w)


def flower(d, x, y, s, c=None):
    d.line((x, y, x, y + s * 1.2), fill=(86, 140, 78), width=SS * 2)
    for i in range(5):
        a = i * 2 * math.pi / 5
        px, py = x + math.cos(a) * s * .5, y + math.sin(a) * s * .5
        d.ellipse((px - s * .34, py - s * .34, px + s * .34, py + s * .34), fill=c or RED)
    d.ellipse((x - s * .26, y - s * .26, x + s * .26, y + s * .26), fill=GOLD)


def boat(d, x, y, s, c=None):
    d.polygon([(x - s, y), (x + s, y), (x + s * .66, y + s * .42), (x - s * .66, y + s * .42)], fill=c or RED)
    d.line((x, y - s * 1.5, x, y), fill=DARK, width=SS * 2)
    d.polygon([(x + s * .07, y - s * 1.45), (x + s * .85, y - s * .12), (x + s * .07, y - s * .12)], fill=WHITE)


def car(d, x, y, s, c=None):
    d.rounded_rectangle((x - s, y - s * .38, x + s, y + s * .36), radius=s * .22, fill=c or BLUE)
    d.rounded_rectangle((x - s * .5, y - s * .84, x + s * .46, y - s * .3), radius=s * .18, fill=(190, 220, 238))
    for side in (-.56, .58):
        d.ellipse((x + s * side - s * .26, y + s * .14, x + s * side + s * .26, y + s * .66), fill=DARK)


def balloon(d, x, y, s, c=None):
    d.ellipse((x - s * .62, y - s, x + s * .62, y + s * .5), fill=c or PLUM)
    d.line((x, y + s * .5, x, y + s * .9), fill=DARK, width=SS)
    d.polygon([(x - s * .2, y + s * .9), (x + s * .2, y + s * .9),
               (x + s * .14, y + s * 1.2), (x - s * .14, y + s * 1.2)], fill=(146, 110, 74))


SHAPES = {'cloud': cloud, 'sun': sun, 'tree': tree, 'pine': pine, 'house': house,
          'bird': bird, 'flower': flower, 'boat': boat, 'car': car, 'balloon': balloon}

# how much room each shape takes around its anchor, as (left, up, right, down) in units of s
REACH = {'cloud': (1.2, .9, 1.2, .8), 'sun': (1, 1, 1, 1), 'tree': (1.1, 1.6, 1.1, 1.1),
         'pine': (.8, 2.2, .8, 1.1), 'house': (.9, 1.8, .9, 1.1), 'bird': (1.1, .7, 1.1, .5),
         'flower': (.9, .9, .9, 1.4), 'boat': (1.1, 1.6, 1.1, .6), 'car': (1.1, .9, 1.1, .8),
         'balloon': (.7, 1.1, .7, 1.3)}


def draw(scene, things):
    img = Image.new('RGB', (W * SS, H * SS), SKY_TOP)
    d = ImageDraw.Draw(img)
    scene['ground'](d)
    for kind, x, y, s, c in things:
        SHAPES[kind](d, x * SS, y * SS, s * SS, c)
    return img.resize((W, H), Image.LANCZOS)


def box_of(kind, x, y, s):
    l, u, r, dn = REACH[kind]
    return (x - l * s, y - u * s, x + r * s, y + dn * s)


def build(name, title, scene, things, changes):
    before = draw(scene, things)
    after_things = list(things)
    spots = []
    for what, index, extra in changes:
        kind, x, y, s, c = things[index]
        if what == 'remove':
            after_things = [t for t in after_things if t is not things[index]]
            spots.append(box_of(kind, x, y, s))
        elif what == 'add':
            nx, ny = extra
            after_things.append((kind, nx, ny, s, c))
            spots.append(box_of(kind, nx, ny, s))
        elif what == 'repaint':
            after_things = [(kind, x, y, s, extra) if t is things[index] else t for t in after_things]
            spots.append(box_of(kind, x, y, s))
    after = draw(scene, after_things)

    before.save(f'assets/img/diff-{name}-a.jpg', 'JPEG', quality=92, optimize=True)
    after.save(f'assets/img/diff-{name}-b.jpg', 'JPEG', quality=92, optimize=True)
    print(f'  {title}: {len(spots)} differences')
    return {
        "title": title,
        "a": f"assets/img/diff-{name}-a.jpg",
        "b": f"assets/img/diff-{name}-b.jpg",
        "spots": [{
            "x": round((b[0] + b[2]) / 2 / W * 100, 1),
            "y": round((b[1] + b[3]) / 2 / H * 100, 1),
            "rx": round(max((b[2] - b[0]) / 2, 22) / W * 100, 1),
            "ry": round(max((b[3] - b[1]) / 2, 22) / H * 100, 1),
        } for b in spots],
    }


# --- the three scenes --------------------------------------------------------
def park_ground(d):
    sky(d, 300 * SS)
    d.rectangle((0, 300 * SS, W * SS, H * SS), fill=GRASS)
    d.ellipse((-200 * SS, 262 * SS, 300 * SS, 340 * SS), fill=GRASS_DARK)
    d.ellipse((380 * SS, 268 * SS, 820 * SS, 344 * SS), fill=GRASS_DARK)


def bay_ground(d):
    sky(d, 268 * SS)
    d.rectangle((0, 268 * SS, W * SS, H * SS), fill=SEA)
    for y in range(290, H, 26):
        d.line((0, y * SS, W * SS, y * SS), fill=SEA_DARK, width=SS)


def street_ground(d):
    sky(d, 286 * SS)
    d.rectangle((0, 286 * SS, W * SS, H * SS), fill=PAVING)
    d.rectangle((0, 360 * SS, W * SS, 452 * SS), fill=ROAD)
    for x in range(30, W, 90):
        d.rectangle((x * SS, 404 * SS, (x + 44) * SS, 410 * SS), fill=WHITE)


PARK = [
    ('sun', 560, 70, 38, None), ('cloud', 120, 74, 34, None), ('cloud', 330, 54, 28, None),
    ('cloud', 470, 110, 24, None),
    ('bird', 210, 126, 16, None), ('bird', 262, 104, 13, None),
    ('tree', 86, 300, 54, None), ('pine', 206, 302, 46, None), ('tree', 548, 298, 50, None),
    ('house', 360, 296, 58, None),
    ('flower', 60, 404, 17, RED), ('flower', 150, 430, 17, GOLD), ('flower', 300, 410, 17, PLUM),
    ('flower', 430, 440, 17, RED), ('flower', 580, 408, 17, BLUE),
]
PARK_CHANGES = [('remove', 2, None), ('remove', 7, None), ('remove', 12, None),
                ('add', 4, (430, 96)), ('repaint', 10, BLUE)]

BAY = [
    ('sun', 86, 76, 34, None), ('cloud', 250, 70, 30, None), ('cloud', 470, 60, 34, None),
    ('cloud', 560, 130, 22, None),
    ('bird', 330, 128, 15, None), ('bird', 378, 150, 12, None), ('bird', 180, 160, 13, None),
    ('boat', 140, 330, 42, RED), ('boat', 330, 392, 54, BLUE), ('boat', 520, 336, 44, GOLD),
    ('balloon', 600, 190, 26, PLUM),
]
BAY_CHANGES = [('remove', 3, None), ('remove', 6, None), ('remove', 10, None),
               ('add', 7, (430, 300)), ('repaint', 9, GREEN)]

STREET = [
    ('cloud', 90, 62, 30, None), ('cloud', 300, 48, 26, None), ('cloud', 520, 76, 32, None),
    ('bird', 420, 130, 14, None),
    ('house', 92, 286, 56, (236, 226, 208)), ('house', 250, 286, 56, (226, 232, 222)),
    ('house', 410, 286, 56, (240, 228, 214)), ('house', 566, 286, 56, (224, 228, 238)),
    ('tree', 170, 330, 34, None), ('tree', 486, 330, 34, None),
    ('car', 170, 396, 44, BLUE), ('car', 420, 428, 48, RED),
]
STREET_CHANGES = [('remove', 1, None), ('remove', 8, None), ('remove', 11, None),
                  ('add', 3, (160, 160)), ('repaint', 6, (214, 196, 170))]


if __name__ == '__main__':
    random.seed(7)
    scenes = [
        build('park', 'A park in the morning', {'ground': park_ground}, PARK, PARK_CHANGES),
        build('bay', 'Boats in the bay', {'ground': bay_ground}, BAY, BAY_CHANGES),
        build('street', 'A quiet street', {'ground': street_ground}, STREET, STREET_CHANGES),
    ]
    json.dump(scenes, open('tools/diff-scenes.json', 'w'), indent=1)

    # a sheet to look the pairs over
    sheet = Image.new('RGB', (W * 2 + 24, (H + 24) * len(scenes)), '#e8edf3')
    for i, sc in enumerate(scenes):
        sheet.paste(Image.open(sc['a']), (8, 8 + i * (H + 24)))
        sheet.paste(Image.open(sc['b']), (W + 16, 8 + i * (H + 24)))
    sheet.save(os.environ.get('DIFF_SHEET', 'tools/scene-check.png'))
