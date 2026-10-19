"""Optimize original repair photographs without altering their content."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/whirlpool-no-start-carmel'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('dryer', '19.01.56'),
    ('cabinet-before-cleaning', '19.01.56 (1)'),
    ('old-and-new-thermal-fuses', '19.02.13 (3)'),
    ('installed-thermal-fuse', '19.02.14'),
    ('rear-rollers', '19.02.13 (2)'),
    ('front-rollers', '19.02.14 (2)'),
    ('old-and-new-idler', '19.02.12 (1)'),
    ('installed-idler', '19.02.13'),
    ('blower-before-cleaning', '19.01.57 (4)'),
    ('blower-after-cleaning', '19.01.58 (2)'),
    ('air-duct-lint', '19.01.57'),
    ('drum-felt-first-end', '19.01.57 (1)'),
    ('drum-felt-second-end', '19.01.57 (2)'),
    ('cabinet-after-cleaning', '19.01.58 (1)'),
    ('reassembly', '19.02.14 (3)'),
    ('completed-test', '19.02.14 (4)'),
]
files = [(name, 'WhatsApp Image 2026-10-19 at ' + stamp + '.jpeg') for name, stamp in files]
files += [('model-label', 'Screenshot_20261018_164146_Messages.jpg'),
          ('drum-blower-diagram', 'WPL-WED8500DC4_0.jpg'),
          ('idler-diagram', 'WPL-WED8500DC4_3.jpg')]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((470, 1190, 735, 1305))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
