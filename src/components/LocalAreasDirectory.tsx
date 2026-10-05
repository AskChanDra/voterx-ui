import React, { useState, useMemo } from 'react';
import { Search, Building2, Check, ArrowRight } from 'lucide-react';
import { LOCAL_AREAS_DIRECTORY } from '../data/nepalDemographics';
import { LocalAreaSummary } from '../types/demographics';

interface LocalAreasDirectoryProps {
  currentAreaId: string;
  onSelectArea: (area: LocalAreaSummary) => void;
  lang: 'np' | 'en';
}

export const LocalAreasDirectory: React.FC<LocalAreasDirectoryProps> = ({
  currentAreaId,
  onSelectArea,
  lang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredAreas = useMemo(() => {
    return LOCAL_AREAS_DIRECTORY.filter((area) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches =
          area.name.toLowerCase().includes(query) ||
          area.nameNepali.includes(query) ||
          area.district.toLowerCase().includes(query) ||
          area.province.toLowerCase().includes(query);
        if (!matches) return false;
      }

      if (selectedProvince !== 'all' && !area.province.includes(selectedProvince)) {
        return false;
      }

      if (selectedType !== 'all' && area.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedProvince, selectedType]);

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4 transition-colors duration-200">
      {/* Header and scaling explainer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {lang === 'np'
                ? 'नेपालका ७५३ स्थानीय तह डाइरेक्टरी र तुलना'
                : 'Nepal 753 Local Governments Demographic Index'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? '७५३ स्थानीय तह (महानगर, उपमहानगर, नगरपालिका, गाउँपालिका) बीच जनसांख्यिकी र मतदाता संकलन तुलना'
              : 'Standardized demographic & voter roll registry scalable across all 753 local levels of Nepal'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300">
            {LOCAL_AREAS_DIRECTORY.length} of 753 Representative Areas
          </span>
        </div>
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'np' ? 'स्थानीय तह वा जिल्ला खोज्नुहोस्...' : 'Search local area, district...'}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै प्रदेश (All Provinces)' : 'All Provinces'}</option>
            <option value="गण्डकी">गण्डकी प्रदेश (Gandaki)</option>
            <option value="बागमती">बागमती प्रदेश (Bagmati)</option>
            <option value="कोशी">कोशी प्रदेश (Koshi)</option>
            <option value="लुम्बिनी">लुम्बिनी प्रदेश (Lumbini)</option>
            <option value="सुदूरपश्चिम">सुदूरपश्चिम प्रदेश (Sudurpashchim)</option>
          </select>
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै तह प्रकार (All Types)' : 'All Entity Types'}</option>
            <option value="गाउँपालिका">गाउँपालिका (Rural Municipality)</option>
            <option value="नगरपालिका">नगरपालिका (Municipality)</option>
            <option value="उपमहानगरपालिका">उपमहानगरपालिका (Sub-Metropolitan)</option>
            <option value="महानगरपालिका">महानगरपालिका (Metropolitan)</option>
          </select>
        </div>
      </div>

      {/* Local Areas Grid Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
              <th className="py-2.5 px-3">स्थानीय तह (Local Level)</th>
              <th className="py-2.5 px-3">प्रकार (Type)</th>
              <th className="py-2.5 px-3">जिल्ला र प्रदेश</th>
              <th className="py-2.5 px-3 text-right">वडा</th>
              <th className="py-2.5 px-3 text-right font-mono">संकलित मतदाता</th>
              <th className="py-2.5 px-3">प्रमुख जातिय समूह</th>
              <th className="py-2.5 px-3 text-center font-mono">औसत उमेर</th>
              <th className="py-2.5 px-3 text-right">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-900/40">
            {filteredAreas.map((area) => {
              const isCurrent = area.id === currentAreaId;
              const rate = ((area.collectedVoters / area.expectedVoters) * 100).toFixed(1);
              return (
                <tr
                  key={area.id}
                  className={`transition-colors ${
                    isCurrent
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{area.nameNepali}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{area.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                      {area.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-700 dark:text-slate-300">{area.district}</div>
                    <div className="text-[10px] text-slate-500">{area.province}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {area.totalWards}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <div className="font-medium text-slate-900 dark:text-slate-200">
                      {area.collectedVoters.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {rate}% collected
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-indigo-600 dark:text-indigo-300 font-medium">{area.dominantCaste}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {area.medianAge} yrs
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectArea(area)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                        isCurrent
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 cursor-default'
                          : 'bg-indigo-50 dark:bg-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700/50'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <span>{lang === 'np' ? 'हेर्नुहोस्' : 'View'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
