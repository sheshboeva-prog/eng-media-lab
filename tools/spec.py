# (source rectangle, destination top-left). The patch is lifted from the untouched
# photograph, so a thing either disappears under its own background or turns up
# somewhere it never was. Removals are listed first, then additions.
SCENES = [
    ('balloon', 'n-balloon-0.jpg', 'A balloon festival', [
        ((96, 170, 150, 240),  (170, 170)),   # the small striped balloon is gone
        ((450, 158, 518, 258), (538, 158)),   # the balloon on the right is gone
        ((150, 296, 192, 352), (308, 326)),   # the little orange balloon is gone
        ((170, 170, 224, 240), (414, 248)),   # a balloon appears on the right
        ((308, 326, 350, 382), (112, 118)),   # a balloon appears up in the corner
    ]),
    ('birds', 'n-birds-0.jpg', 'Flamingos in flight', [
        ((40, 184, 152, 248),  (194, 184)),   # the bird at the back is gone
        ((30, 172, 126, 228),  (510, 172)),   # the bird at the front is gone
        ((96, 190, 190, 246),  (414, 190)),   # one of the middle birds is gone
        ((338, 134, 430, 202), (118, 134)),   # a bird appears above the flock
        ((306, 208, 398, 254), (28, 208)),    # a bird appears behind the flock
    ]),
    ('beach', 'n-beach-1.jpg', 'Parasols on the beach', [
        ((206, 80, 242, 124),  (344, 80)),    # a pennant is gone
        ((244, 80, 280, 124),  (486, 80)),    # another pennant is gone
        ((160, 82, 196, 126),  (600, 82)),    # the pennant on the end is gone
        ((400, 80, 436, 124),  (250, 80)),    # a pennant appears over the hut
        ((310, 82, 346, 126),  (210, 82)),    # and another beside it
    ]),
    ('harbour', 'harbour-1.jpg', 'A harbour town', [
        ((492, 230, 536, 258), (434, 230)),   # the white boat on the right is gone
        ((112, 288, 142, 310), (112, 246)),   # the red buoy is gone
        ((246, 194, 288, 242), (198, 194)),   # the yacht masts are gone
        ((322, 210, 350, 238), (352, 210)),   # the mast on the barge is gone
        ((26, 224, 96, 258),   (150, 224)),   # a second boat appears beside it
    ]),
]
