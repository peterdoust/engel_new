'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { trackFormSubmission } from '@/lib/analytics';

interface RequestPublicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    publicationTitle?: string;
    publicationImage?: string;
}

export default function RequestPublicationModal({ isOpen, onClose, publicationTitle, publicationImage }: RequestPublicationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        firmName: '',
        position: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submissionData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                firmName: formData.firmName,
                position: formData.position,
                requestedPublications: [publicationTitle || 'General Series Interest'],
                timestamp: new Date().toISOString(),
                category: publicationTitle || 'General Request'
            };

            const response = await fetch('/api/send-publication-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                // Tracked here rather than on the "Request Publication" button
                // that opens this modal: the button is only intent, and since
                // FormSent is a live Google Ads conversion, counting abandoned
                // modals would feed bad data into bid optimisation. This one
                // call covers every publication page using this modal.
                trackFormSubmission('request_publication');
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                    setIsSuccess(false);
                }, 3000);
            } else {
                alert('There was an error submitting your request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error connecting to the server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {/* OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm shadow-2xl"
                    />

                    {/* MODAL CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-4xl bg-white rounded-sm overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row max-h-[95vh]"
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[110] text-slate-300 hover:text-[#293995] transition-all bg-white/10 hover:bg-white p-2 rounded-full border border-slate-100"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* LEFT SIDE: DOCUMENT PREVIEW */}
                        <div className="lg:w-[40%] relative bg-[#f8fafc] p-10 lg:p-12 flex flex-col items-center justify-center border-r border-slate-100 overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            {/* Floating Document */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="relative w-full max-w-[320px] aspect-[3/4] shadow-[0_40px_80px_rgba(41, 57, 149,0.15)] rounded-sm overflow-hidden z-10"
                            >
                                <Image
                                    src={publicationImage || "/images/future-lost-profits.png"}
                                    alt={publicationTitle || 'Publication'}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border border-black/5" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE: FORM */}
                        <div className="lg:w-[60%] p-10 lg:p-12 overflow-y-auto bg-white">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="text-4xl font-serif italic text-[#293995] mb-4">Request Received</h4>
                                    <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                                        Thank you for your interest. We will process your request and deliver the document to your inbox within one business day.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-10 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/30 hover:border-[#D4AF37]"
                                    >
                                        Close Window
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <header className="mb-10">
                                        <h4 className="text-2xl font-bold tracking-tight text-[#293995]">Request This Publication</h4>
                                    </header>

                                    {/* Name Fields */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 block">Your Name*</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <input
                                                    required
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                                />
                                                <span className="text-[10px] text-slate-400 font-medium ml-1">First</span>
                                            </div>
                                            <div className="space-y-1">
                                                <input
                                                    required
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                                />
                                                <span className="text-[10px] text-slate-400 font-medium ml-1">Last</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Firm & Position */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">Firm Name*</label>
                                            <input
                                                required
                                                type="text"
                                                name="firmName"
                                                value={formData.firmName}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">Position</label>
                                            <input
                                                type="text"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">Email*</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">Phone*</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-sm px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#293995] text-white font-bold py-4 rounded-sm hover:bg-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-xs uppercase tracking-[0.2em]">Submit Request</span>
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
