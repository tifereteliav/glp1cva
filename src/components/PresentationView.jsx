import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Download, Maximize2, Minimize2, 
  Printer, Play, Pause, RotateCcw, LayoutGrid, CheckCircle2,
  FileText, Activity, Pill, ShieldAlert, Heart, User, Sparkles
} from 'lucide-react';
import { patientProfile, simulationStages } from '../data/simulationData';

export default function PresentationView({ onExitToSimulation }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const containerRef = useRef(null);

  const totalSlides = 27;

  // Keyboard navigation (Arrow Right = Next in RTL, Arrow Left = Prev)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToNext();
      } else if (e.key === 'ArrowRight') {
        goToPrev();
      } else if (e.key === 'Escape') {
        if (isFullscreen) exitFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isFullscreen]);

  const goToNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const goToPrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Define slide metadata for drawer
  const slideTitles = [
    "1. שער המצגת: סימולציית טיפול ב-GLP1",
    "2. מבנה הלומדה ומסלול הטיפול במטופל",
    "3. שלב 1: פרופיל אישי ומשפחתי של יעקב",
    "4. שלב 1: מחלות רקע של המטופל (12 אבחנות)",
    "5. שלב 1: בדיקה גופנית ומדדי סימנים חיוניים",
    "6. שלב 1: בדיקות מעבדה בסיסיות ונוגדני GAD",
    "7. שלב 1: היסטוריית HbA1C לאורך השנים",
    "8. שלב 1: טיפול תרופתי נוכחי בביקור",
    "9. שלב 1: סיבוכי מחלת ההשמנה (תרשים)",
    "10. שלב 1: אנמנזה ותחקור המטופל ע\"י האחות",
    "11. שלב 1: שיח טיפולי ותקשורת מקרבת",
    "12. שלב 1: דילמות קליניות ושאלות אבחון",
    "13. שלב 2: החלטה על אינסולין קצר טווח (נובורפיד)",
    "14. שלב 2: בדיקת הזרקות ופריקת נתוני Libre",
    "15. שלב 2: שאלות פתוחות לחשיבה קלינית",
    "16. שלב 2: ראיות מחקריות - ירידה במשקל (STEP)",
    "17. שלב 2: ראיות מחקריות - סבילות ובחילות",
    "18. שלב 2: ראיות מחקריות - מחקר SELECT ו-MACE",
    "19. שלב 2: קריטריוני זכאות וסבסוד שב\"ן",
    "20. שלב 2: עדכון תוכנית טיפול ואורח חיים",
    "21. שלב 3: סולם מינוני Wegovy וטיטרציית אינסולין",
    "22. שלב 3: הישגים קליניים ופרוטוקול בטיחות",
    "23. שלב 4: ניתוח מדדי חיישן Libre 2 ו-AGP",
    "24. שלב 4: השוואת מדדים - לפני וויגובי מול Wegovy",
    "25. שלב 5: סיכום קליני של המקרה",
    "26. שלב 5: ארבעת העקרונות המנחים לפרקטיקה",
    "27. שלב 5: תוכנית המשך מעקב וסגירה"
  ];

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: isFullscreen ? '100vh' : '88vh',
        background: '#0f172a',
        color: '#1e293b',
        borderRadius: isFullscreen ? 0 : '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        position: 'relative'
      }}
    >
      {/* Top Presentation Toolbar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 50
      }}>
        {/* Brand & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/tiferet_eliav_logo.jpg" 
            alt="TIFERET ELIAV" 
            style={{ height: '36px', borderRadius: '8px', border: '1px solid #c7d2fe' }} 
          />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
              מצגת שקופיות קלינית • TIFERET ELIAV Diabetes & AI
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים
            </div>
          </div>
        </div>

        {/* Slide Counter & Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.95rem' }}>
            שקופית {currentSlide} מתוך {totalSlides}
          </div>

          <div style={{
            width: '140px',
            height: '6px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(currentSlide / totalSlides) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7, #4f46e5)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Actions Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="רשימת כל השקופיות"
            style={{
              background: showThumbnails ? '#0284c7' : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <LayoutGrid size={16} />
            <span>תוכן שקופיות</span>
          </button>

          <a
            href="/GLP1_Presentation_Tiferet_Eliav_Redesign.pptx"
            download="GLP1_Presentation_Tiferet_Eliav_Redesign.pptx"
            title="הורדת מצגת PowerPoint מעודכנת (.pptx)"
            style={{
              background: '#581c87',
              color: 'white',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(88, 28, 135, 0.4)'
            }}
          >
            <Download size={16} />
            <span>הורד כ-PowerPoint (.pptx)</span>
          </a>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {onExitToSimulation && (
            <button
              onClick={onExitToSimulation}
              style={{
                background: '#e2e8f0',
                color: '#0f172a',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginRight: '6px'
              }}
            >
              חזרה לסימולציה 🖥️
            </button>
          )}
        </div>
      </div>

      {/* Main Slide Stage Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#090d16',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Previous Slide Button (Right side in Hebrew RTL navigation) */}
        <button
          onClick={goToPrev}
          disabled={currentSlide === 1}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: currentSlide === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)',
            color: currentSlide === 1 ? 'rgba(255,255,255,0.2)' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '54px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
            zIndex: 30,
            backdropFilter: 'blur(6px)',
            transition: 'all 0.2s ease'
          }}
          title="שקופית קודמת (חץ ימינה)"
        >
          <ChevronRight size={32} />
        </button>

        {/* Slide Canvas (16:9 ratio) */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: '16/9',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {renderSlideContent(currentSlide)}
        </div>

        {/* Next Slide Button (Left side in Hebrew RTL navigation) */}
        <button
          onClick={goToNext}
          disabled={currentSlide === totalSlides}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: currentSlide === totalSlides ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)',
            color: currentSlide === totalSlides ? 'rgba(255,255,255,0.2)' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '54px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer',
            zIndex: 30,
            backdropFilter: 'blur(6px)',
            transition: 'all 0.2s ease'
          }}
          title="שקופית הבאה (חץ שמאלה)"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Slide Thumbnails Drawer Modal */}
        {showThumbnails && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            padding: '40px',
            overflowY: 'auto'
          }}>
            <div style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  כל שקופיות המצגת (27 שקופיות)
                </h3>
                <button
                  onClick={() => setShowThumbnails(false)}
                  style={{
                    background: 'white',
                    color: '#0f172a',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  סגור ✕
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px'
              }}>
                {slideTitles.map((title, idx) => {
                  const slideNum = idx + 1;
                  const isActive = slideNum === currentSlide;

                  return (
                    <div
                      key={slideNum}
                      onClick={() => {
                        setCurrentSlide(slideNum);
                        setShowThumbnails(false);
                      }}
                      style={{
                        background: isActive ? '#0284c7' : 'rgba(255,255,255,0.08)',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        border: isActive ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        textAlign: 'right',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 4px 16px rgba(2, 132, 199, 0.4)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', color: isActive ? '#e0f2fe' : '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                        שקופית {slideNum}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.4 }}>
                        {title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide Navigation Bottom Bar */}
      <div style={{
        background: '#0f172a',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button
          onClick={goToPrev}
          disabled={currentSlide === 1}
          style={{
            background: 'white',
            color: '#0f172a',
            border: 'none',
            padding: '8px 24px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
            opacity: currentSlide === 1 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ChevronRight size={18} />
          הקודם
        </button>

        <span style={{ color: '#cbd5e1', fontWeight: 700, fontSize: '0.95rem' }}>
          {currentSlide} / {totalSlides}
        </span>

        <button
          onClick={goToNext}
          disabled={currentSlide === totalSlides}
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
            color: 'white',
            border: 'none',
            padding: '8px 24px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer',
            opacity: currentSlide === totalSlides ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          הבא
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
}

// Function to render each slide with professional visual fidelity
function renderSlideContent(slideNum) {
  const SlideHeader = ({ title, category, badge }) => (
    <div style={{
      padding: '18px 30px',
      borderBottom: '1px solid #e2e8f0',
      background: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '4px solid #0284c7'
    }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '2px' }}>
          {badge ? `${badge} • ` : ''}{category}
        </div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
          {title}
        </h2>
      </div>
      <img 
        src="/tiferet_eliav_logo.jpg" 
        alt="Logo" 
        style={{ height: '40px', borderRadius: '8px', border: '1px solid #c7d2fe' }} 
      />
    </div>
  );

  const SlideFooter = () => (
    <div style={{
      marginTop: 'auto',
      padding: '10px 30px',
      borderTop: '1px solid #f1f5f9',
      background: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.78rem',
      color: '#64748b'
    }}>
      <span>TIFERET ELIAV • Diabetes & AI | סימולציית טיפול ב-GLP1 בסוכרת והשמנה</span>
      <span style={{ fontWeight: 800, color: '#0284c7' }}>{slideNum} / 27</span>
    </div>
  );

  switch (slideNum) {
    // ----------------------------------------------------
    // SLIDE 1: Title
    // ----------------------------------------------------
    case 1:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', padding: '35px 50px', justifyContent: 'space-between', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
            <img src="/tiferet_eliav_logo.jpg" alt="Logo" style={{ height: '70px', borderRadius: '14px', border: '2px solid #c7d2fe', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.15)' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4f46e5' }}>TIFERET ELIAV</div>
              <div style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}>Diabetes & AI</div>
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: '1.95rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginBottom: '14px' }}>
              סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
              תיאור מקרה קליני מורכב: יעקב (בן 67) | Double Diabetes (T1D + השמנה BMI 36.1) | רקע CVA 2023 ו-IHD<br />
              ניהול טיפול מתקדם, טיטרציית Wegovy 2.4mg, התאמת מינוני אינסולין וניטור רציף ב-Libre 2
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '950px', margin: '0 auto', width: '100%', textAlign: 'right' }}>
            <div style={{ background: '#e0f2fe', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #bae6fd' }}>
              <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.95rem', marginBottom: '4px' }}>פרופיל מטופל מורכב</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>שילוב סוכרת סוג 1, השמנה (BMI 36.1), CVA, IHD, כבד שומני וכיב כף רגל.</div>
            </div>
            <div style={{ background: '#f3e8ff', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #e9d5ff' }}>
              <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem', marginBottom: '4px' }}>טיטרציית Wegovy</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>הגעה ל-2.4mg, קיצוץ 70% באינסולין בולוס והורדת בזאלי ל-36 יחידות.</div>
            </div>
            <div style={{ background: '#dcfce7', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #a7f3d0' }}>
              <div style={{ fontWeight: 800, color: '#15803d', fontSize: '0.95rem', marginBottom: '4px' }}>הישגי Libre 2</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL וירידה של 11 ק"ג!</div>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>שקופית 1 / 27</div>
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 2: Curriculum Overview
    // ----------------------------------------------------
    case 2:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="מבנה הלומדה ומסלול הטיפול במטופל" category="מפת הדרך הקלינית" />
          <div style={{ padding: '24px 35px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
            {[
              { num: 'שלב 1', title: 'קבלת המטופל והערכה ראשונית', sub: 'אנמנזה מקיפה, תקשורת מקרבת, מחלות רקע, מעבדה, בדיקה גופנית ודילמת Double Diabetes', bg: '#e0f2fe', col: '#0284c7' },
              { num: 'שלב 2', title: 'ביקור ראשון (חלק ב\')', sub: 'החלטה על אינסולין קצר טווח, פריקת Libre, בדיקת הזרקות, ראיות מחקריות (STEP, SELECT, שב"ן)', bg: '#ccfbf1', col: '#0d9488' },
              { num: 'שלב 3', title: 'מעקב וטיטרציה תחת Wegovy 2.4mg', sub: 'סולם מינוני Wegovy, הורדת 70% באינסולין בולוס, התאמת בזאלי ומניעת היפוגליקמיה', bg: '#f3e8ff', col: '#7e22ce' },
              { num: 'שלב 4', title: 'ניתוח מדדי חיישן סוכר Libre 2 / AGP', sub: 'זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL, GMI 6.1% וניתוח פרופיל יממתי מלא', bg: '#dcfce7', col: '#10b981' },
              { num: 'שלב 5', title: 'סיכום קליני ומסקנות מנחות', sub: 'הטבה במשקל, בשינה ובפצע כף הרגל, הפחתת סיכון טרשתי ועקרונות לפרקטיקה', bg: '#fef3c7', col: '#d97706' }
            ].map((s, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>{s.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{s.sub}</div>
                </div>
                <div style={{ background: s.bg, color: s.col, padding: '6px 14px', borderRadius: '16px', fontWeight: 800, fontSize: '0.88rem' }}>
                  {s.num}
                </div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 3: Patient Profile & Demographics
    // ----------------------------------------------------
    case 3:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: קבלת המטופל – תיאור המטופל ורקע משפחתי" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            {/* Details Right */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '1.1rem', marginBottom: '4px' }}>פרופיל אישי ומשפחתי – יעקב</div>
              <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6 }}>• <strong>שם וגיל:</strong> יעקב, בן 67 (יליד 1959)</div>
              <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6 }}>• <strong>מצב משפחתי:</strong> נשוי + 8 ילדים, אב וסב למשפחה ברוכת ילדים</div>
              <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6 }}>• <strong>תעסוקה ואורח חיים:</strong> עובד בישיבה, סדר יום לחוץ, נסיעות וטיסות תכופות לחו"ל</div>
              <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6 }}>• <strong>היסטוריית סוכרת:</strong> מאובחנת משנת 2011 (כ-15 שנות מחלה מתועדות)</div>
              <div style={{ background: '#fef3c7', padding: '8px 12px', borderRadius: '10px', color: '#92400e', fontWeight: 800, fontSize: '0.88rem' }}>
                • <strong>סיפור משפחתי:</strong> היסטוריה משפחתית מובהקת של סוכרת בקרב קרובי משפחה
              </div>
              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                • <strong>רקע וסקולרי:</strong> אירוע מוחי CVA (2023) עם שארית קושי בדיבור ואי יציבות, מחלת לב איסכמית IHD לאחר צנתור.
              </div>
            </div>

            {/* Left Image & Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <img src="/yaakov_first_visit.png" alt="יעקב במרפאה" style={{ maxHeight: '200px', borderRadius: '14px', border: '2px solid #cbd5e1', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }} />
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px', width: '100%', textAlign: 'right', fontSize: '0.82rem', color: '#78350f' }}>
                <strong>נתוני פתיחה קריטיים:</strong> A1C בסיס 13.4% | משקל 96 ק"ג | BMI 36.1 | נוגדני GAD חיוביים (2.8 U/mL)!
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 4: Past Medical History
    // ----------------------------------------------------
    case 4:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: מחלות רקע של המטופל (Past Medical History)" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '18px 30px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '18px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '1rem', marginBottom: '8px' }}>12 מחלות רקע ואבחנות מתועדות:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { n: "היפרליפידמיה", y: "1992" },
                  { n: "כבד שומני (Fatty Liver)", y: "1994" },
                  { n: "סוכרת שאינה תלויה", y: "2004 (2011)" },
                  { n: "מחלת דיסק מותני", y: "2004" },
                  { n: "השמנה (BMI 36.1)", y: "2012" },
                  { n: "צנתור כלילי (RCA/LAD)", y: "2019" },
                  { n: "מחלת לב איסכמית (IHD)", y: "2019" },
                  { n: "טרשת עורקים כלילית", y: "2019" },
                  { n: "עודף חומצת שתן", y: "2019" },
                  { n: "אירוע מוחי CVA", y: "2023" },
                  { n: "דום נשימה בשינה (OSA)", y: "2024" },
                  { n: "עישון בעבר (הפסיק)", y: "1977-2012" }
                ].map((c, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{c.n}</span>
                    <span style={{ color: '#0284c7', fontWeight: 800 }}>{c.y}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <img src="/labs/medical_conditions.jpg" alt="מסמך מחלות רקע" style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '0.8rem', color: '#1e3a8a', textAlign: 'right' }}>
                <strong>משמעות:</strong> ריבוי תחלואה טרשתית (CVA, IHD), כבד שומני והשמנה מחייבים הגנה וסקולרית ממוקדת באמצעות GLP-1 RA.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 5: Physical Exam & Vital Signs
    // ----------------------------------------------------
    case 5:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: בדיקה גופנית ומדדי סימנים חיוניים" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { t: "לחץ דם", v: "158/72 mmHg", s: "יל\"ד סיסטולי מוגבר", c: "#dc2626", bg: "#fef2f2" },
                { t: "דופק", v: "80 פעימות/דקה", s: "סדיר", c: "#0284c7", bg: "#eff6ff" },
                { t: "משקל וגובה", v: "96 ק\"ג | 163 ס\"מ", s: "בסיס בקבלה", c: "#ea580c", bg: "#fff7ed" },
                { t: "מדד מסת גוף BMI", v: "36.1 kg/m²", s: "השמנה דרגה 2 (מותן: 98 ס\"מ)", c: "#d97706", bg: "#fef3c7" },
                { t: "הרגל עישון", v: "מעשן בעבר", s: "הפסיק בשנת 2012", c: "#16a34a", bg: "#f0fdf4" },
                { t: "קרקעית העין", v: "NODR", s: "ללא רטינופתיה סוכרתית", c: "#7e22ce", bg: "#faf5ff" }
              ].map((m, i) => (
                <div key={i} style={{ background: m.bg, padding: '12px', borderRadius: '12px', border: `1px solid ${m.c}33`, textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: m.c, fontWeight: 700 }}>{m.t}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '2px 0' }}>{m.v}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.s}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', padding: '14px 20px', borderRadius: '14px', border: '1.5px solid #bae6fd', borderRight: '6px solid #0284c7', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem', marginBottom: '2px' }}>בדיקת כפות רגליים והיקפיות:</div>
              <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>
                דופק טיבאלי חלש ברגל ימין עם נוכחות של כיב פעיל המטופל במרפאת פצע. המטופל מביע חרדה עמוקה מאיבוד הרגל בעקבות מקרה של שכנו שעבר כריתה.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 6: Baseline Labs
    // ----------------------------------------------------
    case 6:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: בדיקות מעבדה בסיסיות (Baseline Laboratory)" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '18px 30px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '18px', flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { n: "HbA1C בסיס", v: "13.4%", d: "לא מאוזן קיצוני", c: "#dc2626" },
                { n: "גלוקוז בצום", v: "220 mg/dL", d: "היפרגליקמיה קשה", c: "#ea580c" },
                { n: "כולסטרול LDL", v: "121 mg/dL", d: "מעל היעד (<55)", c: "#d97706" },
                { n: "יחס ACR בשתן", v: "180 mg/g", d: "מיקרואלבומינוריה", c: "#7e22ce" },
                { n: "תפקוד כליות eGFR", v: "75 mL/min", d: "שמור יחסית (G2)", c: "#0d9488" },
                { n: "נוגדני GAD", v: "2.8 U/mL", d: "חיובי (אוטואימוני)", c: "#0284c7" }
              ].map((l, i) => (
                <div key={i} style={{ background: 'white', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{l.n}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: l.c }}>{l.v}</div>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>{l.d}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <img src="/labs/biochemistry_labs.png" alt="טבלת מעבדה" style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', color: '#1e3a8a', textAlign: 'right', border: '1px solid #bfdbfe' }}>
                <strong>אבחנה אנדוקרינולוגית:</strong> נוגדני GAD חיוביים (2.8 U/mL) מעידים על מרכיב אוטואימוני (T1D), אך עודף המשקל הקיצוני גורם לתנגודת עצומה המצריכה מינוני עתק.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 7: HbA1C History
    // ----------------------------------------------------
    case 7:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: היסטוריית מדד HbA1C לאורך השנים" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '4px' }}>מעקב היסטורי 2023-2026:</div>
              {[
                { d: "10/2023", v: "12.3%", s: "חוסר איזון מתמשך", c: "#dc2626" },
                { d: "06/2024", v: "12.1%", s: "היפרגליקמיה קשה", c: "#dc2626" },
                { d: "04/2025", v: "13.2%", s: "החמרה הדרגתית", c: "#dc2626" },
                { d: "12/2025", v: "13.4%", s: "ערך שיא בבסיס", c: "#dc2626" },
                { d: "03/2026", v: "5.0%", s: "תחת Wegovy 2.4mg והתאמת אינסולין!", c: "#059669" },
                { d: "05/2026", v: "5.7%", s: "שמירה על איזון יציב ומושלם", c: "#059669" }
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: i >= 4 ? '#ecfdf5' : '#fef2f2', borderRadius: '8px', border: `1px solid ${i >= 4 ? '#a7f3d0' : '#fecaca'}` }}>
                  <span style={{ fontWeight: 800, color: h.c, fontSize: '1.05rem' }}>{h.v}</span>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{h.s}</span>
                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{h.d}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <img src="/labs/hba1c_history.jpg" alt="היסטוריית A1C" style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', color: '#166534', textAlign: 'right', border: '1px solid #bbf7d0' }}>
                <strong>מהפך:</strong> צניחה דרמטית מ-13.4% ל-5.0%-5.7% תודות ל-Wegovy ולשבירת התנגודת לאינסולין.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 8: Baseline Medications
    // ----------------------------------------------------
    case 8:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: טיפול תרופתי נוכחי בביקור הראשון" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', flex: 1, alignContent: 'center' }}>
            {[
              { n: "INS TREGLUDEC 100U (טרגלודק)", d: "40 יחידות פעם ביום", r: "אינסולין בזאלי ארוך טווח", c: "#0284c7" },
              { n: "SEMAGLUTIDE 1MG (אוזמפיק)", d: "1 מ\"ג פעם בשבוע", r: "GLP-1 RA (נוטל לעיתים רחוקות)", c: "#7e22ce" },
              { n: "JARDIANCE DUO 12.5/850", d: "1 טבליה X 2 ביום", r: "Empagliflozin + Metformin", c: "#0d9488" },
              { n: "ATORVASTATIN TAB 80MG", d: "1 טבליה ביום", r: "הורדת כולסטרול וליפידים", c: "#d97706" },
              { n: "CARTIA TAB 100MG (אספירין)", d: "1 טבליה ביום", r: "מניעה שניונית CVA/IHD", c: "#dc2626" },
              { n: "OMEPRADEX 20MG CAP", d: "1 קפסולה ביום", r: "הגנה על רירית הקיבה", c: "#64748b" },
              { n: "BETMIGA PR 25MG TAB", d: "1 טבליה ביום", r: "שלפוחית השתן", c: "#64748b" },
              { n: "OMNIC CAP 0.4MG", d: "2 כמוסות ביום", r: "מערכת השתן", c: "#64748b" },
              { n: "SERTRALINE 100MG TAB", d: "1 טבליה ביום", r: "איזון נפשי ורגשי", c: "#64748b" }
            ].map((m, i) => (
              <div key={i} style={{ background: 'white', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{m.n}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.r}</div>
                </div>
                <span style={{ background: '#f1f5f9', color: m.c, fontWeight: 800, fontSize: '0.78rem', padding: '4px 8px', borderRadius: '6px' }}>{m.d}</span>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 9: Obesity Complications
    // ----------------------------------------------------
    case 9:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: תזכורת – סיבוכי מחלת ההשמנה (Obesity Complications)" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1.5px solid #fbcfe8', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#db2777', fontSize: '1.05rem', marginBottom: '8px' }}>מחלה כרונית רב-מערכתית:</div>
              <ul style={{ paddingRight: '20px', margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                <li><strong>סיבוכים מטבוליים:</strong> סוכרת סוג 2, החמרה קשה בסוכרת סוג 1, דיסליפידמיה אגרסיבית, כבד שומני (MASLD/MASH).</li>
                <li><strong>סיבוכים וסקולריים:</strong> אירועים מוחיים (CVA), מחלת לב איסכמית (IHD), טרשת עורקים.</li>
                <li><strong>סיבוכים מכניים ואיכות חיים:</strong> דום נשימה בשינה (OSA), עומס מפרקי, פגיעה באספקת דם לכפות הרגליים ופצעים קשי ריפוי.</li>
                <li><strong>מסקנה טיפולית:</strong> טיפול בהשמנה באמצעות GLP-1 פותר את שורש הבעיה ולא רק את הסימפטומים!</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/obesity_complications.png" alt="תרשים סיבוכי השמנה" style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 10: Nurse Anamnesis Q&A
    // ----------------------------------------------------
    case 10:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1 (חלק א'): תחקור המטופל על ידי האחות (אנמנזה)" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '16px 30px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
            {[
              { q: "איך אתה מתנהל ביום יום ומהם הרגלי התזונה שלך?", a: "יש לי עבודה מאוד לחוצה, ואני אוכל בנשנושים ולא באופן מסודר.", t: "תזונה", c: "#d97706" },
              { q: "האם אתה מבצע פעילות גופנית בחיי היומיום?", a: "אני עושה הרבה הליכות תוך כדי העבודה כי אני רץ ממקום למקום, אבל חוץ מזה לא עושה פעילות כלשהי.", t: "פעילות", c: "#0284c7" },
              { q: "איך השינה שלך בלילה?", a: "אני לא ישן הרבה, אולי 4 או 5 שעות בלילה, ואני ישן גרוע.", t: "שינה", c: "#7e22ce" },
              { q: "מה הכי מטריד אותך כרגע מבחינה בריאותית?", a: "אני מאוד מפחד מהפצע שיש לי ברגל, כי יש לי שכן שכרתו לו את הרגל ואני מאוד מפחד מזה.", t: "חששות", c: "#dc2626" },
              { q: "האם אתה מקפיד לקחת את הטיפול התרופתי הקבוע שלך?", a: "אני לוקח את האוזמפיק רק לפעמים כי אני חושש שיפגע בעיניים וחושש בנסיעות מתופעות לוואי.", t: "היענות", c: "#059669" }
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 800, color: item.c, fontSize: '0.85rem' }}>שאלת האחות: "{item.q}"</span>
                  <span style={{ background: `${item.c}15`, color: item.c, fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>{item.t}</span>
                </div>
                <div style={{ color: '#1e293b', fontSize: '0.85rem' }}>תשובת יעקב: <em>"{item.a}"</em></div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 11: Nurse Communication Styles
    // ----------------------------------------------------
    case 11:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1 (חלק ב'): שיח טיפולי ותקשורת מקרבת לבניית אמון" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '16px 30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', flex: 1, alignContent: 'center' }}>
            {[
              {
                t: "תגובה 1 (מומלצת) - אמפתית ומגייסת",
                st: "\"יעקב, אני מבינה אותך לגמרי. זה הכי טבעי בעולם שתפחד מהפצע ברגל... אתה לא לבד בזה, יש פה צוות שלם לצידך ונשמור על הרגל ביחד.\"",
                re: "יעקב נרגע, מחייך: \"תודה רבה, אני מוכן לעשות מה שצריך כדי להתאזן.\"",
                fb: "✅ מתן לגיטימציה לחרדה בונה אמון ומביא להיענות מקסימלית.",
                c: "#10b981", bg: "#f0fdf4"
              },
              {
                t: "תגובה 2 - שיפוטית ומאיימת",
                st: "\"יעקב, אתה חייב להבין שעם A1C של 13.4% אתה מסכן את עצמך. אם לא תיקח את עצמך בידיים הפצע ידרדר למצב כמו של השכן.\"",
                re: "מתכווץ בכיסא: \"אני יודע שאני לא בסדר... זה רק עושה לי יותר חרדה...\"",
                fb: "❌ הטחת אשמה מגבירה חרדה וגורמת להסתגרות.",
                c: "#ef4444", bg: "#fef2f2"
              },
              {
                t: "תגובה 3 - טכנית בלבד",
                st: "\"טוב יעקב, אין מה להילחץ. נחליף חבישה, נתאים תרופות חדשות ונשלח לבדיקות.\"",
                re: "מהנהן בקרירות: \"בסדר, רק שלא יהיו תופעות לוואי.\"",
                fb: "⚠️ התעלמות מרגש מונעת שותפות אמיתית.",
                c: "#f59e0b", bg: "#fffbeb"
              },
              {
                t: "תגובה 4 - מבטלת (\"אל תדאג\")",
                st: "\"אל תחשוב על דברים רעים, תהיה אופטימי! הכל יסתדר, רק קח תרופות.\"",
                re: "מניע ראשו: \"קל לומר תהיה אופטימי, אבל הפצע עדיין מפחיד אותי...\"",
                fb: "❌ ביטול רגשות גורם לתחושה שלא מקשיבים לו.",
                c: "#64748b", bg: "#f8fafc"
              }
            ].map((r, i) => (
              <div key={i} style={{ background: r.bg, padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${r.c}44`, textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: r.c, fontSize: '0.88rem', marginBottom: '4px' }}>{r.t}</div>
                <div style={{ fontSize: '0.8rem', color: '#1e293b', lineHeight: 1.4, marginBottom: '6px' }}>{r.st}</div>
                <div style={{ fontSize: '0.78rem', color: r.c, fontWeight: 700 }}>{r.re}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>{r.fb}</div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 12: Clinical Questions (Double Diabetes)
    // ----------------------------------------------------
    case 12:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 1: דילמות קליניות ושאלות אבחון (Double Diabetes)" category="קבלת המטופל" badge="שלב 1" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.98rem', marginBottom: '6px' }}>שאלה 1: איזה סוג סוכרת יש למטופל?</div>
              <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>
                • סוכרת משולבת (<strong>Double Diabetes</strong> - סוכרת סוג 1 + סוכרת סוג 2 / תנגודת קשה) - <strong>✅ נכון מאוד!</strong><br />
                <span style={{ color: '#0369a1', fontSize: '0.82rem' }}>הסבר: מרכיב אוטואימוני (נוגדני GAD חיוביים 2.8 U/mL) יחד עם השמנה קיצונית (BMI 36.1) ותנגודת עמוקה לאינסולין.</span>
              </div>
            </div>

            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #e9d5ff', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#7e22ce', fontSize: '0.98rem', marginBottom: '6px' }}>שאלה 2: הצורך במינוני עתק וערך ה-GLP-1 RA?</div>
              <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>
                • השילוב של סוכרת סוג 1 והשמנה יוצר תנגודת היקפית חריפה המצריכה כ-200u אינסולין ליום.<br />
                • <strong>ערך ה-GLP-1 RA במקרה זה:</strong> מוריד משקל, משפר רגישות לאינסולין, חוסך כ-70% במינון הבולוס ומספק <strong>הגנה קרדיווסקולרית ומוחית קריטית</strong> למטופל לאחר CVA ו-IHD!
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 13: Treatment Decision (Short-acting Insulin)
    // ----------------------------------------------------
    case 13:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: ביקור ראשון (חלק ב') – החלטה על אינסולין קצר טווח" category="ביקור ראשון (חלק ב')" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1.5px solid #a7f3d0', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#047857', fontSize: '1.05rem', marginBottom: '8px' }}>החלטה: הוספת נובורפיד 3 פעמים ביום וחיבור ל-Libre</div>
              <p style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.6, margin: 0 }}>
                עקב היפרגליקמיה משמעותית לאחר האוכל ו-A1C מאוד גבוה, הוחלט להוסיף למטופל טיפול באינסולין קצר טווח נובורפיד (Novorapid) 3 פעמים ביום לפני כל ארוחה, והוא חובר לסנסור Libre.
              </p>
              <div style={{ marginTop: '12px', background: '#f0fdf4', padding: '10px', borderRadius: '10px', fontSize: '0.82rem', color: '#15803d' }}>
                <strong>שלילת חלופות:</strong> DPP4/אקטוס/סולפונילאוריאה נפסלו בשל חוסר יעילות טרשתית, עלייה במשקל ורזרבה לבלבית שאינה ידועה (אין בדיקת C-Peptide).
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#e0f2fe', padding: '14px', borderRadius: '12px', border: '1px solid #bae6fd', textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem' }}>כיסוי היפרגליקמיה פוסט-פרנדיאלית</div>
                <div style={{ fontSize: '0.8rem', color: '#334155' }}>ערכי הסוכר לאחר ארוחות הגיעו ל-200-350 mg/dL וחייבו מענה ממוקד של בולוס.</div>
              </div>
              <div style={{ background: '#fef3c7', padding: '14px', borderRadius: '12px', border: '1px solid #fde68a', textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.9rem' }}>מעקב רציף Libre</div>
                <div style={{ fontSize: '0.8rem', color: '#334155' }}>מתן תמונת מצב מדויקת של מגמות הגלוקוז בזמן אמת.</div>
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 14: Libre Download & Injections
    // ----------------------------------------------------
    case 14:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: בדיקת מקומות הזרקה ופריקת נתוני קורא Libre (פברואר 2026)" category="ביקור ראשון (חלק ב')" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '8px' }}>פריקת קורא Libre (פברואר 2026)</div>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                חיבור קורא ה-Libre הכחול בכבל USB צהוב למחשב המרפאה. הנתונים הראו סוכר ממוצע 220 mg/dL, מדד GMI 8.6%, וזמן בטווח היעד (TIR) של 30% בלבד!
              </p>
              <img src="/labs/AGP_before_wegovy.png" alt="דוח Libre פברואר" style={{ maxHeight: '140px', maxWidth: '100%', borderRadius: '10px', marginTop: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #fed7aa', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#ea580c', fontSize: '1rem', marginBottom: '8px' }}>בדיקת מקומות הזרקת אינסולין וטכניקה</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li>המטופל מזריק נכון ומאחסן נכון את האינסולין.</li>
                <li><strong>ליקוי:</strong> לא החליף מחט בכל הזרקה (שימוש חוזר).</li>
                <li><strong>ממצא:</strong> גוש ליפודוסטרופיה באזור הבטן.</li>
                <li><strong>הדרכה שניתנה:</strong> החלפת מחט בכל הזרקה ורוטציה קבועה 4 אצבעות מהטבור לכיוון המותן למניעת שיבוש בספיגה.</li>
              </ul>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 15: Clinical Reflection Questions
    // ----------------------------------------------------
    case 15:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: שאלות לחשיבה קלינית וקבלת החלטות" category="ביקור ראשון (חלק ב')" badge="שלב 2" />
          <div style={{ padding: '18px 30px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
            {[
              {
                q: "1. האם המטופל עומד ביעד האיזון שלו?",
                a: "לא, כי ה-A1C עדיין 8.6% וה-TIR עומד על 30% בלבד – המטופל אינו מאוזן כלל.",
                c: "#dc2626", bg: "#fef2f2"
              },
              {
                q: "2. האם הטיפול שהמטופל מקבל מספיק אופטימלי למצב שלו?",
                a: "לא. מתן מינוני אינסולין גבוהים אינו מוריד משקל ואינו מספק הגנה כנגד סיבוכים טרשתיים.",
                c: "#ea580c", bg: "#fff7ed"
              },
              {
                q: "3. איזה שינויים אפשר ונדרש לבצע? ולמה?",
                a: "הוספת טיפול ב-GLP-1 (וויגובי):\n• הורדת משקל והפחתת תיאבון\n• הענקת הגנה קרדיווסקולרית ומוחית לסיבוכים טרשתיים (CVA/IHD)\n• שיפור בתנגודת לאינסולין\n• שיפור בתסמונת דום נשימה בשינה (OSA)",
                c: "#0284c7", bg: "#eff6ff"
              }
            ].map((r, i) => (
              <div key={i} style={{ background: r.bg, padding: '12px 18px', borderRadius: '12px', border: `1.5px solid ${r.c}33`, textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: r.c, fontSize: '0.92rem', marginBottom: '4px' }}>{r.q}</div>
                <div style={{ fontSize: '0.85rem', color: '#1e293b', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{r.a}</div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 16: STEP Trials Weight Loss
    // ----------------------------------------------------
    case 16:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: ראיות מחקריות – יעילות מוכחת בירידה במשקל (תוכנית STEP)" category="מחקרים וראיות" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '8px' }}>תוצאות מחקרי STEP עבור Wegovy 2.4mg:</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li><strong>STEP 1:</strong> ירידה ממוצעת מרשימה של <span style={{ color: '#d97706', fontWeight: 800 }}>16.9%</span> ממשקל הגוף כעבור 68 שבועות (לעומת 2.4% בפלצבו).</li>
                <li><strong>STEP 5:</strong> שמירה יציבה ומתמשכת לאורך שנתיים (104 שבועות) עם ירידה של <span style={{ color: '#d97706', fontWeight: 800 }}>16.7%</span>.</li>
                <li><strong>STEP 8 (ראש בראש מול סקסנדה):</strong> יעילות כפולה ויותר – <span style={{ color: '#d97706', fontWeight: 800 }}>17.1%</span> ירידה בסמגלוטייד לעומת 6.6% בלבד בלירגלוטייד 3.0 מ"ג.</li>
                <li><strong>משמעות ליעקב:</strong> ירידה דרמטית במשקל שוברת את התנגודת לאינסולין ומפחיתה עומס על כפות הרגליים!</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/step_trials_weight_loss.png" alt="תוצאות מחקרי STEP" style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 17: Tolerability & Nausea
    // ----------------------------------------------------
    case 17:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: ראיות מחקריות – פרופיל סבילות ובטיחות (תופעות לוואי/בחילות)" category="מחקרים וראיות" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '8px' }}>סבילות ובחילות תחת Wegovy 2.4mg:</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li><strong>קלה עד בינונית:</strong> ברובן המכריע תופעות הבחילה הן בדרגה קלה-בינונית וחולפות מעצמן.</li>
                <li><strong>משך זמן קצר:</strong> משך הזמן החציוני של הבחילה עומד על <span style={{ color: '#d97706', fontWeight: 800 }}>8.0 ימים בלבד</span>.</li>
                <li><strong>שיא זמני בטיטרציה:</strong> מופיע בעיקר בשבועות 0–16 במהלך העלייה במינון ויורד בהתמדה.</li>
                <li><strong>שיעור אפסי של תופעות קשות:</strong> קו הבחילה החמורה שואף לאפס.</li>
                <li><strong>מענה לחששותיו של יעקב:</strong> הסבר זה הפיג את חרדותיו מטיסות ואיפשר התמדה בטיפול.</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/wegovy_side_effects_nausea.jpg" alt="בחילות וסבילות" style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 18: SELECT Trial & Cardio Protection
    // ----------------------------------------------------
    case 18:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: ראיות מחקריות – הגנה קרדיווסקולרית ומוחית (מחקר SELECT)" category="מחקרים וראיות" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #fecaca', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '1rem', marginBottom: '8px' }}>תוצאות מחקר ה-SELECT ההיסטורי:</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li><strong>הפחתה מובהקת של 20% ב-MACE:</strong> Wegovy 2.4mg מביאה לירידה של <span style={{ color: '#d97706', fontWeight: 800 }}>20%</span> באירועים קרדיווסקולריים (HR 0.80, p&lt;0.001).</li>
                <li><strong>3-Point MACE:</strong> הגנה על מוות לבבי, אוטם שריר הלב, ושבץ מוחי (Stroke/CVA).</li>
                <li><strong>הנחיות ESC 2024:</strong> הוכנסה להנחיות הרשמיות לניהול תסמונת כלילית כרונית.</li>
                <li><strong>חיוני ליעקב:</strong> במטופל בן 67 לאחר CVA (2023) וצנתור IHD, הטיפול מספק הגנה מצילת חיים כנגד אירוע חוזר!</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/semaglutide_select_mace_cardio.png" alt="מחקר SELECT" style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 19: SHABAN Eligibility & Subsidies
    // ----------------------------------------------------
    case 19:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title={"שלב 2: קריטריוני זכאות וסבסוד שב\"ן (כולל כבד שומני ודום נשימה)"} category="מחקרים וראיות" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem', marginBottom: '8px' }}>סבסוד וזכאות בביטוחים המשלימים (שב"ן):</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li>זמינה בכל הקופות (כללית, מכבי, מאוחדת, לאומית) ב-<strong>50% הנחה</strong> (338-562 ₪ בלבד).</li>
                <li><strong>קריטריון 1:</strong> BMI &gt; 30 kg/m² – זכאות מלאה.</li>
                <li><strong>קריטריון 2:</strong> 27 ≤ BMI &lt; 30 בנוכחות גורם סיכון: <span style={{ color: '#d97706', fontWeight: 800 }}>כבד שומני</span>, טרום סוכרת, יל"ד, דיסליפידמיה, דום נשימה בשינה או מחלה קרדיווסקולרית.</li>
                <li><strong>התאמת יעקב:</strong> עומד במלוא הקריטריונים – BMI 36.1, כבד שומני, CVA, IHD ודום נשימה בשינה!</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/wegovy_eligibility_shaban.png" alt={"זכאות שב\"ן"} style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 20: Treatment Updates & Lifestyle
    // ----------------------------------------------------
    case 20:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 2: עדכון תוכנית טיפול והנחיות אורח חיים מקיפות" category="ביקור ראשון (חלק ב')" badge="שלב 2" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            {[
              {
                t: "התחלת וויגובי 1 מ\"ג (מעבר מאוזמפיק)",
                d: "הדרכה על טיטרציה מדורגת עד למינון היעד של 2.4 מ\"ג. מתן מענה לחששות מנסיעות, הדרכה להזרקה תת-עורית פעם בשבוע ואחסון נכון.",
                c: "#7e22ce", bg: "#faf5ff"
              },
              {
                t: "פעילות גופנית מותאמת אישית",
                d: "הדרכה להליכות יומיות מבוקרות תוך התחשבות בכיב ברגל ובנעליים מתאימות, ושילוב תרגילי חיזוק קלים לשיפור קליטת גלוקוז שרירית.",
                c: "#10b981", bg: "#f0fdf4"
              },
              {
                t: "ייעוץ ותמיכה תזונתית מתמשכת",
                d: "הפניה קבועה לדיאטנית קלינית להתאמת תפריט מבוקר פחמימות, אכילת ארוחות מסודרות ומניעת נשנושים סביב שעות העבודה בישיבה.",
                c: "#d97706", bg: "#fffbeb"
              }
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, padding: '14px 20px', borderRadius: '12px', border: `1.5px solid ${item.c}33`, textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: item.c, fontSize: '0.98rem', marginBottom: '4px' }}>{item.t}</div>
                <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.5 }}>{item.d}</div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 21: Titration Scale & Insulin Adjustments
    // ----------------------------------------------------
    case 21:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 3: מעקב תחת Wegovy 2.4mg והתאמת מינונים" category="מעקב וטיטרציה" badge="שלב 3" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #e9d5ff', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#7e22ce', fontSize: '0.95rem', marginBottom: '10px' }}>סולם מינוני Wegovy (Semaglutide) – תהליך טיטרציה מדורג:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                {[
                  { d: "0.25 mg", l: "התחלתי", act: false },
                  { d: "0.5 mg", l: "שלב 2", act: false },
                  { d: "1.0 mg", l: "שלב 3", act: false },
                  { d: "1.7 mg", l: "שלב 4", act: false },
                  { d: "2.4 mg", l: "מינון יעד נוכחי", act: true }
                ].map((s, i) => (
                  <div key={i} style={{ background: s.act ? '#7e22ce' : '#f3e8ff', color: s.act ? 'white' : '#6b21a8', padding: '10px', borderRadius: '10px', textAlign: 'center', border: s.act ? '2px solid #581c87' : '1px solid #d8b4fe' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700 }}>{s.l}</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #bae6fd', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem', marginBottom: '6px' }}>התאמת מינוני האינסולין במקביל:</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.6 }}>
                <li><strong>נובורפיד בולוס:</strong> קוצץ מ-12u ל-8u לארוחה (~25-35u ליום לעומת כ-120u בבסיס – ירידה של כ-70%!).</li>
                <li><strong>טרגלודק בזאלי:</strong> הופחת והותאם בהדרגה ל-36 יחידות ליום.</li>
                <li><strong>בטיחות למניעת היפו:</strong> אם סוכר בוקר בצום &lt; 90 mg/dL – הורדת 2 יחידות אינסולין בזאלי מיידית.</li>
              </ul>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 22: Clinical Achievements & Safety
    // ----------------------------------------------------
    case 22:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 3: הישגים קליניים במעקב ספטמבר 2026" category="מעקב וטיטרציה" badge="שלב 3" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[
                { t: "HbA1C גליקמי", v: "5.0%", s: "מ-13.4% בבסיס!", c: "#e11d48", bg: "#fff1f2" },
                { t: "ירידה במשקל", v: "-11 ק\"ג", s: "85 ק\"ג (BMI 32.0)", c: "#059669", bg: "#ecfdf5" },
                { t: "אינסולין בולוס", v: "8u לארוחה", s: "קיצוץ מ-12u לארוחה", c: "#0284c7", bg: "#eff6ff" },
                { t: "אינסולין בזאלי", v: "36u ליום", s: "טרגלודק מותאם", c: "#7e22ce", bg: "#faf5ff" }
              ].map((m, i) => (
                <div key={i} style={{ background: m.bg, padding: '16px 12px', borderRadius: '14px', border: `1.5px solid ${m.c}33`, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: m.c, fontWeight: 700 }}>{m.t}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: m.c, margin: '4px 0' }}>{m.v}</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>{m.s}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', padding: '14px 20px', borderRadius: '14px', border: '1.5px solid #fde68a', borderRight: '6px solid #d97706', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#b45309', fontSize: '0.92rem', marginBottom: '2px' }}>כלל קליני מהותי בטיטרציית GLP-1 ב-T1D:</div>
              <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.5 }}>
                חובה לשמור תמיד על כיסוי בזאלי מינימלי מספק למניעת DKA (חמצת סוכרתית), תוך הפחתת בולוס זהירה בהתאם לתזונה ולירידה בתנגודת.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 23: AGP Analysis Under Wegovy 2.4mg
    // ----------------------------------------------------
    case 23:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 4: ניתוח מדדי חיישן FreeStyle Libre 2 ו-AGP תחת Wegovy 2.4mg" category="ניטור רציף AGP" badge="שלב 4" />
          <div style={{ padding: '18px 30px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {[
                { t: "זמן בטווח היעד (TIR 70-180)", v: "79%", s: "עבר את היעד (>70%)!", c: "#10b981" },
                { t: "סוכר ממוצע", v: "116 mg/dL", s: "צנח מ-220 mg/dL!", c: "#0284c7" },
                { t: "מדד GMI משוער", v: "6.1%", s: "תואם A1C של 6.1%", c: "#0284c7" },
                { t: "ערכים מעל הטווח (>180)", v: "8%", s: "מתוכם 0% מעל 250!", c: "#10b981" },
                { t: "שונות גלוקוז (%CV)", v: "37.3%", s: "קרוב ליעד (≤36%)", c: "#7e22ce" },
                { t: "היפוגליקמיה (<70)", v: "13%", s: "אירועים קלים (0% <54)", c: "#e11d48" }
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.t}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>{s.s}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/labs/AGP_after_wegovy.png" alt="דוח AGP מעודכן" style={{ maxHeight: '230px', maxWidth: '100%', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 24: Head-to-Head AGP Comparison
    // ----------------------------------------------------
    case 24:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 4: השוואת מדדי החיישן – לפני וויגובי לעומת תחת Wegovy 2.4mg" category="ניטור רציף AGP" badge="שלב 4" />
          <div style={{ padding: '18px 30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: '#f1f5f9', padding: '10px 16px', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', textAlign: 'center' }}>
                <span style={{ textAlign: 'right' }}>מדד קליני ב-AGP</span>
                <span style={{ color: '#dc2626' }}>לפני וויגובי (פברואר 2026)</span>
                <span style={{ color: '#059669' }}>תחת Wegovy 2.4mg (ספטמבר 2026)</span>
              </div>
              {[
                { m: "זמן בטווח היעד (TIR 70-180 mg/dL)", b: "30% בלבד", a: "79% (עבר את היעד!)" },
                { m: "רמת גלוקוז ממוצעת", b: "220 mg/dL", a: "116 mg/dL (נחתך בחצי!)" },
                { m: "מדד ניהול גלוקוז משוער (GMI)", b: "8.6%", a: "6.1%" },
                { m: "ערכים מעל הטווח (>180 mg/dL)", b: "70% (27% מעל 250)", a: "8% בלבד (0% מעל 250!)" },
                { m: "שונות גלוקוז (%CV)", b: "32.1%", a: "37.3%" },
                { m: "משקל המטופל ו-BMI", b: "96 ק\"ג (BMI 36.1)", a: "85 ק\"ג (BMI 32.0)" },
                { m: "מינון אינסולין בולוס (נובורפיד)", b: "~120u ליום", a: "~25-35u ליום (-70%!)" }
              ].map((row, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '8px 16px', borderTop: '1px solid #f1f5f9', fontSize: '0.82rem', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', textAlign: 'center' }}>
                  <span style={{ textAlign: 'right', fontWeight: 700, color: '#1e293b' }}>{row.m}</span>
                  <span style={{ color: '#dc2626', fontWeight: 800 }}>{row.b}</span>
                  <span style={{ color: '#059669', fontWeight: 800 }}>{row.a}</span>
                </div>
              ))}
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 25: Clinical Case Summary
    // ----------------------------------------------------
    case 25:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 5: סיכום קליני של המקרה" category="סיכום מקרה" badge="שלב 5" />
          <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid #bae6fd', textAlign: 'right', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.05)' }}>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1.05rem', marginBottom: '6px' }}>סיכום מקרה קליני – יעקב:</div>
              <p style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                המטופל סבל מהשמנה וריבוי של סיבוכי השמנה וסוכרת, ביניהם כבד שומני, דום נשימה בשינה, ומחלות טרשתיות כמו CVA ו-IHD. בעקבות התחלת הטיפול בהשמנה באמצעות וויגובי (Wegovy), המטופל ירד במשקל, מדווח על שינה טובה יותר, הסוכרת התאזנה משמעותית תוך הורדה במינוני האינסולין, נרשם שיפור בפצע שהתפתח בכף הרגל, והסיכון למחלות טרשתיות הופחת באופן משמעותי.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[
                { t: "TIR בטווח", v: "79%", s: "מ-30% ל-79%!", c: "#10b981", bg: "#dcfce7" },
                { t: "מדד GMI", v: "6.1%", s: "סוכר 116 mg/dL", c: "#0284c7", bg: "#e0f2fe" },
                { t: "ירידה במשקל", v: "85 ק\"ג", s: "הפחתת 11 ק\"ג", c: "#0d9488", bg: "#ccfbf1" },
                { t: "אינסולין בזאלי", v: "36u", s: "טרגלודק ליום", c: "#7e22ce", bg: "#f3e8ff" }
              ].map((st, i) => (
                <div key={i} style={{ background: st.bg, padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: st.c }}>{st.t}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: st.c, margin: '2px 0' }}>{st.v}</div>
                  <div style={{ fontSize: '0.72rem', color: '#1e293b' }}>{st.s}</div>
                </div>
              ))}
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 26: Guiding Clinical Principles
    // ----------------------------------------------------
    case 26:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 5: ארבעת העקרונות המנחים לפרקטיקה הרפואית" category="עקרונות לפרקטיקה" badge="שלב 5" />
          <div style={{ padding: '18px 30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', flex: 1, alignContent: 'center' }}>
            {[
              {
                t: "1. מעקב אורח חיים ותזונה",
                d: "המטופל נמצא במעקב רציף של דיאטנית וגם מבצע, אם כי בצורה מוגבלת, פעילות גופנית סדירה.",
                c: "#d97706", bg: "#fffbeb"
              },
              {
                t: "2. הפחתת תנגודת והורדת משקל",
                d: "הטיפול ב-GLP-1 RA (Wegovy 2.4mg) הביא לירידה מ-96 ל-85 ק\"ג ולהפחתת בולוס (מ-12u ל-8u) ובזאלי (ל-36u).",
                c: "#7e22ce", bg: "#faf5ff"
              },
              {
                t: "3. הגנה קרדיווסקולרית ומוחית",
                d: "שיפור בשינה (דום נשימה), הטבה בפצע בכף הרגל והפחתת סיכון למחלות טרשתיות במטופל לאחר CVA ו-IHD.",
                c: "#0284c7", bg: "#eff6ff"
              },
              {
                t: "4. איזון גליקמי מוכח ב-CGM",
                d: "חיישן Libre 2 מראה זינוק מ-30% ל-79% בטווח היעד (TIR) וירידה בסוכר הממוצע מ-220 ל-116 mg/dL.",
                c: "#059669", bg: "#ecfdf5"
              }
            ].map((tk, i) => (
              <div key={i} style={{ background: tk.bg, padding: '16px 20px', borderRadius: '14px', border: `1.5px solid ${tk.c}33`, textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: tk.c, fontSize: '0.98rem', marginBottom: '6px' }}>{tk.t}</div>
                <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.5 }}>{tk.d}</div>
              </div>
            ))}
          </div>
          <SlideFooter />
        </div>
      );

    // ----------------------------------------------------
    // SLIDE 27: Follow-up Plan & Conclusion
    // ----------------------------------------------------
    case 27:
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <SlideHeader title="שלב 5: תוכנית המשך מעקב וסגירה" category="סיכום ומעקב" badge="שלב 5" />
          <div style={{ padding: '20px 30px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1.5px solid #a7f3d0', textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#059669', fontSize: '1.05rem', marginBottom: '8px' }}>הנחיות המשך מעקב עבור יעקב:</div>
              <ul style={{ paddingRight: '18px', margin: 0, fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.7 }}>
                <li><strong>מינונים מעודכנים:</strong> המשך מינון אחזקתי של Wegovy 2.4 mg אחת לשבוע + טרגלודק <strong>36 יחידות</strong> ליום + נובורפיד 8 יחידות לארוחה.</li>
                <li><strong>מרפאת פצע:</strong> המשך מעקב סדיר במרפאת פצע עד להחלמה מלאה של הכיב בכף הרגל.</li>
                <li><strong>ניטור CGM:</strong> ניטור רציף ב-Libre 2 למעקב אחר היפוגליקמיות לילה.</li>
                <li><strong>אורח חיים ותזונה:</strong> ליווי דיאטני מתמשך ושמירה על פעילות גופנית מותאמת.</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1.5px solid #c7d2fe', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <img src="/tiferet_eliav_logo.jpg" alt="Logo" style={{ height: '65px', borderRadius: '12px', border: '1.5px solid #c7d2fe' }} />
              <div style={{ fontWeight: 900, color: '#4f46e5', fontSize: '1.1rem' }}>TIFERET ELIAV • Diabetes & AI</div>
              <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700 }}>סיום הלומדה והמצגת בהצלחה!</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                מהפך טיפולי מבוסס GLP-1 RA במטופל סוכרת, השמנה ומחלות טרשתיות.
              </div>
            </div>
          </div>
          <SlideFooter />
        </div>
      );

    default:
      return <div>שקופית לא נמצאה</div>;
  }
}
