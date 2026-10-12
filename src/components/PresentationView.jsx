import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Download, Maximize2, Minimize2, 
  Printer, Play, Pause, RotateCcw, LayoutGrid, CheckCircle2,
  FileText, Activity, Pill, ShieldAlert, Heart, User, Sparkles, X, ChevronFirst, ChevronLast
} from 'lucide-react';

export default function PresentationView({ onExitToSimulation }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);

  const totalSlides = 43;

  // Auto-play slideshow timer (5 seconds per slide)
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev >= totalSlides) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSlides]);

  // Preload adjacent slide images for instant responsiveness
  useEffect(() => {
    if (currentSlide < totalSlides) {
      const nextImg = new Image();
      nextImg.src = `/slides/slide_${currentSlide + 1}.png`;
    }
    if (currentSlide > 1) {
      const prevImg = new Image();
      prevImg.src = `/slides/slide_${currentSlide - 1}.png`;
    }
  }, [currentSlide, totalSlides]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation:
  // RTL convention: ArrowLeft / Space = advance to Next slide, ArrowRight = back to Prev slide
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
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

  // Section landmarks for quick navigation
  const sectionAnchors = [
    { slide: 1, label: 'שער המצגת' },
    { slide: 2, label: 'מפגש קליני מורכב' },
    { slide: 5, label: 'שלב 1: קליטה והערכה' },
    { slide: 20, label: 'שלב 2: החלטה טיפולית' },
    { slide: 31, label: 'שלב 3: טיטרציית Wegovy' },
    { slide: 35, label: 'שלב 4: תוצאות Libre ו-AGP' },
    { slide: 38, label: 'שלב 5: סיכום ותובנות' },
    { slide: 43, label: 'תקציר העלון' }
  ];

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: isFullscreen ? '100vh' : '90vh',
        background: '#090d16',
        borderRadius: isFullscreen ? '0' : '20px',
        overflow: 'hidden',
        boxShadow: isFullscreen ? 'none' : '0 12px 40px rgba(0,0,0,0.4)',
        border: isFullscreen ? 'none' : '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      {/* Top Presentation Bar */}
      <div style={{
        background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 50
      }}>
        {/* Brand & Presentation Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/tiferet_eliav_logo.jpg" 
            alt="TIFERET ELIAV" 
            style={{ height: '38px', borderRadius: '8px', border: '1px solid #c7d2fe' }} 
          />
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>מצגת שקופיות קלינית מעודכנת</span>
              <span style={{ 
                background: '#581c87', 
                color: '#f3e8ff', 
                fontSize: '0.72rem', 
                padding: '2px 8px', 
                borderRadius: '6px', 
                fontWeight: 700 
              }}>
                GLP1RA
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              TIFERET ELIAV • סימולציית טיפול ב-GLP1RA במטופל עם סוכרת והשמנה ({totalSlides} שקופיות)
            </div>
          </div>
        </div>

        {/* Slide Counter & Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1rem', minWidth: '120px', textAlign: 'center' }}>
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
              background: 'linear-gradient(90deg, #38bdf8, #a855f7)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Slides Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="תוכן שקופיות (תמונות ממוזערות)"
            style={{
              background: showThumbnails ? '#581c87' : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              fontWeight: 700,
              transition: 'all 0.2s'
            }}
          >
            <LayoutGrid size={16} />
            <span>תוכן שקופיות</span>
          </button>

          {/* Auto-Play Slideshow */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'עצור מצגת רציפה' : 'הפעל מצגת רציפה (מעבר כל 5 שניות)'}
            style={{
              background: isPlaying ? '#0284c7' : 'rgba(255,255,255,0.1)',
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
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'השהה' : 'ניגון אוטומטי'}</span>
          </button>

          {/* Download Redesigned PPTX File */}
          <a
            href="/GLP1_Webinar_Tiferet_Eliav.pptx"
            download="GLP1_Webinar_Tiferet_Eliav.pptx"
            title="הורדת קובץ המצגת המעודכן (.pptx)"
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

          {/* Fullscreen Button */}
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

          {/* Exit / Return to Simulation */}
          {onExitToSimulation && (
            <button
              onClick={onExitToSimulation}
              style={{
                background: '#e2e8f0',
                color: '#0f172a',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.86rem',
                marginRight: '6px'
              }}
            >
              חזרה לסימולציה 🖥️
            </button>
          )}
        </div>
      </div>

      {/* Main Slide Presentation Stage Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? '0' : '16px',
        background: '#020617',
        overflow: 'hidden'
      }}>
        {/* High-Resolution Slide Image */}
        <div style={{
          position: 'relative',
          maxWidth: '100%',
          maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '76vh',
          aspectRatio: '16/9',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          borderRadius: isFullscreen ? '0' : '12px',
          overflow: 'hidden',
          background: '#0f172a'
        }}>
          <img 
            key={currentSlide}
            src={`/slides/slide_${currentSlide}.png`} 
            alt={`שקופית ${currentSlide} מתוך ${totalSlides}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'opacity 0.2s ease'
            }}
          />

          {/* Clickable Overlay for Quick Left/Right Navigation */}
          {/* In RTL: Left side advances to Next, Right side goes to Prev */}
          <div 
            onClick={goToNext} 
            title="לחץ להתקדמות לשקופית הבאה"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              cursor: currentSlide < totalSlides ? 'pointer' : 'default',
              zIndex: 10
            }}
          />
          <div 
            onClick={goToPrev} 
            title="לחץ לחזרה לשקופית הקודמת"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              cursor: currentSlide > 1 ? 'pointer' : 'default',
              zIndex: 10
            }}
          />
        </div>

        {/* Floating Side Navigation Arrows */}
        {/* Next Slide Arrow (Floating on Left for RTL progression) */}
        {currentSlide < totalSlides && (
          <button
            onClick={goToNext}
            title="שקופית הבאה (חץ שמאלה / רווח)"
            style={{
              position: 'absolute',
              left: isFullscreen ? '20px' : '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Previous Slide Arrow (Floating on Right for RTL back) */}
        {currentSlide > 1 && (
          <button
            onClick={goToPrev}
            title="שקופית קודמת (חץ ימינה)"
            style={{
              position: 'absolute',
              right: isFullscreen ? '20px' : '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Visual Thumbnails Drawer Modal */}
        {showThumbnails && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(9, 13, 22, 0.95)',
            backdropFilter: 'blur(12px)',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '16px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  כל שקופיות המצגת ({totalSlides} שקופיות)
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                  לחץ על שקופית למעבר ישיר
                </p>
              </div>

              {/* Quick Jump Landmark Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sectionAnchors.map((anc) => (
                  <button
                    key={anc.slide}
                    onClick={() => {
                      setCurrentSlide(anc.slide);
                      setShowThumbnails(false);
                    }}
                    style={{
                      background: currentSlide === anc.slide ? '#581c87' : 'rgba(255,255,255,0.08)',
                      color: currentSlide === anc.slide ? '#f3e8ff' : '#cbd5e1',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {anc.label} (#{anc.slide})
                  </button>
                ))}

                <button
                  onClick={() => setShowThumbnails(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 700
                  }}
                >
                  <X size={18} />
                  <span>סגור</span>
                </button>
              </div>
            </div>

            {/* Grid of all 42 Thumbnails */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
              gap: '16px',
              padding: '6px'
            }}>
              {Array.from({ length: totalSlides }, (_, idx) => idx + 1).map((num) => {
                const isSelected = currentSlide === num;
                return (
                  <div
                    key={num}
                    onClick={() => {
                      setCurrentSlide(num);
                      setShowThumbnails(false);
                    }}
                    style={{
                      background: isSelected ? 'rgba(88, 28, 135, 0.4)' : '#1e293b',
                      borderRadius: '12px',
                      border: isSelected ? '2.5px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 16px rgba(168, 85, 247, 0.4)' : 'none'
                    }}
                  >
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#0f172a' }}>
                      <img 
                        src={`/slides/slide_${num}.png`} 
                        alt={`שקופית ${num}`} 
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: isSelected ? '#581c87' : 'rgba(15, 23, 42, 0.9)',
                      color: 'white',
                      fontSize: '0.82rem',
                      fontWeight: 700
                    }}>
                      <span>שקופית {num}</span>
                      {isSelected && <span style={{ color: '#38bdf8' }}>✓ מוצגת</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Scrubber */}
      <div style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #0b1120 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        zIndex: 40
      }}>
        {/* Navigation Step Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* First Slide */}
          <button
            onClick={() => setCurrentSlide(1)}
            disabled={currentSlide === 1}
            title="שקופית ראשונה (Home)"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: currentSlide === 1 ? 'rgba(255,255,255,0.3)' : 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: currentSlide === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronFirst size={18} />
          </button>

          {/* Previous Slide */}
          <button
            onClick={goToPrev}
            disabled={currentSlide === 1}
            title="שקופית קודמת (חץ ימינה)"
            style={{
              background: currentSlide === 1 ? 'rgba(255,255,255,0.05)' : '#334155',
              color: currentSlide === 1 ? 'rgba(255,255,255,0.3)' : 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}
          >
            <ChevronRight size={18} />
            <span>הקודמת</span>
          </button>

          {/* Next Slide */}
          <button
            onClick={goToNext}
            disabled={currentSlide === totalSlides}
            title="שקופית הבאה (חץ שמאלה / רווח)"
            style={{
              background: currentSlide === totalSlides ? 'rgba(255,255,255,0.05)' : '#581c87',
              color: currentSlide === totalSlides ? 'rgba(255,255,255,0.3)' : 'white',
              border: 'none',
              padding: '8px 22px',
              borderRadius: '8px',
              cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: currentSlide < totalSlides ? '0 2px 8px rgba(88, 28, 135, 0.4)' : 'none'
            }}
          >
            <span>הבאה</span>
            <ChevronLeft size={18} />
          </button>

          {/* Last Slide */}
          <button
            onClick={() => setCurrentSlide(totalSlides)}
            disabled={currentSlide === totalSlides}
            title="שקופית אחרונה (End)"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: currentSlide === totalSlides ? 'rgba(255,255,255,0.3)' : 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLast size={18} />
          </button>
        </div>

        {/* Jump-to-Slide Slider / Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>מעבר מהיר:</span>
          <input 
            type="range"
            min="1"
            max={totalSlides}
            value={currentSlide}
            onChange={(e) => setCurrentSlide(Number(e.target.value))}
            style={{ width: '160px', accentColor: '#a855f7', cursor: 'pointer' }}
          />
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '4px 10px',
            borderRadius: '6px',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 800
          }}>
            {currentSlide} / {totalSlides}
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⌨️ ניווט: מקשי חצים שמאלה/ימינה, רווח</span>
        </div>
      </div>
    </div>
  );
}
