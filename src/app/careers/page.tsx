'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { trackFormSubmission } from '@/lib/analytics';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const chosen = e.target.files[0];
      // Vercel rejects request bodies over 4.5MB, so keep resumes under 4MB
      if (chosen.size > 4 * 1024 * 1024) {
        setSubmitError('Resume is over the 4MB size limit. Please upload a smaller file.');
        return;
      }
      setSubmitError(null);
      setFile(chosen);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('message', formData.message);
      payload.append('timestamp', new Date().toISOString());
      if (file) payload.append('resume', file);

      const res = await fetch('/api/send-career-application', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      // Reported as career_application rather than contact_form: a job applicant
      // is not a sales lead, and merging the two makes the contact-form count
      // unusable for Ads reporting.
      trackFormSubmission('career_application');
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen overflow-hidden">
      <Header />

      {/* ══════════ CINEMATIC HERO ══════════ */}
      <section className="relative flex items-center overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
        {/* Parallax Background Decorations */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Glowing orbs */}
          <motion.div
            style={{ y: y2, scale }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full"
          />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        <div className="container-custom relative z-10 w-full">
          <motion.div
            style={{ y: springY1, opacity }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
                Join Our <br />
                <span className="font-serif italic text-[#D4AF37] font-medium">Team</span>
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 relative bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-20">

            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-xl prose-slate max-w-none"
            >
              <p className="text-2xl text-slate-700 font-light leading-relaxed">
                Engel & Engel is a premier Los Angeles forensic accounting firm offering a specialized
                opportunity for professionals devoted to the practice of forensic accounting. For 30
                years, we’ve provided law firms and in-house counsel in California and beyond,
                sophisticated guidance in securing successful outcomes in complex litigation matters.
              </p>
            </motion.div>

            {/* Life at E&E */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-[#1D2653] mb-6 uppercase tracking-tight">Life at Engel & Engel</h2>
                <div className="h-1 w-20 bg-[#D4AF37] mb-8" />
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  We provide a collaborative and collegial environment for motivated professionals
                  seeking growth and the opportunity to hone specific skills in forensic accounting and
                  expert witness services. If you are looking for an alternative to the traditional career path
                  within a large accounting firm, Engel & Engel may be the right firm for your career
                  journey. We believe the best training comes from hands-on experience and we make
                  every effort to use case assignments as mentoring opportunities for your growth and
                  success.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-[#1D2653] mb-6 uppercase tracking-tight">Commitment to Diversity</h2>
                <div className="h-1 w-20 bg-[#D4AF37] mb-8" />
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Engel & Engel recognizes the importance of promoting diversity and inclusion in the
                  accounting and legal professions. The success of our business depends on effective
                  communication in and out of the courtroom, to a vast and varied audience of lawyers,
                  judges, juries, and clients. We embrace the opportunity to gather the best accountants
                  from all walks of life, including underrepresented groups.
                </p>
              </motion.div>
            </div>

            {/* Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-10 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full translate-x-32 -translate-y-32" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[#1D2653] mb-8 uppercase tracking-tight">Current Opportunities</h2>
                <p className="text-xl text-slate-700 font-light leading-relaxed mb-8">
                  Our success record is well above average and our services are in great demand. We
                  are always on the lookout for motivated professionals with skills, talent, and vision. We
                  are seeking individuals at all levels, including office support personnel. We hope you
                  have a genuine interest in the area of forensic accounting and litigation support services
                  and we are eager to talk to you about your background and future plans.
                </p>
                <p className="text-lg text-[#1D2653] font-bold tracking-widest uppercase">
                  Those interested in learning more about our firm are strongly encouraged to contact us
                  and send a resume using the form below.
                </p>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              id="application-form"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto pt-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-[#1D2653] tracking-tighter mb-4 uppercase">Submit Application</h3>
                <div className="h-1 w-20 bg-[#D4AF37] mx-auto mb-4" />
                <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">Start Your Journey With Us</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-green-900 mb-2">Thank you!</h4>
                  <p className="text-green-700">Your application has been received. We will review it and get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
                      {submitError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-[11px] font-bold text-[#1D2653] uppercase tracking-[0.25em] mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-[#f8fbff] border-[#1d2653]/30 focus:border-[#1D2653] outline-none transition-all text-[#1D2653] font-bold placeholder:text-gray-400"
                        style={{ borderWidth: '0.1px' }}
                        placeholder="YOUR NAME*"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[11px] font-bold text-[#1D2653] uppercase tracking-[0.25em] mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-[#f8fbff] border-[#1d2653]/30 focus:border-[#1D2653] outline-none transition-all text-[#1D2653] font-bold placeholder:text-gray-400"
                        style={{ borderWidth: '0.1px' }}
                        placeholder="YOUR EMAIL*"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-[11px] font-bold text-[#1D2653] uppercase tracking-[0.25em] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-[#f8fbff] border-[#1d2653]/30 focus:border-[#1D2653] outline-none transition-all text-[#1D2653] font-bold placeholder:text-gray-400"
                      style={{ borderWidth: '0.1px' }}
                      placeholder="YOUR PHONE NUMBER"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[11px] font-bold text-[#1D2653] uppercase tracking-[0.25em] mb-1">Brief Introduction</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-[#f8fbff] border-[#1d2653]/30 focus:border-[#1D2653] outline-none transition-all text-[#1D2653] font-bold placeholder:text-gray-400 resize-none min-h-[200px]"
                      style={{ borderWidth: '0.1px' }}
                      placeholder="ENTER A BRIEF MESSAGE"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="resume" className="block text-[11px] font-bold text-[#1D2653] uppercase tracking-[0.25em] mb-2">Attach Resume (PDF or Word)</label>
                    <div className="relative group">
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border border-[#1d2653]/30 bg-[#f8fbff] p-8 text-center group-hover:bg-[#D4AF37]/5 transition-all" style={{ borderWidth: '0.1px' }}>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-400 group-hover:text-[#1d2653]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">
                          {file ? file.name : <><span className="[@media(hover:hover)]:hidden">Tap to upload your resume</span><span className="hidden [@media(hover:hover)]:inline">Click to upload or drag and drop</span></>}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-2 uppercase tracking-tight">PDF or Word, up to 4MB</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    loading={isSubmitting}
                    className="w-full py-8 bg-[#1D2653] hover:bg-[#D4AF37] text-white font-bold tracking-[0.5em] uppercase text-xs transition-all duration-500 rounded-none group relative overflow-hidden hover:text-[#1d2653]"
                  >
                    <span className="relative z-10">Submit Application</span>
                    <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

