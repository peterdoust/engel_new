const fs = require('fs');
const path = require('path');

const targetDirs = [
    'src/app/events',
    'src/app/careers',
    'src/app/publications',
    'src/app/services',
    'src/app/practice-areas',
    'src/app/contact',
    'src/components/events'
];

function processFile(filePath) {
    if (filePath.endsWith('EventCalendar.tsx') || filePath.endsWith('EventDetailContent.tsx')) {
        return; // Don't replace inside these files
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Find the first <section> tag to its closing </section>
    // However, <section> might contain nested tags, so a simple regex won't work well.
    // Let's find the section that contains the h1 title, since we want to replace the hero.

    // We can confidently assume the first <section> in page.tsx is the hero.
    // But since it might contain children, we use a regex that matches `<section` up to the first `</section>`
    const firstSectionStart = content.indexOf('<section');
    if (firstSectionStart === -1) return;

    const firstSectionEnd = content.indexOf('</section>', firstSectionStart);
    if (firstSectionEnd === -1) return;

    const heroBlock = content.slice(firstSectionStart, firstSectionEnd + '</section>'.length);

    // Ensure this is actually the hero section containing an <h1>
    if (!heroBlock.includes('<h1')) {
        return;
    }

    // Extract title text.
    // Formats:
    // 1. <h1 ...> Title <br /> <span ...>Subtitle</span> </h1>
    // 2. <h1 ...> Connect With <span ...>Experts</span> </h1>
    const h1Match = heroBlock.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1Match) return;
    let h1ContentOrig = h1Match[1].trim();

    // Now simplify the h1 text to extract Title Upper and Title Lower
    let titleUpper = '';
    let titleLower = '';

    // If there's a span:
    if (h1ContentOrig.includes('<span')) {
        let textBeforeSpanMatch = h1ContentOrig.match(/([\s\S]*?)<span/);
        if (textBeforeSpanMatch) {
            titleUpper = textBeforeSpanMatch[1].replace(/<br\s*\/?>/g, '').trim();
        }
        let spanMatch = h1ContentOrig.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        if (spanMatch) {
            titleLower = spanMatch[1].replace(/<br\s*\/?>/g, '').trim();
        }
    } else {
        // Just text, maybe a <br />
        let parts = h1ContentOrig.split(/<br\s*\/?>/);
        if (parts.length > 1) {
            titleUpper = parts[0].trim();
            titleLower = parts[1].trim();
        } else {
            titleUpper = h1ContentOrig.trim();
        }
    }

    const newHeroBlock = `<section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[#0f3574] text-white text-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 animate-ken-burns"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f3574] via-[#0f3574]/95 to-[#0f3574]" />
            <div className="absolute top-0 right-0 w-[1200px] h-[800px] bg-[#D4AF37]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white">
                ${titleUpper}${titleLower ? ` <br />\n                <span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem]">${titleLower}</span>` : ''}
              </h1>
            </motion.div>
          </div>
        </section>`;

    // Replace the old hero block with the new one
    // But be careful! EventsContent.tsx puts `<section ref={heroRef} ...>`.
    // It also imports framer motion hooks. If we strip it out, we might leave unused vars.
    // It is fine to leave unused vars to avoid syntax errors, then we can clean them up if they cause build errors.
    content = content.replace(heroBlock, newHeroBlock);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Rebuilt Hero for:', filePath);
    }
}

function crawl(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            crawl(fullPath);
        } else if (fullPath.endsWith('.tsx') && !fullPath.includes('layout.tsx')) {
            processFile(fullPath);
        }
    }
}

targetDirs.forEach((dir) => {
    crawl(path.join(__dirname, dir));
});
