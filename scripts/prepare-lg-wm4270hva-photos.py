"""Preserve complete repair photographs and crop the original model line."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-wm4270hva-carmel'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('12.08.10', 'washer-before'),
    ('12.08.11 (1)', 'front-panel-removed'),
    ('12.08.11 (2)', 'pump-location'),
    ('12.08.12', 'pump-connection'),
    ('12.08.19 (2)', 'pump-during-replacement'),
    ('12.08.19 (3)', 'removed-pump-assembly'),
    ('12.08.20', 'pump-reinstalled'),
    ('12.08.21 (1)', 'washer-reassembled'),
]
for stamp, name in photos:
    with Image.open(source / f'WhatsApp Image 2026-10-08 at {stamp}.jpeg') as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), quality=84, method=6)
        print(name, photo.size)
for filename, name in [('LGE-WM4270HVA_1.jpg', 'drain-pump-diagram'), ('LGE-4681EA2001T_0.jpg', 'drain-pump-reference')]:
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.save(destination / (name + '.webp'), lossless=True, method=6)
        print(name, photo.size)
with Image.open(source / 'WhatsApp Image 2026-10-08 at 12.08.10 (2).jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB').crop((115, 904, 425, 947))
    label.save(destination / 'wm4270hva-model.webp', lossless=True)
    print('model', label.size)
