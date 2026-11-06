'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamSidebar from '@/components/team/TeamSidebar';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink';

// ────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────

interface ContentSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
}

interface Stat {
  value: string;
  label: string;
}

interface TeamMember {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  experience: string;
  phone: string;
  directPhone?: string;
  extension?: string;
  email: string;
  linkedin?: string;
  image: string;
  pdfQualifications: string;
  credentialChips: string[];
  stats: Stat[];
  sections: ContentSection[];
  practiceAreas: { name: string; slug: string }[];
}

// ────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────

const teamMembers: TeamMember[] = [
  {
    slug: 'jason-a-engel',
    name: 'Jason A. Engel',
    credentials: 'CPA, CFE, CIRA, CVA, MAFF, ABV',
    title: 'Managing Partner',
    experience: '45+ Years',
    phone: '(310) 277-2220',
    directPhone: '(310) 277-5986',
    email: 'jasonengel@engelandengel.com',
    linkedin: 'jasonengel',
    image: '/images/team/jason-engel.jpg',
    pdfQualifications: '/images/jason-engel-cv.pdf',
    credentialChips: [
      'Certified Public Accountant',
      'Certified Fraud Examiner',
      'Certified Insolvency & Restructuring Advisor',
      'Certified Valuation Analyst',
      'Master Analyst of Financial Forensics',
      'Accredited in Business Valuation',
    ],
    stats: [
      { value: '500+', label: 'Cases as Expert Witness' },
      { value: '45+', label: 'Years in Public Accounting' },
      { value: '100+', label: 'Business Valuations Conducted' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Mr. Engel is a Certified Public Accountant and has been engaged in the practice of public accounting since 1979. His public accounting experience includes auditing, taxation, management consulting, SEC registration, and SEC reporting for public companies. His professional background includes experience at two of the Big Four accounting firms where he was a Senior Manager in both the Audit Practice and Management Consulting Practice.',
        ],
      },
      {
        id: 'expert-witness',
        title: 'Expert Witness and Forensic Accounting',
        paragraphs: [
          'Since 1982, Mr. Engel has been engaged in the practice of forensic accounting and expert testimony in connection with a variety of business litigation matters including economic damages, bankruptcy and insolvency, fraud and embezzlement, business valuation, alter ego, wrongful termination, net worth calculations, and partnership and shareholder dissolutions. He has also been engaged in accounting malpractice and other matters requiring an evaluation of financial statements and compliance with Generally Accepted Accounting Principles and Generally Accepted Auditing Standards. He has made various presentations and has published research publications on the subject of economic damages, lost profits, alter ego, bankruptcy and insolvency, and other forensic accounting topics.',
          'Mr. Engel has served as an expert witness in over 500 cases and has testified in federal, bankruptcy, and state courts. He has also testified in arbitration and has served as a court appointed accounting referee. His professional credentials include those of Certified Public Accountant (CPA), Certified Fraud Examiner (CFE), Certified Insolvency and Restructuring Advisor (CIRA), Certified Valuation Analyst (CVA), Master Analyst of Financial Forensics (MAFF), and Accredited in Business Valuation (ABV).',
        ],
      },
      {
        id: 'economic-damages',
        title: 'Economic Damages',
        paragraphs: [
          'Mr. Engel has extensive experience and expertise in investigating and developing economic damage calculations and providing expert testimony in connection with a wide variety of business litigation matters. He has earned the credential of a Master Analyst of Financial Forensics (MAFF) and has written various research publications on the subject of economic damages, lost profits, infringement damages, alter ego, and other business litigation topics.',
          'His experience and expertise include investigating and calculating economic damages in connection with lost profits, lost goodwill, lost business value, contract damages, patent infringement, trademark infringement, copyright infringement, compensatory damages, consequential damages, lost earnings, reliance damages, construction delay damages, environmental and contamination damages, unfair business competition, misappropriation of trade secrets, and lost opportunity damages. His experience and expertise also include investigating and providing expert testimony as to the elements of alter ego and fraudulent transfers.',
        ],
      },
      {
        id: 'financial-fraud',
        title: 'Financial Fraud',
        paragraphs: [
          'Mr. Engel is a Certified Fraud Examiner (CFE) and has extensive experience and expertise in investigating, detecting, and uncovering financial fraud and embezzlement. His fraud expertise includes skilled knowledge and application of specialized investigatory techniques designed to detect fraud, embezzlement, and fraudulent and misleading financial statements.',
          'Mr. Engel has provided expert testimony in connection with a variety of fraud related engagements. He has experience in conducting fraud investigations in connection with civil and criminal white collar fraud, corporate and employee embezzlement, Ponzi schemes, lapping schemes, securities fraud, insurance fraud, contract fraud, misappropriation of funds, and fraudulent and misleading financial statements.',
        ],
      },
      {
        id: 'business-valuation',
        title: 'Business Valuation',
        paragraphs: [
          'Mr. Engel is a Certified Valuation Analyst (CVA) and Accredited in Business Valuation (ABV). He has conducted in excess of 100 business valuations. His experience includes performing business valuations in a wide variety of industries including manufacturing, wholesale, construction, insurance, healthcare, distributorship, retail establishments, real estate agencies, service enterprises, import and export, franchises, and a variety of professional practices including medical, dental, accounting, and law.',
          'He has conducted business valuations in connection with economic damages, bankruptcy and insolvency, mergers and acquisitions, fraudulent transfers, minority shareholder valuations, net worth calculations, and marital, corporate, and partnership dissolutions. He has also assisted counsel in evaluating and defending a $4.2 billion hostile takeover of a national insurance company.',
        ],
      },
      {
        id: 'bankruptcy',
        title: 'Bankruptcy and Insolvency',
        paragraphs: [
          'Mr. Engel is a Certified Insolvency and Restructuring Advisor (CIRA). His experience in bankruptcy and insolvency includes court appointments by the United States Bankruptcy Court as the accountant for debtors, creditors, and Trustees under both Chapters 7 and 11 of the United States Bankruptcy Code. He also served as an accounting expert for a United States Bankruptcy Judge.',
          'Mr. Engel has testified as an expert witness in United States Bankruptcy Courts in a variety of bankruptcy issues. His bankruptcy and insolvency experience and expertise includes investigating, analyzing, and testifying as to the elements of a fraudulent transfer including reasonable equivalent value, insolvency, unreasonable small assets, and inability to pay debts as they become due. In addition, Mr. Engel\'s experience and expertise includes preference analysis, liquidation analysis, analysis of adequate protection, preparation and analysis of reorganization plans, preparation and analysis of Interim Statements and Operating Reports, financial projections, business valuations, crisis management, and fraud investigations of insiders and officers.',
          'Mr. Engel has written various research publications on the subject of bankruptcy and insolvency. He has completed a course in the study of Business Reorganization under the Bankruptcy Reform Act sponsored by the University of Southern California Law Center.',
        ],
      },
      {
        id: 'education',
        title: 'Education, Certifications and Memberships',
        paragraphs: [
          'Mr. Engel earned, in 1979, a Bachelor of Science in Business Administration with a specialty in accounting from California State University, Northridge. In 1982, he attained his CPA credentials and in 1992, he attained his CFE credentials. He attained his CVA and CIRA credentials in 1996 and his CFFA (now known as MAFF) credentials in 2003.',
          'He is a member of the California Society of Certified Public Accountants, the American Institute of Certified Public Accountants, the Management Consulting Section of the American Institute of Certified Public Accountants, the National Association of Certified Fraud Examiners, the Association of Insolvency and Restructuring Advisors, and the National Association of Certified Valuation Analysts.',
        ],
      },
    ],
    practiceAreas: [
      { name: 'Fraud Investigations', slug: 'fraud-investigation' },
      { name: 'Economic Damage Calculations', slug: 'economic-damages' },
      { name: 'Business Valuations', slug: 'business-valuation' },
      { name: 'Bankruptcy and Insolvency', slug: 'bankruptcy-insolvency' },
      { name: 'Alter Ego', slug: 'alter-ego' },
      { name: 'Fraudulent Transfers', slug: 'fraudulent-transfers' },
      { name: 'Business Interruption', slug: 'business-interruption' },
      { name: 'Intellectual Property Litigation', slug: 'ip-litigation' },
      { name: 'Real Estate Litigation', slug: 'real-estate-litigation' },
      { name: 'Construction Litigation', slug: 'construction-litigation' },
      { name: 'Employment Litigation', slug: 'employment-litigation' },
      { name: 'Personal Injury', slug: 'personal-injury' },
      { name: 'Partnership / Shareholder Disputes', slug: 'partnership-disputes' },
    ],
  },
  {
    slug: 'brandon-j-engel',
    name: 'Brandon J. Engel',
    credentials: 'CPA, CFE, ABV',
    title: 'Partner & Forensic Accountant',
    experience: '10+ Years',
    phone: '(310) 277-2220',
    extension: 'Ext. 3',
    directPhone: '(310) 579-0115',
    email: 'brandon@engelandengel.com',
    linkedin: 'brandon-engel',
    image: '/images/team/brandon-engel.jpg',
    pdfQualifications: '/images/brandon-engel-cv-rev2.pdf',
    credentialChips: [
      'Certified Public Accountant',
      'Certified Fraud Examiner',
      'Accredited in Business Valuation',
    ],
    stats: [
      { value: '200+', label: 'Forensic Accounting Cases' },
      { value: '50+', label: 'Fraud Investigations' },
      { value: '100+', label: 'Economic Damage Calculations' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Brandon J. Engel, CPA, CFE, ABV is a forensic accountant with over 10 years of experience in over 200 forensic accounting cases and has testified as an expert witness in state court, federal court, arbitration, and deposition. Brandon’s forensic experience includes conducting financial investigations in connection with civil and criminal matters. Brandon has provided the following forensic accounting services to top law firms, private and public companies, non-profits, government agencies, and local police departments:',
          'Brandon’s experience and expertise is highlighted in his skills and ability to investigate financial records and uncover discrepancies, hidden transactions, misstatements, fraud, and misappropriations. As a Certified Fraud Examiner (CFE) and Accredited in Business Valuation (ABV), Brandon possesses specialized knowledge in investigating a variety of complex financial fraud schemes including international money laundering, embezzlement, fraudulent transfers, alter ego, and misappropriation of assets. As a highly skilled forensic investigator, Brandon also has specialized knowledge and experience in tracing funds in accordance with established legal and financial principles.',
        ],
        items: [
          'Fraud Investigations',
          'Economic Damage Calculations',
          'Business Valuations',
          'Bankruptcy and Insolvency',
          'Alter Ego',
          'Fraudulent Transfers',
          'Business Interruption',
          'Intellectual Property Litigation',
          'Real Estate Litigation',
          'Probate/Trust Litigation',
          'Construction Litigation',
          'Employment Litigation',
          'Personal Injury',
          'Partnership/Shareholder Disputes',
        ],
      },
      {
        id: 'fraud-investigation',
        title: 'Fraud Investigation',
        paragraphs: [
          'Brandon has conducted over 50 fraud investigations involving a wide variety of fraudulent schemes. Brandon’s experience and expertise in conducting fraud investigations is illustrated in his tracing of approximately $20 million of fraudulent funds that were laundered through over 150 U.S., Swiss, and Korean bank accounts to real estate, luxury cars, and Swiss bank accounts. Brandon has also assisted a local Los Angeles police detective in uncovering and documenting financial fraud and embezzlement.',
          'Brandon’s experience includes conducting fraud investigations in connection with the following:',
        ],
        items: [
          'Misappropriation of Funds',
          'International Money Laundering',
          'Fraudulent & Misleading Financial Statements',
          'Contract Fraud',
          'Construction Fraud',
          'Insurance Fraud',
          'Securities Fraud',
          'Employee Embezzlement',
          'Bankruptcy Fraud',
          'Embezzlement Schemes',
          'Ponzi Schemes',
          'Tracing of Fraudulent Funds',
          'Real Estate Fraud',
          'Inventory Fraud',
        ],
      },
      {
        id: 'economic-damages',
        title: 'Economic Damages',
        paragraphs: [
          'Brandon has prepared over 100 economic damage calculations in a wide variety of litigation matters and industries. Brandon’s experience and expertise includes developing complex damage models that are consistent with established legal principles and able to withstand the scrutiny of the court. Brandon is also uniquely skilled in creating demonstrative graphs and charts for trial that are designed to make complex business transactions easily understandable.',
          'Brandon’s extensive forensic experience in calculating economic damages for both plaintiffs and defendants includes the following:',
        ],
        items: [
          'Lost Profits',
          'Contract Damages',
          'Fraud Damages',
          'Lost Goodwill',
          'Compensatory Damages',
          'Reliance Damages',
          'Benefit of the Bargain Damages',
          'IP Infringement Damages',
          'Construction Damages and Delay Claims',
          'Business Interruption Damages',
          'Unestablished Business Damages',
          'Out of Pocket Damages',
          'Mitigation Analysis',
          'Rescission Damages',
          'Reputational Damages',
          'Employment Damages',
          'Personal Injury Damages',
        ],
      },
      {
        id: 'business-valuation',
        title: 'Business Valuation',
        paragraphs: [
          'Brandon has been involved in a variety of business valuation engagements among a broad array of industries. Brandon’s business valuation expertise includes conducting various business valuation approaches including market analysis, capitalization of earnings, discounted cash flow, book value, liquidation value, public company guideline method, and other generally accepted valuation methods.',
          'Brandon’s experience includes business valuations in connection with the following:',
        ],
        items: [
          'Corporation Code 2000 Valuation',
          'Minority Shareholder Valuation',
          'Corporate Mergers & Acquisitions',
          'Corporate and Partnership Dissolutions',
          'Buyout Agreements',
          'Fair Value Solvency Analysis',
          'Net Worth Valuation',
          'Shareholder & Partnership Disputes',
          'Economic Damage Analysis',
          'Buy and Sell Agreements',
        ],
      },
      {
        id: 'bankruptcy',
        title: 'Bankruptcy and Insolvency',
        paragraphs: [
          'Brandon’s bankruptcy litigation experience covers a broad spectrum of bankruptcy matters. Specifically, in connection with bankruptcy fraudulent transfers, Brandon has extensive experience in tracing fraudulent funds applying a variety of tracing methods in accordance with established legal and financial principles.',
          'Brandon’s bankruptcy litigation experience includes a variety of engagements involving the following:',
        ],
        items: [
          'Bankruptcy Fraud Investigation',
          'Solvency Analysis',
          'Fraudulent Transfers',
          'Analysis of Undercapitalization',
          'Analysis or Reasonably Equivalent Value',
          'Preference Analysis',
          'Liquidation Analysis',
          'Fair Value and Fair Market Value Valuations',
          'Investigation of Hidden Distributions',
        ],
      },
      {
        id: 'education',
        title: 'Education, Certifications, and Professional Associations',
        paragraphs: [],
        items: [
          'Bachelor of Science in Accounting from California State University, Northridge',
          'Certified Public Accountant (CPA)',
          'Certified Fraud Examiner (CFE)',
          'Member of the American Institute of Certified Public Accountants (AICPA)',
          'Member of the Association of Certified Fraud Examiners (AFCE)',
          'Member of the California Society of CPAs',
        ],
      },
    ],
    practiceAreas: [
      { name: 'Fraud Investigations', slug: 'fraud-investigation' },
      { name: 'Economic Damage Calculations', slug: 'economic-damages' },
      { name: 'Business Valuations', slug: 'business-valuation' },
      { name: 'Bankruptcy and Insolvency', slug: 'bankruptcy-insolvency' },
      { name: 'Alter Ego', slug: 'alter-ego' },
      { name: 'Fraudulent Transfers', slug: 'fraudulent-transfers' },
      { name: 'Business Interruption', slug: 'business-interruption' },
      { name: 'Intellectual Property Litigation', slug: 'ip-litigation' },
      { name: 'Real Estate Litigation', slug: 'real-estate-litigation' },
      { name: 'Construction Litigation', slug: 'construction-litigation' },
      { name: 'Employment Litigation', slug: 'employment-litigation' },
      { name: 'Personal Injury', slug: 'personal-injury' },
      { name: 'Partnership / Shareholder Disputes', slug: 'partnership-disputes' },
    ],
  },
  {
    slug: 'douglas-h-engel',
    name: 'Douglas H. Engel',
    credentials: 'CPA, MBA',
    title: 'Tax & Business Consultant',
    experience: '45+ Years',
    phone: '(310) 277-2220',
    directPhone: '(818) 710-0071',
    email: 'douglas@engelandengel.com',
    linkedin: 'douglasengelcpa',
    image: '/images/team/douglas-engel.jpg',
    pdfQualifications: '',
    credentialChips: [
      'Certified Public Accountant',
      'Master of Business Administration',
    ],
    stats: [
      { value: '45+', label: 'Years in Public Accounting' },
      { value: 'MBA', label: 'Taxation Specialty' },
      { value: 'Expert', label: 'Tax Controversy Witness' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Mr. Douglas Engel has been engaged in public accounting since 1976, with an emphasis in tax and business consulting to high net worth individuals and related closely-held entities. In addition, he has provided forensic accounting services in connection with tax malpractice, tax issues in bankruptcy, tax issues in employee benefit plans and a variety of tax controversies.',
          'Mr. Engel’s tax experience extends to the areas of real estate, health care, partnerships, limited liability companies, trusts. sub-chapter S corporations and foreign trusts. In this regard, he has provided services that include tax planning, estate planning, wealth succession, business consulting, partnership restructuring and partnership workouts, IRS/FTB disputes and resolutions.',
          'Mr. Engel’s forensic tax experience includes tax services in bankruptcy matters for creditors, debtors, and trustees. In addition, he has been appointed by the court to act as a guardian of financial assets. He has also served as an expert witness in tax matters and related financial issues.',
          'Mr. Engel graduated from the City University of New York, Herbert H. Lehman College with a Bachelor of Science in Accounting. He also holds a Master of Business Administration in Taxation from Golden Gate University.',
          'He is a member of the California Society of Certified Public Accountants and the American Institute of Certified Public Accountants.',
        ],
      },
    ],
    practiceAreas: [
      { name: 'Real Estate Taxation', slug: 'real-estate-taxation' },
      { name: 'Estate Planning', slug: 'estate-planning' },
      { name: 'IRS and FTB Disputes', slug: 'irs-ftb-disputes' },
      { name: 'Tax Consulting', slug: 'tax-consulting' },
      { name: 'Litigation Support Services', slug: 'litigation-support' },
    ],
  },
];

