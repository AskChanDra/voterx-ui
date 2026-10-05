import React from 'react';
import {
  LayoutDashboard,
  PieChart,
  Calendar,
  Vote,
  FileSpreadsheet,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { CURRENT_SELECTION } from '../data/nepalDemographics';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: 'np' | 'en';
  onOpenAreaSelector: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  lang,
  onOpenAreaSelector,
}) => {
  const menuItems = [
    {
      id: 'overview',
      label: lang === 'np' ? 'समग्र विश्लेषक' : 'Overview Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      id: 'caste',
      label: lang === 'np' ? 'जातिय जनसांख्यिकी' : 'Caste & Ethnicity',
      icon: PieChart,
      badge: '5 Groups',
    },
    {
      id: 'age',
      label: lang === 'np' ? 'उमेर खण्ड विभाजन' : 'Age Segmentation',
      icon: Calendar,
      badge: '5 Cohorts',
    },
    {
      id: 'centers',
      label: lang === 'np' ? 'मतदान केन्द्र विश्लेषण' : 'Polling Centers',
      icon: Vote,
      badge: '3 Booths',
    },
    {
      id: 'voters',
      label: lang === 'np' ? 'मतदाता नामावली' : 'Voter Roll Registry',
      icon: FileSpreadsheet,
      badge: '2,425 Roll',
    },
    {
      id: 'areas700',
      label: lang === 'np' ? '७५३ स्थानीय तह तुलना' : '753 Local Areas Index',
      icon: Layers,
      badge: 'Benchmark',
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 transition-colors duration-200">
      {/* Administrative Hierarchy Scope Badge */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'np' ? 'सक्रिय स्थानीय क्षेत्र' : 'Selected Jurisdiction'}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            {CURRENT_SELECTION.province} · {CURRENT_SELECTION.district}
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
            {CURRENT_SELECTION.municipality} - वडा {CURRENT_SELECTION.ward}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
            ताकम, धारापानी र शिवाङ मतदान क्षेत्र
          </div>
          <button
            onClick={onOpenAreaSelector}
            className="w-full mt-2.5 py-1 text-center text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/70 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 rounded border border-slate-300 dark:border-slate-700/60 transition-colors"
          >
            {lang === 'np' ? 'क्षेत्र परिवर्तन गर्नुहोस् (Change)' : 'Switch Local Area'}
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {lang === 'np' ? 'मुख्य विश्लेषण' : 'Analytics Views'}
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-600/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'}`}>
                {item.badge}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Source Citation & Integrity Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/30">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{lang === 'np' ? 'निर्वाचन आयोग नेपाल' : 'Election Commission Roll'}</span>
        </div>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Official roll voterlist data synchronized for Ward 7.
        </p>
      </div>
    </aside>
  );
};
