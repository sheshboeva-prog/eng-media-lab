"""Where to look in each photograph."""
import os
SHEET = os.environ.get("DIFF_SHEET", "/private/tmp/claude-501/-Users-drkmlv-Development-eng-media-lab/6bcf648b-1c27-465b-89a9-54561072d933/scratchpad/diff/zoom.png")

SCENES = [
    # name, photograph, title, remove, copy, zone, threshold, grow
    # the zone is the part of the picture with a smooth ground to work on
    ('birds', 'tools/sources/n-birds-0.jpg', 'Flamingos in flight',
     [(250, 215), (560, 200), (460, 218)], [(385, 165), (350, 232)], (0, 40, 640, 330), 18, 7),

    ('beach', 'tools/sources/n-beach-1.jpg', 'Pennants on the beach',
     [(362, 100), (500, 100), (616, 105)], [(414, 100), (320, 100)], (0, 30, 640, 126), 16, 5),

    ('gulls', 'tools/sources/m-gulls-0.jpg', 'Gulls over the bay',
     [(185, 150), (315, 415)], [(185, 150), (315, 415)], (0, 0, 552, 470), 20, 7),
]
