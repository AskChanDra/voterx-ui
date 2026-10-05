import React, { useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { getChartThemeColors } from './chartSetup';
import { CasteDistributionItem } from '../../types/demographics';

interface CastePieChartProps {
  casteData: CasteDistributionItem[];
  selectedCaste: string;
  onSelectCaste: (caste: string) => void;
  lang: 'np' | 'en';
  theme: 'light' | 'dark';
}

export const CastePieChart: React.FC<CastePieChartProps> = ({
  casteData,
  selectedCaste,
  onSelectCaste,
  lang,
  theme,
}) => {
  const [chartType, setChartType] = useState<'doughnut' | 'pie'>('doughnut');
  const themeColors = getChartThemeColors(theme);

  const backgroundColors = [
    '#6366f1', // Indigo - Magar
    '#ec4899', // Pink - Dalit
    '#f59e0b', // Amber - Chhetri
    '#10b981', // Emerald - Brahmin
    '#8b5cf6', // Purple - Newar & Others
  ];

  const hoverColors = [
    '#4f46e5',
    '#db2777',
    '#d97706',
    '#059669',
    '#7c3aed',
  ];

  const labels = casteData.map((item) =>
    lang === 'np' ? item.casteNepali.split(' ')[0] : item.caste
  );

  const dataValues = casteData.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
        borderColor: themeColors.borderColor,
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const totalVoters = casteData.reduce((acc, curr) => acc + curr.count, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.tooltipText,
        bodyColor: themeColors.tooltipText,
        borderColor: themeColors.tooltipBorder,
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const item = casteData[index];
            const pct = ((item.count / totalVoters) * 100).toFixed(1);
            return ` ${item.caste}: ${item.count.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
    onClick: (_: any, elements: any[]) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        const clickedItem = casteData[index];
        onSelectCaste(selectedCaste === clickedItem.caste ? 'all' : clickedItem.caste);
      }
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-200">
            {lang === 'np' ? 'जातिय जनसंख्या अनुपात' : 'Caste Population Share'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? 'मगर समुदाय धवलागिरी वडा ७ मा सर्वाधिक ५३.०% जनसंख्या'
              : 'Magar community leads with 53.0% share in Ward 7'}
          </p>
        </div>
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          <button
            onClick={() => setChartType('doughnut')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              chartType === 'doughnut'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Doughnut
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              chartType === 'pie'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Pie
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px]">
        {chartType === 'doughnut' ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Pie data={chartData} options={options} />
        )}

        {chartType === 'doughnut' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
              {totalVoters.toLocaleString()}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'np' ? 'कुल संकलित' : 'Total Voters'}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Legend with click-to-filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-200 dark:border-slate-800/80">
        {casteData.map((item, idx) => {
          const isSelected = selectedCaste === item.caste;
          return (
            <button
              key={item.caste}
              onClick={() => onSelectCaste(isSelected ? 'all' : item.caste)}
              className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors border ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-200'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: backgroundColors[idx] }}
                />
                <span className="truncate font-medium">
                  {lang === 'np' ? item.casteNepali.split(' ')[0] : item.caste}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-slate-200 font-semibold">{item.count.toLocaleString()}</span>
                <span>({item.percentage.toFixed(1)}%)</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
