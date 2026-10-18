"""Resize service photographs and crop the original model line, without retouching."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/kenmore-gasket-westfield'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('gasket-diagram', 'LGE-WM4270HVA_1.jpg'),
    ('old-and-new-gaskets', '545454.jpg'),
    ('model-label', 'WhatsApp Image 2026-10-17 at 10.19.27 (2).jpeg'),
    ('gasket-before', 'WhatsApp Image 2026-10-17 at 10.19.28.jpeg'),
    ('gasket-after', 'WhatsApp Image 2026-10-17 at 10.19.53 (4).jpeg'),
    ('top-panel-removed', 'WhatsApp Image 2026-10-17 at 10.19.28 (3).jpeg'),
    ('front-panel-removed', 'WhatsApp Image 2026-10-17 at 10.19.28 (5).jpeg'),
    ('counterweight-removed', 'WhatsApp Image 2026-10-17 at 10.19.48.jpeg'),
    ('mounting-lip-before', 'WhatsApp Image 2026-10-17 at 10.19.50 (2).jpeg'),
    ('mounting-lip-after', 'WhatsApp Image 2026-10-17 at 10.19.50 (4).jpeg'),
    ('new-gasket-installed', 'WhatsApp Image 2026-10-17 at 10.19.51 (3).jpeg'),
    ('inner-retaining-ring', 'WhatsApp Image 2026-10-17 at 10.19.51 (2).jpeg'),
    ('hose-reconnected', 'WhatsApp Image 2026-10-17 at 10.19.52 (2).jpeg'),
    ('counterweight-reinstalled', 'WhatsApp Image 2026-10-17 at 10.19.53 (2).jpeg'),
    ('finished-door-seal', 'WhatsApp Image 2026-10-17 at 10.19.53 (3).jpeg'),
    ('washer-testing', 'WhatsApp Image 2026-10-17 at 10.19.55.jpeg'),
]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((115, 823, 475, 910))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
