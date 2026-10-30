"""Produce the reversed-colour logo used on dark backgrounds.

    python scripts/build-logo-light.py public/assets/brand/mgwezane-logo.png \
        public/assets/brand/mgwezane-logo-light.png

The supplied logo sets its wordmark in black, which disappears on the ink
greens used in the header over the hero and in the footer. This reverses only
the neutral (black and grey) pixels of the wordmark to ivory and leaves the
blue lettering, the Ndebele crescent and the photographic otter untouched.

Anti-aliased letter edges are handled through alpha rather than colour: a solid
black pixel becomes solid ivory, a half-grey edge pixel becomes half-opaque
ivory. Recolouring them instead would leave grey fringes around every letter.
"""
import os, sys
import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]

# Everything left of this is the crescent and the otter, which stay as they are.
WORDMARK_FROM = 0.338
IVORY = np.array([248, 247, 243], dtype=np.float32)
# Above this saturation a pixel belongs to the blue lettering, not the black.
MAX_SATURATION = 52

logo = Image.open(SRC).convert('RGBA')
arr = np.asarray(logo).astype(np.float32)
rgb, alpha = arr[..., :3], arr[..., 3]

brightest = rgb.max(axis=2)
saturation = brightest - rgb.min(axis=2)

height, width = brightest.shape
x = np.arange(width)[None, :].repeat(height, axis=0)
neutral_type = (saturation < MAX_SATURATION) & (alpha > 0) & (x >= width * WORDMARK_FROM)

# How much ink the pixel carried: 1 for black, 0 for white.
ink = np.clip((255.0 - brightest) / 255.0, 0, 1)

out_rgb = np.where(neutral_type[..., None], IVORY, rgb)
out_alpha = np.where(neutral_type, alpha * ink, alpha)

light = Image.fromarray(
    np.clip(np.dstack([out_rgb, out_alpha]), 0, 255).astype(np.uint8), 'RGBA'
)
keep_alpha = light.getchannel('A')
quantised = (
    light.convert('RGB')
    .quantize(colors=200, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    .convert('RGBA')
)
quantised.putalpha(keep_alpha)
quantised.save(OUT, 'PNG', optimize=True)

print(f'{os.path.basename(OUT)}  {quantised.size[0]}x{quantised.size[1]}  '
      f'{os.path.getsize(OUT) // 1024} KB  ({int(neutral_type.sum())} pixels reversed)')
