import React from 'react';
import { DoorOpen, Stethoscope, Activity, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

export default function WelcomeHero({ onStart, onOpenPresentation }) {
  return (
    <div style={{
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      <div className="glass-card floating-element" style={{
        maxWidth: '900px',
        width: '100%',
        padding: '50px 40px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        border: '1px solid rgba(2, 132, 199, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        {/* Header Badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <img src="/tiferet_eliav_logo.jpg" alt="TIFERET ELIAV Diabetes & AI" style={{ height: '95px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.22)', border: '2.5px solid #c7d2fe' }} />
          <div style={{ fontSize: '1.15rem', fontWeight: 900, background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 50%, #7e22ce 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.5px' }}>
            TIFERET ELIAV • Diabetes & AI
          </div>
          <span className="badge badge-indigo" style={{ fontSize: '0.95rem', padding: '6px 20px', marginTop: '4px' }}>
            <Sparkles size={18} color="#4f46e5" />
            סימולציה קלינית מתקדמת
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          color: '#0f172a',
          lineHeight: 1.3,
          marginBottom: '20px',
          letterSpacing: '-0.5px'
        }}>
          ברוכים הבאים לסימולציית טיפול ב-<span style={{ color: '#4f46e5' }}>GLP1</span> במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: '#475569',
          maxWidth: '750px',
          margin: '0 auto 35px auto',
          lineHeight: 1.6
        }}>
          עזרו ליעקב (בן 67) שסובל מסוכרת, השמנה וריבוי סיבוכים למצוא את האיזון והדרך המתאימה להצלחה
        </p>

        {/* Clinical Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
          textAlign: 'right'
        }}>
          <div style={{
            background: 'white',
            padding: '16px 20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '12px' }}>
              <UserCheck size={24} color="#0284c7" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>פרופיל מטופל מורכב</div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '16px 20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ background: '#ccfbf1', padding: '10px', borderRadius: '12px' }}>
              <Activity size={24} color="#0d9488" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>חיישן סוכר Libre 2</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>ניתוח TIR & %CV</div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '16px 20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px' }}>
              <Stethoscope size={24} color="#d97706" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>שאלות והתנסות</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>פתרון דילמות קליניות</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={onStart}
            className="btn-primary glow-btn"
            style={{
              padding: '16px 40px',
              fontSize: '1.2rem',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <DoorOpen size={26} />
            התחל סימולציה אינטראקטיבית
          </button>

          {onOpenPresentation && (
            <button
              onClick={onOpenPresentation}
              style={{
                background: 'white',
                color: '#581c87',
                border: '2px solid #581c87',
                padding: '16px 36px',
                fontSize: '1.15rem',
                fontWeight: 800,
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(88, 28, 135, 0.12)',
                transition: 'all 0.2s ease'
              }}
              title="הצגת המצגת הקלינית ישירות"
            >
              <span>📽️</span>
              הצג מצגת
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
