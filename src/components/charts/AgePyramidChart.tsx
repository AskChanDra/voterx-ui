import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartThemeColors } from './chartSetup';
import { AgeSegmentItem } from '../../types/demographics';

interface AgePyramidChartProps {
  ageData: AgeSegmentItem[];
  lang: 'np' | 'en';
  theme: 'light' | 'dark';
}

export const AgePyramidChart: React.FC<AgePyramidChartProps> = ({ ageData, lang, theme }) => {
  const themeColors = getChartThemeColors(theme);
  const labels = ageData.map((item) => item.range + ' yrs');
  const maleData = ageData.map((item) => -item.male);
  const femaleData = ageData.map((item) => item.female);

  const chartData = {
    labels,
    datasets: [
      {
        label: lang === 'np' ? 'पुरुष (Male)' : 'Male',
        data: maleData,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: lang === 'np' ? 'महिला (Female)' : 'Female',
        data: femaleData,
        backgroundColor: '#ec4899',
        borderRadius: 4,
      },
    ],
  };

  const options: any = {
    indexAxis: 'y' as const,
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
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.tooltipText,
        bodyColor: themeColors.tooltipText,
        borderColor: themeColors.tooltipBorder,
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const rawVal = Math.abs(context.raw);
            return ` ${context.dataset.label}: ${rawVal.toLocaleString()} voters`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: themeColors.gridColor,
        },
        ticks: {
          callback: (value: number) => Math.abs(value),
          color: themeColors.textColor,
          font: { size: 10 },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: themeColors.textColor,
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-200">
            {lang === 'np' ? 'जनसांख्यिकीय पिरामिड (Population Pyramid)' : 'Demographic Age Pyramid'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? 'वैदेशिक रोजगारीका कारण १८–४४ समूहमा पुरुष संख्या कम, महिला बढी'
              : 'Female voters exceed males in 18–44 age bracket due to labor migration'}
          </p>
        </div>
      </div>
      <div className="relative flex-1 min-h-[200px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
