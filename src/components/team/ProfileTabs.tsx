'use client';

interface Tab {
    id: string;
    title: string;
}

interface ProfileTabsProps {
    tabs: Tab[];
    activeTabId: string;
    onTabChange: (id: string) => void;
}

export default function ProfileTabs({ tabs, activeTabId, onTabChange }: ProfileTabsProps) {
    return (
        <div className="sticky top-[86px] z-30 bg-white/80 backdrop-blur-xl border-b border-black/5 mb-16 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-col xl:flex-row xl:items-center py-6">
                <nav className="flex flex-wrap gap-x-6 gap-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`text-[12px] sm:text-[14px] tracking-[0.1em] font-bold uppercase transition-all duration-500 flex-shrink-0 relative py-2 text-left ${activeTabId === tab.id
                                    ? 'text-primary-950'
                                    : 'text-primary-950/40 hover:text-primary-950/70'
                                }`}
                        >
                            {tab.title}
                            {activeTabId === tab.id && (
                                <span className="absolute bottom-0 left-0 w-8 h-px bg-[#D4AF37]" />
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
