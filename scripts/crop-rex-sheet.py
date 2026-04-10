#!/usr/bin/env python3
"""
Découpe public/rex/rex-sheet.png en poses + logo.
Grille 3 bandes (haut 2 poses | milieu thinking | bas 2 poses).
Exclut la zone basse (~26 %) de chaque bande où figurent les textes du sprite.
Rogne ensuite les marges transparentes (alpha).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

# Partie haute de chaque bande conservée (sans la ligne de texte sous la pose)
ROW_CHAR_FRACTION = 0.74

ROOT = Path(__file__).resolve().parents[1]
REX = ROOT / "public" / "rex"
SHEET = REX / "rex-sheet.png"


def trim_alpha(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    a = im.split()[3]
    bbox = a.getbbox()
    return im.crop(bbox) if bbox else im


def main() -> None:
    img = Image.open(SHEET).convert("RGBA")
    W, H = img.size
    h_band = H // 3
    w_left = W // 2
    char_h = max(1, int(h_band * ROW_CHAR_FRACTION))

    def row_y(i: int) -> tuple[int, int]:
        base = i * h_band
        return base, base + char_h

    y0, y1 = row_y(0)
    neutral = img.crop((0, y0, w_left, y1))
    celebrate = img.crop((w_left, y0, W, y1))

    y0, y1 = row_y(1)
    thinking = img.crop((0, y0, W, y1))

    y0, y1 = row_y(2)
    sad = img.crop((0, y0, w_left, y1))
    point = img.crop((w_left, y0, W, y1))

    for name, im in [
        ("neutral", neutral),
        ("celebrate", celebrate),
        ("thinking", thinking),
        ("sad", sad),
        ("point", point),
    ]:
        trim_alpha(im).save(REX / f"rex-{name}.png")

    n = Image.open(REX / "rex-neutral.png").convert("RGBA")
    nw, nh = n.size
    logo = trim_alpha(
        n.crop(
            (
                int(nw * 0.06),
                int(nh * 0.02),
                int(nw * 0.94),
                int(nh * 0.62),
            )
        )
    )
    logo.save(REX / "rex-logo.png")
    print("OK — poses + rex-logo.png régénérés depuis", SHEET)


if __name__ == "__main__":
    main()
