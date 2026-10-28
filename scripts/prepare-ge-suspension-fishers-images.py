"""Prepare original service images and a model-only label crop."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/ge-suspension-fishers'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('washer', '08.21.30'),
    ('model-label', '08.22.10'),
    ('open-cabinet', '08.21.30 (4)'),
    ('suspension-detail', '08.21.31 (2)'),
    ('installed-suspension', '08.21.31'),
    ('assembled-washer', '08.21.38'),
]
for name, stamp in files:
    with Image.open(source / f'WhatsApp Image 2026-10-28 at {stamp}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            # Follow the tilted model line, excluding the serial line below it.
            photo = photo.transform((255, 40), Image.Transform.QUAD,
                                    (263, 856, 265, 896, 520, 881, 518, 841),
                                    Image.Resampling.BICUBIC)
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=95 if name == 'model-label' else 90, method=6)
        print(name, *photo.size)
with Image.open(source / 'GEN-WCSR4170G6WW_2.jpg') as original:
    photo = ImageOps.exif_transpose(original).convert('RGB')
    photo.save(target / 'suspension-diagram.webp', 'WEBP', quality=95, method=6)
    print('suspension-diagram', *photo.size)
