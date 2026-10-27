"""Convert service photos and crop the original model label without retouching."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/maytag-medb835-carmel'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('dryer', '21.10.40 (1)'), ('model-label', '21.10.40'),
    ('dirty-cabinet', '21.10.40 (4)'), ('old-front-rollers', '21.10.41 (3)'),
    ('old-idler', '21.10.41'), ('new-rear-rollers', '21.10.56 (1)'),
    ('new-front-rollers', '21.10.57 (1)'), ('new-idler', '21.10.56'),
    ('dirty-blower', '21.10.40 (3)'), ('clean-blower', '21.10.58 (2)'),
    ('dirty-duct', '21.10.57 (3)'), ('clean-duct', '21.10.58 (1)'),
    ('clean-cabinet', '21.10.55'),
]
for name, stamp in files:
    with Image.open(source / f'WhatsApp Image 2026-10-26 at {stamp}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((605, 825, 825, 913))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=95 if name == 'model-label' else 90, method=6)
        print(name, *photo.size)
for name, filename in [('idler-diagram', 'MAY-MEDB835DW4_2.jpg'), ('roller-diagram', 'MAY-MEDB835DW4_3.jpg')]:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.save(target / (name + '.webp'), 'WEBP', quality=95, method=6)
        print(name, *photo.size)
