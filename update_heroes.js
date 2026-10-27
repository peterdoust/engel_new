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

const newBgContent = `<div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 animate-ken-burns"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f3574] via-[#0f3574]/95 to-[#0f3574]" />
            <div className="absolute top-0 right-0 w-[1200px] h-[800px] bg-[#D4AF37]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>`;

const sectionRegex = /<section\s+[^>]*?bg-\[#0f3574\][^>]*?>/g;
const oldBgRegex = /<div className="absolute inset-0 z-0[\s\S]*?(?=<div className="[^"]*?relative z-10)/;
const h1ClassRegex = /<h1 className="[^"]*?"/g;
const spanClassRegex = /<span className="font-serif italic text-\[#D4AF37\][^"]*?"/g;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace section opening tag to have the new shorter padding
    content = content.replace(sectionRegex, (match) => {
        return `<section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[#0f3574] text-white text-center">`;
    });

    // 2. Replace the old background elements
    content = content.replace(oldBgRegex, newBgContent + '\n\n          ');

    // 3. Update h1 class
    content = content.replace(h1ClassRegex, `<h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white"`);

    // 4. Update span inside h1 class
    content = content.replace(spanClassRegex, `<span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem]"`);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
}

function crawl(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            crawl(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

targetDirs.forEach((dir) => {
    crawl(path.join(__dirname, dir));
});
