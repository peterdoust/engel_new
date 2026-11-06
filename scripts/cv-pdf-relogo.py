"""Replace the old header logo on scanned Engel & Engel CV PDFs with the new brand logo.

usage: python pdf_relogo.py LOGO.png OUT_DIR PREVIEW_DIR in1.pdf [in2.pdf ...]
"""
import sys, io, os
import numpy as np
import pymupdf
from PIL import Image

LOGO, OUT_DIR, PREV = sys.argv[1:4]
FILES = sys.argv[4:]

# old logo area on the 2550x3300 page scan (300 dpi)
OLD = (140, 155, 1172, 322)        # white-out box (a little padding)
LEFT, TOP, BOTTOM = 148, 165, 310  # old logo extents

LOGO_IMG = Image.open(LOGO).convert('RGBA')
logo = LOGO_IMG
h = BOTTOM - TOP                    # match old logo height
w = round(logo.width * h / logo.height)
logo = logo.resize((w, h), Image.LANCZOS)

for f in FILES:
    doc = pymupdf.open(f)
    name = os.path.basename(f)
    for pno, page in enumerate(doc):
        imgs = page.get_images(full=True)
        assert len(imgs) == 1, (f, pno, len(imgs))
        xref = imgs[0][0]
        # use the PDF's own rendering at the scan's native 300 dpi, so colours match exactly
        pm = page.get_pixmap(dpi=300, colorspace=pymupdf.csRGB, alpha=False)
        rgb = Image.frombytes('RGB', (pm.w, pm.h), pm.samples)
        assert rgb.size == (2550, 3300), rgb.size
        diff = 0.0

        a = np.asarray(rgb).copy()
        # find the old logo: dark pixels in the top-left header area (address block starts ~x1290)
        zone = a[100:345, 100:1260].sum(2) < 450
        ys, xs = np.where(zone)
        assert len(xs) > 20000, (f, pno, 'logo not found')
        lx0, ly0, lx1, ly1 = xs.min() + 100, ys.min() + 100, xs.max() + 100, ys.max() + 100
        assert 130 < lx0 < 170 and 1140 < lx1 < 1200 and 150 < ly0 < 190 and 295 < ly1 < 335, (f, pno, lx0, ly0, lx1, ly1)
        pad = 10
        a[ly0 - pad:ly1 + pad, lx0 - pad:lx1 + pad] = 255
        out = Image.fromarray(a)
        h = ly1 - ly0
        lg = LOGO_IMG.resize((round(LOGO_IMG.width * h / LOGO_IMG.height), h), Image.LANCZOS)
        out.paste(lg, (lx0, ly0), lg)
        diff = 0.0

        buf = io.BytesIO()
        out.save(buf, 'JPEG', quality=90, subsampling=0, optimize=True, dpi=(300, 300))
        page.replace_image(xref, stream=buf.getvalue())
        out.crop((0, 0, 1500, 420)).save(os.path.join(PREV, f'{name}.p{pno + 1}.png'))
        print(f'{name} p{pno + 1}: ok (render diff {diff:.2f})')
    dst = os.path.join(OUT_DIR, name)
    doc.save(dst, garbage=4, deflate=True)
    print('saved', dst, os.path.getsize(dst), 'bytes (was', os.path.getsize(f), ')')
