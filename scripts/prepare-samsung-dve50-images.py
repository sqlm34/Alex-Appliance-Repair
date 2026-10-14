"""Prepare original service photographs without altering repair evidence."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-dve50-fishers'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('samsung-dryer', 'WhatsApp Image 2026-10-14 at 14.52.09.jpeg'),
    ('model-label', '7622842b-5723-44b2-8d00-909ef5f476b9.jpeg'),
    ('heater-diagram', 'SMG-DVE50R5200W--A3-00_2.jpg'),
    ('drive-diagram', 'SMG-DVE50R5200W--A3-00_5.jpg'),
    ('front-panel-removed', 'WhatsApp Image 2026-10-14 at 14.52.09 (1).jpeg'),
    ('cabinet-before-cleaning', 'WhatsApp Image 2026-10-14 at 14.52.09 (3).jpeg'),
    ('heater-diagnostic-access', 'WhatsApp Image 2026-10-14 at 14.52.09 (4).jpeg'),
    ('broken-heating-coil', 'WhatsApp Image 2026-10-14 at 14.52.10.jpeg'),
    ('worn-idler-pulley', 'WhatsApp Image 2026-10-14 at 14.52.21 (2).jpeg'),
    ('replacement-idler-installed', 'WhatsApp Image 2026-10-14 at 14.52.22 (2).jpeg'),
    ('lint-duct-before-cleaning', 'WhatsApp Image 2026-10-14 at 14.52.21.jpeg'),
    ('lint-duct-after-cleaning', 'WhatsApp Image 2026-10-14 at 14.52.24 (1).jpeg'),
    ('cabinet-after-cleaning', 'WhatsApp Image 2026-10-14 at 14.52.22 (4).jpeg'),
    ('replacement-heating-element', 'WhatsApp Image 2026-10-14 at 14.52.23 (1).jpeg'),
    ('heater-housing-reassembled', 'WhatsApp Image 2026-10-14 at 14.52.23 (4).jpeg'),
]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((430, 325, 830, 505))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
