"""Prepare service photos and an unretouched crop of the actual model label."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/whirlpool-water-westfield'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('07.30.09 (1).jpeg', 'whirlpool-refrigerator'),
    ('07.30.10.jpeg', 'ice-maker-removed'),
    ('07.51.02 (1).jpeg', 'frozen-ice-maker-fill-tube'),
    ('07.30.06.jpeg', 'door-water-line-connections'),
    ('07.30.03.jpeg', 'rear-water-lines'),
    ('07.30.04 (1).jpeg', 'two-water-valves-replacement'),
    ('07.30.04 (2).jpeg', 'water-valve-connections'),
    ('07.30.09.jpeg', 'ice-maker-and-bin-cleaning'),
    ('07.51.02 (2).jpeg', 'refrigerator-reassembled'),
    ('WPL-WPW10238100_2.jpg', 'wpw10238100-valve-reference'),
    ('WPL-WPW10341320_0.jpg', 'wpw10341320-valve-reference'),
    ('WPL-WRS588FIHZ00_1.jpg', 'water-valves-reference-diagram'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-10-03 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)

with Image.open(source / '17900283063728916946242451684636.jpg.jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB')
    # Retain the photographed model line, excluding the serial-number area.
    label = label.crop((1450, 1370, 2130, 1560))
    label.save(destination / 'wrs588fihz00-model-label.webp', 'WEBP', lossless=True, method=6)
    print('wrs588fihz00-model-label', label.size)
