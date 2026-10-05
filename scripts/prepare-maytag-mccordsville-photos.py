"""Resize complete service photographs and crop only the requested model line."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/maytag-dryer-mccordsville'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('14.04.35 (2)', 'maytag-tested'),
    ('14.04.18', 'cabinet-before'),
    ('14.04.35', 'cabinet-after'),
    ('14.04.33 (1)', 'three-front-rollers'),
    ('14.04.34', 'two-rear-rollers'),
    ('14.04.34 (3)', 'idler-installed'),
    ('14.04.18 (2)', 'duct-before'),
    ('14.04.33 (4)', 'duct-after'),
    ('14.04.29', 'felt-before'),
    ('14.04.32', 'felt-after'),
    ('14.04.32 (1)', 'cleaned-drum'),
    ('14.04.35 (1)', 'reassembly'),
]
for stamp, name in photos:
    with Image.open(source / f'WhatsApp Image 2026-10-05 at {stamp}.jpeg') as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), quality=84, method=6)
        print(name, photo.size)
for filename, name in [('WPL-WED5800BW0_2.jpg', 'reference-idler-diagram'), ('WPL-WED5800BW0_3.jpg', 'reference-roller-diagram'), ('WPL-W10837240_0.jpg', 'idler-reference'), ('WPL-WPW10314173_2.webp', 'roller-reference')]:
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.save(destination / (name + '.webp'), lossless=True, method=6)
        print(name, photo.size)
with Image.open(source / 'WhatsApp Image 2026-10-05 at 17.53.21.jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB').crop((125, 545, 560, 645))
    label.save(destination / 'medb835dc4-model.webp', lossless=True)
    print('model', label.size)
