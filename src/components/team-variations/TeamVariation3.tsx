import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// VARIATION 3: Circular Images with Overlay Info
export default function TeamVariation3({ teamMembers }: { teamMembers: any[] }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary-600">Expert</span> Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the professionals who bring decades of experience to every case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              {/* Circular Image */}
              <div className="relative mb-6">
                <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    quality={95}
                    sizes="256px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-semibold">{member.experience}</p>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-1/2 transform translate-x-16 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {member.credentials.split(',')[0]}
                </div>
              </div>
              
              {/* Content */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mx-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-2">{member.credentials}</p>
                <p className="text-gray-700 font-medium mb-4">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                  {member.description}
                </p>
                
                {/* Specialties as tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center gap-3">
                  <a href={`tel:${member.phone}`}>
                    <Button as="span" variant="outline" size="sm" className="text-xs">
                      📞 Call
                    </Button>
                  </a>
                  <a href={`mailto:${member.email}`}>
                    <Button as="span" variant="outline" size="sm" className="text-xs">
                      ✉️ Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
