import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// VARIATION 6: Original Modern Design (The one we had before)
export default function TeamVariation6({ teamMembers }: { teamMembers: any[] }) {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
            <span className="mr-2">👥</span>
            Expert Team
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Meet Our <span className="text-primary-600">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our team combines decades of experience with the highest professional credentials 
            to deliver exceptional forensic accounting and expert witness services.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* High-Resolution Member Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.title}`}
                  fill
                  className="object-cover object-top transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={95}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary-700">
                  {member.experience}
                </div>
              </div>

              {/* Modern Content Card */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-semibold text-lg mb-2">{member.credentials}</p>
                  <p className="text-gray-600 font-medium">{member.title}</p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {member.description}
                </p>

                {/* Modern Specialties Grid */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.slice(0, 3).map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-3">
                  <a href={`tel:${member.phone}`} className="flex-1">
                    <Button as="span" variant="outline" size="sm" className="w-full text-xs">
                      📞 Call
                    </Button>
                  </a>
                  <a href={`mailto:${member.email}`} className="flex-1">
                    <Button as="span" variant="outline" size="sm" className="w-full text-xs">
                      ✉️ Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        
      {/* Detailed Team Information - Modern Expandable Cards */}
      <div className="container-custom">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Team Profiles</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore detailed information about each team member's expertise, achievements, and qualifications.
            </p>
          </div>

          <div className="space-y-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Compact Profile */}
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          quality={95}
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                        <p className="text-primary-600 font-semibold">{member.credentials}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>

                  {/* Detailed Information */}
                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          Specialties
                        </h5>
                        <div className="space-y-2">
                          {member.specialties.map((specialty, idx) => (
                            <div key={idx} className="flex items-center text-gray-600 text-sm">
                              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3"></span>
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          Key Achievements
                        </h5>
                        <div className="space-y-2">
                          {member.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-gray-600 text-sm">
                              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3"></span>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                      <a href={`tel:${member.phone}`}>
                        <Button as="span" variant="outline" size="sm" className="text-xs">
                          📞 {member.phone}
                        </Button>
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <Button as="span" variant="outline" size="sm" className="text-xs">
                          ✉️ Email {member.name.split(' ')[0]}
                        </Button>
                      </a>
                      {(member.name === 'Brandon J. Engel' || member.name === 'Jason A. Engel') && (
                        <a 
                          href={member.name === 'Brandon J. Engel' 
                            ? "/documents/brandon-engel-qualifications.pdf" 
                            : "/documents/jason-engel-qualifications.pdf"
                          } 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button as="span" variant="outline" size="sm" className="text-xs">
                            📄 View Qualifications
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
