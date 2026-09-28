"""Resize original service photos and supplied diagrams for the repair story."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/ge-dryer-indianapolis'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('11.22.48.jpeg', 'ge-dryer'),
    ('11.22.49.jpeg', 'cabinet-before-cleaning'),
    ('11.22.52.jpeg', 'cabinet-after-cleaning'),
    ('11.22.49 (1).jpeg', 'front-panel-before-cleaning'),
    ('11.22.58 (1).jpeg', 'front-panel-after-cleaning'),
    ('11.22.49 (2).jpeg', 'blower-before-cleaning'),
    ('11.22.50 (3).jpeg', 'blower-after-cleaning'),
    ('11.22.49 (4).jpeg', 'heater-area-before-cleaning'),
    ('11.22.56.jpeg', 'heater-area-after-cleaning'),
    ('11.22.50 (2).jpeg', 'thermostat-replacement'),
    ('11.22.50 (1).jpeg', 'front-drum-slides'),
    ('11.22.59.jpeg', 'new-belt-on-drum'),
    ('11.22.59 (2).jpeg', 'installed-belt-routing'),
    ('The-belt.jpg', 'belt-reference-diagram'),
    ('Slider-bearings.jpg', 'slide-bearing-reference-diagram'),
    ('Dryer-Thermostat.jpg', 'thermostat-reference-diagram'),
    ('1000059041.jpg', 'gfdn110el0ww-model-label'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-09-28 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
