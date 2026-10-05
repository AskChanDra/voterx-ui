import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartThemeColors } from './chartSetup';
import { PollingCenterSummary } from '../../types/demographics';

interface PollingCenterChartProps {
  pollingCenters: PollingCenterSummary[];
  selectedCenter: string;
  onSelectCenter: (center: string) => void;
  lang: 'np' | 'en';
  theme: 'light' | 'dark';
}

export const PollingCenterChart: React.FC<PollingCenterChartProps> = ({
  pollingCenters,
  selectedCenter,
  onSelectCenter,
  lang,
  theme,
}) => {
  const themeColors = getChartThemeColors(theme);

  const shortNames = pollingCenters.map((c) => {
    if (c.polling_center.includes('धारापानी')) return lang === 'np' ? 'धारापानी (धारापानी)' : 'Dharapani';
    if (c.polling_center.includes('ताकम')) return lang === 'np' ? 'ताकम मा.वि. (ताकम)' : 'Takam Secondary';
    if (c.polling_center.includes('शिवाङ')) return lang === 'np' ? 'हेम मा.वि. (शिवाङ)' : 'Shiwang (Hem)';
    return c.polling_center;
  });

  const chartData = {
    labels: shortNames,
    datasets: [
      {
        label: lang === 'np' ? 'अपेक्षित मतदाता (Expected)' : 'Expected Voters',
        data: pollingCenters.map((c) => c.expected),
        backgroundColor: theme === 'dark' ? 'rgba(148, 163, 184, 0.35)' : 'rgba(203, 213, 225, 0.7)',
        borderColor: theme === 'dark' ? '#94a3b8' : '#64748b',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: lang === 'np' ? 'संकलित मतदाता (Collected)' : 'Collected Roll',
        data: pollingCenters.map((c) => c.collected),
        backgroundColor: '#10b981',
        hoverBackgroundColor: '#059669',
        borderRadius: 4,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          color: themeColors.textColor,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.tooltipText,
        bodyColor: themeColors.tooltipText,
        borderColor: themeColors.tooltipBorder,
        borderWidth: 1,
        callbacks: {
          afterBody: (items: any[]) => {
            const index = items[0].dataIndex;
            const item = pollingCenters[index];
            return [
              `Collection Rate: ${item.collectionRate.toFixed(1)}%`,
              `Women: ${item.femaleVoters} | Men: ${item.maleVoters}`,
              `Booth ID: ${item.locationId.substring(0, 12)}...`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: themeColors.textColor,
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: themeColors.gridColor,
        },
        ticks: {
          color: themeColors.textColor,
          font: {
            size: 11,
          },
        },
      },
    },
    onClick: (_: any, elements: any[]) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        const center = pollingCenters[index];
        onSelectCenter(selectedCenter === center.polling_center ? 'all' : center.polling_center);
      }
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-200">
            {lang === 'np' ? 'मतदान केन्द्र संकलन विवरण' : 'Polling Center Roll Collection'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? 'हेम मा.वि. शिवाङमा सर्वाधिक ८५.७% संकलन'
              : 'Shiwang leads voter roll collection rate at 85.7%'}
          </p>
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 mt-2 border-t border-slate-200 dark:border-slate-800/80">
        {pollingCenters.map((c) => {
          const isSelected = selectedCenter === c.polling_center;
          return (
            <button
              key={c.locationId}
              onClick={() => onSelectCenter(isSelected ? 'all' : c.polling_center)}
              className={`p-2 rounded-lg text-left transition-colors border ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/50'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium truncate">
                {c.polling_center.split(',')[0]}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {c.collected.toLocaleString()} / {c.expected.toLocaleString()}
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300">
                  {c.collectionRate.toFixed(1)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
