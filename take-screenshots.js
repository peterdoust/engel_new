// Screenshot script for practice area pages
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pages = [
  {
    name: 'business-valuation',
    newUrl: 'http://localhost:3000/practice-areas/business-valuation',
    oldUrl: 'https://engelandengel.com/business-valuation'
  },
  {
    name: 'construction-litigation',
    newUrl: 'http://localhost:3000/practice-areas/construction-litigation',
    oldUrl: 'https://engelandengel.com/construction-litigation'
  },
  {
    name: 'economic-damages',
    newUrl: 'http://localhost:3000/practice-areas/economic-damages',
    oldUrl: 'https://engelandengel.com/economic-damages'
  },
  {
    name: 'employment-litigation',
    newUrl: 'http://localhost:3000/practice-areas/employment-litigation',
    oldUrl: 'https://engelandengel.com/employment-litigation'
  },
  {
    name: 'fraud-investigation',
    newUrl: 'http://localhost:3000/practice-areas/fraud-investigation',
    oldUrl: 'https://engelandengel.com/fraud-investigation'
  },
  {
    name: 'intellectual-property',
    newUrl: 'http://localhost:3000/practice-areas/intellectual-property',
    oldUrl: 'https://engelandengel.com/intellectual-property-ip-litigation'
  },
  {
    name: 'partnership-disputes',
    newUrl: 'http://localhost:3000/practice-areas/partnership-disputes',
    oldUrl: 'https://engelandengel.com/partnership-shareholder-disputes'
  },
  {
    name: 'personal-injury',
    newUrl: 'http://localhost:3000/practice-areas/personal-injury',
    oldUrl: 'https://engelandengel.com/personal-injury'
  },
  {
    name: 'real-estate-litigation',
    newUrl: 'http://localhost:3000/practice-areas/real-estate-litigation',
    oldUrl: 'https://engelandengel.com/real-estate-litigation'
  },
  {
    name: 'trust-probate-litigation',
    newUrl: 'http://localhost:3000/practice-areas/trust-probate-litigation',
    oldUrl: 'https://engelandengel.com/trust-probate-litigation'
  },
  {
    name: 'bankruptcy-insolvency',
    newUrl: 'http://localhost:3000/practice-areas/bankruptcy-insolvency',
    oldUrl: 'https://engelandengel.com/bankruptcy-insolvency'
  },
  {
    name: 'business-interruption',
    newUrl: 'http://localhost:3000/practice-areas/business-interruption',
    oldUrl: 'https://engelandengel.com/business-interruption'
  },
  {
    name: 'defamation',
    newUrl: 'http://localhost:3000/practice-areas/defamation',
    oldUrl: 'https://engelandengel.com/defamation'
  },
  {
    name: 'fraudulent-transfers',
    newUrl: 'http://localhost:3000/practice-areas/fraudulent-transfers',
    oldUrl: 'https://engelandengel.com/fraudulent-transfers'
  }
];

async function takeScreenshots() {
  console.log('🚀 Starting screenshot process...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const page of pages) {
    console.log(`📸 Taking screenshots for: ${page.name}`);
    
    try {
      // Screenshot NEW website
      const newPage = await browser.newPage();
      await newPage.setViewport({ width: 1920, height: 1080 });
      await newPage.goto(page.newUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await newPage.screenshot({
        path: `screenshots/${page.name}-new.png`,
        fullPage: true
      });
      await newPage.close();
      console.log(`  ✅ New site screenshot saved`);

      // Screenshot ORIGINAL website
      const oldPage = await browser.newPage();
      await oldPage.setViewport({ width: 1920, height: 1080 });
      await oldPage.goto(page.oldUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await oldPage.screenshot({
        path: `screenshots/${page.name}-original.png`,
        fullPage: true
      });
      await oldPage.close();
      console.log(`  ✅ Original site screenshot saved\n`);
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
    }
  }

  await browser.close();
  console.log('✅ All screenshots completed!');
}

takeScreenshots().catch(console.error);

