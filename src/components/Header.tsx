import React from 'react';
import { Download, Globe, MapPin, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: 'np' | 'en';
  onToggleLang: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAreaSelector: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenAreaSelector,
  onOpenExportModal,
}) => {
  const navItems = [
    { id: 'overview', label: lang === 'np' ? 'डैशबोर्ड' : 'Overview' },
    { id: 'caste', label: lang === 'np' ? 'जातिय' : 'Caste' },
    { id: 'age', label: lang === 'np' ? 'उमेर' : 'Age' },
    { id: 'centers', label: lang === 'np' ? 'केन्द्र' : 'Booths' },
    { id: 'voters', label: lang === 'np' ? 'नामावली' : 'Voters' },
    { id: 'areas700', label: lang === 'np' ? '७५३ स्थानीय तह' : '753 Areas' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-4">
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('overview');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors whitespace-nowrap"
        >
          JanSamankhya
        </a>

        {/* Quiet breadcrumb for current active administrative level */}
        <button
          onClick={onOpenAreaSelector}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Change Local Area / Ward"
        >
          <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>धवलागिरी-७, म्याग्दी (Dhawalagiri W7)</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase ml-1">Change</span>
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === item.id
                ? 'text-indigo-600 dark:text-white border-b-2 border-indigo-600 dark:border-indigo-500 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Primary actions + Theme Toggle */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle (Light / Dark) */}
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* Language switch */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span>{lang === 'np' ? 'English' : 'नेपाली'}</span>
        </button>

        {/* Export Data */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'np' ? 'प्रतिवेदन डाउनलोड' : 'Export Data'}</span>
          <span className="sm:hidden">{lang === 'np' ? 'प्रतिवेदन' : 'Export'}</span>
        </button>
      </div>
    </header>
  );
};
