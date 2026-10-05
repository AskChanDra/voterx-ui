import React, { useState } from 'react';
import { X, MapPin, Search, Check } from 'lucide-react';
import { LOCAL_AREAS_DIRECTORY } from '../data/nepalDemographics';
import { LocalAreaSummary } from '../types/demographics';

interface AreaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAreaId: string;
  onSelectArea: (area: LocalAreaSummary) => void;
  lang: 'np' | 'en';
}

export const AreaSelectorModal: React.FC<AreaSelectorModalProps> = ({
  isOpen,
  onClose,
  currentAreaId,
  onSelectArea,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = LOCAL_AREAS_DIRECTORY.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.nameNepali.includes(searchTerm) ||
      a.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {lang === 'np' ? 'स्थानीय तह छनोट गर्नुहोस्' : 'Select Local Administrative Area'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'np' ? 'स्थानीय तह वा जिल्लाको नाम लेख्नुहोस्...' : 'Search municipality or district...'}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'np'
              ? 'म्याग्दी, कास्की, काठमाडौँ लगायत नेपालभरका ७५३ स्थानीय तहका प्रतिनिधि तथ्याङ्क'
              : 'Switch administrative scopes across Myagdi, Gandaki, or other federal provinces'}
          </p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((area) => {
            const isSelected = area.id === currentAreaId;
            return (
              <button
                key={area.id}
                onClick={() => {
                  onSelectArea(area);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-100'
                    : 'bg-slate-50/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      {area.nameNepali}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                      {area.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {area.district} · {area.province} · {area.totalWards} Wards
                  </div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1">
                    Dominant: {area.dominantCaste} | Median Age: {area.medianAge} yrs
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <div className="text-right font-mono text-xs">
                    <div className="font-medium text-slate-800 dark:text-slate-200 tabular-nums">
                      {area.collectedVoters.toLocaleString()} voters
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      {((area.collectedVoters / area.expectedVoters) * 100).toFixed(1)}% rate
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filtered.length} locations</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
