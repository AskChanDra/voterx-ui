import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

export const getChartThemeColors = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  return {
    textColor: isDark ? '#94a3b8' : '#475569',
    headingColor: isDark ? '#f8fafc' : '#0f172a',
    gridColor: isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)',
    borderColor: isDark ? '#1e293b' : '#ffffff',
    tooltipBg: isDark ? '#0f172a' : '#1e293b',
    tooltipText: '#f8fafc',
    tooltipBorder: isDark ? '#334155' : '#475569',
  };
};

