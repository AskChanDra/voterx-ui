import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartThemeColors } from './chartSetup';
import { AgeSegmentItem } from '../../types/demographics';

interface AgeSegmentationChartProps {
  ageData: AgeSegmentItem[];
  selectedAgeRange: string;
  onSelectAgeRange: (range: string) => void;
  lang: 'np' | 'en';
  theme: 'light' | 'dark';
}

export const AgeSegmentationChart: React.FC<AgeSegmentationChartProps> = ({
  ageData,
  selectedAgeRange,
  onSelectAgeRange,
  lang,
  theme,
}) => {
  const [stacked, setStacked] = useState<boolean>(true);
  const themeColors = getChartThemeColors(theme);

  const labels = ageData.map((item) =>
    lang === 'np' ? `${item.range} (${item.rangeLabel.split(' ')[0]})` : `${item.range} yrs`
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: lang === 'np' ? 'महिला (Female)' : 'Female Voters',
        data: ageData.map((item) => item.female),
        backgroundColor: 'rgba(236, 72, 153, 0.85)',
        hoverBackgroundColor: '#ec4899',
        borderRadius: stacked ? 0 : 4,
      },
      {
        label: lang === 'np' ? 'पुरुष (Male)' : 'Male Voters',
        data: ageData.map((item) => item.male),
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        hoverBackgroundColor: '#3b82f6',
        borderRadius: stacked ? 4 : 4,
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
          usePointStyle: true,
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
            const item = ageData[index];
            return [
              `Total in Bracket: ${item.total.toLocaleString()} (${item.percentage}%)`,
              `Dominant Group: ${item.dominantCaste}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        stacked: stacked,
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
        stacked: stacked,
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
        const clickedRange = ageData[index].range;
        onSelectAgeRange(selectedAgeRange === clickedRange ? 'all' : clickedRange);
      }
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-200">
            {lang === 'np' ? 'उमेर समूह विभाजन (Age Segmentation)' : 'Age Segmentation Distribution'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? '३०–४४ वर्ष उमेर समूह सबैभन्दा ठूलो (३२.९%)'
              : 'Largest demographic in 30–44 cohort with 798 voters (32.9%)'}
          </p>
        </div>
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          <button
            onClick={() => setStacked(true)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              stacked
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Stacked
          </button>
          <button
            onClick={() => setStacked(false)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              !stacked
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 mt-2 border-t border-slate-200 dark:border-slate-800/80">
        {ageData.map((item) => {
          const isSelected = selectedAgeRange === item.range;
          return (
            <button
              key={item.range}
              onClick={() => onSelectAgeRange(isSelected ? 'all' : item.range)}
              className={`p-2 rounded-lg text-left transition-colors border ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                {item.range} yrs
              </div>
              <div className="text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
                {item.total.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                {item.percentage}% of total
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
