import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { VoterRecord } from '../types/demographics';

interface VoterTableProps {
  voters: VoterRecord[];
  onSelectVoter: (voter: VoterRecord) => void;
  lang: 'np' | 'en';
  filterPollingCenter: string;
  onFilterPollingCenter: (center: string) => void;
  filterCaste: string;
  onFilterCaste: (caste: string) => void;
  filterAge: string;
  onFilterAge: (range: string) => void;
  filterGender: string;
  onFilterGender: (gender: string) => void;
}

export const VoterTable: React.FC<VoterTableProps> = ({
  voters,
  onSelectVoter,
  lang,
  filterPollingCenter,
  onFilterPollingCenter,
  filterCaste,
  onFilterCaste,
  filterAge,
  onFilterAge,
  filterGender,
  onFilterGender,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter pipeline
  const filteredVoters = useMemo(() => {
    return voters.filter((voter) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName =
          voter.nameEnglish.toLowerCase().includes(query) ||
          voter.fullName.includes(query) ||
          voter.voterNumber.includes(query) ||
          voter.serialNo.includes(query) ||
          voter.fatherName.includes(query) ||
          (voter.spouseName && voter.spouseName.includes(query));
        if (!matchesName) return false;
      }

      if (filterPollingCenter && filterPollingCenter !== 'all') {
        if (!voter.pollingCenterName.includes(filterPollingCenter)) {
          return false;
        }
      }

      if (filterCaste && filterCaste !== 'all') {
        if (!voter.casteCategory.toLowerCase().includes(filterCaste.toLowerCase()) &&
            !voter.casteSubGroup.toLowerCase().includes(filterCaste.toLowerCase())) {
          return false;
        }
      }

      if (filterGender && filterGender !== 'all') {
        if (voter.gender !== filterGender) return false;
      }

      if (filterAge && filterAge !== 'all') {
        if (filterAge === '18–29' && (voter.age < 18 || voter.age > 29)) return false;
        if (filterAge === '30–44' && (voter.age < 30 || voter.age > 44)) return false;
        if (filterAge === '45–59' && (voter.age < 45 || voter.age > 59)) return false;
        if (filterAge === '60–74' && (voter.age < 60 || voter.age > 74)) return false;
        if (filterAge === '75+' && voter.age < 75) return false;
      }

      return true;
    });
  }, [voters, searchTerm, filterPollingCenter, filterCaste, filterGender, filterAge]);

  const totalPages = Math.ceil(filteredVoters.length / pageSize) || 1;
  const paginatedVoters = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredVoters.slice(start, start + pageSize);
  }, [filteredVoters, currentPage]);

  const handleExportCSV = () => {
    const headers = [
      'SerialNo',
      'VoterNumber',
      'FullNameNepali',
      'NameEnglish',
      'Age',
      'Gender',
      'CasteCategory',
      'CasteSubGroup',
      'FatherName',
      'MotherName',
      'SpouseName',
      'PollingCenter',
      'Ward',
    ];

    const rows = filteredVoters.map((v) => [
      v.serialNo,
      v.voterNumber,
      `"${v.fullName}"`,
      `"${v.nameEnglish}"`,
      v.age,
      v.gender,
      `"${v.casteCategory}"`,
      `"${v.casteSubGroup}"`,
      `"${v.fatherName}"`,
      `"${v.motherName}"`,
      `"${v.spouseName || ''}"`,
      `"${v.pollingCenterName}"`,
      v.wardNo,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `voter_roll_dhawalagiri_ward7_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    filterPollingCenter !== 'all' ||
    filterCaste !== 'all' ||
    filterAge !== 'all' ||
    filterGender !== 'all';

  const resetAllFilters = () => {
    setSearchTerm('');
    onFilterPollingCenter('all');
    onFilterCaste('all');
    onFilterAge('all');
    onFilterGender('all');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4 transition-colors duration-200">
      {/* Top action row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {lang === 'np' ? 'मतदाता नामावली अभिलेख' : 'Electoral Voter Roll Registry'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'np'
              ? 'निर्वाचन आयोग नेपाल अनुसार वडा नं. ७ का वास्तविक मतदाता विवरण'
              : 'Ground-truth voter roster matching Election Commission of Nepal specs'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-300 dark:border-slate-700/60"
            >
              <X className="w-3.5 h-3.5" />
              <span>{lang === 'np' ? 'फिल्टर हटाउनुहोस्' : 'Reset Filters'}</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{lang === 'np' ? 'CSV डाउनलोड' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              lang === 'np'
                ? 'नाम, मतदाता नं., बाबुको नाम खोज्नुहोस्...'
                : 'Search by voter name, ID, parent name...'
            }
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Polling Center Selector */}
        <div>
          <select
            value={filterPollingCenter}
            onChange={(e) => {
              onFilterPollingCenter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै मतदान केन्द्र' : 'All Polling Booths'}</option>
            <option value="धारापानी">धारापानी (किसानी मा.वि.)</option>
            <option value="ताकम">ताकम मा.वि.</option>
            <option value="शिवाङ">शिवाङ (हेम मा.वि.)</option>
          </select>
        </div>

        {/* Caste Group Selector */}
        <div>
          <select
            value={filterCaste}
            onChange={(e) => {
              onFilterCaste(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै जातिय समूह' : 'All Caste Groups'}</option>
            <option value="Magar">Magar (मगर - पुर्जा, पुन, जुग्जाली)</option>
            <option value="Dalit">Dalit (दलित - बि.क, कामी, परियार)</option>
            <option value="Chhetri">Chhetri (क्षेत्री - थापा, कार्की)</option>
            <option value="Brahmin">Brahmin (ब्राह्मण - उपाध्याय, शर्मा)</option>
            <option value="Newar">Newar & Others (नेवार तथा अन्य)</option>
          </select>
        </div>

        {/* Age Cohort & Gender Selector */}
        <div className="flex gap-1.5">
          <select
            value={filterAge}
            onChange={(e) => {
              onFilterAge(e.target.value);
              setCurrentPage(1);
            }}
            className="w-1/2 px-2 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै उमेर' : 'All Ages'}</option>
            <option value="18–29">18–29 yrs</option>
            <option value="30–44">30–44 yrs</option>
            <option value="45–59">45–59 yrs</option>
            <option value="60–74">60–74 yrs</option>
            <option value="75+">75+ yrs</option>
          </select>

          <select
            value={filterGender}
            onChange={(e) => {
              onFilterGender(e.target.value);
              setCurrentPage(1);
            }}
            className="w-1/2 px-2 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">{lang === 'np' ? 'सबै लिङ्ग' : 'Gender'}</option>
            <option value="महिला">महिला (F)</option>
            <option value="पुरुष">पुरुष (M)</option>
          </select>
        </div>
      </div>

      {/* High-density Data Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
              <th className="py-2.5 px-3 w-14 font-mono text-center">क्र.सं.</th>
              <th className="py-2.5 px-3 w-28 font-mono">मतदाता नं.</th>
              <th className="py-2.5 px-3">मतदाताको नाम (नेपाली / English)</th>
              <th className="py-2.5 px-3 w-24">जात / थर समूह</th>
              <th className="py-2.5 px-3 w-16 text-center">उमेर</th>
              <th className="py-2.5 px-3 w-16 text-center">लिङ्ग</th>
              <th className="py-2.5 px-3">मतदान केन्द्र</th>
              <th className="py-2.5 px-3 text-right">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-900/40">
            {paginatedVoters.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  {lang === 'np'
                    ? 'कुनै मतदाता फेला परेन। कृपया फिल्टर वा खोज शब्द परिवर्तन गर्नुहोस्।'
                    : 'No matching voter records found. Try clearing filters.'}
                </td>
              </tr>
            ) : (
              paginatedVoters.map((voter) => (
                <tr
                  key={voter.id}
                  onClick={() => onSelectVoter(voter)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                    {voter.serialNo}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-indigo-600 dark:text-indigo-300 tabular-nums">
                    {voter.voterNumber}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{voter.fullName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{voter.nameEnglish}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="text-slate-800 dark:text-slate-200 font-medium">{voter.casteSubGroup}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{voter.casteCategory}</div>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-800 dark:text-slate-200 tabular-nums font-semibold">
                    {voter.age}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                        voter.gender === 'महिला'
                          ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300'
                          : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {voter.gender === 'महिला' ? 'F' : 'M'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 truncate max-w-[200px]" title={voter.pollingCenterName}>
                    {voter.pollingCenterName.split(',')[0]}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVoter(voter);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-500/30 rounded transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{lang === 'np' ? 'विवरण' : 'Card'}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="font-mono tabular-nums">
          Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredVoters.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {Math.min(currentPage * pageSize, filteredVoters.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredVoters.length.toLocaleString()}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
