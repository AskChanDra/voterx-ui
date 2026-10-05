import React from 'react';
import { X, Printer, Download, FileText } from 'lucide-react';
import {
  CURRENT_SELECTION,
  POLLING_CENTERS,
  CASTE_DISTRIBUTION,
  TOTAL_METRICS,
  AGE_SEGMENTATION,
} from '../data/nepalDemographics';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'np' | 'en';
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      jurisdiction: CURRENT_SELECTION,
      metrics: TOTAL_METRICS,
      pollingCenters: POLLING_CENTERS,
      casteDistribution: CASTE_DISTRIBUTION,
      ageSegmentation: AGE_SEGMENTATION,
      generatedAt: new Date().toISOString(),
      source: 'Election Commission of Nepal (voterlist.election.gov.np)',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `demographic_report_dhawalagiri_ward7_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {lang === 'np'
                ? 'कार्यकारी जनसांख्यिकी प्रतिवेदन सारांश'
                : 'Executive Demographic Briefing Report'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 dark:text-slate-200">
          {/* Header block */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {CURRENT_SELECTION.municipality} - वडा नं. {CURRENT_SELECTION.ward}
            </h2>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
              {CURRENT_SELECTION.district}, {CURRENT_SELECTION.province}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              मतदाता नामावली जनसांख्यिकी तथा जातिय/उमेर वर्गीकरण विश्लेषण प्रतिवेदन
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Date: 2026-10-04</span>
              <span>·</span>
              <span>Ref: ECN-VOTER-MYA-7</span>
            </div>
          </div>

          {/* Key Metrics table */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              १. मुख्य सारांश परिसूचक (Key Summary Indicators)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">कुल संकलित मतदाता:</div>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1">2,425 / 2,942</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">82.43% Collection</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">सर्वाधिक जनसंख्या:</div>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-300 mt-1">मगर (Magar)</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">1,285 जना (53.0%)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">प्रमुख उमेर समूह:</div>
                <div className="text-sm font-bold text-sky-600 dark:text-sky-300 mt-1">३०–४४ वर्ष</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">798 जना (32.9%)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">लैङ्गिक अनुपात:</div>
                <div className="text-sm font-bold text-pink-600 dark:text-pink-300 mt-1">५३.६% महिला</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">1,300 F vs 1,125 M</div>
              </div>
            </div>
          </div>

          {/* Caste Table */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              २. जातिय तथा समुदायगत जनसंख्या विवरण (Caste Breakdown)
            </h4>
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-2 px-3">जातिय समूह</th>
                  <th className="py-2 px-3 text-right">मतदाता संख्या</th>
                  <th className="py-2 px-3 text-right">प्रतिशत</th>
                  <th className="py-2 px-3">मुख्य थरहरू</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950/40">
                {CASTE_DISTRIBUTION.map((item) => (
                  <tr key={item.caste}>
                    <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">{item.casteNepali}</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-800 dark:text-slate-100">{item.count}</td>
                    <td className="py-2 px-3 text-right font-mono text-indigo-600 dark:text-indigo-300">{item.percentage.toFixed(1)}%</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400 text-[11px]">{item.topSurnames.slice(0, 3).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Polling Booth Table */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              ३. मतदान केन्द्र संकलन विवरण (Polling Booths)
            </h4>
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-2 px-3">मतदान केन्द्र</th>
                  <th className="py-2 px-3 text-right">अपेक्षित</th>
                  <th className="py-2 px-3 text-right">संकलित</th>
                  <th className="py-2 px-3 text-right">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950/40">
                {POLLING_CENTERS.map((c) => (
                  <tr key={c.locationId}>
                    <td className="py-2 px-3 text-slate-800 dark:text-slate-200">{c.polling_center}</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-600 dark:text-slate-400">{c.expected}</td>
                    <td className="py-2 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{c.collected}</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700 dark:text-slate-200">{c.collectionRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Raw JSON</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
