/**
 * Registry of pages whose SEO meta title / description are editable from the admin.
 *
 * This is the single source of truth for:
 *   - the list rendered by /admin/seo
 *   - the fallback meta used when no override exists in MongoDB
 *   - the whitelist of paths the /api/seo endpoint will accept
 *
 * Titles are emitted as `title: { absolute }` (see src/lib/seo.ts), so the brand
 * suffix must be written out in full here — the root layout's `%s | Engel & Engel`
 * template is deliberately bypassed to avoid a double suffix.
 */

import { blogPosts } from '@/lib/blogPosts'
import { eventsData } from '@/lib/eventsData'

export type SeoPageType =
  | 'standard'
  | 'practice-area'
  | 'service'
  | 'publication'
  | 'team'
  | 'resource'
  | 'blog-post'
  | 'event'

export interface SeoPage {
  type: SeoPageType
  path: string
  label: string
  defaultTitle: string
  defaultDescription: string
}

export const SEO_PAGE_TYPES: { type: SeoPageType; label: string }[] = [
  { type: 'standard', label: 'Standard Pages' },
  { type: 'practice-area', label: 'Practice Areas' },
  { type: 'service', label: 'Services' },
  { type: 'publication', label: 'Publications' },
  { type: 'team', label: 'Team Members' },
  { type: 'resource', label: 'Resources' },
  { type: 'blog-post', label: 'Blog Posts' },
  { type: 'event', label: 'Events' },
]

/**
 * Blog posts and events are derived from their content rather than hand-written,
 * so a new post appears in the admin automatically and the defaults can never
 * drift from what the page actually renders. The title suffixes mirror exactly
 * what each page's own generateMetadata produces.
 */
const BLOG_POST_PAGES: SeoPage[] = Object.entries(blogPosts).map(([slug, post]) => ({
  type: 'blog-post' as const,
  path: `/blog/${slug}`,
  label: post.title,
  defaultTitle: `${post.title} | Engel & Engel Blog`,
  defaultDescription: post.description,
}))

const EVENT_PAGES: SeoPage[] = Object.entries(eventsData).map(([slug, event]) => ({
  type: 'event' as const,
  path: `/events/${slug}`,
  label: event.title,
  defaultTitle: `${event.title} | Engel & Engel Events`,
  defaultDescription: event.description,
}))

