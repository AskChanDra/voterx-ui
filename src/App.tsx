/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MetricsCards } from './components/MetricsCards';
import { CastePieChart } from './components/charts/CastePieChart';
import { CasteBarChart } from './components/charts/CasteBarChart';
import { AgeSegmentationChart } from './components/charts/AgeSegmentationChart';
import { PollingCenterChart } from './components/charts/PollingCenterChart';
import { AgePyramidChart } from './components/charts/AgePyramidChart';
import { DemographicInsights } from './components/DemographicInsights';
import { VoterTable } from './components/VoterTable';
import { VoterDetailModal } from './components/VoterDetailModal';
import { AreaSelectorModal } from './components/AreaSelectorModal';
import { ExportReportModal } from './components/ExportReportModal';
import { LocalAreasDirectory } from './components/LocalAreasDirectory';

import {
  CURRENT_SELECTION,
  POLLING_CENTERS,
  TOTAL_METRICS,
  CASTE_DISTRIBUTION,
  AGE_SEGMENTATION,
  SAMPLE_VOTERS,
  LOCAL_AREAS_DIRECTORY,
} from './data/nepalDemographics';
import { LocalAreaSummary, VoterRecord } from './types/demographics';
import { Filter, X, MapPin } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [lang, setLang] = useState<'np' | 'en'>('en');

  // Theme state: defaults to 'light' as requested
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Sync with document element for Tailwind dark class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Filter States
  const [selectedPollingCenter, setSelectedPollingCenter] = useState<string>('all');
  const [selectedCaste, setSelectedCaste] = useState<string>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');

  // Modal States
  const [selectedVoter, setSelectedVoter] = useState<VoterRecord | null>(null);
  const [isAreaSelectorOpen, setIsAreaSelectorOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Selected Local Area from Directory (defaults to Dhawalagiri)
  const [currentArea, setCurrentArea] = useState<LocalAreaSummary>(LOCAL_AREAS_DIRECTORY[0]);

  // Derived filtered voter count
  const filteredVotersCount = useMemo(() => {
    return SAMPLE_VOTERS.filter((v) => {
      if (selectedPollingCenter !== 'all' && !v.pollingCenterName.includes(selectedPollingCenter)) {
        return false;
      }
      if (selectedCaste !== 'all' && !v.casteCategory.includes(selectedCaste)) {
        return false;
      }
      if (selectedGender !== 'all' && v.gender !== selectedGender) {
        return false;
      }
      if (selectedAgeRange !== 'all') {
        if (selectedAgeRange === '18–29' && (v.age < 18 || v.age > 29)) return false;
        if (selectedAgeRange === '30–44' && (v.age < 30 || v.age > 44)) return false;
        if (selectedAgeRange === '45–59' && (v.age < 45 || v.age > 59)) return false;
        if (selectedAgeRange === '60–74' && (v.age < 60 || v.age > 74)) return false;
        if (selectedAgeRange === '75+' && v.age < 75) return false;
      }
      return true;
    }).length;
  }, [selectedPollingCenter, selectedCaste, selectedAgeRange, selectedGender]);

  const hasActiveFilters =
    selectedPollingCenter !== 'all' ||
    selectedCaste !== 'all' ||
    selectedAgeRange !== 'all' ||
    selectedGender !== 'all';

  const clearFilters = () => {
    setSelectedPollingCenter('all');
    setSelectedCaste('all');
    setSelectedAgeRange('all');
    setSelectedGender('all');
  };

  const handleSelectArea = (area: LocalAreaSummary) => {
    setCurrentArea(area);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header Bar Contract */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'np' ? 'en' : 'np'))}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onOpenAreaSelector={() => setIsAreaSelectorOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          lang={lang}
          onOpenAreaSelector={() => setIsAreaSelectorOpen(true)}
        />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Breadcrumb Context Bar & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-slate-700 dark:text-slate-300 font-medium">{CURRENT_SELECTION.province}</span>
                <span>/</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{CURRENT_SELECTION.district}</span>
                <span>/</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-medium">{CURRENT_SELECTION.municipality}</span>
                <span>/</span>
                <span className="text-slate-800 dark:text-slate-200">वडा नं. {CURRENT_SELECTION.ward}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                {lang === 'np'
                  ? 'जनसांख्यिकी तथा मतदाता नामावली विश्लेषण ड्यासबोर्ड'
                  : 'Demographic & Electoral Intelligence Dashboard'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'np'
                  ? 'धवलागिरी गाउँपालिका वडा नं. ७ (ताकम, धारापानी र शिवाङ) — कुल २,४२५ मतदाता अभिलेख'
                  : 'Dhawalagiri Rural Municipality Ward 7 (Takam, Dharapani, Shiwang) — 2,425 Verified Voter Records'}
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAreaSelectorOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{lang === 'np' ? 'स्थानीय तह परिवर्तन' : 'Switch Jurisdiction'}</span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-500/40 rounded-lg transition-colors"
              >
                <span>{lang === 'np' ? 'कार्यकारी प्रतिवेदन' : 'Briefing Report'}</span>
              </button>
            </div>
          </div>

          {/* Active Filter Indicator Chips if applied */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 text-xs">
              <div className="flex items-center gap-1 text-indigo-700 dark:text-indigo-300 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>Active Filters:</span>
              </div>

              {selectedPollingCenter !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  Booth: {selectedPollingCenter}
                  <button onClick={() => setSelectedPollingCenter('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCaste !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  Caste: {selectedCaste}
                  <button onClick={() => setSelectedCaste('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedAgeRange !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  Age: {selectedAgeRange} yrs
                  <button onClick={() => setSelectedAgeRange('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedGender !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 underline font-medium"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Metric KPI Cards */}
          <MetricsCards
            totalCollected={TOTAL_METRICS.totalCollected}
            totalExpected={TOTAL_METRICS.totalExpected}
            selectedFilterCount={filteredVotersCount}
            isFiltered={hasActiveFilters}
            lang={lang}
          />

          {/* VIEW: OVERVIEW */}
          {currentTab === 'overview' && (
            <div className="space-y-6">
              {/* Row 1: Core Charts: Caste Pie Chart + Caste Bar Chart side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[380px] transition-colors">
                  <CastePieChart
                    casteData={CASTE_DISTRIBUTION}
                    selectedCaste={selectedCaste}
                    onSelectCaste={setSelectedCaste}
                    lang={lang}
                    theme={theme}
                  />
                </div>

                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[380px] transition-colors">
                  <CasteBarChart
                    casteData={CASTE_DISTRIBUTION}
                    selectedCaste={selectedCaste}
                    onSelectCaste={setSelectedCaste}
                    lang={lang}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Row 2: Age Segmentation + Polling Center Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[360px] transition-colors">
                  <AgeSegmentationChart
                    ageData={AGE_SEGMENTATION}
                    selectedAgeRange={selectedAgeRange}
                    onSelectAgeRange={setSelectedAgeRange}
                    lang={lang}
                    theme={theme}
                  />
                </div>

                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[360px] transition-colors">
                  <PollingCenterChart
                    pollingCenters={POLLING_CENTERS}
                    selectedCenter={selectedPollingCenter}
                    onSelectCenter={setSelectedPollingCenter}
                    lang={lang}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Row 3: Narrative Demographic Insights Panel */}
              <DemographicInsights lang={lang} onNavigateToTab={setCurrentTab} />

              {/* Row 4: Ground Truth Voter Registry Table */}
              <VoterTable
                voters={SAMPLE_VOTERS}
                onSelectVoter={setSelectedVoter}
                lang={lang}
                filterPollingCenter={selectedPollingCenter}
                onFilterPollingCenter={setSelectedPollingCenter}
                filterCaste={selectedCaste}
                onFilterCaste={setSelectedCaste}
                filterAge={selectedAgeRange}
                onFilterAge={setSelectedAgeRange}
                filterGender={selectedGender}
                onFilterGender={setSelectedGender}
              />
            </div>
          )}

          {/* VIEW: CASTE & ETHNICITY */}
          {currentTab === 'caste' && (
            <div className="space-y-6">
              <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                  {lang === 'np'
                    ? 'धवलागिरी वडा ७ मा जातिय जनसंख्याको विस्तृत विश्लेषण'
                    : 'In-Depth Caste & Ethnic Population Analysis'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {lang === 'np'
                    ? 'कुन जातको जनसंख्या सबैभन्दा बढी छ र ती समुदायको उमेर तथा लिङ्ग विभाजन कस्तो छ?'
                    : 'Identifying dominant population volumes, surname clusters, and demographic distribution'}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CastePieChart
                    casteData={CASTE_DISTRIBUTION}
                    selectedCaste={selectedCaste}
                    onSelectCaste={setSelectedCaste}
                    lang={lang}
                    theme={theme}
                  />
                  <CasteBarChart
                    casteData={CASTE_DISTRIBUTION}
                    selectedCaste={selectedCaste}
                    onSelectCaste={setSelectedCaste}
                    lang={lang}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Detailed Surname Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CASTE_DISTRIBUTION.map((item) => (
                  <div
                    key={item.caste}
                    className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">{item.category}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{item.percentage.toFixed(1)}%</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {item.casteNepali}
                    </h4>
                    <div className="mt-3 flex items-baseline justify-between text-xs border-t border-slate-200 dark:border-slate-800/80 pt-2">
                      <span className="text-slate-500 dark:text-slate-400">कुल मतदाता (Voters):</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">महिला / पुरुष:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">
                        {item.femaleCount} F / {item.maleCount} M
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">औसत उमेर:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{item.avgAge} yrs</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">प्रमुख थरहरू: </span>
                      {item.topSurnames.join(', ')}
                    </div>
                  </div>
                ))}
              </div>

              <VoterTable
                voters={SAMPLE_VOTERS}
                onSelectVoter={setSelectedVoter}
                lang={lang}
                filterPollingCenter={selectedPollingCenter}
                onFilterPollingCenter={setSelectedPollingCenter}
                filterCaste={selectedCaste}
                onFilterCaste={setSelectedCaste}
                filterAge={selectedAgeRange}
                onFilterAge={setSelectedAgeRange}
                filterGender={selectedGender}
                onFilterGender={setSelectedGender}
              />
            </div>
          )}

          {/* VIEW: AGE SEGMENTATION */}
          {currentTab === 'age' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[380px] flex flex-col transition-colors">
                  <AgeSegmentationChart
                    ageData={AGE_SEGMENTATION}
                    selectedAgeRange={selectedAgeRange}
                    onSelectAgeRange={setSelectedAgeRange}
                    lang={lang}
                    theme={theme}
                  />
                </div>

                <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[380px] flex flex-col transition-colors">
                  <AgePyramidChart ageData={AGE_SEGMENTATION} lang={lang} theme={theme} />
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {lang === 'np' ? 'उमेर खण्डका मुख्य निष्कर्शहरू' : 'Age Segmentation Strategic Insights'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase">युवा समूह (18–29 yrs)</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">४१२ मतदाता (१७.०%)</h5>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      २३८ महिला र १७४ पुरुष। युवा वर्गमा पुरुषको तुलनामा महिला नामावली ३६.८% बढी छ।
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-sky-600 dark:text-sky-400 font-semibold uppercase">वयस्क समूह (30–44 yrs)</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">७९८ मतदाता (३२.९%)</h5>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      सबैभन्दा ठूलो मतदाता खण्ड। कृषि, स्थानीय उद्यम र वैदेशिक रेमिट्यान्समा प्रत्यक्ष आबद्ध।
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase">ज्येष्ठ नागरिक (60+ yrs)</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">५७३ मतदाता (२३.६%)</h5>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      ज्येष्ठ तथा वृद्ध नागरिकको संख्या २४% नजिक भएकाले मतदान केन्द्रमा ह्विलचेयर र सहायता आवश्यक।
                    </p>
                  </div>
                </div>
              </div>

              <VoterTable
                voters={SAMPLE_VOTERS}
                onSelectVoter={setSelectedVoter}
                lang={lang}
                filterPollingCenter={selectedPollingCenter}
                onFilterPollingCenter={setSelectedPollingCenter}
                filterCaste={selectedCaste}
                onFilterCaste={setSelectedCaste}
                filterAge={selectedAgeRange}
                onFilterAge={setSelectedAgeRange}
                filterGender={selectedGender}
                onFilterGender={setSelectedGender}
              />
            </div>
          )}

          {/* VIEW: POLLING CENTERS */}
          {currentTab === 'centers' && (
            <div className="space-y-6">
              <div className="p-5 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <PollingCenterChart
                  pollingCenters={POLLING_CENTERS}
                  selectedCenter={selectedPollingCenter}
                  onSelectCenter={setSelectedPollingCenter}
                  lang={lang}
                  theme={theme}
                />
              </div>

              {/* Booth Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {POLLING_CENTERS.map((c) => (
                  <div
                    key={c.locationId}
                    className="p-4 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">मतदान केन्द्र</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {c.collectionRate.toFixed(1)}% Rate
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {c.polling_center}
                    </h4>

                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">अपेक्षित मतदाता:</span>
                        <span className="font-mono text-slate-800 dark:text-slate-200">{c.expected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">संकलित मतदाता:</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{c.collected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">महिला / पुरुष:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {c.femaleVoters} F / {c.maleVoters} M
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate">
                      ID: {c.locationId}
                    </div>
                  </div>
                ))}
              </div>

              <VoterTable
                voters={SAMPLE_VOTERS}
                onSelectVoter={setSelectedVoter}
                lang={lang}
                filterPollingCenter={selectedPollingCenter}
                onFilterPollingCenter={setSelectedPollingCenter}
                filterCaste={selectedCaste}
                onFilterCaste={setSelectedCaste}
                filterAge={selectedAgeRange}
                onFilterAge={setSelectedAgeRange}
                filterGender={selectedGender}
                onFilterGender={setSelectedGender}
              />
            </div>
          )}

          {/* VIEW: VOTER REGISTRY */}
          {currentTab === 'voters' && (
            <div className="space-y-6">
              <VoterTable
                voters={SAMPLE_VOTERS}
                onSelectVoter={setSelectedVoter}
                lang={lang}
                filterPollingCenter={selectedPollingCenter}
                onFilterPollingCenter={setSelectedPollingCenter}
                filterCaste={selectedCaste}
                onFilterCaste={setSelectedCaste}
                filterAge={selectedAgeRange}
                onFilterAge={setSelectedAgeRange}
                filterGender={selectedGender}
                onFilterGender={setSelectedGender}
              />
            </div>
          )}

          {/* VIEW: 753 LOCAL AREAS DIRECTORY */}
          {currentTab === 'areas700' && (
            <div className="space-y-6">
              <LocalAreasDirectory
                currentAreaId={currentArea.id}
                onSelectArea={handleSelectArea}
                lang={lang}
              />
            </div>
          )}
        </main>
      </div>

      {/* Official Voter Detail Modal (Digital Voter Card) */}
      <VoterDetailModal
        voter={selectedVoter}
        onClose={() => setSelectedVoter(null)}
        lang={lang}
      />

      {/* Area Selector Modal */}
      <AreaSelectorModal
        isOpen={isAreaSelectorOpen}
        onClose={() => setIsAreaSelectorOpen(false)}
        currentAreaId={currentArea.id}
        onSelectArea={handleSelectArea}
        lang={lang}
      />

      {/* Printable Report Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
