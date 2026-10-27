'use client'

import React from 'react'
import { trackPhoneCall, type PhoneClickLocation } from '@/lib/analytics'

/**
 * Turns a display number into a `tel:` href.
 *
 * Extensions are split off rather than stripped. The naive
 * `replace(/[^+\d]/g, '')` used previously turned "(310) 277-2220 Ext. 3" into
 * "31027722203" — an eleven-digit number that dials somewhere else entirely.
 * RFC 3966 `;ext=` keeps the extension attached without corrupting the number.
 */
export function phoneToTelHref(phone: string): string {
  const [main, ext] = phone.split(/\s+(?:ext|extension|x)\.?\s*/i)
  const digits = main.replace(/[^+\d]/g, '')
  const extDigits = ext ? ext.replace(/\D/g, '') : ''
  return extDigits ? `tel:${digits};ext=${extDigits}` : `tel:${digits}`
}

interface TrackedPhoneLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Displayed or raw number; punctuation is stripped for the tel: href. */
  phone: string
  /** Which placement this is, so GA4 can tell the header apart from the footer. */
  location: PhoneClickLocation
}

/**
 * A `tel:` link that reports a GA4 `phone_call` event on click.
 *
 * Exists so the ~40 phone links on the site don't each grow their own inline
 * onClick — the event shape stays defined in one place. Any caller-supplied
 * onClick still runs, after the tracking call.
 *
 * The href is derived from `phone` rather than passed separately: two sources
 * of truth for the same number is how a link ends up dialling the wrong one.
 */
export default function TrackedPhoneLink({
  phone,
  location,
  onClick,
  children,
  ...rest
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={phoneToTelHref(phone)}
      onClick={event => {
        trackPhoneCall(location)
        onClick?.(event)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
