'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Runs before paint in the browser (falls back to useEffect on the server, where it does nothing)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
import Link from 'next/link'

/**
 * Homepage hero — "Wherever the Truth Leads."
 * Built from the approved design (en/engel_design-main/EE Home.dc.html, E&E_Website_Home_FA.pdf).
 *
 * - Freeway photo with a gold light trail traced along the overpass curve.
 * - Intro sequence (CSS keyframes in globals.css, `ee-hero-*`): photo eases in, headline slides in
 *   line by line, the trail draws, the numbers band rises, then the stat cards arrive one at a
 *   time, each number counting up before the next card appears.
 * - Desktop: the photo's bottom sits on the hero's bottom and the photo is squashed a little
 *   vertically (the trail stretches with it). Phones / portrait tablets: the photo fits the area
 *   above the numbers band, with the band's blue filling behind it.
 * - The photo (and the trail with it) is slid / zoomed just enough to keep the trail clear of the
 *   headline at every screen size — ported from the design file's layout logic.
 * - Pair with <Header solid /> since this hero is light.
 */

const PHOTO = '/images/hero/ee-freeway-2400.jpg'
const PHOTO_W = 2400
const PHOTO_H = 1602
const ART_W = 1600 // the trail is drawn on a 1600 x 1068 canvas laid over the photo
const ART_H = 1068

const BAND_BG = 'linear-gradient(90deg,rgba(52,63,145,0.93) 0%,rgba(52,63,145,0.93) 76%,rgba(52,58,113,0.93) 88%,rgba(34,38,81,0.93) 100%)'

// Gold trail along the overpass curve (from the design file)
const TRAIL =
  'M298.9 836.2 C303.5 833.3 317.2 824.8 326.4 819.1 C335.6 813.5 344.8 808 353.9 802.1 C362.9 796.3 372.2 790.6 380.7 784.1 C389.1 777.5 396.8 769.8 404.8 762.6 C412.9 755.5 420.8 748.2 429 741.2 C437.2 734.2 445.8 727.7 454 720.7 C462.3 713.8 470.5 706.8 478.4 699.5 C486.3 692.1 494 684.7 501.4 676.9 C508.8 669 515.8 660.8 522.8 652.6 C529.8 644.4 536.6 636 543.2 627.6 C549.9 619.1 556.2 610.3 562.6 601.7 C569 593 575.4 584.4 581.7 575.7 C588.1 566.9 594.3 558.2 600.6 549.4 C606.9 540.6 613.2 531.9 619.4 523.1 C625.6 514.3 631.9 505.5 637.8 496.6 C643.8 487.6 649.5 478.5 655.2 469.3 C660.8 460.1 666.4 450.9 671.7 441.5 C677.1 432.2 682.1 422.6 687.4 413.3 C692.8 403.9 698.3 394.7 703.9 385.5 C709.5 376.3 715.7 367.4 721.2 358.2 C726.7 348.9 731.9 339.5 736.9 330 C742 320.4 746.6 310.7 751.5 301.1 C756.3 291.5 761 281.8 765.8 272.1 C770.5 262.5 775.2 252.8 780 243.1 C784.7 233.4 789.4 223.7 794.1 214 C798.9 204.4 803.6 194.7 808.4 185 C813.1 175.4 818 165.7 822.8 156.1 C827.6 146.4 832.4 136.8 837.1 127.1 C841.8 117.4 846.4 107.7 851 97.9 C855.5 88.2 859.9 78.3 864.2 68.5 C868.6 58.6 872.9 48.7 877.2 38.8 C881.5 29 885.7 19.1 890 9.2 C894.3 -0.7 898.6 -10.6 903 -20.4 C907.3 -30.3 913.8 -45.1 916 -50'

interface Stat {
  label: string
  lines?: string // two-line label used on wide screens
  href: string
  final: string
  to?: number
  dec?: number
  prefix?: string
  suffix?: string
  comma?: boolean
  text?: boolean // nothing to count (BIG 4)
}

const STATS: Stat[] = [
  { label: 'Years of Forensic Accounting Practice', lines: 'Years of Forensic\nAccounting Practice', href: '/#about', to: 30, suffix: '+', final: '30+' },
  { label: 'Forensic Accounting Cases', lines: 'Forensic Accounting\nCases', href: '/cases', to: 1000, suffix: '+', comma: true, final: '1,000+' },
  { label: 'Research Publications', lines: 'Research\nPublications', href: '/publications', to: 20, final: '20' },
  { label: 'Professional Certifications', lines: 'Professional\nCertifications', href: '/#certifications', to: 6, final: '6' },
  { label: 'Forensic Experience', href: '/team', final: 'BIG 4', text: true },
  { label: 'Jury Award', href: '/cases', to: 2.3, dec: 1, prefix: '$', suffix: 'B', final: '$2.3B' },
]

