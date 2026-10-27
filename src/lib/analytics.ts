/**
 * Wrapper over the GA4 global tag configured in src/app/layout.tsx.
 *
 * Everything funnels through `track()` so there is exactly one place that
 * handles the two ways gtag can be absent: server-side rendering (no `window`
 * at all) and a blocked/failed gtag.js load (`window.gtag` undefined). Both are
 * silent no-ops — analytics must never be able to break a page, least of all a
 * form the user has just successfully submitted.
 */

export const GA_MEASUREMENT_ID = 'G-7S03563N3Q'

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
}

/**
 * Identifies which phone link was clicked. Every placement sends the same
 * `phone_call` event name, so without this the GA4 report cannot tell the header
 * number apart from the footer or a partner's direct line.
 */
export type PhoneClickLocation =
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'homepage_jason_office'
  | 'homepage_jason_direct'
  | 'homepage_brandon_office'
  | 'homepage_brandon_direct'
  | 'team_jason_primary'
  | 'team_jason_secondary'
  | 'team_brandon_primary'
  | 'team_brandon_secondary'
  | 'team_douglas_primary'
  | 'team_douglas_secondary'
  // Fallback for a team member whose slug is missing from TEAM_PHONE_LOCATIONS.
  // A mislabelled event beats throwing inside a render and taking out /team.
  | 'team_unknown'
  // Individual partner profile pages, /team/[slug].
  | 'team_profile_office'
  | 'team_profile_direct'
  // Contact page cards, mirroring the homepage ones.
  | 'contact_jason_office'
  | 'contact_jason_direct'
  | 'contact_brandon_office'
  | 'contact_brandon_direct'
  /*
   * The 16 practice-area and 4 service pages share one identical CTA block, so
   * they share one label rather than getting 20 near-duplicate values. GA4
   * already records page_location on every event, so "which practice area" is
   * answered by breaking this event down by page — no extra vocabulary needed.
   */
  | 'practice_area_cta'
  | 'service_cta'
  | 'services_index_cta'
  | 'about_cta'
  | 'publications_cta'
  | 'news_article_cta'
  | 'portal_login'
  | 'events_list'
  | 'event_detail'

/** Fires on click of a phone number anywhere on the site. */
export function trackPhoneCall(location: PhoneClickLocation) {
  track('phone_call', {
    event_category: 'engagement',
    event_label: 'website_phone_click',
    // Not part of the client's spec, but every placement is otherwise
    // indistinguishable in the GA4 report.
    location,
    value: 1,
  })
}

/**
 * GA4 `location` values for each partner's two numbers, keyed by team slug.
 *
 * Lives here rather than in the team page because /team renders the numbers
 * twice — once in the contact rows and once as the "Call" buttons inside
 * TeamVariation5 — and both need to agree on the labels.
 */
export const TEAM_PHONE_LOCATIONS: Record<
  string,
  { primary: PhoneClickLocation; secondary: PhoneClickLocation }
> = {
  'jason-a-engel': { primary: 'team_jason_primary', secondary: 'team_jason_secondary' },
  'brandon-j-engel': { primary: 'team_brandon_primary', secondary: 'team_brandon_secondary' },
  'douglas-h-engel': { primary: 'team_douglas_primary', secondary: 'team_douglas_secondary' },
}

/** The `form_name` dimension sent with `generate_lead`. */
export type LeadFormName =
  | 'contact_form'
  | 'career_application'
  | 'request_publication'

/**
 * Reports a converted lead: the GA4 `generate_lead` event plus `FormSent`.
 *
 * `FormSent` is wired up as a Google Ads conversion through GA4, so the name —
 * including its capitalisation — must stay exactly as written and must not
 * carry parameters.
 *
 * Call this only once the server has confirmed the submission. Firing it on
 * button click would count abandoned and failed submissions as conversions and
 * feed bad data into Ads bid optimisation.
 */
export function trackFormSubmission(formName: LeadFormName) {
  track('generate_lead', { form_name: formName, value: 1 })
  track('FormSent')
}
