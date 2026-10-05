import React from 'react';
import {
  BrainCircuit,
  TrendingUp,
  MapPin,
  Users2,
  BarChart3,
} from 'lucide-react';

interface DemographicInsightsProps {
  lang: 'np' | 'en';
  onNavigateToTab: (tab: string) => void;
}

export const DemographicInsights: React.FC<DemographicInsightsProps> = ({
  lang,
  onNavigateToTab,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-5 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {lang === 'np'
                ? 'जनसांख्यिकी तथा जातिय विश्लेषण प्रतिवेदन'
                : 'Demographic & Caste Population Analysis'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'np'
                ? 'धवलागिरी गाउँपालिका वडा नं. ७ को निर्वाचन नामावली तथ्याङ्क विश्लेषण'
                : 'Key findings from Dhawalagiri Ward 7 local electoral voter registry'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('areas700')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
          >
            {lang === 'np' ? '७५३ स्थानीय तह तुलना हेर्नुहोस्' : 'Compare 753 Local Areas'}
          </button>
        </div>
      </div>

      {/* Main 3 Analytical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Caste Dominance */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users2 className="w-3.5 h-3.5" />
            <span>
              {lang === 'np' ? 'जातिय बाहुल्यता (Dominant Caste)' : 'Caste Population Leader'}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {lang === 'np'
              ? 'मगर समुदाय (Magar) स्पष्ट बहुमतमा (५३.०%)'
              : 'Magar Community Holds Absolute Majority (53.0%)'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {lang === 'np'
              ? 'वडा नं. ७ का कुल २,४२५ मतदाता मध्ये १,२८५ जना मगर समुदायका (पुर्जा, जुग्जाली, पुन, थापा मगर) छन्। दोस्रो स्थानमा दलित समुदाय (कामी, बि.क, परियार) ५६० मतदाता (२३.१%) सहित निर्णायक स्थितिमा छन्।'
              : 'Out of 2,425 registered voters, 1,285 belong to the Magar indigenous community (Purja, Jugjali, Pun, Garbuja), forming 53.0%. The Dalit community is the 2nd largest voting bloc with 560 voters (23.1%).'}
          </p>
          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Khas Arya (Chhetri + Brahmin)</span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">21.4% (520 voters)</span>
          </div>
        </div>

        {/* Pillar 2: Age Segmentation */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>
              {lang === 'np' ? 'उमेर खण्ड विभाजन (Age Segmentation)' : 'Age Segmentation Profile'}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {lang === 'np'
              ? '३०–४४ वर्ष उमेर समूह सर्वाधिक (३२.९%)'
              : 'Peak Concentration in 30–44 Cohort (32.9%)'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {lang === 'np'
              ? 'औसत मतदाता उमेर ४२.४ वर्ष रहेको छ। १८–२९ युवा समूह १७.०% र ४५–५९ समूह २६.५% छ। ६० वर्ष माथिका ज्येष्ठ नागरिक मतदाता २३.६% (५७३ जना) रहेकाले मतदान केन्द्रको भौतिक पहुँच सुगम हुनु अनिवार्य छ।'
              : 'Median voter age is 42.4 years. The youth bracket (18–29) represents 17.0%, while working-age adults (30–59) make up 59.4%. Senior voters (60+) account for 23.6% (573 voters), underscoring booth accessibility needs.'}
          </p>
          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Senior Voters (60+ yrs)</span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">573 voters (23.6%)</span>
          </div>
        </div>

        {/* Pillar 3: Electoral Gender & Outmigration Dynamics */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {lang === 'np' ? 'लैङ्गिक अनुपात र बसाईंसराई' : 'Gender Ratio & Migration Impact'}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {lang === 'np'
              ? 'महिला मतदाताको संख्या पुरुष भन्दा १७५ ले बढी (५३.६%)'
              : 'Female Voters Exceed Males by 175 (53.6% Share)'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {lang === 'np'
              ? 'म्याग्दी जिल्लाको उच्च वैदेशिक रोजगारीका कारण १८–४४ उमेर समूहमा पुरुष नामावली अनुपात कम छ। महिला मतदाताको बाहुल्यता रहेकाले स्थानीय विकास तथा नीति निर्माणमा महिला सहभागिता निर्णायक देखिन्छ।'
              : 'Due to foreign employment outmigration common in Myagdi, male roll numbers are depleted in the 18–44 bracket. With 1,300 women to 1,125 men, female electorate mobilization is the decisive electoral factor.'}
          </p>
          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Gender Ratio</span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">115.5 Females / 100 Males</span>
          </div>
        </div>
      </div>

      {/* Scaling Note: 753 Local Areas */}
      <div className="p-3.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300">
          <MapPin className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <span>
            {lang === 'np'
              ? 'नेपालका ७५३ स्थानीय तह (६ महानगर, ११ उपमहानगर, २७६ नगर र ४६० गाउँपालिका) का लागि यही ढाँचामा जनसांख्यिकी तुलना गर्न सकिन्छ।'
              : 'This analytical standard scales across all 753 local levels of Nepal (6 Metros, 11 Sub-Metros, 276 Municipalities, and 460 Rural Municipalities).'}
          </span>
        </div>
        <button
          onClick={() => onNavigateToTab('areas700')}
          className="px-2.5 py-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/60 hover:bg-indigo-200 dark:hover:bg-indigo-900 rounded border border-indigo-300 dark:border-indigo-700/50 shrink-0 transition-colors"
        >
          {lang === 'np' ? '७५३ स्थानीय तह डाइरेक्टरी हेर्नुहोस्' : 'Explore 753 Directory'}
        </button>
      </div>
    </div>
  );
};