// Intro timing (ms after load). BAND_START / BAND_DUR must match .ee-hero-band in globals.css.
const BAND_START = 3780
const BAND_DUR = 900
// One card at a time: a card fades in, its number counts up (starting COUNT_LEAD after the fade
// begins), and the next card appears the moment that count lands. BIG 4's slot is shorter.
const CARD_START = BAND_START + BAND_DUR - 180
const COUNT_DUR = 552
const COUNT_LEAD = 96
const TEXT_SLOT = 540
const CARD_DELAY: number[] = []
{
  let at = CARD_START
  STATS.forEach((s, i) => {
    CARD_DELAY[i] = at
    at += s.text ? TEXT_SLOT : COUNT_LEAD + COUNT_DUR
  })
}
const COUNT_END = CARD_DELAY[STATS.length - 1] + COUNT_LEAD + COUNT_DUR

// Top edge of the lower (straight) deck on the 1600 x 1068 trail canvas, measured from the photo.
// It runs from the left edge to where it meets the curved bridge. The headline must stay clear of
// it too, or the subtitle sits on the deck on wide, short windows.
const DECK_EDGE: [number, number][] = [[-40, 597], [0, 593], [133, 576], [267, 561], [400, 548], [533, 537], [620, 529]]
const DECK_PTS = DECK_EDGE.slice(1).flatMap(([x1, y1], k) => {
  const [x0, y0] = DECK_EDGE[k]
  return Array.from({ length: 12 }, (_, i) => ({ x: x0 + ((x1 - x0) * i) / 12, y: y0 + ((y1 - y0) * i) / 12 }))
})

type Box = { x: number; y: number; w: number; h: number }
type Rect = { l: number; t: number; r: number; b: number }

function formatStat(s: Stat, i: number, t: number | null) {
  if (t === null || s.to === undefined) return s.final
  const p = Math.min(1, Math.max(0, (t - CARD_DELAY[i] - COUNT_LEAD) / COUNT_DUR))
  const v = s.to * (1 - Math.pow(1 - p, 2))
  let str = s.dec ? v.toFixed(s.dec) : String(Math.round(v))
  if (s.comma) str = Math.round(v).toLocaleString('en-US')
  return (s.prefix || '') + str + (s.suffix || '')
}

// Stat dividers: 2 columns on phones, 3 on tablets, 6 on desktop
function dividerClasses(i: number) {
  return [
    i % 2 ? 'border-l' : 'border-l-0',
    i >= 2 ? 'border-t' : 'border-t-0',
    i % 3 ? 'min-[600px]:border-l' : 'min-[600px]:border-l-0',
    i >= 3 ? 'min-[600px]:border-t' : 'min-[600px]:border-t-0',
    i % 6 ? 'min-[1000px]:border-l' : 'min-[1000px]:border-l-0',
    'min-[1000px]:border-t-0',
  ].join(' ')
}

