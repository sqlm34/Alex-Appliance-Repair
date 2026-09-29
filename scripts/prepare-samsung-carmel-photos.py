"""Prepare selected original service photographs without changing their content."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-fan-carmel'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('11.08.35 (2).jpeg', 'samsung-refrigerator'),
    ('11.08.35.jpeg', 'fresh-food-cover'),
    ('11.08.49.jpeg', 'evaporator-ice-buildup'),
    ('11.08.35 (5).jpeg', 'ice-around-upper-tubing'),
    ('11.08.54 (2).jpeg', 'rear-service-access'),
    ('11.08.54 (4).jpeg', 'rear-drain-tubes'),
    ('11.08.52 (2).jpeg', 'additional-flexible-heater'),
    ('11.08.35 (6).jpeg', 'existing-defrost-heater'),
    ('11.08.52 (5).jpeg', 'temperature-sensors'),
    ('11.08.53 (2).jpeg', 'original-and-replacement-fans'),
    ('11.08.53 (3).jpeg', 'replacement-fan-mounted'),
    ('11.08.51.jpeg', 'fresh-food-service'),
    ('50046486-00002.jpg', 'fan-sensor-reference'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-09-29 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)

# Crop the appliance identification sticker, excluding the separate support label.
with Image.open(source / 'WhatsApp Image 2026-09-29 at 11.09.19.jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB').crop((70, 443, 605, 827))
    label.save(destination / 'rf260beaesr-model-label.webp', 'WEBP', quality=95, method=6)
    print('rf260beaesr-model-label', label.size)
