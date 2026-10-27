import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// VARIATION 4: Magazine-Style Layout with Large Hero Member
export default function TeamVariation4({ teamMembers }: { teamMembers: any[] }) {
  const [mainMember, ...otherMembers] = teamMembers

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-primary-600">Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Decades of combined expertise in forensic accounting and expert witness testimony.
          </p>
        </div>

        {/* Featured Main Member */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-3xl overflow-hidden shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-96 lg:h-auto">
              <Image
                src={mainMember.image}
                alt={mainMember.name}
                fill
                className="object-cover object-top"
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            <div className="p-8 lg:p-12 text-white flex flex-col justify-center">
              <div className="mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {mainMember.experience} • Managing Partner
                </span>
              </div>
              
              <h3 className="text-4xl font-bold mb-4">{mainMember.name}</h3>
              <p className="text-xl text-primary-200 font-semibold mb-4">{mainMember.credentials}</p>
              <p className="text-primary-100 leading-relaxed mb-6">{mainMember.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-3">Key Specialties</h4>
                  <div className="space-y-2">
                    {mainMember.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                      <div key={idx} className="flex items-center text-sm text-primary-200">
                        <span className="w-1.5 h-1.5 bg-primary-300 rounded-full mr-3"></span>
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {mainMember.achievements.slice(0, 3).map((achievement: string, idx: number) => (
                      <div key={idx} className="flex items-center text-sm text-primary-200">
                        <span className="w-1.5 h-1.5 bg-primary-300 rounded-full mr-3"></span>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href={`tel:${mainMember.phone}`}>
                  <Button as="span" className="bg-white text-primary-900 hover:bg-gray-100">
                    📞 {mainMember.phone}
                  </Button>
                </a>
                <a href={`mailto:${mainMember.email}`}>
                  <Button as="span" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900">
                    ✉️ Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    quality={95}
                    sizes="96px"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold text-sm mb-2">{member.credentials}</p>
                  <p className="text-gray-700 text-sm mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {member.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <a href={`tel:${member.phone}`}>
                      <Button as="span" variant="outline" size="sm" className="text-xs">Call</Button>
                    </a>
                    <a href={`mailto:${member.email}`}>
                      <Button as="span" variant="outline" size="sm" className="text-xs">Email</Button>
                    </a>
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
