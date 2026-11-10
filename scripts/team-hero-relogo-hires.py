"""Rebuild the team hero photo at 2x with a sharp E&E monogram.

The monogram in team-hero-2026.jpg was soft because the photo is only 1512px wide
and the mark was baked in from a small bitmap. This script:
  1. upscales the photo 2x,
  2. paints out the existing mark (wall only, never the people),
  3. engraves the vector monogram from the Illustrator file at full resolution.

Usage: python -I team-hero-relogo-hires.py SRC.jpg WORDMARK.ai OUT.jpg DEBUG.png
"""
import sys
import numpy as np, cv2, pymupdf
from PIL import Image

SRC, AI, OUT, DBG = sys.argv[1:5]
K = 2  # output scale

base = Image.open(SRC).convert('RGB')
W1, H1 = base.size
img1 = np.asarray(base).astype(np.float32)
img = np.asarray(base.resize((W1 * K, H1 * K), Image.LANCZOS)).astype(np.float32)
H, W, _ = img.shape

# ---------- masks at 1x ----------
R, G, B = img1[..., 0], img1[..., 1], img1[..., 2]
lum = 0.299 * R + 0.587 * G + 0.114 * B
x0, y0, x1, y1 = 596, 236, 946, 562          # old mark + margin (1x)
region1 = np.zeros((H1, W1), np.uint8); region1[y0:y1, x0:x1] = 1

wall = (((B - R) >= -1) & ((B - G) >= -1) & (lum > 30) & (lum < 125)).astype(np.uint8)
wall = cv2.morphologyEx(wall, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
wall = cv2.morphologyEx(wall, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
# anything non-wall that lives entirely inside the region is the old mark, not a person
nonwall = 1 - wall
n, lab, st, _ = cv2.connectedComponentsWithStats(nonwall, 8)
person = np.zeros_like(wall)
for i in range(1, n):
    x, y, w, h, a = st[i]
    inside = x >= x0 and y >= y0 and x + w <= x1 and y + h <= y1
    if not inside and a >= 400:
        person[lab == i] = 1
# people inside the region only: clip to region neighbourhood
person_d1 = cv2.dilate(person, np.ones((3, 3), np.uint8))

def up(m, blur=0.0):
    m = cv2.resize(m.astype(np.float32), (W, H), interpolation=cv2.INTER_LINEAR)
    return cv2.GaussianBlur(m, (0, 0), blur) if blur else m

person_d = up(person_d1) > 0.5
region = up(region1) > 0.5
wall2 = up(wall) > 0.5

# ---------- paint out old mark ----------
known = (wall2 & ~(cv2.dilate(region.astype(np.uint8), np.ones((31, 31), np.uint8)) > 0)).astype(np.float32)
sig = 60 * K
num = cv2.GaussianBlur(img * known[..., None], (0, 0), sig)
den = cv2.GaussianBlur(known, (0, 0), sig)[..., None] + 1e-6
smooth = num / den

X0, Y0, X1, Y1 = x0 * K, y0 * K, x1 * K, y1 * K
ph, pw = Y1 - Y0, X1 - X0
patch = img[20 * K:20 * K + ph, 1090 * K:1090 * K + pw]      # clean wall for grain
grain = patch - cv2.GaussianBlur(patch, (0, 0), 6 * K)
synth = smooth.copy(); synth[Y0:Y1, X0:X1] += grain

fill = (region & ~person_d).astype(np.float32)
alpha = cv2.GaussianBlur(fill, (0, 0), 1.2 * K)
edge = np.zeros((H, W), np.float32); edge[Y0 + 12 * K:Y1 - 12 * K, X0 + 12 * K:X1 - 12 * K] = 1
edge = cv2.GaussianBlur(edge, (0, 0), 6 * K)
alpha = (alpha * edge)[..., None]
clean = img * (1 - alpha) + synth * alpha

# ---------- vector mark ----------
FRAME = 292 * K                      # outer frame size, matches the original placement
cx, cy = 771 * K, 399 * K
page = pymupdf.open(AI)[0]
pm = page.get_pixmap(dpi=1600, clip=pymupdf.Rect(20, 140, 97, 220), alpha=False)
m = np.frombuffer(pm.samples, np.uint8).reshape(pm.h, pm.w, pm.n)[..., :3]
gray = m.mean(-1)
ys, xs = np.where(gray < 200)
m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1].astype(np.float32) / 255
m = cv2.resize(m, (FRAME, FRAME), interpolation=cv2.INTER_AREA)
mlum = 0.299 * m[..., 0] + 0.587 * m[..., 1] + 0.114 * m[..., 2]
ink = np.clip((1 - mlum) * 1.6, 0, 1)
gold = np.clip((m[..., 0] - m[..., 2]) * 2.5, 0, 1)

mx0, my0 = cx - FRAME // 2, cy - FRAME // 2
full = np.zeros((H, W), np.float32); full[my0:my0 + FRAME, mx0:mx0 + FRAME] = ink
fg = np.zeros((H, W), np.float32); fg[my0:my0 + FRAME, mx0:mx0 + FRAME] = gold
full = cv2.GaussianBlur(full, (0, 0), 0.6)   # just enough to sit in the photo's grain
hi = np.roll(np.roll(full, -K, 0), -K, 1) - full
occl = cv2.GaussianBlur((~person_d).astype(np.float32), (0, 0), 0.8 * K)
lift = np.array([24, 25, 29], np.float32)       # cool light-slate face
goldlift = np.array([30, 22, 4], np.float32)    # warm tint on the &
out = clean + (full[..., None] * lift + fg[..., None] * goldlift) * occl[..., None]
out += np.clip(hi, 0, 1)[..., None] * 18 * occl[..., None]
out = np.clip(out, 0, 255).astype(np.uint8)
Image.fromarray(out).save(OUT, quality=90, subsampling=0, optimize=True, progressive=True)

crop = (slice(Y0 - 40 * K, Y1 + 40 * K), slice(X0 - 60 * K, X1 + 60 * K))
Image.fromarray(np.concatenate([np.clip(clean, 0, 255).astype(np.uint8)[crop], out[crop]], 1)).save(DBG)
