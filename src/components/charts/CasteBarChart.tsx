import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartThemeColors } from './chartSetup';
import { CasteDistributionItem } from '../../types/demographics';

interface CasteBarChartProps {
  casteData: CasteDistributionItem[];
  selectedCaste: string;
  onSelectCaste: (caste: string) => void;
  lang: 'np' | 'en';
  theme: 'light' | 'dark';
}

export const CasteBarChart: React.FC<CasteBarChartProps> = ({
  casteData,
  selectedCaste,
  onSelectCaste,
  lang,
  theme,
}) => {
  const [viewMode, setViewMode] = useState<'total' | 'gender'>('gender');
  const themeColors = getChartThemeColors(theme);

  const labels = casteData.map((item) =>
    lang === 'np' ? item.casteNepali.split(' ')[0] : item.caste
  );

  const chartData = {
    labels,
    datasets:
      viewMode === 'total'
        ? [
            {
              label: lang === 'np' ? 'कुल मतदाता' : 'Total Voters',
              data: casteData.map((item) => item.count),
              backgroundColor: '#6366f1',
              hoverBackgroundColor: '#4f46e5',
              borderRadius: 6,
              borderSkipped: false,
            },
          ]
        : [
            {
              label: lang === 'np' ? 'महिला (Female)' : 'Female Voters',
              data: casteData.map((item) => item.femaleCount),
              backgroundColor: '#ec4899',
              hoverBackgroundColor: '#db2777',
              borderRadius: 6,
            },
            {
              label: lang === 'np' ? 'पुरुष (Male)' : 'Male Voters',
              data: casteData.map((item) => item.maleCount),
              backgroundColor: '#3b82f6',
              hoverBackgroundColor: '#2563eb',
              borderRadius: 6,
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
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle',
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
          footer: (tooltipItems: any[]) => {
            const dataIndex = tooltipItems[0].dataIndex;
            const item = casteData[dataIndex];
            return `Avg Age: ${item.avgAge} yrs | Top Surnames: ${item.topSurnames.slice(0, 2).join(', ')}`;
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
            {lang === 'np' ? 'जातिय जनसंख्या तुलनात्मक चार्ट' : 'Caste Population Breakdown'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? 'मगर (१,२८५), दलित (५६०), क्षेत्री (३२८), ब्राह्मण (१९२)'
              : 'Population volumes across major demographic clusters'}
          </p>
        </div>
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('gender')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'gender'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {lang === 'np' ? 'लिङ्ग अनुसार' : 'By Gender'}
          </button>
          <button
            onClick={() => setViewMode('total')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'total'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {lang === 'np' ? 'कुल' : 'Total'}
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>
          💡 {lang === 'np' ? 'दलित समुदायमा युवा जनसंख्याको अनुपात सबैभन्दा बढी (औसत ३८.६ वर्ष)' : 'Dalit cluster has the youngest average age (38.6 yrs)'}
        </span>
        <span className="font-mono text-slate-400 dark:text-slate-500">
          {casteData.length} Caste Groups Analyzed
        </span>
      </div>
    </div>
  );
};
