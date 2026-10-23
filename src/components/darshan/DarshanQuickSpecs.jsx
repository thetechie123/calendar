import React from 'react';
import {
  Ticket,
  UserCheck,
  Calendar,
  FileText,
  MapPin,
  Clock,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function DarshanQuickSpecs({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const isSarvaDarshanam = topic.slug === 'sarva-darshanam' || Boolean(topic.noIdRequired);

  const specs = [
    {
      icon: Ticket,
      labelEn: 'Ticket / Token Cost',
      labelTe: 'టికెట్ / టోకెన్ రుసుము',
      valueEn: topic.cost,
      valueTe: topic.cost,
      highlight: true
    },
    {
      icon: UserCheck,
      labelEn: 'Primary Eligibility',
      labelTe: 'ప్రధాన అర్హత',
      valueEn: topic.eligibilitySummaryEn || (topic.eligibility && topic.eligibility[0] ? topic.eligibility[0].ruleEn : 'All pilgrims'),
      valueTe: topic.eligibilitySummaryTe || (topic.eligibility && topic.eligibility[0] ? topic.eligibility[0].ruleTe : 'అందరు భక్తులు')
    },
    {
      icon: Globe,
      labelEn: 'Booking Channel',
      labelTe: 'బుకింగ్ ఛానల్',
      valueEn: topic.bookingChannelEn || (topic.bookingUrl ? 'Official TTD Web Portal / App' : 'In-Person Offline Counter'),
      valueTe: topic.bookingChannelTe || (topic.bookingUrl ? 'అధికారిక టీటీడీ వెబ్‌సైట్ / యాప్' : 'ప్రత్యక్ష ఆఫ్‌లైన్ కౌంటర్')
    },
    {
      icon: Calendar,
      labelEn: isSarvaDarshanam ? 'Operational Schedule' : 'Quota / Release Timing',
      labelTe: isSarvaDarshanam ? 'నిర్వహణ సమయం' : 'కోటా / విడుదల సమయం',
      valueEn: isSarvaDarshanam ? 'Continuous 365 Days (Closed only during heavy crowd)' : topic.quotaEn,
      valueTe: isSarvaDarshanam ? 'ఏడాది పొడవునా నిరంతరం (రద్దీ ఎక్కువైతే తాత్కాలికంగా నిలుపుదల)' : topic.quotaTe
    },
    {
      icon: MapPin,
      labelEn: isSarvaDarshanam ? 'Starting Queue Point' : 'Reporting Location',
      labelTe: isSarvaDarshanam ? 'క్యూ ప్రారంభ స్థలం' : 'రిపోర్టింగ్ కేంద్రం',
      valueEn: isSarvaDarshanam ? 'Generally Krishna Teja Circle (shifts with crowd)' : topic.reportingPointEn.split('➔')[0].trim(),
      valueTe: isSarvaDarshanam ? 'సాధారణంగా కృష్ణతేజ సర్కిల్ (రద్దీని బట్టి మారుతుంది)' : topic.reportingPointTe.split('➔')[0].trim()
    },
    {
      icon: Clock,
      labelEn: 'Average Wait Time',
      labelTe: 'సగటు నిరీక్షణ సమయం',
      valueEn: isSarvaDarshanam ? 'Displayed live on Digital Boards in Tirumala' : topic.avgWaitTime.split('|')[0].trim(),
      valueTe: isSarvaDarshanam ? 'తిరుమలలోని డిజిటల్ బోర్డులలో ప్రదర్శించబడుతుంది' : topic.avgWaitTime.split('|')[0].trim()
    },
    {
      icon: FileText,
      labelEn: isSarvaDarshanam ? 'ID Requirement' : 'Mandatory IDs',
      labelTe: isSarvaDarshanam ? 'గుర్తింపు కార్డు' : 'తప్పనిసరి గుర్తింపు కార్డులు',
      valueEn: isSarvaDarshanam ? 'No ID Required (100% Free Walk-in)' : (topic.mandatoryDocs && topic.mandatoryDocs[0] ? topic.mandatoryDocs[0] : 'Original Physical ID'),
      valueTe: isSarvaDarshanam ? 'ఎటువంటి గుర్తింపు కార్డు అవసరం లేదు' : (topic.mandatoryDocs && topic.mandatoryDocs[0] ? topic.mandatoryDocs[0] : 'అసలు గుర్తింపు కార్డు')
    },
    {
      icon: ShieldCheck,
      labelEn: 'Dress Code Attire',
      labelTe: 'సాంప్రదాయ వస్త్రధారణ',
      valueEn: isSarvaDarshanam
        ? 'Male: White pancha/dhoti/kurta | Female: Saree/Punjabi dress/Chudidar/Langa voni'
        : (topic.dressCodeEn || 'Traditional Vedic Hindu Attire'),
      valueTe: isSarvaDarshanam
        ? 'పురుషులు: తెల్ల పంచె, ధోతి / కుర్తా | మహిళలు: చీర, పంజాబీ డ్రెస్, చుడీదార్, లంగా ఓణీ'
        : (topic.dressCodeTe || 'హిందూ సాంప్రదాయ వస్త్రధారణ')
    }
  ];

  return (
    <section aria-label="Essential information at a glance" className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl transition-all border flex flex-col justify-between ${
                spec.highlight
                  ? (isLight
                      ? 'bg-amber-50/90 border-amber-300 shadow-sm'
                      : 'bg-gradient-to-br from-[#141923] to-[#1c2331] border-[#D4AF37]/50 shadow-md')
                  : (isLight
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-[#141923] border-white/10 shadow-sm')
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isLight
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-black/40 text-[#FFD700]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${
                    isLight ? 'text-slate-600' : 'text-[#94A3B8]'
                  }`}>
                    {isTe ? spec.labelTe : spec.labelEn}
                  </span>
                </div>

                <p className={`font-extrabold text-xs sm:text-sm leading-snug break-words ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {isTe ? spec.valueTe : spec.valueEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
