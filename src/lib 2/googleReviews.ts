// Google Reviews Integration
// This file handles fetching and processing Google reviews for Engel & Engel

export interface GoogleReview {
  id: string
  author: string
  firstName: string
  rating: number
  text: string
  date: string
  profilePhotoUrl?: string
}

export interface ProcessedReview {
  quote: string
  author: string
  company: string
  result: string
  avatar: string
  rating: number
  date: string
  source: 'google' | 'custom'
}

// Extract first name from full name
const extractFirstName = (fullName: string): string => {
  const names = fullName.trim().split(' ')
  return names[0] || 'Anonymous'
}

// Generate avatar initials from first name
const generateAvatar = (firstName: string): string => {
  return firstName.charAt(0).toUpperCase()
}

// Convert Google review to our testimonial format
const processGoogleReview = (review: GoogleReview): ProcessedReview => {
  const firstName = extractFirstName(review.author)
  
  return {
    quote: review.text,
    author: firstName,
    company: 'Google Review',
    result: `${review.rating}/5 Stars`,
    avatar: generateAvatar(firstName),
    rating: review.rating,
    date: review.date,
    source: 'google'
  }
}

// Mock Google Reviews data (replace with actual API call)
// In production, you would fetch this from Google Places API
const mockGoogleReviews: GoogleReview[] = [
  {
    id: '1',
    author: 'Robert Martinez',
    firstName: 'Robert',
    rating: 5,
    text: 'I cannot recommend Engel & Engel highly enough. When we suspected financial irregularities in our company, they conducted a thorough forensic accounting investigation that uncovered a complex embezzlement scheme we never would have discovered on our own. Their team was incredibly professional, discreet, and methodical in their approach. They not only identified the fraudulent activities but also helped us recover a significant portion of the stolen funds and provided expert testimony that was crucial in the prosecution. The detailed reports they provided were clear, comprehensive, and held up perfectly in court. Their expertise literally saved our business and gave us the tools to prevent future fraud. Worth every penny.',
    date: '2024-01-15'
  },
  {
    id: '2',
    author: 'Amanda Johnson',
    firstName: 'Amanda',
    rating: 5,
    text: 'As an attorney handling a complex partnership dispute involving millions of dollars, I needed a forensic accountant who could not only analyze the financial records but also serve as an expert witness. Engel & Engel exceeded all expectations. Their forensic analysis was incredibly detailed and revealed financial discrepancies that were key to our case. What impressed me most was their ability to explain complex financial concepts in simple terms that the jury could understand. Their courtroom presence was professional and confident, and their testimony was clear, credible, and compelling. The opposing counsel tried to challenge their findings multiple times, but their work was so thorough and well-documented that it held up under intense scrutiny. We won the case largely due to their expert analysis and testimony. I will definitely use them again for future cases.',
    date: '2024-01-10'
  },
  {
    id: '3',
    author: 'Carlos Rodriguez',
    firstName: 'Carlos',
    rating: 5,
    text: 'When we were considering acquiring a competitor, we needed a comprehensive business valuation to ensure we were making a sound investment. Engel & Engel provided an incredibly thorough analysis that went far beyond just the numbers. They examined the target company\'s financial statements, identified potential red flags, analyzed market conditions, and provided a detailed valuation report that helped us negotiate a fair price. Their attention to detail was remarkable - they caught several accounting irregularities that could have cost us significantly down the road. The valuation was defensible, well-researched, and gave us the confidence to move forward with the acquisition. The deal has been very successful, and I credit much of that success to their thorough due diligence work. Professional, reliable, and worth every dollar.',
    date: '2024-01-05'
  },
  {
    id: '4',
    author: 'Michelle Wong',
    firstName: 'Michelle',
    rating: 5,
    text: 'Our company was facing a devastating fraud situation that threatened our very existence. We had discovered that a trusted employee had been systematically stealing from us for years, but we didn\'t know the full extent of the damage. Engel & Engel came in and conducted a comprehensive fraud investigation that was both thorough and efficient. They traced every transaction, identified all the fraudulent activities, and quantified our losses with precision. What impressed me most was their ability to work quickly without sacrificing accuracy - we needed answers fast, and they delivered. They also helped us strengthen our internal controls to prevent future fraud and provided expert testimony that was instrumental in recovering our losses through insurance and legal action. Their professionalism, expertise, and dedication literally saved our business. I cannot thank them enough.',
    date: '2023-12-20'
  },
  {
    id: '5',
    author: 'James Thompson',
    firstName: 'James',
    rating: 5,
    text: 'After a major fire at our manufacturing facility, we filed a substantial insurance claim that was initially disputed by our insurance company. They claimed our losses were inflated and demanded extensive documentation. Engel & Engel stepped in to help us prepare a comprehensive claim analysis that was both accurate and defensible. Their team meticulously reviewed all our financial records, calculated our actual losses including business interruption costs, and prepared detailed reports that clearly demonstrated the legitimacy of our claim. They also served as expert witnesses during the insurance company\'s investigation, answering all questions professionally and confidently. Thanks to their thorough work and expert testimony, we were able to recover the full amount of our claim, which was over $2 million. Their expertise and professionalism made all the difference in what could have been a devastating financial situation for our company.',
    date: '2023-12-15'
  }
]

// Fetch Google reviews (mock implementation)
export const fetchGoogleReviews = async (): Promise<GoogleReview[]> => {
  // In production, replace this with actual Google Places API call
  // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`)
  // const data = await response.json()
  // return data.result.reviews
  
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGoogleReviews), 1000)
  })
}

// Get processed reviews (Google + custom testimonials)
export const getProcessedReviews = async (): Promise<ProcessedReview[]> => {
  try {
    const googleReviews = await fetchGoogleReviews()
    const processedGoogleReviews = googleReviews
      .filter(review => review.rating >= 4) // Only show 4+ star reviews
      .map(processGoogleReview)
    
    return processedGoogleReviews
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return []
  }
}

// Instructions for setting up Google Places API:
/*
To use real Google reviews:

1. Get a Google Places API key:
   - Go to Google Cloud Console
   - Enable Places API
   - Create credentials (API key)
   - Restrict the key to Places API

2. Find your business Place ID:
   - Use Google Place ID Finder
   - Search for "Engel & Engel Los Angeles"
   - Copy the Place ID

3. Replace the mock implementation above with:
   const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
   const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
   
4. Add to your .env.local file:
   NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
   NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id_here

5. Update the fetchGoogleReviews function to make real API calls
*/
