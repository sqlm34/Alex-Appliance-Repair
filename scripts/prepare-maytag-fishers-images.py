"""Prepare original service photos and the requested model-label crop."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/maytag-no-heat-fishers'
target.mkdir(parents=True, exist_ok=True)
photos = [
    ('stacked-dryer', '07.25.05 (1)'),
    ('model-label', '07.25.24 (4)'),
    ('unstacked-access', '07.25.05 (3)'),
    ('cabinet-before-cleaning', '07.25.06 (3)'),
    ('broken-heating-coil', '07.25.17'),
    ('replacement-heating-element', '07.25.23 (2)'),
    ('rear-rollers-before', '07.25.08'),
    ('new-rear-rollers', '07.25.21'),
    ('old-and-new-idler', '07.25.20 (1)'),
    ('installed-idler', '07.25.23 (1)'),
    ('internal-duct-lint', '07.25.06 (1)'),
    ('cabinet-after-cleaning', '07.25.22 (1)'),
    ('drum-reinstalled', '07.25.23 (5)'),
    ('completed-test', '07.25.25 (1)'),
]
files = [(name, 'WhatsApp Image 2026-10-22 at ' + stamp + '.jpeg') for name, stamp in photos]
files += [('cabinet-drive-diagram', 'WPL-MED5630HW2_2.jpg'),
          ('drum-heater-diagram', 'WPL-MED5630HW2_3.jpg')]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((120, 795, 620, 875))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
