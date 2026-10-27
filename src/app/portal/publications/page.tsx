'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

// Mock publications data for testing
const mockPublications = [
  {
    id: '1',
    title: 'Modern Approaches to Lost Profits Analysis in Commercial Litigation',
    authors: ['Jason A. Engel', 'Michael B. Engel'],
    journal: 'Journal of Forensic Economics',
    volume: '34',
    issue: '2',
    year: 2023,
    pages: '45-72',
    abstract: 'Comprehensive analysis of methodologies for calculating lost profits in complex commercial disputes, including recent developments in economic modeling and statistical analysis.',
    practiceAreas: ['Economic Damages', 'Commercial Litigation'],
    downloadCount: 156,
    viewCount: 423
  },
  {
    id: '2',
    title: 'Digital Forensics in Financial Fraud Investigations',
    authors: ['Jason A. Engel', 'Sarah K. Martinez'],
    journal: 'Journal of Digital Forensics and Cybercrime',
    volume: '8',
    issue: '2',
    year: 2023,
    pages: '12-28',
    abstract: 'Advanced techniques for analyzing digital evidence in complex financial fraud schemes, including cryptocurrency tracing and electronic document analysis.',
    practiceAreas: ['Fraud Investigation', 'Digital Forensics'],
    downloadCount: 89,
    viewCount: 234
  },
  {
    id: '3',
    title: 'Valuation Discounts and Premiums in Partnership Disputes',
    authors: ['Michael B. Engel', 'Jason A. Engel'],
    journal: 'Business Valuation Review',
    volume: '42',
    issue: '1',
    year: 2023,
    pages: '15-31',
    abstract: 'Analysis of minority discounts and control premiums in closely-held business valuations for litigation purposes.',
    practiceAreas: ['Business Valuation', 'Partnership Disputes'],
    downloadCount: 67,
    viewCount: 189
  },
  {
    id: '4',
    title: 'Life Care Planning and Economic Analysis in Catastrophic Injury Cases',
    authors: ['Jason A. Engel', 'Dr. Patricia Williams'],
    journal: 'Journal of Forensic Economics',
    volume: '33',
    issue: '4',
    year: 2022,
    pages: '78-95',
    abstract: 'Comprehensive approach to calculating future medical costs and care needs in severe injury cases.',
    practiceAreas: ['Personal Injury', 'Economic Damages'],
    downloadCount: 134,
    viewCount: 298
  }
]

export default function PublicationsPage() {
  const router = useRouter()
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('')
  const [filteredPublications, setFilteredPublications] = useState(mockPublications)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('portalToken')
    const client = localStorage.getItem('clientInfo')
    
    if (!token || !client) {
      router.push('/portal/login')
      return
    }

    const clientData = JSON.parse(client)
    setClientInfo(clientData)

    if (!clientData.isPasswordChanged) {
      router.push('/portal/change-password')
    }
  }, [router])

  useEffect(() => {
    // Filter publications based on search and practice area
    let filtered = mockPublications

    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.abstract.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedPracticeArea) {
      filtered = filtered.filter(pub => 
        pub.practiceAreas.includes(selectedPracticeArea)
      )
    }

    setFilteredPublications(filtered)
  }, [searchTerm, selectedPracticeArea])

  const handleLogout = () => {
    localStorage.removeItem('portalToken')
    localStorage.removeItem('clientInfo')
    router.push('/portal/login')
  }

  const handleDownload = (publicationId: string) => {
    // Mock download functionality
    alert(`Downloading publication ${publicationId}... (This is a test - no actual file will download)`)
  }

  const practiceAreas = ['Economic Damages', 'Fraud Investigation', 'Business Valuation', 'Partnership Disputes', 'Personal Injury', 'Commercial Litigation', 'Digital Forensics']

  if (!clientInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-primary-900">Engel & Engel Publications Portal</h1>
              <p className="text-gray-600">Welcome, {clientInfo.firstName} {clientInfo.lastName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{clientInfo.company}</span>
              <Button variant="outline" onClick={handleLogout}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search publications, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Practice Areas</option>
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPublications.map((publication) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">
                  {publication.title}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{publication.authors.join(', ')}</p>
                  <p>{publication.journal}, Vol. {publication.volume}, No. {publication.issue} ({publication.year})</p>
                  {publication.pages && <p>Pages: {publication.pages}</p>}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {publication.abstract}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.practiceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <span className="mr-4">👁 {publication.viewCount} views</span>
                    <span>⬇ {publication.downloadCount} downloads</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Viewing details for: ${publication.title}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(publication.id)}
                      className=""
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V3" />
                      </svg>
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
