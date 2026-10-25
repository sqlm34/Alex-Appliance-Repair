"""Prepare service photographs and an unretouched model-number crop."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/maytag-med5430-noblesville'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('dryer', '08.04.03'), ('model-label', '08.04.03 (1)'),
    ('rear-open', '08.04.04'), ('old-cutoff', '08.04.04 (4)'),
    ('new-cutoff', '08.04.20'), ('blower-fuse', '08.04.19 (2)'),
    ('old-roller', '08.04.06'), ('old-idler', '08.04.17'),
    ('new-roller', '08.04.17 (2)'), ('new-idler', '08.04.17 (1)'),
    ('cleaned-cabinet', '08.04.17 (3)'), ('drum-cleaning', '08.04.18'),
    ('reassembly', '08.04.19 (1)'), ('tested-dryer', '08.04.20 (1)'),
]
for name, stamp in files:
    with Image.open(source / f'WhatsApp Image 2026-10-25 at {stamp}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((628, 745, 710, 955)).transpose(Image.Transpose.ROTATE_90)
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=95 if name == 'model-label' else 90, method=6)
        print(name, *photo.size)
for name, filename in [('bulkhead-diagram','WPL-MED5430MW0_3.jpg'),('idler-diagram','WPL-MED5430MW0_2.jpg')]:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.save(target / (name + '.webp'), 'WEBP', quality=95, method=6)
        print(name, *photo.size)