// ────────────────────────────────────────────────────────
// Page Component
// ────────────────────────────────────────────────────────

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((m) => m.slug === params.slug);
  const heroRef = useRef(null);

  if (!member) {
    return <div>Member not found</div>;
  }

  // Build sidebar sections list (content sections + practice areas)
  const sidebarSections = [
    ...member.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: 'practice-areas', title: 'Practice Areas' },
  ];

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    worksFor: {
      '@type': 'Organization',
      name: 'Engel & Engel LLP',
    },
    email: member.email,
    telephone: member.phone,
    image: member.image,
    url: `https://engeldemo.vercel.app/team/${member.slug}`,
    sameAs: member.linkedin ? `https://www.linkedin.com/in/${member.linkedin}` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="bg-white min-h-screen text-slate-900">
        {/* ══════════ PREMIUM HERO SECTION ══════════ */}
        <section ref={heroRef} className="relative min-h-[500px] flex items-center pt-28 lg:pt-32 pb-12 overflow-hidden bg-[#1D2653]">
          {/* Architectural Background Elements */}
          <div className="absolute inset-0 z-0">
            {/* Main Cinematic Gradient matching Cases page */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1D2653] via-[#1D2653] to-[#1d2653]/20" />

            {/* Glowing Orbs similar to Cases page */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full opacity-50" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/5 blur-[100px] rounded-full opacity-50" />

            {/* Grid Lines - subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100%] opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100px] opacity-20" />
          </div>

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

              {/* Portrait with Frame Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative group mx-auto lg:mx-0 max-w-[420px] lg:max-w-none">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-2xl group-hover:border-[#D4AF37]/40 transition-colors duration-700" />
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-lg" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-lg" />

                  <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] bg-slate-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </motion.div>

              {/* Identity & Contact Column */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col"
                >
                  <div className="mb-4">
                    <div className="h-1 w-12 bg-[#D4AF37] mb-6 rounded-full" />
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-tight">
                      {member.name.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="font-serif italic font-medium">
                        {member.name.split(' ').slice(-1)}
                      </span>
                    </h1>
                  </div>

                  <p className="text-base md:text-lg text-[#D4AF37] font-semibold tracking-[0.2em] uppercase mb-10">
                    {member.credentials}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
                    <TrackedPhoneLink phone={member.phone} location="team_profile_office" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{member.phone}</div>
                      </div>
                    </TrackedPhoneLink>

                    {member.directPhone && (
                      <TrackedPhoneLink phone={member.directPhone} location="team_profile_direct" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">{member.directPhone}</div>
                        </div>
                      </TrackedPhoneLink>
                    )}

                    <a href={`mailto:${member.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-white font-medium truncate">{member.email}</div>
                      </div>
                    </a>

                    {member.linkedin && (
                      <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">{member.linkedin}</div>
                        </div>
                      </a>
                    )}
                  </div>

                  {member.pdfQualifications && (
                    <div className="flex justify-center mt-8">
                      <a href={member.pdfQualifications} target="_blank" rel="noopener noreferrer"
                        className="px-12 py-5 bg-[#D4AF37] text-[#293995] rounded-xl font-black uppercase tracking-wider hover:bg-[#B8962D] transition-all duration-300 shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:-translate-y-1 text-center">
                        View {member.name.split(' ')[0]}&apos;s Professional Qualifications
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CONTENT BODY ══════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 pt-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar (sticky, desktop only) */}
            <TeamSidebar sections={sidebarSections} phone={member.phone} />

            {/* Content Body */}
            <div className="flex-1 min-w-0">
              {/* Content Sections */}
              {member.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-[6rem]">
                  <h2 className="relative text-2xl font-semibold text-primary-950 mb-6 group inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#293995] to-transparent transition-all duration-500 group-hover:w-full" />
                  </h2>
                  <div className="space-y-5 text-base leading-relaxed text-gray-600">
                    {(() => {
                      const itemsInsertIndex = section.items?.length
                        ? section.paragraphs.findIndex((p) => p.endsWith(':')) + 1 || section.paragraphs.length
                        : -1;

                      return section.paragraphs.map((paragraph, i) => (
                        <div key={i}>
                          <p>{paragraph}</p>
                          {i + 1 === itemsInsertIndex && section.items && (
                            <ul className={`mt-6 mb-5 gap-x-10 gap-y-2 ${section.items.length > 5 && section.id !== 'education' ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'}`}>
                              {section.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-base text-gray-800">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#293995] flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ));
                    })()}
                    {section.items && section.items.length > 0 && section.paragraphs.length === 0 && (
                      <ul className={`gap-x-10 gap-y-2 ${section.items.length > 5 && section.id !== 'education' ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'}`}>
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-base text-gray-800">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#293995] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}

              {/* Practice Areas */}
              <section id="practice-areas" className="scroll-mt-[6rem]">
                <h2 className="relative text-2xl font-semibold text-primary-950 mb-6 group inline-block">
                  Practice Areas
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#293995] to-transparent transition-all duration-500 group-hover:w-full" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {member.practiceAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/practice-areas/${area.slug}`}
                      className="group flex items-center gap-3 py-2.5 border-b border-gray-200 hover:border-primary-950 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-primary-950 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-800 group-hover:text-primary-950 transition-all -ml-7 group-hover:ml-0">
                        {area.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
