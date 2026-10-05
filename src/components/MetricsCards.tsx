import React from 'react';
import { Users, TrendingUp, UserCheck, CalendarDays, Award } from 'lucide-react';

interface MetricsCardsProps {
  totalCollected: number;
  totalExpected: number;
  selectedFilterCount: number;
  isFiltered: boolean;
  lang: 'np' | 'en';
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  totalCollected,
  totalExpected,
  selectedFilterCount,
  isFiltered,
  lang,
}) => {
  const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Total Voter Roll */}
      <div className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">
            {lang === 'np' ? 'कुल संकलित मतदाता' : 'Total Registered Roll'}
          </span>
          <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
            {isFiltered ? selectedFilterCount.toLocaleString() : totalCollected.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            / {totalExpected.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{collectionRate}% {lang === 'np' ? 'संकलन दर' : 'Collection Rate'}</span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">· Ward 7</span>
        </div>
      </div>

      {/* Metric 2: Dominant Caste */}
      <div className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">
            {lang === 'np' ? 'सर्वाधिक जनसंख्या भएको जात' : 'Dominant Caste Group'}
          </span>
          <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'np' ? 'मगर (Magar)' : 'Magar (Janajati)'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono font-medium tabular-nums">
            1,285 {lang === 'np' ? 'मतदाता' : 'voters'} (53.0%)
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            {lang === 'np' ? 'पुर्जा, जुग्जाली, पुन' : 'Purja, Jugjali'}
          </span>
        </div>
      </div>

      {/* Metric 3: Dominant Age Cohort */}
      <div className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">
            {lang === 'np' ? 'प्रमुख उमेर समूह (Age Peak)' : 'Peak Age Segmentation'}
          </span>
          <CalendarDays className="w-4 h-4 text-sky-500 dark:text-sky-400" />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
            30–44 <span className="text-base font-normal text-slate-500 dark:text-slate-400">yrs</span>
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-sky-600 dark:text-sky-400 font-mono font-medium tabular-nums">
            798 {lang === 'np' ? 'मतदाता' : 'voters'} (32.9%)
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            {lang === 'np' ? 'औसत उमेर: ४२.४ वर्ष' : 'Median: 42.4 yrs'}
          </span>
        </div>
      </div>

      {/* Metric 4: Gender Balance */}
      <div className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">
            {lang === 'np' ? 'महिला/पुरुष अनुपात (Gender)' : 'Gender Ratio Breakdown'}
          </span>
          <UserCheck className="w-4 h-4 text-pink-500 dark:text-pink-400" />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-pink-600 dark:text-pink-400 tabular-nums">
            53.6% <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Female</span>
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            46.4% Male (1,125)
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            1,300 Female Roll
          </span>
        </div>
      </div>
    </div>
  );
};
