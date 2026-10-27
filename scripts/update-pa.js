const fs = require('fs');
const path = require('path');

const dir = 'c:\\project\\c12old animation\\src\\app\\practice-areas';
const files = fs.readdirSync(dir, { withFileTypes: true });

const templateStr = fs.readFileSync(path.join(dir, 'economic-damages', 'page.tsx'), 'utf8');

for (const f of files) {
    if (f.isDirectory() && f.name !== 'economic-damages') {
        const pagePath = path.join(dir, f.name, 'page.tsx');
        if (!fs.existsSync(pagePath)) continue;

        const content = fs.readFileSync(pagePath, 'utf8');
        if (!content.includes('const sections = [')) {
            console.log(`Skipping ${f.name} (no sections array)`);
            continue;
        }

        // Extract Hero Info
        const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        let title1 = "Title Phase 1";
        let title2 = "Phase 2";
        if (h1Match) {
            const h1Inner = h1Match[1];
            const textMatch = h1Inner.match(/([^<]+?)\s*<br \/>/);
            if (textMatch) title1 = textMatch[1].trim();

            const spanMatch = h1Inner.match(/<span[^>]*>(.+?)<\/span>/);
            if (spanMatch) title2 = spanMatch[1].trim();
        }

        // Extract Sections via regex/eval
        let sectionsMatch = content.match(/const sections = (\[[\s\S]*?\]);/);
        if (!sectionsMatch) {
            sectionsMatch = content.match(/const sections = (\[[\s\S]*?\])\s*const/);
        }
        let sectionsData = [];
        if (sectionsMatch) {
            try {
                const evalStr = `(function() { return ${sectionsMatch[1]}; })()`;
                sectionsData = eval(evalStr);
            } catch (e) {
                console.log(`Failed to eval sections in ${f.name}`);
            }
        }

        // Prepare variables
        let overviewText = "";
        if (sectionsData[0] && sectionsData[0].paragraphs) {
            overviewText = sectionsData[0].paragraphs.join('<br/><br/>');
        }

        let servicesTitle = 'How Engel & Engel Helps Business Litigators';
        let servicesSubtitle = 'When the stakes are high, Engel & Engel can serve as your expert in connection with the following:';
        let servicesItems = [];

        if (sectionsData[1] && sectionsData[1].paragraphs) {
            servicesTitle = sectionsData[1].paragraphs[0] || servicesTitle;
            servicesSubtitle = sectionsData[1].paragraphs[1] || servicesSubtitle;
        }
        if (sectionsData[1] && sectionsData[1].items) {
            servicesItems = sectionsData[1].items;
        }

        let itemsStr = "";
        for (const item of servicesItems) {
            itemsStr += `
                  <li key="${item}" className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-[#0f3574] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3574] group-hover:text-white transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <span className="text-[1.05rem] font-medium text-slate-700 leading-snug group-hover:text-[#0f3574] transition-colors">{${JSON.stringify(item)}}</span>
                  </li>`;
        }

        let newContent = templateStr;

        // Component Name
        const compName = f.name.split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('') + 'Page';
        newContent = newContent.replace('export default function EconomicDamagesPage()', `export default function ${compName}()`);

        // Replace Hero
        newContent = newContent.replace(
            /Economic <br \/>\s*<span className="font-serif italic text-\[#D4AF37\] font-medium">Damages<\/span>/g,
            `${title1} <br />\n                  <span className="font-serif italic text-[#D4AF37] font-medium">${title2}</span>`
        );

        // Replace Overview Text
        // Instead of regex exactly, we replace `<p className="text-slate-600 leading-relaxed text-xl text-slate-700 font-medium">\n...`
        newContent = newContent.replace(
            /{?\/\* ══════════ OVERVIEW ══════════ \*\/}?([\s\S]*?)<motion.div\s+initial=\{\{ opacity: 0, x: 30 \}\}/g,
            (match, overviewBlock) => {
                return match.replace(/<p className=\{`text-slate-600[^>]*>[\s\S]*?<\/p>/, `<p className="text-slate-600 leading-relaxed text-xl text-slate-700 font-medium" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(overviewText)} }}></p>`);
            }
        );

        // Replace Services Text
        newContent = newContent.replace(
            />\s*How Engel &amp; Engel Helps Business Litigators With Economic Damage Analyses\s*<\/h2>/,
            `> ${servicesTitle} </h2>`
        );
        newContent = newContent.replace(
            />\s*When the stakes are high, Engel &amp; Engel can serve as your expert in connection with the following:\s*<\/p>/,
            `> ${servicesSubtitle} </p>`
        );

        // Replace Services List
        newContent = newContent.replace(
            /<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">[\s\S]*?<\/ul>/,
            `<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${itemsStr}\n              </ul>`
        );

        // Remove Publications section completely
        newContent = newContent.replace(
            /{\/\* ══════════ PUBLICATIONS ══════════ \*\/}*[\s\S]*?(?={\/\* ══════════ CONTACT CTA ══════════ \*\/})/g,
            ""
        );

        fs.writeFileSync(pagePath, newContent, 'utf8');
        console.log(`Updated ${f.name}`);
    }
}
