"""Create web-sized copies of the selected Noblesville service photographs."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-fan-noblesville'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('14.12.53 (1).jpeg', 'lg-refrigerator-noise'),
    ('14.12.54.jpeg', 'ff-e-error-display'),
    ('14.13.06 (1).jpeg', 'fan-motor-diagnostic-tester'),
    ('14.12.52 (1).jpeg', 'freezer-evaporator-access'),
    ('14.13.06 (3).jpeg', 'eau65058511-motor-label'),
    ('14.12.52 (2).jpeg', 'fan-motor-replacement'),
    ('14.13.05 (1).jpeg', 'freezer-panel-reinstalled'),
    ('14.12.53.jpeg', 'refrigerator-display-check'),
    ('LGE-GR-L228NKSM--ASBCNAA_0.jpg', 'freezer-fan-reference-diagram'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-10-01 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
