'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface TeamMember {
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
  pdfQualifications?: string;
}

interface Props {
  member: TeamMember;
}

export default function TeamHeroVariation4({ member }: Props) {
  return (
    <section className="relative pt-16 lg:pt-20 bg-gradient-to-br from-primary-900 via-primary-800 to-purple-900 overflow-hidden">
      {/* Diagonal Split Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-purple-900"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 80%)' }}></div>
      </div>

      <div className="relative z-10 py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left - Profile Image */}
                <div className="lg:col-span-2 relative">
                  <div className="relative h-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      quality={95}
                      priority
                    />
                    {/* Clean Subtle Shadow Effect on Right Edge */}
                    <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300/50 to-transparent"></div>
                    {/* Mobile - Clean Bottom Border */}
                    <div className="lg:hidden absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
                  </div>
                </div>

                {/* Right - Information */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <div className="space-y-6">
                    {/* Name and Title */}
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                        {member.name}
                      </h1>
                      <p className="text-2xl text-primary-600 font-semibold mb-2">
                        {member.credentials}
                      </p>
                      <p className="text-lg text-gray-600 mb-6">
                        {member.title}
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"></div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-6 border-l-4 border-primary-600">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose {member.name.split(' ')[0]}?</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-primary-600 font-bold">✓</span>
                          <span className="text-gray-700">Over 500 forensic accounting cases successfully handled</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary-600 font-bold">✓</span>
                          <span className="text-gray-700">100+ expert witness testimonies in federal and state courts</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary-600 font-bold">✓</span>
                          <span className="text-gray-700">Trusted by top law firms and Fortune 500 companies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary-600 font-bold">✓</span>
                          <span className="text-gray-700">Six professional certifications including CPA, CFE, CIRA</span>
                        </li>
                      </ul>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {member.directPhone && (
                        <div className="group">
                          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary-600 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">
                                <span className="text-2xl group-hover:scale-110 transition-transform">📞</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Direct Line</p>
                                <a href={`tel:${member.directPhone}`} className="text-lg font-bold text-gray-900 hover:text-primary-600">
                                  {member.directPhone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="group">
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary-600 hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">
                              <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 font-medium">Email</p>
                              <a href={`mailto:${member.email}`} className="text-sm font-bold text-gray-900 hover:text-primary-600 truncate block">
                                {member.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 mt-6">
                      {member.pdfQualifications && (
                        <a
                          href={member.pdfQualifications}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button as="span" size="lg" className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                            Download Full Qualifications
                          </Button>
                        </a>
                      )}
                      <a href={`mailto:${member.email}`} className="flex-1">
                        <Button as="span" size="lg" variant="outline" className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all">
                          Request Consultation
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

