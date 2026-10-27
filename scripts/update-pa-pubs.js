const fs = require('fs');
const path = require('path');

const updates = [
    {
        folder: 'alter-ego',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following Alter Ego publications:',
        items: [
            'Investigation and Discovery of Alter Ego Factors',
            'The Element of Undercapitalization'
        ]
    },
    {
        folder: 'fraudulent-transfers',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following research publications in connection with fraudulent transfers:',
        items: [
            'The Element of Reasonably Equivalent Value',
            'The Element of Insolvency',
            'The Element of Reasonably Small Capital',
            'The Element of Inability to Pay Debts as they Mature'
        ]
    },
    {
        folder: 'employment-litigation',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following employment damages publication:',
        items: [
            'Framework for the Calculation of Employment Damages'
        ]
    },
    {
        folder: 'personal-injury',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following publications on the subject of economic damages:',
        items: [
            'Financial Principles for Calculating Lost Profits',
            'The Element of Certainty in Calculating Lost Profits',
            'Prospective Lost Profits',
            'Calculating Lost Profits for Unestablished Businesses',
            'Mitigation of Damages',
            'Discounting Future Lost Profits',
            'Framework for the Calculation of Employment Damages',
            'Framework for the Calculation of Infringement Damages: Part I: "Trademark Infringement Dam-ages Under the Lanham Act"'
        ]
    },
    {
        folder: 'partnership-disputes',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following research publication in connection with partnership and shareholder disputes:',
        items: [
            'Business Valuation under Corporation Code Section 2000'
        ]
    },
    {
        folder: 'defamation',
        title: 'Research Publications',
        text: 'Engel & Engel has published the following publications on the subject of economic damages:',
        items: [
            'Financial Principles for Calculating Lost Profits',
            'The Element of Certainty in Calculating Lost Profits',
            'Prospective Lost Profits',
            'Calculating Lost Profits for Unestablished Businesses',
            'Mitigation of Damages',
            'Discounting Future Lost Profits',
            'Framework for the Calculation of Employment Damages'
        ]
    }
];

const dir = 'c:\\project\\c12old animation\\src\\app\\practice-areas';

for (const update of updates) {
    const pagePath = path.join(dir, update.folder, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    if (content.includes('Research Publications') && content.includes('{/* ══════════ PUBLICATIONS ══════════ */}')) {
        console.log(`Skipping ${update.folder}, already has publications.`);
        continue;
    }

    const itemsStr = update.items.map(item => `                  <li key="${item.replace(/"/g, '&quot;')}" className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 text-[#0f3574] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3574] group-hover:text-white transition-colors duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-current" />
                    </div>
                    <span className="text-lg font-medium text-slate-700 leading-snug group-hover:text-[#0f3574] transition-colors">${item.replace(/"/g, '&quot;')}</span>
                  </li>`).join('\n');

    const pubSection = `        {/* ══════════ PUBLICATIONS ══════════ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-custom max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-3xl border border-blue-100 p-10 md:p-16 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3574] tracking-tight mb-8 pb-3 border-b-2 border-[#0f3574] w-fit">
                ${update.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                ${update.text}
              </p>
              <ul className="grid grid-cols-1 gap-4">
${itemsStr}
              </ul>
            </motion.div>
          </div>
        </section>

`;

    // Insert before CONTACT CTA
    content = content.replace(
        '        {/* ══════════ CONTACT CTA ══════════ */}',
        pubSection + '        {/* ══════════ CONTACT CTA ══════════ */}'
    );

    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Updated ${update.folder}`);
}
