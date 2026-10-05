import React from 'react';
import { X, Printer, ShieldCheck, User, QrCode } from 'lucide-react';
import { VoterRecord } from '../types/demographics';

interface VoterDetailModalProps {
  voter: VoterRecord | null;
  onClose: () => void;
  lang: 'np' | 'en';
}

export const VoterDetailModal: React.FC<VoterDetailModalProps> = ({
  voter,
  onClose,
  lang,
}) => {
  if (!voter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {lang === 'np' ? 'निर्वाचन आयोग, नेपाल · मतदाता परिचय विवरण' : 'Election Commission of Nepal · Voter Profile'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Voter Card Body */}
        <div className="p-6 space-y-5">
          {/* Card Frame */}
          <div className="relative p-5 rounded-xl bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 border border-slate-300 dark:border-indigo-500/30 shadow-inner">
            {/* Watermark seal header */}
            <div className="text-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-red-600 dark:text-red-400">
                निर्वाचन आयोग, नेपाल
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Election Commission, Nepal
              </div>
              <div className="mt-1 text-xs font-bold tracking-widest text-slate-800 dark:text-slate-200 uppercase">
                मतदाता परिचयपत्र (VOTER ID CARD)
              </div>
            </div>

            {/* Profile info grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
              {/* Avatar placeholder / photo box */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-24 h-28 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                  <User className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-1" />
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">फोटो</span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center">
                  क्र.सं: {voter.serialNo}
                </div>
              </div>

              {/* Bio Details */}
              <div className="md:col-span-3 space-y-2 text-xs">
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">नाम (Full Name):</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {voter.fullName}
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-300 font-mono">
                    {voter.nameEnglish}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800/80">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">मतदाता नं: </span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-300 tabular-nums">
                      {voter.voterNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">नागरिकता नं: </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {voter.citizenshipNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">उमेर / लिङ्ग: </span>
                    <span className="font-mono text-slate-800 dark:text-slate-100 font-semibold">
                      {voter.age} वर्ष / {voter.gender}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">जातिय समूह: </span>
                    <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                      {voter.casteSubGroup}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parentage & Polling Booth details */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">बाबुको नाम (Father):</div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">{voter.fatherName}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">आमाको नाम (Mother):</div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">{voter.motherName}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">पति/पत्नी (Spouse):</div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  {voter.spouseName || 'लागु नहुने (N/A)'}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">निर्वाचन क्षेत्र (Constituency):</div>
                <div className="text-slate-800 dark:text-slate-200 font-mono">
                  प्रतिनिधिसभा: {voter.fConstituency} | प्रदेशसभा: {voter.sConstituency}
                </div>
              </div>
            </div>

            {/* Administrative Location Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs bg-slate-100 dark:bg-slate-900/80 p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                  मतदान केन्द्र (POLLING BOOTH)
                </div>
                <div className="text-slate-800 dark:text-slate-200 font-medium text-[11px]">
                  {voter.pollingCenterName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {voter.provinceId} · {voter.districtId} · {voter.municipalityId} - वडा {voter.wardNo}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <QrCode className="w-8 h-8 text-slate-500 dark:text-slate-400" />
              </div>
            </div>

            {/* Unique Hash Verification */}
            <div className="mt-2 text-[9px] font-mono text-slate-500 dark:text-slate-400 break-all">
              Verification Hash ID: {voter.id}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Source: Election Commission Nepal Voter Records
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'np' ? 'प्रिन्ट गर्नुहोस्' : 'Print Card'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              {lang === 'np' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
