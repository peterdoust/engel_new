import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'
import { TEAM_PHONE_LOCATIONS } from '@/lib/analytics'

// VARIATION 5: Interactive Cards with Flip Effect - Professional Design
export default function TeamVariation5({ teamMembers }: { teamMembers: any[] }) {
  // Touch screens can't hover, so a tap flips the card instead
  const [flipped, setFlipped] = React.useState<number | null>(null)

  const handleCardClick = (index: number) => (e: React.MouseEvent) => {
    // let links and buttons on the back of the card work without flipping it back
    if ((e.target as HTMLElement).closest('a, button')) return
    if (window.matchMedia('(hover: hover)').matches) return
    setFlipped(prev => (prev === index ? null : index))
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group perspective-1000 cursor-pointer ${flipped === index ? 'is-flipped' : ''}`}
              onClick={handleCardClick(index)}
            >
              <div className="relative w-full h-[420px] sm:h-[500px] transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">

                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Darker gradient to prevent text overlap on face */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                    {/* Text positioned at bottom only - no overlap with face */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-bold mb-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{member.name}</h3>
                      <p className="text-[#D4AF37] font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-sm">{member.credentials}</p>
                      {/* <p className="text-gray-100 text-sm mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{member.title}</p> */}

                      <div className="flex items-center justify-between gap-3">
                        {/* <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium drop-shadow-lg">
                          {member.experience}
                        </span> */}
                        <span className="text-sm text-primary-200 font-medium animate-pulse drop-shadow-lg">
                          <span className="hidden [@media(hover:hover)]:inline">Hover for details →</span>
                          <span className="[@media(hover:hover)]:hidden">Tap for details →</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Card - Improved Layout */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="h-full flex flex-col p-6">
                    {/* Header Section */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          quality={95}
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-primary-950 truncate">{member.name}</h3>
                        <p className="text-[#D4AF37] text-xs font-semibold">{member.credentials}</p>
                      </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {/* Description */}
                      <div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {/* {member.description.length > 150
                            ? `${member.description.substring(0, 150)}...`
                            : member.description} */}
                            {member.description}
                        </p>
                      </div>

                      {/* Specialties */}
                      {/* <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                          <span className="w-1 h-4 bg-primary-500 rounded-full mr-2"></span>
                          Specialties
                        </h4>
                        <div className="space-y-1.5">
                          {member.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                            <div key={idx} className="flex items-start text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                              <span className="line-clamp-2">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div> */}

                      {/* Key Achievements */}
                      {/* <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                          <span className="w-1 h-4 bg-primary-500 rounded-full mr-2"></span>
                          Key Achievements
                        </h4>
                        <div className="space-y-1.5">
                          {member.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                            <div key={idx} className="flex items-start text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                              <span className="line-clamp-2">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>

                    {/* Footer Buttons - Fixed at Bottom */}
                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href={`/team/${member.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`}
                        className="block w-full"
                      >
                        <Button as="span" size="sm" className="w-full text-sm font-semibold bg-primary-950 text-white hover:bg-white hover:text-primary-950 py-3">
                          <span className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-middle" viewBox="0 0 16 16">
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                          </span>
                          View Full Profile
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        <TrackedPhoneLink
                          phone={member.phonePrimary}
                          location={TEAM_PHONE_LOCATIONS[member.slug]?.primary ?? 'team_unknown'}
                          className="flex-1"
                        >
                          <Button as="span" variant="outline" size="sm" className="w-full text-sm font-semibold h-10 hover:bg-primary-950 hover:text-white hover:border-primary-950">
                            <span className="mr-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="align-middle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                              </svg>
                            </span>
                            Call
                          </Button>
                        </TrackedPhoneLink>
                        <a href={`mailto:${member.email}`} className="flex-1">
                          <Button as="span" variant="outline" size="sm" className="w-full text-sm font-semibold h-10 hover:bg-primary-950 hover:text-white hover:border-primary-950">
                            <span className="mr-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16" fill="currentColor" className="align-middle"><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
                            </span>
                            Email
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
