"""Prepare original service photos; crop the model line without retouching."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-dle5977s-mccordsville'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('dryer', '07.01.38 (1)'), ('model-label', '07.02.39'),
    ('broken-belt', '07.01.38 (4)'), ('old-roller', '07.01.39 (5)'),
    ('old-idler', '07.01.38 (5)'), ('front-rollers', '07.01.40 (1)'),
    ('rear-rollers', '07.01.40 (2)'), ('new-idler', '07.01.40 (3)'),
    ('lint-duct', '07.01.39 (3)'), ('duct-debris', '07.01.39 (2)'),
    ('cleaned-cabinet', '07.01.41'), ('reassembly', '07.01.41 (1)'),
]
for name, stamp in files:
    with Image.open(source / f'WhatsApp Image 2026-10-24 at {stamp}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((45, 465, 550, 600))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
with Image.open(next(source.glob('*075048.jpg'))) as original:
    photo = ImageOps.exif_transpose(original).convert('RGB')
    photo.save(target / 'drive-system-diagram.webp', 'WEBP', quality=95, method=6)
    print('drive-system-diagram', *photo.size)
