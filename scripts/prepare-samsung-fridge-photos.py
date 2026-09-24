"""Prepare web copies of the supplied refrigerator service photographs."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-rfg237aawp-fishers'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('07.41.01.jpeg', 'samsung-rfg237aawp-refrigerator', None),
    ('07.41.01 (1).jpeg', 'samsung-rfg237aawp-model-label', (0.11, 0.655, 0.94, 0.696)),
    ('07.41.01 (2).jpeg', 'fresh-food-compartment', None),
    ('07.41.02.jpeg', 'twin-cooling-rear-panel', None),
    ('07.41.02 (1).jpeg', 'shelves-removed-for-access', None),
    ('07.41.03.jpeg', 'evaporator-and-wiring-exposed', None),
    ('07.41.02 (2).jpeg', 'removed-fan-panel-and-motor', None),
    ('07.41.02 (3).jpeg', 'refrigerator-fan-motor', None),
    ('07.41.02 (4).jpeg', 'fan-blade-and-air-opening', None),
    ('07.41.02 (5).jpeg', 'fan-motor-housing-and-wiring', None),
    ('SMG-RFG237AAWP--XAA-00_5.jpg', 'fan-motor-and-sensor-diagram', None),
]
for filename, name, crop in photos:
    filename = filename if filename.endswith('.jpg') else 'WhatsApp Image 2026-09-24 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        if crop:
            w, h = photo.size
            photo = photo.crop(tuple(round(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop)))
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
