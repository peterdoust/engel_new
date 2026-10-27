// Event content, extracted from src/app/events/[slug]/page.tsx so that the SEO
// registry (src/lib/seoPages.ts) can derive per-event defaults without importing a
// page module, which would create a circular import.

export const eventsData: { [key: string]: any } = {
  'california-state-bar-annual-meeting-2025': {
    title: 'California State Bar Annual Meeting 2025',
    date: '2025-10-15',
    endDate: '2025-10-17',
    time: '9:00 AM - 5:00 PM',
    location: 'San Diego Convention Center',
    address: '111 W Harbor Dr, San Diego, CA 92101',
    type: 'Conference',
    category: 'Legal Conference',
    description: 'Join us at the California State Bar Annual Meeting where our forensic accounting experts will be available for consultations and networking.',
    fullDescription: `
      <p>The California State Bar Annual Meeting is the premier gathering of legal professionals in California. Engel & Engel will be exhibiting and available for one-on-one consultations about forensic accounting, expert witness testimony, and litigation support services.</p>
      
      <h2>What to Expect</h2>
      <p>Our team of experienced forensic accountants will be on-site to discuss:</p>
      <ul>
        <li>Complex litigation support and damages calculation</li>
        <li>Expert witness testimony preparation and strategies</li>
        <li>Fraud investigation and forensic analysis</li>
        <li>Business valuation for litigation purposes</li>
        <li>Economic damages in various practice areas</li>
      </ul>

      <h2>Schedule a Meeting</h2>
      <p>We encourage attorneys to schedule advance meetings with our experts during the conference. Contact us at (310) 277-2220 or events@engelandengel.com to reserve your consultation time.</p>

      <h2>Conference Highlights</h2>
      <p>The California State Bar Annual Meeting features:</p>
      <ul>
        <li>CLE sessions on cutting-edge legal topics</li>
        <li>Networking opportunities with California's top attorneys</li>
        <li>Exhibit hall with legal service providers and technology vendors</li>
        <li>Keynote speakers from the judiciary and legal profession</li>
      </ul>

      <h2>Why Meet with Engel & Engel?</h2>
      <p>With  30+ years of experience in forensic accounting and expert witness testimony, Engel & Engel has helped attorneys secure favorable outcomes in thousands of complex litigation matters. Our experts have testified in federal and state courts across California and nationwide.</p>
    `,
    booth: 'Booth #245',
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Forensic Accounting in Complex Litigation', 'Expert Witness Best Practices', 'Fraud Investigation Techniques'],
    registrationUrl: 'https://www.calbar.ca.gov/annual-meeting',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    venue: {
      name: 'San Diego Convention Center',
      address: '111 W Harbor Dr, San Diego, CA 92101',
      phone: '(619) 525-5000',
      website: 'https://www.visitsandiego.com/convention-center',
      parking: 'Parking available at the convention center and nearby lots',
      publicTransit: 'Accessible via San Diego Trolley - Convention Center Station',
    },
    schedule: [
      { time: '9:00 AM - 10:30 AM', activity: 'Registration & Exhibit Hall Opens' },
      { time: '10:30 AM - 12:00 PM', activity: 'Morning CLE Sessions' },
      { time: '12:00 PM - 1:30 PM', activity: 'Networking Lunch' },
      { time: '1:30 PM - 3:00 PM', activity: 'Afternoon CLE Sessions' },
      { time: '3:00 PM - 5:00 PM', activity: 'Exhibit Hall & Networking' },
    ],
  },
  'lacba-litigation-section-meeting-2025': {
    title: 'Los Angeles County Bar Association - Litigation Section Meeting',
    date: '2025-11-08',
    endDate: '2025-11-08',
    time: '12:00 PM - 2:00 PM',
    location: 'LACBA Conference Center',
    address: '1055 W 7th St, Los Angeles, CA 90017',
    type: 'Seminar',
    category: 'CLE Seminar',
    description: 'Brandon Engel will present on "Maximizing Damages Recovery with Forensic Accounting Evidence" - 1.5 CLE Credits available.',
    fullDescription: `
      <p>Join Brandon Engel, CPA, CFE, ABV for an interactive CLE seminar focused on leveraging forensic accounting evidence to maximize damages recovery in complex litigation. This presentation will cover real-world case studies and practical strategies for working with forensic accounting experts.</p>

      <h2>CLE Program Details</h2>
      <p>This 1.5-hour CLE program qualifies for 1.5 general CLE credits and will cover:</p>
      <ul>
        <li>Damages calculation methodologies in various litigation contexts</li>
        <li>Best practices for working with forensic accounting experts</li>
        <li>Evidence preservation and documentation strategies</li>
        <li>Effective presentation of financial evidence to judges and juries</li>
        <li>Common pitfalls to avoid in damages claims</li>
      </ul>

      <h2>About the Speaker</h2>
      <p>Brandon Engel, CPA, CFE, ABV is a partner at Engel & Engel LLP With  30+ years of experience in forensic accounting and expert witness testimony. He has testified in hundreds of cases involving fraud, economic damages, business valuation, and financial disputes.</p>

      <h2>Who Should Attend</h2>
      <p>This seminar is ideal for:</p>
      <ul>
        <li>Litigation attorneys handling complex financial disputes</li>
        <li>Trial lawyers seeking to strengthen damages claims</li>
        <li>In-house counsel managing litigation matters</li>
        <li>Attorneys new to working with forensic accounting experts</li>
      </ul>

      <h2>Registration Information</h2>
      <p>Registration includes the CLE presentation, course materials, and networking lunch. Space is limited, so early registration is recommended.</p>
    `,
    booth: null,
    speakers: ['Brandon Engel, CPA, CFE, ABV'],
    topics: ['Damages Calculation Methodologies', 'Working with Expert Witnesses', 'Evidence Preservation Strategies'],
    registrationUrl: 'https://www.lacba.org/events',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    cleCredits: '1.5 CLE Credits',
    venue: {
      name: 'LACBA Conference Center',
      address: '1055 W 7th St, Los Angeles, CA 90017',
      phone: '(213) 627-2727',
      website: 'https://www.lacba.org',
      parking: 'Parking available in the building garage',
      publicTransit: 'Metro 7th Street/Metro Center Station',
    },
  },
  'acfe-global-fraud-conference-2025': {
    title: 'Association of Certified Fraud Examiners (ACFE) Global Fraud Conference',
    date: '2025-12-05',
    endDate: '2025-12-07',
    time: '8:00 AM - 6:00 PM',
    location: 'Las Vegas Convention Center',
    address: '3150 Paradise Rd, Las Vegas, NV 89109',
    type: 'Conference',
    category: 'Fraud Investigation',
    description: 'Meet our fraud investigation experts at the world\'s largest anti-fraud conference. Visit our booth for insights on forensic accounting and fraud detection.',
    fullDescription: `
      <p>The ACFE Global Fraud Conference brings together fraud examiners, forensic accountants, and anti-fraud professionals from around the world. Engel & Engel will be exhibiting and presenting on advanced fraud investigation techniques.</p>
      <h2>Conference Overview</h2>
      <p>The ACFE Global Fraud Conference is the premier event for anti-fraud professionals.</p>
    `,
    booth: 'Booth #512',
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Embezzlement Detection', 'Financial Statement Fraud', 'Digital Forensics in Fraud Cases'],
    registrationUrl: 'https://www.acfe.com/fraud-conference',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    venue: {
      name: 'Las Vegas Convention Center',
      address: '3150 Paradise Rd, Las Vegas, NV 89109',
      phone: '(702) 892-0711',
      website: 'https://www.lvcva.com',
      parking: 'Ample parking available at the convention center',
      publicTransit: 'Las Vegas Monorail - Convention Center Station',
    },
  },
  'aba-litigation-conference-2026': {
    title: 'ABA Section of Litigation Annual Conference',
    date: '2026-04-22',
    endDate: '2026-04-24',
    time: '8:30 AM - 5:30 PM',
    location: 'Marriott Marquis, Washington D.C.',
    address: '901 Massachusetts Ave NW, Washington, DC 20001',
    type: 'Conference',
    category: 'Legal Symposium',
    description: 'Engage with our experts at the ABA Litigation Conference in Washington D.C.',
    fullDescription: `<p>The ABA Section of Litigation Annual Conference is the premier event for litigators.</p>`,
    booth: 'Table #12',
    speakers: ['David Engel, CPA, CFE'],
    topics: ['Federal Court Expert Testimony', 'Calculating Complex Business Interruption Losses'],
    registrationUrl: 'https://www.americanbar.org/groups/litigation/events-cle/',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    venue: {
      name: 'Marriott Marquis, Washington D.C.',
      address: '901 Massachusetts Ave NW, Washington, DC 20001',
    }
  },
  'northern-california-fraud-symposium-2026': {
    title: 'Northern California Fraud Symposium',
    date: '2026-02-12',
    endDate: '2026-02-12',
    time: '9:00 AM - 4:00 PM',
    location: 'Palace Hotel, San Francisco',
    address: '2 New Montgomery St, San Francisco, CA 94105',
    type: 'Symposium',
    category: 'Fraud Detection',
    description: 'A focused deep-dive into corporate embezzlement and internal control failures.',
    fullDescription: `<p>The Northern California Fraud Symposium brings together top investigators and forensic accountants.</p>`,
    speakers: ['Brandon Engel, CPA, CFE, ABV'],
    topics: ['Embezzlement Case Studies', 'Modern Forensic Data Analytics'],
    registrationUrl: 'https://acfe-sf.org/symposium',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    venue: {
      name: 'Palace Hotel, San Francisco',
      address: '2 New Montgomery St, San Francisco, CA 94105',
    }
  },
  'oc-business-litigation-seminar-2026': {
    title: 'Orange County Business Litigation Seminar',
    date: '2026-03-15',
    endDate: '2026-03-15',
    time: '11:30 AM - 1:30 PM',
    location: 'The Pacific Club, Newport Beach',
    address: '4110 MacArthur Blvd, Newport Beach, CA 92660',
    type: 'Seminar',
    category: 'Professional Seminar',
    description: 'Join us for a lunch seminar on business valuation in shareholder disputes.',
    fullDescription: `<p>This seminar provides practical insights into the valuation methodologies used in Southern California courts.</p>`,
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Business Valuation Standards', 'Shareholder Buy-out Calculations'],
    registrationUrl: 'https://ocbar.org/events',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    venue: {
      name: 'The Pacific Club, Newport Beach',
      address: '4110 MacArthur Blvd, Newport Beach, CA 92660',
    }
  },
}
