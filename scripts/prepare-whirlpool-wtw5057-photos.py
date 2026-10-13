"""Optimize supplied repair photographs without changing their evidence."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/whirlpool-wtw5057-fishers'
destination.mkdir(parents=True, exist_ok=True)
photos = {
    'whirlpool-washer': 'WhatsApp Image 2026-10-13 at 11.02.47.jpeg',
    'drive-cover-before': 'WhatsApp Image 2026-10-13 at 11.02.48 (1).jpeg',
    'motor-and-belt': 'WhatsApp Image 2026-10-13 at 11.02.48 (2).jpeg',
    'original-capacitor': 'WhatsApp Image 2026-10-13 at 11.02.48 (3).jpeg',
    'capacitor-access': 'WhatsApp Image 2026-10-13 at 11.02.48 (4).jpeg',
    'replacement-measured-50-1': 'WhatsApp Image 2026-10-13 at 11.02.50.jpeg',
    'failed-capacitor-measured-zero': 'WhatsApp Image 2026-10-13 at 11.02.54.jpeg',
    'replacement-installed': 'WhatsApp Image 2026-10-13 at 11.02.55 (1).jpeg',
    'drive-cover-reinstalled': 'WhatsApp Image 2026-10-13 at 11.02.55 (2).jpeg',
    'old-and-new-capacitors': 'WhatsApp-Image-2026-10-13-at-11.02.jpg',
    'replacement-packaging': '33333.jpg',
    'capacitor-diagram': 'WPL-WTW5057LW0_4.jpg',
}
for name, filename in photos.items():
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.thumbnail((1600, 1800), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), quality=88, method=6)
        print(name, photo.size)
with Image.open(source / 'WhatsApp Image 2026-10-13 at 11.02.48.jpeg') as original:
    label = ImageOps.exif_transpose(original).convert('RGB').crop((324, 803, 736, 885))
    label.save(destination / 'wtw5057lw0-model-label.webp', lossless=True)
    print('wtw5057lw0-model-label', label.size)
