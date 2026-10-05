"""Prepare documentary dryer photos without changing their contents."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/whirlpool-dryer-westfield'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('18.06.50 (1)', 'whirlpool-cabrio-service-visit'),
    ('18.06.51 (1)', 'cabinet-before-cleaning'),
    ('18.06.52', 'blower-before-cleaning'),
    ('18.07.06 (5)', 'blower-after-cleaning'),
    ('18.06.54', 'old-idler-pulley'),
    ('18.07.06 (2)', 'replacement-idler-installed'),
    ('18.07.05', 'rear-support-rollers'),
    ('18.07.09 (1)', 'front-support-rollers'),
    ('18.07.07 (1)', 'lint-in-front-duct'),
    ('18.07.08 (2)', 'front-duct-cleaned'),
    ('18.07.07', 'cabinet-after-cleaning'),
]
for stamp, name in photos:
    with Image.open(source / f'WhatsApp Image 2026-10-04 at {stamp}.jpeg') as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)

references = [
    ('WPL-WED5800BW0_2.jpg', 'cabinet-idler-parts-diagram'),
    ('WPL-WED5800BW0_3.jpg', 'drum-roller-parts-diagram'),
    ('WPL-W10837240_0.jpg', 'idler-pulley-reference'),
    ('WPL-WPW10314173_2.webp', 'support-roller-reference'),
]
for filename, name in references:
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        # Preserve diagram numbers and the supplied callouts at full resolution.
        photo.save(destination / (name + '.webp'), 'WEBP', lossless=True, method=6)
        print(name, photo.size)

with Image.open(source / 'WhatsApp Image 2026-10-04 at 18.06.50.jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB')
    w, h = label.size
    label = label.crop((int(w * .407), int(h * .273), int(w * .57), int(h * .323)))
    label.save(destination / 'wed5800bw0-model-label.webp', 'WEBP', lossless=True)
    print('wed5800bw0-model-label', label.size)
