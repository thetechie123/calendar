import React, { useEffect, useRef } from 'react';
import { isModifiedClick } from '../../utils/navigation';
import { getDarshanTopic } from '../../data/darshanTopics';

export default function DarshanNavDropdown({
  isOpen,
  onClose,
  lang = 'en',
  onNavigate,
  onMouseEnter,
  onMouseLeave
}) {
  const isTe = lang === 'te';
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (path, e) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isLinkActive = (path) => {
    if (typeof window === 'undefined') return false;
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = path.replace(/\/+$/, '') || '/';
    if (current === target) return true;
    if (current.startsWith('/darshan/') && target.startsWith('/darshan/')) {
      const curSlug = current.slice('/darshan/'.length);
      const tgtSlug = target.slice('/darshan/'.length);
      const curTopic = getDarshanTopic(curSlug);
      const tgtTopic = getDarshanTopic(tgtSlug);
      return Boolean(curTopic && tgtTopic && curTopic.slug === tgtTopic.slug);
    }
    return false;
  };

  return (
    <>
      {/* Apple-style background blur overlay covering the page below header */}
      <div
        className="fixed inset-x-0 bottom-0 top-[100%] z-40 bg-black/50 light-theme:bg-black/25 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* APPLE-STYLE FULL-WIDTH DROPDOWN FLYOUT (POLISHED MINIMALIST TYPOGRAPHY - NAMES ONLY) */}
      <div
        ref={menuRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="absolute top-full left-0 w-full z-50 bg-[#0B0E14] light-theme:bg-white border-b border-[#D4AF37]/30 light-theme:border-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.85)] transition-all duration-200 ease-out animate-fade-in"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-10">
          
          {/* 4-COLUMN APPLE TYPOGRAPHIC GRID (ONLY NAMES - HIGH CONTRAST) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 items-start">
            
            {/* COLUMN 1: Explore Darshan (Apple Headline Style) */}
            <div>
              <span className="apple-nav-header block mb-3.5">
                {isTe ? 'దర్శనాలు' : 'Explore Darshan'}
              </span>

              <nav className="space-y-1.5">
                <a
                  href="/darshan"
                  onClick={(e) => handleLinkClick('/darshan', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'అన్ని దర్శనాలు' : 'Explore All Darshans'}</span>
                  {isLinkActive('/darshan') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/sarva-darshanam"
                  onClick={(e) => handleLinkClick('/darshan/sarva-darshanam', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/sarva-darshanam') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'సర్వదర్శనం' : 'Sarva Darshanam'}</span>
                  {isLinkActive('/darshan/sarva-darshanam') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/ssd-tokens"
                  onClick={(e) => handleLinkClick('/darshan/ssd-tokens', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/ssd-tokens') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'స్లాటెడ్ సర్వదర్శనం (SSD టోకెన్లు)' : 'SSD Tokens (Slotted Sarva)'}</span>
                  {isLinkActive('/darshan/ssd-tokens') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/divya-darshan"
                  onClick={(e) => handleLinkClick('/darshan/divya-darshan', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/divya-darshan') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'దివ్య దర్శనం (నడక DD టోకెన్లు)' : 'Divya Darshan (DD Tokens)'}</span>
                  {isLinkActive('/darshan/divya-darshan') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/special-entry-darshan"
                  onClick={(e) => handleLinkClick('/darshan/special-entry-darshan', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/special-entry-darshan') || isLinkActive('/darshan/special-entry-300') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'ప్రత్యేక ప్రవేశ దర్శనం (₹300)' : 'Special Entry Darshan (₹300)'}</span>
                  {(isLinkActive('/darshan/special-entry-darshan') || isLinkActive('/darshan/special-entry-300')) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/srinivasa-divyaanugraha-homam"
                  onClick={(e) => handleLinkClick('/darshan/srinivasa-divyaanugraha-homam', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/srinivasa-divyaanugraha-homam') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'శ్రీనివాస దివ్యానుగ్రహ హోమం' : 'Divyaanugraha Homam'}</span>
                  {isLinkActive('/darshan/srinivasa-divyaanugraha-homam') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/online-lucky-dip"
                  onClick={(e) => handleLinkClick('/darshan/online-lucky-dip', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/online-lucky-dip') || isLinkActive('/darshan/e-dip') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'ఆన్‌లైన్ లక్కీ డిప్ (e-DIP)' : 'Online Lucky Dip (e-DIP)'}</span>
                  {(isLinkActive('/darshan/online-lucky-dip') || isLinkActive('/darshan/e-dip')) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/offline-lucky-dip"
                  onClick={(e) => handleLinkClick('/darshan/offline-lucky-dip', e)}
                  className={`apple-nav-headline cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/offline-lucky-dip') || isLinkActive('/darshan/offline-cro-lucky-dip') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'ఆఫ్‌లైన్ CRO లక్కీ డిప్' : 'Offline CRO Lucky Dip'}</span>
                  {(isLinkActive('/darshan/offline-lucky-dip') || isLinkActive('/darshan/offline-cro-lucky-dip')) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>
              </nav>

              <div className="pt-3.5 mt-2 border-t border-slate-800/40 light-theme:border-slate-200">
                <a
                  href="/darshan"
                  onClick={(e) => handleLinkClick('/darshan', e)}
                  className="apple-nav-sublink cursor-pointer"
                >
                  {isTe ? 'దర్శనాల పోలిక & గైడ్ →' : 'Compare Darshan Modes →'}
                </a>
              </div>
            </div>

            {/* COLUMN 2: Special Quotas */}
            <div>
              <span className="apple-nav-header block mb-3.5">
                {isTe ? 'ప్రత్యేక కోటాలు' : 'Special Quotas'}
              </span>

              <nav className="space-y-2.5">
                <a
                  href="/darshan/senior-citizens"
                  onClick={(e) => handleLinkClick('/darshan/senior-citizens', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/senior-citizens') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'వయోవృద్ధుల దర్శనం' : 'Senior Citizens'}</span>
                  {isLinkActive('/darshan/senior-citizens') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/differently-abled"
                  onClick={(e) => handleLinkClick('/darshan/differently-abled', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/differently-abled') || isLinkActive('/darshan/physically-challenged') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'దివ్యాంగులు & మెడికల్ కేసులు' : 'Physically Challenged & Medical'}</span>
                  {(isLinkActive('/darshan/differently-abled') || isLinkActive('/darshan/physically-challenged')) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/infant-darshan"
                  onClick={(e) => handleLinkClick('/darshan/infant-darshan', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/infant-darshan') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'శిశు దర్శనం' : 'Infant Darshan'}</span>
                  {isLinkActive('/darshan/infant-darshan') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/nri-darshan"
                  onClick={(e) => handleLinkClick('/darshan/nri-darshan', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/nri-darshan') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'ఎన్.ఆర్.ఐ దర్శనం' : 'NRI Darshan'}</span>
                  {isLinkActive('/darshan/nri-darshan') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/defence-darshan"
                  onClick={(e) => handleLinkClick('/darshan/defence-darshan', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/defence-darshan') || isLinkActive('/darshan/defence-personnel') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'రక్షణ రంగ సిబ్బంది' : 'Defence Personnel'}</span>
                  {(isLinkActive('/darshan/defence-darshan') || isLinkActive('/darshan/defence-personnel')) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>
              </nav>
            </div>

            {/* COLUMN 3: Srivari Arjitha Sevas */}
            <div>
              <span className="apple-nav-header block mb-3.5">
                {isTe ? 'శ్రీవారి ఆర్జిత సేవలు' : 'Srivari Arjitha Sevas'}
              </span>

              <nav className="space-y-2.5">
                <a
                  href="/darshan/arjitha-sevas"
                  onClick={(e) => handleLinkClick('/darshan/arjitha-sevas', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/arjitha-sevas') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>
                    {isTe
                      ? 'ఆర్జిత సేవలు (కల్యాణోత్సవం, ఊంజల్, బ్రహ్మోత్సవం, దీపాలంకార)'
                      : 'Arjitha Sevas (Kalyanam, Unjal, Brahmotsavam, Deepalankara)'}
                  </span>
                  {isLinkActive('/darshan/arjitha-sevas') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700 shrink-0 ml-2" />}
                </a>

                <a
                  href="/darshan/virtual-sevas"
                  onClick={(e) => handleLinkClick('/darshan/virtual-sevas', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/virtual-sevas') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>
                    {isTe
                      ? 'ఆన్‌లైన్ వర్చువల్ సేవ & అనుసంధాన దర్శనం'
                      : 'Online Virtual Seva & Connected Darshan'}
                  </span>
                  {isLinkActive('/darshan/virtual-sevas') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700 shrink-0 ml-2" />}
                </a>
              </nav>
            </div>

            {/* COLUMN 4: VIP Darshan & Devotional Deeds / Vows */}
            <div>
              <span className="apple-nav-header block mb-3.5">
                {isTe ? 'వి.ఐ.పి దర్శనం' : 'VIP Darshan'}
              </span>

              <nav className="space-y-2.5">
                <a
                  href="/darshan/srivani-trust"
                  onClick={(e) => handleLinkClick('/darshan/srivani-trust', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/srivani-trust') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'శ్రీవాణి ట్రస్ట్' : 'SRIVANI Trust'}</span>
                  {isLinkActive('/darshan/srivani-trust') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/major-donors"
                  onClick={(e) => handleLinkClick('/darshan/major-donors', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/major-donors') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'ప్రధాన దాతల పథకం (డొనేషన్)' : 'Donation (Major Donors)'}</span>
                  {isLinkActive('/darshan/major-donors') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>

                <a
                  href="/darshan/recommendation-letters"
                  onClick={(e) => handleLinkClick('/darshan/recommendation-letters', e)}
                  className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                    isLinkActive('/darshan/recommendation-letters') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                  }`}
                >
                  <span>{isTe ? 'సిఫార్సు లేఖల దర్శనం' : 'Recommendation Letters'}</span>
                  {isLinkActive('/darshan/recommendation-letters') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                </a>
              </nav>

              <div className="pt-5 mt-5 border-t border-slate-800/40 light-theme:border-slate-200">
                <span className="apple-nav-header block mb-3">
                  {isTe ? 'భక్తి సేవలు & మొక్కులు' : 'Devotional Deeds & Vows'}
                </span>

                <nav className="space-y-2.5">
                  <a
                    href="/darshan/angapradakshinam"
                    onClick={(e) => handleLinkClick('/darshan/angapradakshinam', e)}
                    className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                      isLinkActive('/darshan/angapradakshinam') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                    }`}
                  >
                    <span>{isTe ? 'అంగప్రదక్షిణం' : 'Angapradakshinam'}</span>
                    {isLinkActive('/darshan/angapradakshinam') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                  </a>

                  <a
                    href="/darshan/blood-donation"
                    onClick={(e) => handleLinkClick('/darshan/blood-donation', e)}
                    className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                      isLinkActive('/darshan/blood-donation') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                    }`}
                  >
                    <span>{isTe ? 'రక్తదాన పుణ్య దర్శనం' : 'Blood Donation'}</span>
                    {isLinkActive('/darshan/blood-donation') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                  </a>

                  <a
                    href="/darshan/govinda-nama-koti"
                    onClick={(e) => handleLinkClick('/darshan/govinda-nama-koti', e)}
                    className={`apple-nav-link cursor-pointer py-0.5 flex items-center justify-between ${
                      isLinkActive('/darshan/govinda-nama-koti') ? '!text-[#FFD700] light-theme:!text-amber-800 font-extrabold' : ''
                    }`}
                  >
                    <span>{isTe ? 'గోవింద నామ కోటి' : 'Govinda Koti'}</span>
                    {isLinkActive('/darshan/govinda-nama-koti') && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] light-theme:bg-amber-700" />}
                  </a>
                </nav>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