const STATIC_SEO_PAGES: SeoPage[] = [
  // ─────────────────────────────────────────────────────────────
  // Standard pages
  // ─────────────────────────────────────────────────────────────
  {
    type: 'standard',
    path: '/',
    label: 'Home',
    defaultTitle: 'Engel & Engel - Premier Forensic Accounting Firm in Los Angeles',
    defaultDescription:
      "Los Angeles' premier forensic accounting firm with 30+ years of experience in complex business litigation and expert witness testimony. Rapid response, court-proven expertise.",
  },
  {
    type: 'standard',
    path: '/team',
    label: 'Team',
    // Ported verbatim from the previous hard-coded team/layout.tsx — already indexed.
    defaultTitle: 'Our Team of Forensic Accountants | Engel & Engel LLP | Los Angeles',
    defaultDescription:
      'Meet our expert team of forensic accounting professionals: Jason A. Engel (CPA, CFE, CIRA, CVA, MAFF, ABV), Brandon J. Engel (CPA, CFE, ABV), and Douglas H. Engel (CPA, MBA). 35+ years of experience in Los Angeles.',
  },
  {
    type: 'standard',
    path: '/contact',
    label: 'Contact',
    // Ported verbatim from the previous hard-coded contact/layout.tsx.
    defaultTitle: 'Contact Engel & Engel | Los Angeles Forensic Accounting | (310) 277-2220',
    defaultDescription:
      'Contact Engel & Engel forensic accounting experts in Los Angeles. Call (310) 277-2220 for free consultation. Located at 350 S Grand Avenue, Suite 3160.',
  },
  {
    type: 'standard',
    path: '/careers',
    label: 'Careers',
    defaultTitle: 'Careers in Forensic Accounting | Engel & Engel',
    defaultDescription:
      'Build a career in forensic accounting and litigation support at Engel & Engel, a Los Angeles firm working on complex, high-stakes cases. View open roles.',
  },
  {
    type: 'standard',
    path: '/cases',
    label: 'Case Studies',
    defaultTitle: 'Forensic Accounting Case Studies | Engel & Engel',
    defaultDescription:
      'Representative engagements from Engel & Engel: fraud investigations, economic damages, business valuations and expert testimony in state and federal courts.',
  },
  {
    type: 'standard',
    path: '/blog',
    label: 'Blog',
    defaultTitle: 'Forensic Accounting Blog & Insights | Engel & Engel',
    defaultDescription:
      'Practical guidance for litigators from the forensic accountants at Engel & Engel — evidence preservation, discovery, expert retention and damages analysis.',
  },
  {
    type: 'standard',
    path: '/events',
    label: 'Events',
    // Ported verbatim from the previous hard-coded metadata in events/page.tsx.
    defaultTitle: 'Upcoming Events | Engel & Engel - Forensic Accounting Conferences & Seminars',
    defaultDescription:
      'Meet Engel & Engel forensic accounting experts at upcoming legal conferences, CLE seminars, and industry events. Schedule a consultation with our expert witnesses at these events.',
  },
  {
    type: 'standard',
    path: '/news-and-insights',
    label: 'News & Insights',
    defaultTitle: 'News & Insights | Engel & Engel Forensic Accounting',
    defaultDescription:
      'Firm news, recognitions and commentary from Engel & Engel, including Forbes Top CPAs coverage and updates on forensic accounting and litigation support.',
  },
  {
    type: 'standard',
    path: '/privacy',
    label: 'Privacy Policy',
    defaultTitle: 'Privacy Policy | Engel & Engel',
    defaultDescription:
      'How Engel & Engel collects, uses and protects personal information submitted through this website and in the course of professional engagements.',
  },
  {
    type: 'standard',
    path: '/terms',
    label: 'Terms of Use',
    defaultTitle: 'Terms of Use | Engel & Engel',
    defaultDescription:
      'The terms and conditions governing your use of the Engel & Engel website, including acceptable use, intellectual property and limitation of liability.',
  },
  {
    type: 'standard',
    path: '/disclaimer',
    label: 'Disclaimer',
    defaultTitle: 'Disclaimer | Engel & Engel',
    defaultDescription:
      'Information on this site is provided for general purposes only and does not constitute accounting, tax or legal advice, nor create a client relationship.',
  },
  {
    type: 'standard',
    path: '/cookies',
    label: 'Cookie Policy',
    defaultTitle: 'Cookie Policy | Engel & Engel',
    defaultDescription:
      'How Engel & Engel uses cookies and similar technologies on this website, what they are used for, and how you can control them in your browser.',
  },

  // ─────────────────────────────────────────────────────────────
  // Practice Areas
  // ─────────────────────────────────────────────────────────────
  {
    type: 'practice-area',
    path: '/practice-areas',
    label: 'Practice Areas (index)',
    defaultTitle: 'Forensic Accounting Practice Areas | Engel & Engel',
    defaultDescription:
      'Explore the litigation practice areas served by Engel & Engel: economic damages, fraud investigation, business valuation, alter ego, bankruptcy and more.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/accounting-malpractice',
    label: 'Accounting Malpractice',
    defaultTitle: 'Accounting Malpractice Expert Witness | Engel & Engel',
    defaultDescription:
      'Engel & Engel evaluates breaches of professional accounting standards and quantifies resulting damages in accounting malpractice litigation in Los Angeles.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/alter-ego',
    label: 'Alter Ego',
    defaultTitle: 'Alter Ego Forensic Accounting Experts | Engel & Engel',
    defaultDescription:
      'Forensic analysis of commingling, undercapitalization and alter ego factors used to pierce the corporate veil. Court-tested expert testimony from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/bankruptcy-insolvency',
    label: 'Bankruptcy & Insolvency',
    defaultTitle: 'Bankruptcy & Insolvency Forensic Experts | Engel & Engel',
    defaultDescription:
      'Solvency analyses, preference and avoidance actions, and bankruptcy court testimony from Engel & Engel, a Los Angeles forensic accounting firm.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/business-interruption',
    label: 'Business Interruption',
    defaultTitle: 'Business Interruption Loss Experts | Engel & Engel',
    defaultDescription:
      'Quantifying lost income, extra expense and period of restoration in business interruption claims and disputes. Expert witness services from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/business-valuation',
    label: 'Business Valuation',
    defaultTitle: 'Business Valuation Experts Los Angeles | Engel & Engel',
    defaultDescription:
      'Certified business valuation for litigation, shareholder disputes and marital dissolution. Engel & Engel delivers valuations that withstand court scrutiny.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/construction-litigation',
    label: 'Construction Litigation',
    defaultTitle: 'Construction Litigation Damages Experts | Engel & Engel',
    defaultDescription:
      'Delay claims, cost overruns, change orders and construction damages analysis for plaintiffs and defendants. Forensic accounting from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/defamation',
    label: 'Defamation Litigation',
    defaultTitle: 'Defamation Damages Expert Witness | Engel & Engel',
    defaultDescription:
      'Measuring reputational harm, lost profits and lost goodwill in defamation and trade libel litigation. Expert testimony from Engel & Engel, Los Angeles.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/economic-damages',
    label: 'Economic Damages',
    defaultTitle: 'Economic Damages Experts Los Angeles | Engel & Engel',
    defaultDescription:
      'Lost profits, contract, fraud and reliance damages quantified for complex business litigation. Engel & Engel has testified in over 100 cases.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/employment-litigation',
    label: 'Employment Litigation',
    defaultTitle: 'Employment Litigation Damages Experts | Engel & Engel',
    defaultDescription:
      'Wrongful termination, discrimination and wage claim damages calculations, including front pay, back pay and mitigation analysis, from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/fraud-investigation',
    label: 'Fraud Investigation',
    defaultTitle: 'Fraud Investigation Experts Los Angeles | Engel & Engel',
    defaultDescription:
      'Certified fraud examiners tracing hidden transactions, embezzlement and asset misappropriation. Engel & Engel builds findings that hold up in court.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/fraudulent-transfers',
    label: 'Fraudulent Transfers',
    defaultTitle: 'Fraudulent Transfer Analysis Experts | Engel & Engel',
    defaultDescription:
      'Badges of fraud, reasonably equivalent value and solvency testing in fraudulent transfer and voidable transaction matters. Engel & Engel, Los Angeles.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/ip-litigation',
    label: 'IP Litigation',
    defaultTitle: 'IP Litigation Damages Experts | Engel & Engel',
    defaultDescription:
      'Patent, trademark, trade secret and copyright infringement damages: lost profits, reasonable royalty and unjust enrichment analysis from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/partnership-disputes',
    label: 'Partnership & Shareholder Disputes',
    defaultTitle: 'Partnership & Shareholder Dispute Experts | Engel & Engel',
    defaultDescription:
      'Accountings, buyout valuations and distribution analysis in partnership, LLC and shareholder disputes. Forensic accounting experts at Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/personal-injury',
    label: 'Personal Injury',
    defaultTitle: 'Personal Injury Economic Damages Experts | Engel & Engel',
    defaultDescription:
      'Lost earnings, lost earning capacity and life care cost analysis for personal injury and wrongful death claims. Expert testimony from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/real-estate-litigation',
    label: 'Real Estate Litigation',
    defaultTitle: 'Real Estate Litigation Damages Experts | Engel & Engel',
    defaultDescription:
      'Partnership accountings, development cost analysis and lost profits in real estate disputes. Los Angeles forensic accounting from Engel & Engel.',
  },
  {
    type: 'practice-area',
    path: '/practice-areas/trust-probate-litigation',
    label: 'Trust/Probate Litigation',
    defaultTitle: 'Trust & Probate Litigation Experts | Engel & Engel',
    defaultDescription:
      'Fiduciary accountings, trust asset tracing and breach of duty analysis in trust and probate litigation. Expert witness services from Engel & Engel.',
  },

  // ─────────────────────────────────────────────────────────────
  // Services
  // ─────────────────────────────────────────────────────────────
  {
    type: 'service',
    path: '/services/forensic-accounting',
    label: 'Forensic Accounting',
    defaultTitle: 'Forensic Accounting Services Los Angeles | Engel & Engel',
    defaultDescription:
      'For 30+ years Engel & Engel has provided high-level forensic accounting to top law firms, public corporations and private companies in complex litigation.',
  },
  {
    type: 'service',
    path: '/services/expert-witness-testimony',
    label: 'Expert Witness Testimony',
    defaultTitle: 'Expert Witness Testimony Services | Engel & Engel',
    defaultDescription:
      'Engel & Engel has provided expert testimony in over 100 cases for plaintiffs and defendants in state, federal and bankruptcy courts across the country.',
  },
  {
    type: 'service',
    path: '/services/internal-investigations',
    label: 'Internal Investigations',
    defaultTitle: 'Internal Forensic Investigations | Engel & Engel',
    defaultDescription:
      'Confidential internal forensic investigations for companies, HOAs, families and government agencies — uncovering irregularities and quantifying the impact.',
  },
  {
    type: 'service',
    path: '/services/joint-retention-program',
    label: 'Joint Retention Program',
    defaultTitle: 'Joint Retention Program | Engel & Engel',
    defaultDescription:
      'A cost-effective alternative to duelling experts: Engel & Engel is jointly retained to resolve disputed financial issues and move parties toward settlement.',
  },

  // ─────────────────────────────────────────────────────────────
  // Publications
  // ─────────────────────────────────────────────────────────────
  {
    type: 'publication',
    path: '/publications',
    label: 'Publications (index)',
    defaultTitle: 'Forensic Accounting Research Publications | Engel & Engel',
    defaultDescription:
      'Browse 20 research publications by Engel & Engel on economic damages, alter ego, fraudulent transfers, expert testimony, business valuation and more.',
  },
  {
    type: 'publication',
    path: '/publications/alter-ego',
    label: 'Alter Ego Publications',
    defaultTitle: 'Alter Ego Research Publications | Engel & Engel',
    defaultDescription:
      'Research publications on the investigation and discovery of alter ego factors and the element of undercapitalization, by Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/business-valuation',
    label: 'Business Valuation Publications',
    defaultTitle: 'Business Valuation Research Publications | Engel & Engel',
    defaultDescription:
      'Research publications on business valuation methodology and its application in litigation, written by the forensic accountants at Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/deposition-outline',
    label: 'Deposition Outline Publications',
    defaultTitle: 'Deposition Outline for Financial Experts | Engel & Engel',
    defaultDescription:
      'A research publication offering attorneys a structured deposition outline for examining opposing financial and accounting experts. From Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/document-request',
    label: 'Document Request Publications',
    defaultTitle: 'Document Request Publication for Attorneys | Engel & Engel',
    defaultDescription:
      'Document Request for Accounting & Business Records — a research publication helping litigators request the financial records that matter. Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/economic-damages',
    label: 'Economic Damages Publications',
    defaultTitle: 'Economic Damages Research Publications | Engel & Engel',
    defaultDescription:
      'Six research publications on economic damages, lost profits and the admissibility of financial records as evidence, authored by Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/employment-damages',
    label: 'Employment Damages Publications',
    defaultTitle: 'Employment Damages Research Publications | Engel & Engel',
    defaultDescription:
      'Research publication on calculating employment damages, including back pay, front pay and mitigation, from the experts at Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/expert-testimony',
    label: 'Expert Testimony Publications',
    defaultTitle: 'Expert Testimony Research Publications | Engel & Engel',
    defaultDescription:
      'Research publications on the role, admissibility and effective presentation of financial expert testimony at trial. Written by Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/fraudulent-transfers',
    label: 'Fraudulent Transfers Publications',
    defaultTitle: 'Fraudulent Transfer Research Publications | Engel & Engel',
    defaultDescription:
      'Four research publications on fraudulent transfers, badges of fraud and solvency analysis, authored by the forensic accountants at Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/infringement-damages',
    label: 'Infringement Damages Publications',
    defaultTitle: 'IP Infringement Damages Publications | Engel & Engel',
    defaultDescription:
      'Research publications on measuring intellectual property infringement damages, including lost profits and reasonable royalty. From Engel & Engel.',
  },
  {
    type: 'publication',
    path: '/publications/request',
    label: 'Request a Publication',
    defaultTitle: 'Request a Research Publication | Engel & Engel',
    defaultDescription:
      'Request a complimentary copy of any Engel & Engel research publication on forensic accounting, economic damages and expert witness topics.',
  },

  // ─────────────────────────────────────────────────────────────
  // Team members
  // ─────────────────────────────────────────────────────────────
  {
    type: 'team',
    path: '/team/jason-a-engel',
    label: 'Jason A. Engel',
    defaultTitle: 'Jason A. Engel, CPA, CFE, CVA, ABV | Engel & Engel',
    defaultDescription:
      'Jason A. Engel is Managing Partner of Engel & Engel: 45+ years in forensic accounting, fraud examination and valuation, with testimony in 100+ cases.',
  },
  {
    type: 'team',
    path: '/team/brandon-j-engel',
    label: 'Brandon J. Engel',
    defaultTitle: 'Brandon J. Engel, CPA, CFE, ABV | Engel & Engel',
    defaultDescription:
      'Brandon J. Engel is a partner at Engel & Engel specialising in forensic accounting, fraud investigation, alter ego analysis and business valuation.',
  },
  {
    type: 'team',
    path: '/team/douglas-h-engel',
    label: 'Douglas H. Engel',
    defaultTitle: 'Douglas H. Engel, CPA, MBA | Engel & Engel',
    defaultDescription:
      'Douglas H. Engel is a partner at Engel & Engel, bringing decades of forensic accounting, economic damages and litigation support experience to complex disputes.',
  },

  // ─────────────────────────────────────────────────────────────
  // Resources
  // ─────────────────────────────────────────────────────────────
  {
    type: 'resource',
    path: '/resources',
    label: 'Resources (index)',
    // Ported verbatim from the previous hard-coded resources/layout.tsx.
    defaultTitle: 'Forensic Accounting Resources | Expert Guides & Tools | Engel & Engel',
    defaultDescription:
      'Free forensic accounting resources, guides, calculators, and expert insights for legal professionals. 35+ years of expertise from Los Angeles CPA experts.',
  },
  {
    type: 'resource',
    path: '/resources/lost-profits-calculator',
    label: 'Lost Profits Calculator',
    defaultTitle: 'Lost Profits Calculator | Engel & Engel',
    defaultDescription:
      'Free lost profits calculator for estimating economic damages from business interruption or interference, from the forensic accountants at Engel & Engel.',
  },
  {
    type: 'resource',
    path: '/resources/present-value-calculator',
    label: 'Present Value Calculator',
    defaultTitle: 'Present Value Calculator | Engel & Engel',
    defaultDescription:
      'Free present value calculator for discounting future cash flows in damages analysis and investment review. A litigation support tool from Engel & Engel.',
  },
  {
    type: 'resource',
    path: '/resources/employment-damages-calculator',
    label: 'Employment Damages Calculator',
    defaultTitle: 'Employment Damages Calculator | Engel & Engel',
    defaultDescription:
      'Free employment damages calculator covering back pay, front pay and mitigation for wrongful termination and discrimination claims. From Engel & Engel.',
  },
  {
    type: 'resource',
    path: '/resources/compound-annual-growth-rate-calculator',
    label: 'CAGR Calculator',
    defaultTitle: 'CAGR Calculator - Annual Growth Rate | Engel & Engel',
    defaultDescription:
      'Free compound annual growth rate (CAGR) calculator for measuring business and investment performance over time. A free tool from Engel & Engel.',
  },
]

export const SEO_PAGES: SeoPage[] = [...STATIC_SEO_PAGES, ...BLOG_POST_PAGES, ...EVENT_PAGES]

const BY_PATH = new Map(SEO_PAGES.map(p => [p.path, p]))

export function getSeoPage(path: string): SeoPage | undefined {
  return BY_PATH.get(path)
}

export function isManagedSeoPath(path: string): boolean {
  return BY_PATH.has(path)
}
