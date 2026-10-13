import React from 'react';
import { Pill, ShieldCheck, ArrowDownRight, TrendingDown, AlertCircle, Sparkles, Scale, Activity, CheckCircle2, HeartPulse } from 'lucide-react';
import RegNote, { REFS } from './RegNote';
import { INSULIN_SPC_NOTE, INDIVIDUAL_CASE_NOTE } from '../data/simulationData';

export default function Stage2Titration({ data, onNext, onPrev }) {
  const wegovySteps = [
    { dose: "0.25 mg", status: "completed", label: "מינון התחלתי" },
    { dose: "0.5 mg", status: "completed", label: "שלב 2" },
    { dose: "1.0 mg", status: "completed", label: "שלב 3" },
    { dose: "1.7 mg", status: "completed", label: "שלב 4" },
    { dose: "2.4 mg", status: "active", label: "מינון נוכחי (יעד)" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '24px 30px', borderRight: '6px solid #0d9488' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-teal" style={{ marginBottom: '8px' }}>{data.badge}</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{data.title}</h2>
            <p style={{ color: '#0f766e', fontSize: '1.1rem', fontWeight: 700, marginTop: '6px' }}>
              בוצעה העלאה הדרגתית במינון הוויגובי וכעת המטופל מקבל וויגובי 2.4 מ"ג תוך ביצוע טיטרציה של הורדה במינוני האינסולין.
            </p>
          </div>
          <div style={{ background: '#f3e8ff', padding: '12px 20px', borderRadius: '16px', border: '1px solid #d8b4fe' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b21a8', fontWeight: 600 }}>סטטוס מינון Wegovy</span>
            <div style={{ fontWeight: 900, color: '#7e22ce', fontSize: '1.2rem' }}>2.4 mg (מינון מלא)</div>
          </div>
        </div>
      </div>

      {/* Wegovy Titration Dose Scale Widget */}
      <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)', border: '2px solid #e9d5ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Sparkles size={22} color="#7e22ce" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#581c87' }}>
            מד סולם מינוני Wegovy (Semaglutide) – תהליך טיטרציה מדורג
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginTop: '12px'
        }}>
          {wegovySteps.map((step, idx) => {
            const isActive = step.status === 'active';
            const isCompleted = step.status === 'completed';

            return (
              <div key={idx} style={{
                background: isActive ? '#7e22ce' : isCompleted ? '#f3e8ff' : '#f8fafc',
                color: isActive ? 'white' : isCompleted ? '#6b21a8' : '#64748b',
                padding: '16px 12px',
                borderRadius: '16px',
                border: isActive ? '2px solid #6b21a8' : isCompleted ? '1.5px solid #d8b4fe' : '1px solid #e2e8f0',
                textAlign: 'center',
                position: 'relative',
                boxShadow: isActive ? '0 6px 16px rgba(126, 34, 206, 0.25)' : 'none'
              }}>
                <div style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 700, marginBottom: '4px' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900 }}>
                  {step.dose}
                </div>
                {isCompleted && (
                  <div style={{ fontSize: '0.72rem', marginTop: '4px', fontWeight: 700, color: '#7e22ce' }}>
                    ✔ הושלם בהצלחה
                  </div>
                )}
                {isActive && (
                  <div style={{ fontSize: '0.75rem', marginTop: '4px', fontWeight: 800, background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '10px' }}>
                    ▲ מינון יעד נוכחי
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <RegNote refs={[REFS.wegovySpc]} />
      </div>

      {/* Graphic Illustration Card Section */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Activity size={24} color="#0d9488" />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
            הישגים קליניים במעקב ספטמבר 2026 והתאמות מינוני האינסולין של יעקב
          </h3>
        </div>

        {/* 4 Graphic Comparison Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>

          {/* Card 1: A1C Reduction Graphic */}
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #fecdd3',
            boxShadow: '0 6px 18px rgba(225, 29, 72, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-red" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  🎯 איזון גליקמי A1C
                </span>
                <HeartPulse size={26} color="#e11d48" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#be123c', marginBottom: '12px' }}>
                5.0%
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecdd3' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>A1C בסיס</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444', textDecoration: 'line-through' }}>13.4%</div>
                </div>
                <div style={{ background: '#e11d48', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 700 }}>A1C נוכחי</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>5.0%</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.85)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', color: '#be123c', fontWeight: 700, textAlign: 'center' }}>
              ירידה ב-A1C מ-13.4% ל-5.0%, ללא אירועי היפוגליקמיה חמורים
            </div>
          </div>
          
          {/* Card 2: Weight & BMI Reduction Graphic */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #a7f3d0',
            boxShadow: '0 6px 18px rgba(16, 185, 129, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-teal" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  📉 ירידה במשקל
                </span>
                <Scale size={26} color="#059669" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#047857', marginBottom: '12px' }}>
                -11 ק"ג
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>משקל התחלתי</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#475569' }}>96 ק"ג</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>BMI 36.1</div>
                </div>
                <div style={{ background: '#059669', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 700 }}>משקל נוכחי</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>85 ק"ג</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, background: 'rgba(255,255,255,0.2)', borderRadius: '6px', marginTop: '2px' }}>
                    BMI ירד ל-32
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.8)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', color: '#065f46', fontWeight: 700, textAlign: 'center' }}>
              ✔ ירידה במשקל של 11 ק"ג (מ-96 ק"ג ל-85 ק"ג), BMI ירד ל-32
            </div>
          </div>

          {/* Card 3: Short-Acting Insulin Novorapid Graphic */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #bae6fd',
            boxShadow: '0 6px 18px rgba(2, 132, 199, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  💉 אינסולין קצר טווח (נובורפיד, אינסולין אספארט)
                </span>
                <TrendingDown size={26} color="#0284c7" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0369a1', marginBottom: '12px' }}>
                8 יחידות לארוחה
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #bae6fd' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>מינון קודם</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ef4444', textDecoration: 'line-through' }}>12 יחידות</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>לכל ארוחה</div>
                </div>
                <div style={{ background: '#0284c7', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 700 }}>מינון מעודכן</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>8 יחידות</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, background: 'rgba(255,255,255,0.2)', borderRadius: '6px', marginTop: '2px' }}>
                    לכל ארוחה
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.8)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', color: '#0369a1', fontWeight: 700, textAlign: 'center' }}>
              המטופל לא קיבל אינסולין קצר טווח בהתחלה. לאחר הוספת נובורפיד הגיע ל-12 יחידות לארוחה, ועם ההגעה למינון המקסימלי של וויגובי (2.4 מ"ג) ירד ל-8 יחידות לארוחה.
            </div>
          </div>

          {/* Card 4: Wegovy & Degludec Titration Status */}
          <div style={{
            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #e9d5ff',
            boxShadow: '0 6px 18px rgba(126, 34, 206, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  💜 טיטרציית Wegovy ואינסולין
                </span>
                <Sparkles size={26} color="#7e22ce" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6b21a8', marginBottom: '12px' }}>
                Wegovy 2.4 mg
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'white', padding: '10px 14px', borderRadius: '12px', border: '1px solid #d8b4fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#581c87' }}>Wegovy (סמגלוטייד)</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#7e22ce' }}>2.4 mg / שבוע</span>
                </div>
                <div style={{ background: 'white', padding: '10px 14px', borderRadius: '12px', border: '1px solid #d8b4fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f766e' }}>אינסולין בזאלי (טרגלודק, דגלודק)</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0d9488' }}>36 יחידות</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.85)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', color: '#6b21a8', fontWeight: 700, textAlign: 'center' }}>
              האינסולין הבזאלי ירד מ-40 יחידות ל-36 יחידות פעם ביום.
            </div>
          </div>

        </div>

        {/* Protocol Alert Box */}
        <div style={{
          background: '#fefce8',
          border: '1.5px solid #fde047',
          padding: '18px 24px',
          borderRadius: '16px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          <AlertCircle size={24} color="#ca8a04" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: 800, color: '#854d0e', fontSize: '1.05rem', marginBottom: '4px' }}>
              התאמת האינסולין הבזאלי במקרה זה:
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#a16207', lineHeight: 1.5 }}>
              במקרה זה הוחלט על ידי הצוות המטפל כי במידה וערכי הסוכר בצום בבוקר יורדים מתחת ל-90 mg/dL, יופחתו 2 יחידות מהאינסולין הבזאלי (Degludec), תוך ניטור רציף ב-Libre.
            </p>
          </div>
        </div>

        <div style={{
          background: '#fef2f2',
          border: '1.5px solid #fecaca',
          padding: '18px 24px',
          borderRadius: '16px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
          marginTop: '14px'
        }}>
          <AlertCircle size={24} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: 800, color: '#991b1b', fontSize: '1.05rem', marginBottom: '4px' }}>
              נקודת בטיחות (מתוך עלון התכשיר):
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#b91c1c', lineHeight: 1.5 }}>
              שילוב סמגלוטייד עם אינסולין עלול להגביר את הסיכון להיפוגליקמיה. בעת התחלת הטיפול יש לשקול הפחתת מינון האינסולין ולבצע ניטור והתאמה אישית. סמגלוטייד אינו תחליף לאינסולין; הוספת Wegovy לטיפול באינסולין לא הוערכה (Wegovy® IL SPC).
            </p>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>
          התאמות מינון האינסולין המוצגות הינן ספציפיות למקרה הקליני ואינן מהוות המלצת מינון כללית.
        </div>
        <RegNote notes={[INDIVIDUAL_CASE_NOTE, INSULIN_SPC_NOTE]} refs={[REFS.wegovySpc]} />

      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={onPrev} className="btn-secondary" style={{ padding: '14px 28px' }}>
          → חזרה לשלב הקודם
        </button>
        <button onClick={onNext} className="btn-primary" style={{ padding: '16px 40px' }}>
          התקדמות לשלב 4 (ניתוח מדדי סנסור Libre 2) ←
        </button>
      </div>

    </div>
  );
}