export default function HeroTruthLeads() {
  const bgRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const bandBlueRef = useRef<HTMLDivElement>(null)
  const lineRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
  const trailPts = useRef<{ x: number; y: number }[] | null>(null)
  const [art, setArt] = useState<Box | null>(null)
  const [fillBand, setFillBand] = useState(false)
  const [countT, setCountT] = useState<number | null>(null)
  const [hover, setHover] = useState(-1)

  // Gap (px) between the headline lines and the nearest of: the trail's glow, the lower deck
  const clearance = (box: Box, bw: number, bh: number, lines: Rect[]) => {
    const u = box.w / ART_W
    const uy = box.h / ART_H
    let min = Infinity
    const check = (pts: { x: number; y: number }[], reach: number) => {
      for (const q of pts) {
        const X = box.x + q.x * u
        const Y = box.y + q.y * uy
        if (X < -20 || X > bw + 20 || Y < -20 || Y > bh + 20) continue
        for (const r of lines) {
          const dx = Math.max(r.l - X, 0, X - r.r)
          const dy = Math.max(r.t - Y, 0, Y - r.b)
          min = Math.min(min, Math.hypot(dx, dy) - reach)
        }
      }
    }
    check(trailPts.current!, 13 * u + 10) // half the glow stroke width (26) + margin
    check(DECK_PTS, 22) // keeps at least ~12px of sky between the text and the deck
    return min
  }

  const layout = useCallback(() => {
    const bg = bgRef.current
    const sec = bg?.parentElement
    if (!bg || !sec) return
    const bw = bg.clientWidth
    const bh = bg.clientHeight
    if (!bw || !bh) return
    const width = window.innerWidth
    const desktop = width >= 700

    if (!trailPts.current && lineRef.current?.getTotalLength) {
      const p = lineRef.current
      const L = p.getTotalLength()
      trailPts.current = Array.from({ length: 301 }, (_, i) => {
        const q = p.getPointAtLength((L * i) / 300)
        return { x: q.x, y: q.y }
      })
    }

    // Layout position relative to the hero (ignores the intro transforms)
    const offsetIn = (el: HTMLElement | null) => {
      let x = 0
      let y = 0
      let e = el
      while (e && e !== sec) {
        x += e.offsetLeft
        y += e.offsetTop
        e = e.offsetParent as HTMLElement | null
      }
      return { x, y }
    }
    const lines: Rect[] = lineRefs
      .map(ref => {
        const e = ref.current
        if (!e) return null
        const o = offsetIn(e)
        return { l: o.x, t: o.y, r: o.x + e.offsetWidth, b: o.y + e.offsetHeight }
      })
      .filter((r): r is Rect => r !== null)
    // Top of the blue part of the numbers band
    const bandTop = bandBlueRef.current ? offsetIn(bandBlueRef.current).y : 0

    // Phones and portrait tablets: the band covers the bottom of the hero, so fit the photo to
    // the area above the band. This zooms out and shows more of the freeway.
    const tall = width < 1000 && bh > bw * 0.75 && bandTop > 0
    const fitH = tall ? Math.min(bh, bandTop) : bh
    const s = Math.max(bw / PHOTO_W, fitH / PHOTO_H)
    const dw = PHOTO_W * s
    const dh = PHOTO_H * s
    // Phones: show the photo 34.8% across its hidden width
    const x = desktop ? 0 : 0.3478 * (bw - dw)
    // Squash the photo vertically to the approved sizes: 1093x630 at 1093 wide, 1366x800 at
    // 1366 wide (blended in between, held beyond). It always reaches the bottom of the hero.
    const t = Math.min(1, Math.max(0, (bw - 1093) / (1366 - 1093)))
    const squash = (630 / ((PHOTO_H * 1093) / PHOTO_W)) * (1 - t) + (800 / ((PHOTO_H * 1366) / PHOTO_W)) * t
    const h = tall ? dh : Math.max(dh * squash, bh)
    const y = tall ? fitH - h : desktop ? bh - h : (bh - h) / 2
    const base = { x, y, w: dw, h }
    const done = (b: Box) => {
      setArt(b)
      setFillBand(b.h < bh - 0.5)
    }
    if (!trailPts.current || !lines.length) return done(base)

    const need = -10
    let best = base
    let bestC = clearance(base, bw, bh, lines)
    let found = bestC >= need
    const tryBox = (b: Box) => {
      if (found || b.y + b.h < fitH - 0.5) return
      const c = clearance(b, bw, bh, lines)
      if (c > bestC) {
        best = b
        bestC = c
      }
      if (c >= need) found = true
    }
    // 1. Pan: phones slide the photo right, then down; desktop slides it down
    let p = { ...base }
    if (!desktop) {
      for (let nx = x; nx <= 0 && !found; nx = Math.min(0, nx + 4)) {
        p = { ...p, x: nx }
        tryBox(p)
        if (nx === 0) break
      }
    }
    for (let ny = p.y; ny <= 0 && !found; ny = Math.min(0, ny + 2)) {
      p = { ...p, y: ny }
      tryBox(p)
      if (ny === 0) break
    }
    // 2. Zoom the panned photo about the hero's top-left corner
    for (let k = 1.01; k <= 2.001 && !found; k += 0.01) tryBox({ x: p.x * k, y: p.y * k, w: p.w * k, h: p.h * k })
    done(best)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Place the photo before the first paint so it never jumps. Until then it stays hidden
  // (see `ready` below) and its fade-in + the trail draw wait for it.
  useIsoLayoutEffect(() => {
    layout()
    document.fonts?.ready.then(layout)
    window.addEventListener('resize', layout)
    const ro = typeof ResizeObserver !== 'undefined' && bgRef.current ? new ResizeObserver(layout) : null
    if (ro && bgRef.current) ro.observe(bgRef.current)
    return () => {
      window.removeEventListener('resize', layout)
      ro?.disconnect()
    }
  }, [layout])

  // Count-up (skipped for reduced motion). Timed off the band's CSS animation clock,
  // so the numbers stay in sync with the cards even if the page's JS loads late.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    // How far the CSS intro has already run when this effect starts (0 if unknown)
    const ct = bandRef.current?.getAnimations?.()[0]?.currentTime
    const t0 = performance.now() - (typeof ct === 'number' ? ct : 0)
    const clock = (now: number) => now - t0
    // Cards already showing (JS loaded late)? Keep the final numbers instead of resetting to 0.
    if (performance.now() - t0 >= CARD_START) return
    setCountT(clock(t0))
    const tick = (now: number) => {
      const t = clock(now)
      if (t < COUNT_END) {
        setCountT(t)
        raf = requestAnimationFrame(tick)
      } else setCountT(null)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const ready = art !== null
  const px = (n: number) => `${n.toFixed(2)}px`
  const bgStyle: React.CSSProperties = art
    ? { backgroundImage: `url('${PHOTO}')`, backgroundSize: `${px(art.w)} ${px(art.h)}`, backgroundPosition: `${px(art.x)} ${px(art.y)}`, backgroundRepeat: 'no-repeat' }
    : { backgroundImage: `url('${PHOTO}')`, backgroundSize: 'cover', backgroundPosition: '0% 100%', backgroundRepeat: 'no-repeat' }
  const svgStyle: React.CSSProperties = art
    ? { left: px(art.x), top: px(art.y), width: px(art.w), height: px(art.h) }
    : { left: 0, top: 0, width: '100%', height: '100%' }

  return (
    <div className="relative z-20 pt-[var(--hdr)]">
      <section aria-labelledby="hero-title" className={`ee-hero ${ready ? 'ee-hero-ready' : ''} relative flex flex-col overflow-hidden bg-brand-slate`}>
        {/* Photo + gold trail */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className={`ee-hero-bg absolute inset-0 ${ready ? '' : 'opacity-0'}`}
          style={{ transformOrigin: '62% 40%', background: fillBand ? BAND_BG : undefined }}
        >
          <div
            role="img"
            aria-label="Curving Los Angeles freeway overpass against a pale sky"
            className="absolute inset-0"
            style={{ ...bgStyle, filter: 'brightness(1.15) saturate(1.05)' }}
          />
          <svg
            viewBox="0 0 1600 1068"
            preserveAspectRatio={art ? 'none' : 'xMinYMax slice'}
            className="absolute overflow-visible"
            style={svgStyle}
          >
            <defs>
              <filter id="eeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="eeHeadGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <clipPath id="eePillarClip">
                <polygon points="375.2,-200 2000,-200 2000,1300 293.1,1300" />
              </clipPath>
            </defs>
            <g clipPath="url(#eePillarClip)" opacity="0.4">
              <path className="ee-hero-trail ee-hero-trail-glow" d={TRAIL} pathLength={1} fill="none" stroke="#d4af37" strokeWidth="26" filter="url(#eeGlow)" />
              <path ref={lineRef} className="ee-hero-trail" d={TRAIL} pathLength={1} fill="none" stroke="#d4af37" strokeWidth="16" />
              <path className="ee-hero-head" d={TRAIL} pathLength={1} fill="none" stroke="#ffe7a1" strokeWidth="44" strokeLinecap="round" filter="url(#eeHeadGlow)" />
              <path className="ee-hero-head" d={TRAIL} pathLength={1} fill="none" stroke="#fffbee" strokeWidth="14" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        {/* Soft wash behind the headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(100deg,rgba(236,241,248,0.6) 0%,rgba(236,241,248,0.25) 38%,rgba(236,241,248,0) 60%)' }}
        />

        {/* Headline */}
        <div className="relative mx-auto w-full max-w-[1920px] flex-1 px-[clamp(20px,5.56vw,80px)] pb-[clamp(20px,4vh,48px)] pt-[28px] min-[700px]:pt-[clamp(24px,22svh,260px)] min-[900px]:pt-[clamp(24px,min(3.78vw,7vh),76px)]">
          <h1 id="hero-title" className="m-0 flex flex-col items-start uppercase text-brand-midnight">
            <span ref={lineRefs[0]} className="ee-hero-line ee-hero-l1 font-medium leading-none tracking-[-0.03em] text-[clamp(25px,calc(3.37vw-3px),61px)]">
              Wherever the
            </span>
            <span ref={lineRefs[1]} className="ee-hero-line ee-hero-l2 -mt-[0.045em] font-medium leading-none tracking-[-0.03em] text-[clamp(39px,calc(5.05vw-3px),93px)]">
              Truth <em className="italic">Leads.</em>
            </span>
            <span
              ref={lineRefs[2]}
              className="ee-hero-line ee-hero-l3 ml-[0.44vw] mt-[0.39em] max-w-[200px] font-normal normal-case leading-[1.25] tracking-normal min-[700px]:max-w-none text-[clamp(14px,calc(1.75vw-3px),32px)]"
            >
              Nationally Recognized Forensic Accountants
            </span>
          </h1>
        </div>

        {/* Numbers band */}
        <div ref={bandRef} className="ee-hero-band relative w-full">
          <div className="mx-auto max-w-[1920px] px-[clamp(20px,5.56vw,80px)]">
            <h2 className="m-0 inline-flex items-center rounded-tr-[clamp(14px,1.5vw,26px)] bg-[rgba(212,175,55,0.93)] font-semibold uppercase leading-none tracking-[-0.01em] text-brand-cobalt text-[clamp(16px,2.05vw,40px)] pb-[clamp(11px,1.1vw,15px)] pl-[clamp(8px,0.65vw,12px)] pr-[clamp(26px,3vw,44px)] pt-[clamp(12px,1.2vw,17px)]">
              Our Numbers Do the Talking
            </h2>
          </div>
          <div ref={bandBlueRef} style={{ background: BAND_BG }}>
            <div className="mx-auto max-w-[1920px] px-[clamp(20px,5.56vw,80px)] pb-[4px] pt-[2px] min-[420px]:pb-[6px] min-[420px]:pt-[4px] min-[1000px]:pb-[clamp(8px,0.8vw,16px)] min-[1000px]:pt-[clamp(8px,0.95vw,14px)]">
              <ul className="ee-hero-stats m-0 grid list-none grid-cols-2 p-0 min-[600px]:max-[999px]:grid-cols-3">
                {STATS.map((s, i) => {
                  const on = hover === i
                  const dim = hover !== -1 && !on
                  return (
                    <li
                      key={s.label}
                      className={`ee-hero-stat flex border-white/[0.18] min-[1000px]:my-[clamp(6px,0.6vw,12px)] ${dividerClasses(i)}`}
                      style={{ animationDelay: `${CARD_DELAY[i]}ms` }}
                    >
                      <Link
                        href={s.href}
                        aria-label={`${s.final} ${s.label} — learn more`}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(-1)}
                        onFocus={() => setHover(i)}
                        onBlur={() => setHover(-1)}
                        className="relative flex flex-1 flex-col items-center justify-start gap-[3px] px-[6px] py-[10px] text-center text-white no-underline outline-offset-[-3px] transition-opacity duration-[400ms] hover:text-white min-[420px]:gap-[6px] min-[420px]:px-[8px] min-[420px]:py-[16px] min-[600px]:px-[12px] min-[600px]:py-[18px] min-[1000px]:gap-[clamp(2px,0.15vw,4px)] min-[1000px]:py-[clamp(6px,0.8vw,14px)]"
                        style={{ opacity: dim ? 0.6 : 1 }}
                      >
                        <strong
                          className="grid justify-items-center whitespace-nowrap leading-none text-brand-gold text-[26px] min-[420px]:text-[28px] min-[600px]:text-[32px] min-[1000px]:text-[clamp(30px,3.2vw,62px)]"
                          style={{
                            fontFamily: "'Arial Black','Arial Bold',Arial,sans-serif",
                            fontWeight: 900,
                            fontVariantNumeric: 'lining-nums tabular-nums',
                            transform: on ? 'translateY(-4px) scale(1.07)' : 'none',
                            textShadow: on ? '0 0 26px rgba(212,175,55,0.5)' : '0 0 0 rgba(212,175,55,0)',
                            transition: 'transform .5s cubic-bezier(.2,.8,.2,1), text-shadow .5s ease',
                          }}
                        >
                          {/* Holds the final width so the row doesn't shift while counting */}
                          <span aria-hidden="true" className="invisible [grid-area:1/1]">
                            {s.final}
                          </span>
                          <span
                            className={`[grid-area:1/1] justify-self-end ${s.text ? 'ee-hero-word inline-block' : ''}`}
                            style={s.text ? { animationDelay: `${CARD_DELAY[i]}ms` } : undefined}
                          >
                            {formatStat(s, i, countT)}
                          </span>
                        </strong>
                        <span className="max-w-[150px] whitespace-normal text-[13px] font-normal leading-[1.3] text-white [text-wrap:balance] min-[600px]:text-[14px] min-[1000px]:max-w-none min-[1000px]:whitespace-pre-line ee-hero-label">
                          {s.lines ?? s.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
