import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

// VARIATION 1: Modern Minimalist Cards
export default function TeamVariation1({ teamMembers }: { teamMembers: any[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-primary-600">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team combines decades of experience with the highest professional credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* High-res image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-2">{member.credentials}</p>
                <p className="text-gray-600 text-sm mb-4">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.description}
                </p>
                
                <div className="flex gap-2 mb-4">
                  {member.specialties.slice(0, 2).map((specialty: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <a href={`tel:${member.phone}`} className="flex-1">
                    <Button as="span" variant="outline" size="sm" className="w-full text-xs">Call</Button>
                  </a>
                  <a href={`mailto:${member.email}`} className="flex-1">
                    <Button as="span" variant="outline" size="sm" className="w-full text-xs">Email</Button>
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
