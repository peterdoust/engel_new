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
    id: '0',
    author: 'Mark K.',
    firstName: 'Mark',
    rating: 5,
    text: 'I am a real estate litigation attorney who has used Jason Engel as my forensic accounting expert in two multi-million dollar cases. He is eminently responsive and able to synthesize complicated financial transactions so that the fact-finder may easily understand them at trial.\n\nI highly recommend him and intend to use him again if the need arises.',
    date: '2026-04-22'
  },
  {
    id: '1',
    author: 'Eric K.',
    firstName: 'Eric',
    rating: 5,
    text: 'I used Jason in a contentious breach of contract case with eight-figure damages. The case was barreling toward trial, and Jason was asked to provide his analysis and opinion in a very short time frame and under significant pressure from the client. Jason and his team did a fantastic job. He was extremely responsive and his report was exactly what we needed. I will use Jason again.',
    date: '2026-04-21'
  },
  {
    id: '2',
    author: 'Michael S.',
    firstName: 'Michael',
    rating: 5,
    text: "I have had the privilege of using Jason Engel's professional services for many years. Simply stated, he is not only excellent at what he does, he is a creative problem solver who always has innovative ways to advance my clients' interests. I would recommend him without reservation to anyone who is in need of the many services he provides.",
    date: '2026-04-20'
  },
  {
    id: '3',
    author: 'Geoffrey G.',
    firstName: 'Geoffrey',
    rating: 5,
    text: 'Jason is the kind of expert witness you want. One who is always going to provide a well-supported expert opinion. His opinion is independent. It might not always be the one you would hope to hear. But it is the one that is right and correct. Jason is careful, attentive to detail and thorough. He presents well at trial. And he is a pleasure to work with. He has my highest recommendation.',
    date: '2026-04-19'
  },
  {
    id: '4',
    author: 'Brian F.',
    firstName: 'Brian',
    rating: 5,
    text: 'We hired Engel & Engel as a forensic accountant on a construction defect case. We found Jason and Brandon to both be knowledgeable, responsive and professional. We will definitely use them again.',
    date: '2026-04-18'
  },
  {
    id: '5',
    author: 'Ed M.',
    firstName: 'Ed',
    rating: 5,
    text: 'Jason Engel and his team are professional, knowledgeable, honest, and trustworthy. I would recommend Engel & Engel for any accounting matters.',
    date: '2026-04-17'
  },
  {
    id: '6',
    author: 'Phillip S.',
    firstName: 'Phillip',
    rating: 5,
    text: 'Excellent forensic accounting experts. Sharp analysis and clear presentation. Timely follow through and ability to work under short deadlines.',
    date: '2026-04-16'
  },
  {
    id: '7',
    author: 'David S.',
    firstName: 'David',
    rating: 5,
    text: 'Amazing and thorough job as experts in a Piercing the Corporate Veil case. Very thankful.',
    date: '2026-04-15'
  },
  {
    id: '8',
    author: 'Eric W.',
    firstName: 'Eric',
    rating: 5,
    text: 'The Engels are the best in the business, hands down. They are a remarkable father-son duo, and I had the opportunity to work with them on a very high-stakes, company-breaking matter. They were outstanding from start to finish. They reviewed opposing counsel’s expert work and professionally dismantled it with precision and credibility. They updated their reports in real time when needed, responded thoroughly to the arbitrator’s inquiries, and provided strong backup for every position they took. Our success was due in large part to having the Engels in our corner. I recommend them without hesitation.',
    date: '2026-04-14'
  },
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
