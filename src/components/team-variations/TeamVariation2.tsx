import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// VARIATION 2: Split Layout with Large Images
export default function TeamVariation2({ teamMembers }: { teamMembers: any[] }) {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
            <span className="mr-2">👥</span>
            Expert Team
          </div>
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Meet Our Team
          </h2>
        </div>

        <div className="space-y-20">
          {teamMembers.map((member, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                      {member.experience}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-xl text-primary-600 font-semibold mb-2">{member.credentials}</p>
                  <p className="text-lg text-gray-700 font-medium mb-4">{member.title}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{member.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                      <div className="space-y-2">
                        {member.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                      <div className="space-y-2">
                        {member.achievements.slice(0, 3).map((achievement: string, idx: number) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a href={`tel:${member.phone}`}>
                      <Button as="span" size="sm">📞 Call</Button>
                    </a>
                    <a href={`mailto:${member.email}`}>
                      <Button as="span" variant="outline" size="sm">✉️ Email</Button>
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
