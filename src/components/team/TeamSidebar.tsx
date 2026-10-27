'use client';

import { useEffect, useState } from 'react';

interface SidebarSection {
  id: string;
  title: string;
}

interface TeamSidebarProps {
  sections: SidebarSection[];
  phone: string;
}

export default function TeamSidebar({ sections, phone }: TeamSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-28 bg-primary-950 py-6 rounded-xl border-t-4 border-[#D4AF37]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold mb-1 px-6">
          On This Page
        </p>
        <div className="h-[2px] ml-6 w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mb-6" />
        <nav className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm py-2 px-6 rounded-r border-l-2 transition-colors ${
                activeId === section.id
                  ? 'text-[#D4AF37] hover:text-[#D4AF37] border-[#D4AF37] font-medium bg-[#D4AF37]/20'
                  : 'text-white border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]'
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
