'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cases = [
  {
    title: 'Misappropriation of Trade Secrets',
    result: 'Jury Award of $2.3 Billion',
    description: 'Testified for plaintiff in a jury trial regarding damages suffered by a Fortune 500 medical device corporation that alleged misappropriation of trade secrets. Expert testimony included analysis and opinions relating to lost profits, lost goodwill, unjust enrichment, and valuation of the corporation including valuation of goodwill and trade secrets. Damage analysis included plaintiff\'s U.S. and international market share and damages to market share due to the misappropriation of trade secrets. Jury awarded plaintiff $2.3 billion.',
  },
  {
    title: 'Breach of Distributorship Agreement',
    result: 'Jury Award of $12 Million',
    description: 'Testified as to economic damages in a jury trial on behalf of plaintiff. Plaintiff, a distributor of hi-tech boring and metal cutting machinery alleged that defendant (manufacturer) wrongfully breached its distributorship agreement. Testified as to economic damages including lost profits and unjust enrichment. Jury awarded plaintiff approximately $6 million in economic damages and $6 million in punitive damages.',
  },
  {
    title: 'Fraud / Money Laundering',
    result: 'Settled',
    description: 'Conducted a fraud investigation in connection with a highly publicized international money laundering scheme involving over 150 bank accounts and over 50 entities. The fraud was investigated by the FBI and federal agencies of Switzerland and Korea. Engel & Engel prepared detailed tracing schedules of the flow of fraudulent funds approximating $25 million that ultimately were transferred to Swiss bank accounts, real estate, and other assets. Case settled.',
  },
  {
    title: 'Real Estate Investments',
    result: 'Court Award in Excess of $10 Million',
    description: 'Testified in court on behalf of plaintiff, a minority shareholder of various real estate investment entities. Plaintiff alleged that defendants misappropriated corporate funds. Expert testimony included analyses of wrongful distributions and payments to defendants including improper accounting and self-dealing. Defendant\'s counsel cross-examined Engel for approximately 12 days in connection with Engel\'s damage analysis. Court awarded plaintiff damages in excess of $10 million.',
  },
  {
    title: 'Economic Damages',
    result: 'Arbitration Award in Excess of $100 Million',
    description: 'Testified in an arbitration on behalf of plaintiff as to economic damages in excess of $100 million. Plaintiff, a buyer of an $80 million shopping center, alleged that seller provided buyer with misleading financial information. Arbitrator awarded plaintiff rescission damages in excess of $100 million.',
  },
  {
    title: 'Breach Of Contract',
    result: 'Jury Award of $1.3 Million',
    description: 'Testified as to damages in a jury trial on behalf of plaintiff, a U.S. window manufacturer and distributor. Plaintiff alleged breach of contract in connection with the construction of a mansion in Moscow, Russia. Jury awarded plaintiff $1.3 million in damages.',
  },
  {
    title: 'Corporate Embezzlement',
    result: 'Defensed',
    description: 'Testified in arbitration on behalf of defendant, a CEO alleged to have embezzled $250,000 of corporate funds disguised as bonuses. Expert testimony included analysis of bonuses paid to CEO, analysis of CEO\'s adherence to internal controls and accounting policies, and analysis that the CEO did not attempt to conceal alleged embezzled payments. Arbitrator found that defendant did not defraud his employer.',
  },
  {
    title: 'Personal Injury',
    result: 'Jury Award of $13 Million',
    description: 'Testified in a jury trial as to personal injury damages in connection with an alleged wrongful brain injury of an infant. Damage analysis included loss of future lifetime earnings and projected medical care. Jury awarded plaintiff approximately $13 million.',
  },
  {
    title: 'Tracing of Fraudulent Funds',
    result: 'Settled',
    description: 'Prepared a federal expert report in connection with a highly publicized racketeering and fraud of a Las Vegas condominium homeowners association. The fraud was investigated by the FBI and other federal agencies and resulted in two guilty pleas and four deaths among witnesses and participants. Plaintiff (Association) alleged that insurance premiums paid in connection with $10 million of proceeds from various life insurance policies were paid from fraudulent funds. Engel & Engel investigated and prepared a detailed tracing of approximately $19 million of fraudulent funds that were used to pay life insurance premiums, purchase real estate, and pay for lifestyle expenses. Case settled.',
  },
  {
    title: 'Breach of Contract',
    result: 'Defensed',
    description: 'Testified in court on behalf of defendant that owned and managed commercial real estate. Plaintiff alleged that property manager (defendant) wrongfully and prematurely breached the lease agreement and claimed economic damages including lost profits. Expert testimony included analysis of plaintiff\'s misleading and overstated financial statements including analysis that plaintiff did not suffer economic damages. The court agreed with Mr. Engel\'s testimony and rejected plaintiff\'s claim for damages.',
  },
  {
    title: 'Accounting Malpractice',
    result: 'Settled',
    description: 'Prepared an expert report of alleged accounting malpractice in connection with a public accounting firm\'s audit of financial statements. Bookkeeper embezzled approximately $1 million from plaintiff over a five-year period. Based on Engel & Engel\'s investigation and review of the auditors working papers, Engel found that the auditors did not conduct their audit in accordance with Generally Accepted Auditing Standards. Engel also found that the accounting firm\'s audit deficiencies enabled and allowed the bookkeeper\'s embezzlement to continue for years without detection. Case settled.',
  },
  {
    title: 'Trademark Infringement',
    result: 'Jury Award of $2.7 Million',
    description: 'Testified as to infringement damages in a jury trial in connection with the alleged trademark infringement of an acting school. Analysis included projected lost revenues due to infringement. Jury awarded plaintiff damages approximating $2.7 million.',
  },
  {
    title: 'Real Estate Investment',
    result: 'Settled',
    description: 'Prepared an economic damage analysis and testified in court in connection with the minority investor of a real estate development. Engel\'s expert testimony included a damage analysis approximating $12 million in connection with the internal rate of return, preferred returns and hurdle rate. The court accepted Engel\'s expert testimony and the parties settled during trial.',
  },
  {
    title: 'Real Estate Fraud',
    result: 'Award of $753,000',
    description: 'Testified in trial on behalf of plaintiff, a real estate investor that alleged fraud by a property manager. Expert testimony included analysis and evidence of the fraudulent scheme including analysis of unaccounted rental income. The court ruled that defendant did defraud plaintiff and awarded plaintiff damages of $753,000.',
  }
];

export default function CasesPage() {
  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">

        {/* HERO BANNER */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-primary-950">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="container-custom relative z-10 w-full pb-20 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl"
            >
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-6">
                Proven Track Record
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9]">
                Representative <br />
                <span className="font-serif italic text-[#D4AF37] font-medium">Cases</span>
              </h1>
              <div className="h-[3px] w-24 bg-[#D4AF37] mt-8" />
            </motion.div>
          </div>
        </section>

        {/* MASONRY-STYLE GRID */}
        <section className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {cases.map((case_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  viewport={{ once: true, margin: '-30px' }}
                  className="break-inside-avoid group"
                >
                  <div className="relative bg-gradient-to-br from-slate-50 to-white border border-slate-150 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-400">
                    {/* Gold top strip */}
                    <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/60 to-transparent" />

                    <div className="p-6 md:p-7">
                      {/* Result */}
                      <p className="text-[12px] font-bold tracking-wide uppercase text-[#D4AF37] mb-4">
                        {case_.result}
                      </p>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#1D2653] mb-3 leading-snug group-hover:text-[#293995] transition-colors duration-300">
                        {case_.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-[13.5px] leading-[1.75]">
                        {case_.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
