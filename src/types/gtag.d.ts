/**
 * Types for the GA4 global tag, which is injected at runtime by the root layout
 * (see src/app/layout.tsx) and therefore has no declaration of its own.
 *
 * `gtag` is declared on `window` and marked optional rather than as a bare
 * global on purpose. Call sites go through `window.gtag?.(...)`, so when an ad
 * blocker or a network failure stops gtag.js from loading the call is a no-op
 * instead of a TypeError — which matters most inside form success handlers,
 * where a throw would leave a user who did convert looking at a broken page.
 */
export {}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
