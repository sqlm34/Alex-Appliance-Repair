"""Optimize supplied service photos and diagrams without altering the originals."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-dv400-fishers'
destination.mkdir(parents=True, exist_ok=True)
photos = {
    'dryer-before': '08.29.12',
    'interior-before': '08.29.36 (3)',
    'interior-cleaned': '08.29.39 (2)',
    'damaged-idler-pulley': '08.29.37 (1)',
    'idler-old-and-new': '08.29.40',
    'idler-installed': '08.29.40 (1)',
    'roller-before': '08.29.36 (4)',
    'roller-old-and-new': '08.29.38 (1)',
    'rear-rollers-installed': '08.29.39 (4)',
    'heater-before': '08.29.37',
    'replacement-heating-element': '08.29.40 (3)',
    'blower-before': '08.29.36 (2)',
    'blower-cleaned': '08.29.38 (3)',
    'lint-duct-before': '08.29.36',
    'lint-duct-cleaned': '08.29.41 (4)',
    'reassembly': '08.29.41 (2)',
}
for name, stamp in photos.items():
    with Image.open(source / f'WhatsApp Image 2026-10-13 at {stamp}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / f'{name}.webp', quality=84, method=6)
        print(name, photo.size)
for name, suffix in [('roller-diagram', '1'), ('heater-diagram', '2'), ('idler-diagram', '5')]:
    with Image.open(source / f'SMG-DV400EWHDWR--AA-00_{suffix}.jpg') as original:
        diagram = ImageOps.exif_transpose(original).convert('RGB')
        diagram.save(destination / f'{name}.webp', lossless=True, method=6)
        print(name, diagram.size)
with Image.open(source / 'WhatsApp Image 2026-10-13 at 08.29.13.jpeg') as original:
    label = ImageOps.exif_transpose(original).convert('RGB').crop((170, 760, 550, 805))
    label.save(destination / 'model-label.webp', lossless=True)
    print('model-label', label.size)
