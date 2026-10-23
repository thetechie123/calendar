import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  ExternalLink,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Camera,
} from 'lucide-react';

export const ALL_GALLERY_ITEMS = [
  {
    id: 1,
    titleEn: 'Ananda Nilayam Golden Vimanam',
    titleTe: 'ఆనంద నిలయ దివ్య స్వర్ణ విమానం',
    subtitleEn: 'The three-tiered gilded tower directly above the sanctum sanctorum of Lord Venkateswara',
    subtitleTe: 'శ్రీవారి మూలవిరాట్ గర్భాలయంపై భాసించే పవిత్ర స్వర్ణ విమానం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/GOLDEN_VIMANA_TIRUMALA_AP_-_panoramio.jpg',
    tagEn: 'Sanctum Vimanam',
    tagTe: 'గర్భాలయ విమానం',
    author: 'rajaraman sundaram',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:GOLDEN_VIMANA_TIRUMALA_AP_-_panoramio.jpg',
    sourceName: 'Wikimedia Commons (Panoramio)',
  },
  {
    id: 2,
    titleEn: 'Tirumala Temple at Night',
    titleTe: 'రాత్రి వేళ తిరుమల ఆలయ కాంతులు',
    subtitleEn: 'Magnificent golden illumination of the main entrance gopuram and sacred compound under night lights',
    subtitleTe: 'దీపాల వెలుగుల్లో దేదీప్యమానంగా ప్రకాశించే శ్రీవారి ప్రధాన రాజగోపురం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Thirupati_Thirumala_Temple_at_Night.jpg',
    tagEn: 'Night Darshan',
    tagTe: 'రాత్రి దర్శనం',
    author: 'Iamvivekkj',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Thirupati_Thirumala_Temple_at_Night.jpg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 3,
    titleEn: 'Sacred Swami Pushkarini',
    titleTe: 'స్వామి పుష్కరిణి పవిత్ర తీర్థం',
    subtitleEn: 'The sacred temple tank adjacent to the sanctum where pilgrims take purifying bath before darshan',
    subtitleTe: 'ఆలయ ఉత్తర భాగంలో వెలసిన సకల పాపహరమైన దివ్య జల పుష్కరిణి',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/View_of_Swami_Pushkarni_of_Tirumala_at_Daytime.jpg',
    tagEn: 'Holy Theertham',
    tagTe: 'పుణ్య తీర్థం',
    author: 'Siddharth Verma 101',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Swami_Pushkarni_of_Tirumala_at_Daytime.jpg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 4,
    titleEn: 'Swami Pushkarini (Northern Bank View)',
    titleTe: 'స్వామి పుష్కరిణి (మరొక సుందర దృశ్యం)',
    subtitleEn: 'Another serene angle across the holy Swami Pushkarini waters and northern temple surroundings',
    subtitleTe: 'స్వామి పుష్కరిణి పవిత్ర తీర్థ జలాలు మరియు ఉత్తర తీర పరిసరాల మరొక సుందర దృశ్యం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Varahaswamy_Temple%2C_Tirumala.jpg',
    tagEn: 'Pushkarini View',
    tagTe: 'పుష్కరిణి దృశ్యం',
    author: 'Kavali Chandrakanth KCK',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Varahaswamy_Temple,_Tirumala.jpg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 5,
    titleEn: 'Sri Garuthmanthudu (Garudazhwar)',
    titleTe: 'శ్రీ గరుత్మంతుని విగ్రహం',
    subtitleEn: 'The celestial vehicle and eternal devotee facing the sanctum with folded hands in adoration',
    subtitleTe: 'శ్రీవారికి నిత్య సేవకుడై అంజలి ఘటించి కొలువుదీరిన గరుడ భగవానుడు',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Garuthmanthudu_images.jpg',
    tagEn: 'Vahana Devata',
    tagTe: 'వాహన దేవుడు',
    author: 'Ganesh boddu',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Garuthmanthudu_images.jpg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 6,
    titleEn: 'Silathoranam - Natural Stone Arch',
    titleTe: 'శిలాతోరణం - సహజ శిలా తోరణం',
    subtitleEn: 'Ancient 2.5-billion-year-old natural geological rock arch located near Chakra Theertham',
    subtitleTe: 'చక్రతీర్థం సమీపంలోని సుమారు 250 కోట్ల సంవత్సరాల పురాతన అరుదైన సహజ శిలా వింత',
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Natural_stone_arch_in_tirumala.JPG',
    tagEn: 'Natural Heritage',
    tagTe: 'సహజ వారసత్వం',
    author: 'User Á (en.wikipedia)',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Natural_stone_arch_in_tirumala.JPG',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 7,
    titleEn: 'Tirumala Hills & Shrine Panorama',
    titleTe: 'తిరుమల కొండలు & ఆలయ సమగ్ర దృశ్యం',
    subtitleEn: 'Scenic overview of the holy township nestled amid the lush green Seshachalam ranges',
    subtitleTe: 'శేషాచల పర్వత సానువులలో వెలసిన పవిత్ర తిరుమల దివ్య దృశ్యం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/TIRUMALA_AP_-_panoramio.jpg',
    tagEn: 'Panorama',
    tagTe: 'దివ్య క్షేత్రం',
    author: 'rajaraman sundaram',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:TIRUMALA_AP_-_panoramio.jpg',
    sourceName: 'Wikimedia Commons (Panoramio)',
  },
  {
    id: 8,
    titleEn: 'Ananda Nilayam Architectural Splendor',
    titleTe: 'ఆనంద నిలయ దివ్య శిల్పకళ',
    subtitleEn: 'Close architectural study of the golden kalasam and sanctum vimanam reliefs',
    subtitleTe: 'ఆనంద నిలయ స్వర్ణ కలశం మరియు ప్రాచీన శిల్ప సౌందర్యం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Tirumala_Anand_nilayam837.jpg',
    tagEn: 'Vimana Detail',
    tagTe: 'స్వర్ణ కలశం',
    author: 'Phanidharvaranasi',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tirumala_Anand_nilayam837.jpg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 9,
    titleEn: 'Sri Venkateswara & Hathiram Bhavaji Playing Dice',
    titleTe: 'శ్రీ వేంకటేశ్వర స్వామి & హాథీరామ్ బావాజీ పాచికలాట',
    subtitleEn: 'Sacred temple sculpture depicting the divine leela where Lord Srinivasa played the dice game with His ardent devotee Hathiram Bhavaji',
    subtitleTe: 'శ్రీ వేంకటేశ్వర స్వామివారు తన ప్రియ భక్తుడైన హాథీరామ్ బావాజీతో పాచికలు ఆడిన పవిత్ర లీలా శిల్ప దృశ్యం',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/A_picture_at_Tirumala_near_temple.jpeg',
    tagEn: 'Divine Leela',
    tagTe: 'దివ్య లీల',
    author: 'Bhaskaranaidu',
    license: 'Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:A_picture_at_Tirumala_near_temple.jpeg',
    sourceName: 'Wikimedia Commons',
  },
  {
    id: 10,
    titleEn: 'Daily Sri Malayappa Swami Procession',
    titleTe: 'నిత్య శ్రీ మలయప్ప స్వామి ఊరేగింపు',
    subtitleEn: 'Sacred daily procession of Utsava Murthy Sri Malayappa Swami along the mada streets with holy umbrellas, lamps, and musical accompaniments',
    subtitleTe: 'తిరుమాడ వీధులలో ఛత్ర చామర, మంగళ వాయిద్యాల నడుమ వైభవంగా సాగే శ్రీ మలయప్ప స్వామివారి నిత్య దివ్య ఊరేగింపు',
    src: 'https://images.pexels.com/photos/36771232/pexels-photo-36771232.jpeg',
    tagEn: 'Daily Procession',
    tagTe: 'నిత్య ఊరేగింపు',
    author: 'Pexels Verified Contributor',
    license: 'Pexels License',
    licenseUrl: 'https://www.pexels.com/license/',
    sourceUrl: 'https://www.pexels.com/photo/traditional-hindu-procession-at-tirumala-temple-36771232/',
    sourceName: 'Pexels',
  },
  {
    id: 11,
    titleEn: 'Temple View from Akhilandam',
    titleTe: 'అఖిలాండం నుండి ఆలయ దర్శన దృశ్యం',
    subtitleEn: 'Sacred architectural view of the temple and traditional decor captured from the holy Akhilandam precinct',
    subtitleTe: 'కర్పూర దీపారాధనలు సమర్పించే పవిత్ర అఖిలాండం నుండి కనిపించే ఆలయ దివ్య సాంప్రదాయ దృశ్యం',
    src: 'https://images.pexels.com/photos/36771235/pexels-photo-36771235.jpeg',
    tagEn: 'Akhilandam View',
    tagTe: 'అఖిలాండం దృశ్యం',
    author: 'Pexels Verified Contributor',
    license: 'Pexels License',
    licenseUrl: 'https://www.pexels.com/license/',
    sourceUrl: 'https://www.pexels.com/photo/iconic-tirupati-temple-with-traditional-decor-36771235/',
    sourceName: 'Pexels',
  },
  {
    id: 12,
    titleEn: 'Swami Pushkarini Holy Waters & Steps',
    titleTe: 'స్వామి పుష్కరిణి పవిత్ర తీర్థ జలాలు & మెట్లు',
    subtitleEn: 'Ancient holy stone steps descending into the purifying waters of Swami Pushkarini where devotees take sacred bath',
    subtitleTe: 'భక్తులు దర్శనానికి ముందు పవిత్ర స్నానమాచరించే స్వామి పుష్కరిణి దివ్య రాతి మెట్లు మరియు పవిత్ర జలాలు',
    src: 'https://images.pexels.com/photos/36771239/pexels-photo-36771239.jpeg',
    tagEn: 'Swami Pushkarini',
    tagTe: 'స్వామి పుష్కరిణి',
    author: 'Pexels Verified Contributor',
    license: 'Pexels License',
    licenseUrl: 'https://www.pexels.com/license/',
    sourceUrl: 'https://www.pexels.com/photo/sacred-water-tank-at-tirupati-hindu-temple-36771239/',
    sourceName: 'Pexels',
  },
];

