"""Create optimized copies of the supplied washer repair photographs."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-wm3997hwa-drain-pump-carmel'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('WhatsApp Image 2026-09-22 at 05.55.07.jpeg', 'lg-wm3997hwa-washer', None),
    ('WhatsApp Image 2026-09-22 at 05.55.07 (2).jpeg', 'removing-water-with-wet-vacuum', None),
    ('WhatsApp Image 2026-09-22 at 05.55.08.jpeg', 'washer-front-panel-removed', None),
    ('WhatsApp Image 2026-09-22 at 05.55.08 (2).jpeg', 'old-and-new-lg-drain-pumps', None),
    ('WhatsApp Image 2026-09-22 at 05.55.08 (1).jpeg', 'lg-washer-pump-housing-access', None),
    ('WhatsApp Image 2026-09-22 at 05.55.08 (5).jpeg', 'lg-wm3997hwa-model-label', (0.20, 0.49, 0.56, 0.52)),
    ('LGE-WM3997HWA_1.jpg', 'lg-wm3997hwa-pump-location-diagram', None),
]
for filename, name, crop in photos:
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        if crop:
            w, h = photo.size
            photo = photo.crop(tuple(round(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop)))
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        target = destination / (name + '.webp')
        photo.save(target, 'WEBP', quality=84, method=6)
        print(f'{name}: {photo.width}x{photo.height}, {target.stat().st_size} bytes')