export const SACRED_GALLERY_ITEMS = ALL_GALLERY_ITEMS;

export default function SacredGridGallery({
  lang = 'en',
  items = ALL_GALLERY_ITEMS,
  gap = 14,
  expandFactor = 1.75,
  embedded = false,
  onSelectImage,
}) {
  const isTe = lang === 'te';
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [showAttributions, setShowAttributions] = useState(false);
  const [cols, setCols] = useState(3);

  // Responsive column determination
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCols(1);
      } else if (window.innerWidth < 1024) {
        setCols(2);
      } else {
        setCols(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rows = Math.ceil(items.length / cols);

  // Dynamic template calculation across all rows & columns
  const getGridTemplate = () => {
    if (cols === 1) {
      return {
        gridTemplateColumns: '1fr',
        gridTemplateRows: Array(items.length).fill('240px').join(' '),
      };
    }

    if (hoveredIndex === null) {
      return {
        gridTemplateColumns: Array(cols).fill('1fr').join(' '),
        gridTemplateRows: Array(rows).fill('230px').join(' '),
      };
    }

    const hoveredRow = Math.floor(hoveredIndex / cols);
    const hoveredCol = hoveredIndex % cols;

    const colTemplates = Array.from({ length: cols }, (_, c) =>
      c === hoveredCol ? `${expandFactor}fr` : '0.85fr'
    ).join(' ');

    const rowTemplates = Array.from({ length: rows }, (_, r) =>
      r === hoveredRow ? '320px' : '210px'
    ).join(' ');

    return {
      gridTemplateColumns: colTemplates,
      gridTemplateRows: rowTemplates,
    };
  };

  const gridStyles = getGridTemplate();
  const activeItem = activeLightboxIndex !== null ? items[activeLightboxIndex] : null;

  const handlePrev = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handlePrev, handleNext]);

  const handleItemClick = (index, item) => {
    setActiveLightboxIndex(index);
    if (onSelectImage) onSelectImage(item);
  };

  return (
    <section className={`w-full transition-colors ${embedded ? 'p-1 sm:p-2 bg-transparent border-0 shadow-none' : 'my-8 p-4 sm:p-6 md:p-8 rounded-3xl bg-[#0B0E14] light-theme:bg-amber-50/70 border-2 border-[#D4AF37]/40 shadow-2xl'}`}>
      
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 light-theme:border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#FFD700]/20 text-[#FFD700] light-theme:text-amber-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD700] light-theme:text-amber-800">
              {isTe ? 'చిత్రమాలిక' : 'GALLERY'}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-extrabold gold-gradient-text tracking-tight">
            {isTe ? 'తిరుమల చిత్రమాలిక' : 'Tirumala Gallery'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAttributions(!showAttributions)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#141923] light-theme:bg-white text-[#FFD700] light-theme:text-amber-800 border border-[#D4AF37]/40 hover:border-[#FFD700] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isTe ? (showAttributions ? 'వివరాలు దాచు' : 'లైసెన్స్ & అట్రిబ్యూషన్') : (showAttributions ? 'Hide Credits' : 'License & Credits')}</span>
          </button>
          
          <div className="text-xs text-[#94A3B8] light-theme:text-slate-600 font-semibold flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>{isTe ? `${items.length} చిత్రాలు` : `${items.length} Photographs`}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#94A3B8] light-theme:text-slate-600 font-medium mb-4 flex items-center justify-between">
        <span>
          {isTe
            ? 'చిత్రంపై మౌస్ ఉంచి విస్తరించండి • క్లిక్ చేసి పెద్దదిగా వీక్షించండి'
            : 'Hover over any tile to dynamically expand view • Click to view full high-res photo'}
        </span>
      </div>

      {/* DYNAMIC EXPANDING GRID — ALL IMAGES TOGETHER, CONTINUOUS SCROLLABLE */}
      <div
        className="relative w-full select-none"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className="w-full grid transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            gridTemplateColumns: gridStyles.gridTemplateColumns,
            gridTemplateRows: gridStyles.gridTemplateRows,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id || index}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => handleItemClick(index, item)}
                className="relative w-full h-full overflow-hidden rounded-2xl cursor-pointer select-none bg-[#141923] border border-[#D4AF37]/30 hover:border-[#FFD700] group shadow-lg transition-all"
                title={`${isTe ? item.titleTe : item.titleEn} (Click to enlarge)`}
              >
                {/* Background Image */}
                <img
                  src={item.src}
                  alt={isTe ? item.titleTe : item.titleEn}
                  loading={index < 6 ? 'eager' : 'lazy'}
                  crossOrigin="anonymous"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.95] contrast-[1.05]"
                />

                {/* Ambient Lighting Vignette */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-85' : 'opacity-65'
                  }`}
                />

                {/* Top Badge: Category */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black text-[#FFD700] border border-[#FFD700]/40">
                    {isTe ? item.tagTe : item.tagEn}
                  </span>
                </div>

                {/* Top Right: License Pill */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="hidden group-hover:inline-flex px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-medium text-slate-300 border border-white/20 animate-fade-in">
                    {item.license}
                  </span>
                </div>

                {/* Bottom Title, Subtitle & Attribution Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10 transition-transform duration-300">
                  <h3 className="font-serif text-xs sm:text-sm md:text-base font-extrabold text-white drop-shadow leading-snug line-clamp-1">
                    {isTe ? item.titleTe : item.titleEn}
                  </h3>
                  
                  {/* Expanded Details on Hover */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isHovered ? 'max-h-24 opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2 drop-shadow leading-relaxed mb-1">
                      {isTe ? item.subtitleTe : item.subtitleEn}
                    </p>
                    <p className="text-[10px] text-[#FFD700]/90 font-mono truncate">
                      Photo: {item.author} ({item.license})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPANDABLE ATTRIBUTIONS & LICENSING AUDIT SECTION */}
      {showAttributions && (
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-[#141923] light-theme:bg-amber-100/60 border border-[#D4AF37]/40 shadow-inner text-xs text-slate-300 light-theme:text-slate-800 animate-fade-in max-h-[380px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3 font-serif font-bold text-sm text-[#FFD700] light-theme:text-amber-900 sticky top-0 bg-[#141923] py-1 z-10">
            <ShieldCheck className="w-4 h-4 text-[#FFD700] light-theme:text-amber-700" />
            <span>{isTe ? 'అన్ని చిత్రాల లైసెన్స్ మరియు క్రెడిట్ వివరాలు' : 'Master Licensing & Attribution Directory'}</span>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed text-[#94A3B8] light-theme:text-slate-600">
            {isTe
              ? 'ఈ చిత్రమాలికలోని అన్ని చిత్రాలు మీరు అందించిన పరిశోధనాత్మక లింకుల నుండి సేకరించబడిన వాస్తవ చిత్రాలు. అన్ని చిత్రాలు Creative Commons (CC BY 3.0, CC BY 4.0, CC BY-SA 4.0), Public Domain మరియు Pexels లైసెన్సుల నిబంధనలకు అనుగుణంగా ప్రదర్శించబడుతున్నాయి.'
              : 'All images featured in this gallery are the authentic photographs sourced from your researched links. They are displayed strictly in compliance with Creative Commons (CC BY 3.0, CC BY 4.0, CC BY-SA 4.0), Public Domain, and Pexels open licenses.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-black/40 light-theme:bg-white/80 border border-white/10 light-theme:border-amber-200/60 flex flex-col justify-between gap-2"
              >
                <div>
                  <h4 className="font-bold text-white light-theme:text-slate-900 text-[11px] mb-1">
                    {isTe ? item.titleTe : item.titleEn}
                  </h4>
                  <p className="text-[10px] text-[#94A3B8] light-theme:text-slate-600 truncate">
                    <span className="font-medium text-slate-300 light-theme:text-slate-800">Author:</span> {item.author}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5 light-theme:border-slate-200 text-[10px]">
                  <a
                    href={item.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FFD700] light-theme:text-amber-800 hover:underline font-mono font-semibold"
                  >
                    {item.license}
                  </a>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#60A5FA] light-theme:text-blue-700 hover:underline"
                  >
                    <span>{item.sourceName || 'Source'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL PREVIEW LIGHTBOX MODAL WITH PREV / NEXT */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="gallery-lightbox-modal relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-[#0B0E14] light-theme:bg-white border-2 border-[#D4AF37] shadow-2xl text-slate-100 light-theme:text-slate-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close Bar with Prominent Photo Name */}
            <div className="gallery-lightbox-header shrink-0 flex items-center justify-between px-4 py-3 sm:py-3.5 bg-[#141923] light-theme:bg-[#FFFDF7] border-b border-[#D4AF37]/40 light-theme:border-amber-300/60 z-20">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 mr-3">
                <span className="gallery-lightbox-badge shrink-0 px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 light-theme:bg-amber-100 text-[10px] sm:text-[11px] font-black text-[#FFD700] light-theme:text-amber-900 border border-[#FFD700]/40 light-theme:border-amber-400">
                  {isTe ? activeItem.tagTe : activeItem.tagEn}
                </span>
                <h3 className="gallery-lightbox-title font-serif text-sm sm:text-base md:text-lg font-black text-white light-theme:text-slate-900 truncate drop-shadow light-theme:drop-shadow-none">
                  {isTe ? activeItem.titleTe : activeItem.titleEn}
                </h3>
                <span className="shrink-0 text-xs text-[#94A3B8] light-theme:text-slate-600 font-mono hidden sm:inline">
                  ({activeLightboxIndex + 1} / {items.length})
                </span>
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="gallery-lightbox-close shrink-0 p-1.5 rounded-full bg-black/60 light-theme:bg-slate-100 hover:bg-[#D4AF37] hover:text-black light-theme:hover:bg-amber-100 text-[#FFD700] light-theme:text-slate-800 border border-[#D4AF37]/40 light-theme:border-slate-300 transition-all cursor-pointer shadow-md"
                title="Close (Esc)"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image Stage */}
            <div className="relative flex-1 min-h-[220px] max-h-[58vh] sm:max-h-[62vh] bg-black/95 flex items-center justify-center overflow-hidden select-none">
              <img
                src={activeItem.src}
                alt={isTe ? activeItem.titleTe : activeItem.titleEn}
                crossOrigin="anonymous"
                className="w-full h-full max-h-[58vh] sm:max-h-[62vh] object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="gallery-lightbox-nav absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 light-theme:bg-white/90 hover:bg-[#D4AF37] hover:text-black light-theme:hover:bg-amber-100 text-[#FFD700] light-theme:text-amber-900 border border-[#D4AF37]/60 light-theme:border-amber-400 transition-all cursor-pointer shadow-xl backdrop-blur-md z-20"
                title="Previous (Arrow Left)"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="gallery-lightbox-nav absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 light-theme:bg-white/90 hover:bg-[#D4AF37] hover:text-black light-theme:hover:bg-amber-100 text-[#FFD700] light-theme:text-amber-900 border border-[#D4AF37]/60 light-theme:border-amber-400 transition-all cursor-pointer shadow-xl backdrop-blur-md z-20"
                title="Next (Arrow Right)"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* On-Image Title Caption Pill (Always high-contrast on image) */}
              <div className="absolute bottom-3 left-3 sm:left-4 z-10 pointer-events-none max-w-[85%]">
                <div className="inline-block px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg">
                  <p className="font-serif text-xs sm:text-sm font-bold text-[#FFD700] drop-shadow truncate">
                    {isTe ? activeItem.titleTe : activeItem.titleEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Attribution Bar */}
            <div className="gallery-lightbox-footer shrink-0 p-3.5 sm:p-5 bg-[#141923] light-theme:bg-[#FFFDF7] border-t border-[#D4AF37]/30 light-theme:border-amber-300/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="gallery-lightbox-gold-title font-serif text-base sm:text-lg font-black text-[#FFD700] light-theme:text-amber-900">
                    {isTe ? activeItem.titleTe : activeItem.titleEn}
                  </h4>
                  <span className="text-xs text-[#94A3B8] light-theme:text-slate-600 font-mono sm:hidden">
                    • {activeLightboxIndex + 1} / {items.length}
                  </span>
                </div>
                <p className="gallery-lightbox-desc text-xs sm:text-sm text-slate-200 light-theme:text-slate-700 mt-1 max-w-xl leading-relaxed">
                  {isTe ? activeItem.subtitleTe : activeItem.subtitleEn}
                </p>
              </div>

              {/* Attribution and License Links */}
              <div className="flex flex-col sm:items-end gap-1.5 text-xs text-slate-300 light-theme:text-slate-700 shrink-0 w-full sm:w-auto">
                <div className="font-medium text-[11px] sm:text-xs text-slate-300 light-theme:text-slate-700">
                  Photograph by: <span className="gallery-lightbox-author font-bold text-white light-theme:text-slate-900">{activeItem.author}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={activeItem.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="gallery-lightbox-license px-2.5 py-1 rounded-md bg-black/60 light-theme:bg-amber-100 text-[#FFD700] light-theme:text-amber-950 border border-[#FFD700]/40 light-theme:border-amber-400 font-mono font-bold hover:bg-[#FFD700] hover:text-black light-theme:hover:bg-amber-200 transition-colors"
                  >
                    {activeItem.license}
                  </a>
                  <a
                    href={activeItem.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-950/60 light-theme:bg-blue-50 text-blue-300 light-theme:text-blue-900 border border-blue-500/40 light-theme:border-blue-300 hover:bg-blue-600 hover:text-white light-theme:hover:bg-blue-100 transition-colors font-medium"
                  >
                    <span>View Original</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
