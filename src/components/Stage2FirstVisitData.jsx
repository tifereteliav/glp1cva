import React, { useState } from 'react';
import { Cpu, Usb, FileText, Activity, ShieldAlert, HeartPulse, CheckCircle2, ArrowLeft, Pill, Dumbbell, Apple, Info, HelpCircle, ChevronDown, ChevronUp, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import RegNote, { REFS } from './RegNote';
import { INDICATION_NOTE, INSULIN_SPC_NOTE } from '../data/simulationData';

export default function Stage2FirstVisitData({ data, onNext, onPrev }) {
  const [showDocModal, setShowDocModal] = useState(false);
  const [activeDocImage, setActiveDocImage] = useState(null);
  const [showInjectionDetail, setShowInjectionDetail] = useState(false);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  // State for Stage 2 Part B Treatment Decision Question
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [activeStudyTab, setActiveStudyTab] = useState('weight_loss');

  const [docTitle, setDocTitle] = useState('תצוגת מסמך מוגדלת');

  const openDoc = (path, title = 'תצוגת מסמך מוגדלת') => {
    setActiveDocImage(path);
    setDocTitle(title);
    setShowDocModal(true);
  };

  const openQuestionsData = [
    {
      q: "1. האם המטופל עומד ביעד האיזון שלו?",
      a: "לא, כי ה-A1C עדיין 8.6% והמטופל אינו מאוזן."
    },
    {
      q: "2. האם הטיפול שהמטופל מקבל מספיק אופטימלי למצב שלו?",
      a: "לא. למרות טיפול במינוני אינסולין גבוהים, המטופל אינו מאוזן (A1C 8.6%) וממשיך לסבול מהשמנה משמעותית (BMI 36.1)."
    },
    {
      q: "3. איזה שינויים אפשר ונדרש לבצע? ולמה?",
      a: "החלפת טיפול ב-GLP1RA (וויגובי-סמגלוטייד 2.4 מ\"ג):\n• הורדת משקל והפחתת תאבון.\n• פוטנציאל לשיפור באיזון הגליקמי.\n• בקרב מטופלים עם עודף משקל/השמנה ומחלת CV קיימת ללא T2D וויגובי הפחית את הסיכון ל-MACE לעומת פלסבו."
    }
  ];


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner - Clean Title "שלב 2" */}
      <div className="glass-card" style={{ padding: '24px 30px', borderRight: '6px solid #0284c7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>{data.badge}</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>שלב 2: ביקור ראשון (חלק ב')</h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginTop: '4px' }}>{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Section 1: Clinical Treatment Decision Card */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', borderRight: '6px solid #10b981' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#dcfce7', padding: '12px', borderRadius: '14px', color: '#16a34a' }}>
            <Pill size={28} />
          </div>
          <div>
            <span className="badge badge-teal" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
              ביקור ראשון (חלק ב') • החלטה טיפולית
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              החלטה על התחלת טיפול באינסולין קצר טווח (נובורפיד - Insulin aspart)
            </h3>
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          padding: '22px 26px',
          borderRadius: '18px',
          border: '2px solid #a7f3d0',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)',
          marginTop: '10px'
        }}>
          <p style={{ fontSize: '1.18rem', fontWeight: 800, color: '#15803d', lineHeight: 1.7, margin: 0 }}>
            עקב היפרגליקמיה משמעותית לאחר האוכל ו-A1C מאוד גבוה, הוחלט להוסיף למטופל טיפול באינסולין קצר טווח נובורפיד 3 פעמים ביום לפני כל ארוחה, והוא חובר לסנסור Libre.
          </p>
        </div>
      </div>

      {/* Section 2: Main Grid: Libre USB Cable Reader Widget & Injection Site Assessment (PLACED BELOW DECISION QUESTION) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Card 1: Blue Libre Reader with Yellow USB Cable & Data Download */}
        <div className="glass-card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          border: '2px solid #bae6fd',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-blue">ניטור רציף • פברואר 2026</span>
              <Usb size={22} color="#0284c7" />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              הורדת נתוני קורא Libre (פברואר 2026)
            </h3>
            <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.5, marginBottom: '20px' }}>
              חיבור קורא ה-Libre הכחול בכבל USB צהוב למחשב המרפאה לפריקת נתוני הסוכר הרציפים מחודש פברואר.
            </p>

            {/* Visual Graphic Representation of Blue Libre Reader + Yellow Cable + Computer */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-around',
              gap: '12px',
              marginBottom: '20px'
            }}>
              {/* Blue Libre Reader */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '80px',
                  background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)',
                  borderRadius: '14px',
                  margin: '0 auto 6px auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)',
                  border: '2px solid #38bdf8'
                }}>
                  <div style={{ width: '36px', height: '42px', background: '#e0f2fe', borderRadius: '6px', margin: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1', fontSize: '0.7rem', fontWeight: 900 }}>
                    Libre
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700 }}>קורא כחול</span>
              </div>

              {/* Yellow Cable Wire Visual */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <div style={{ height: '4px', background: '#eab308', width: '100%', borderRadius: '2px', boxShadow: '0 0 6px rgba(234,179,8,0.5)' }} />
                <span style={{ fontSize: '0.75rem', color: '#854d0e', fontWeight: 700, background: '#fef9c3', padding: '2px 8px', borderRadius: '10px' }}>
                  כבל צהוב
                </span>
              </div>

              {/* Clinic Computer Terminal */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '70px',
                  height: '65px',
                  background: '#f8fafc',
                  border: '2.5px solid #64748b',
                  borderRadius: '10px',
                  margin: '0 auto 6px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: '#0284c7',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <Cpu size={28} color="#0284c7" />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>מחשב מרפאה</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => openDoc('/labs/AGP_before_wegovy.png', 'דוח נתוני קורא LIBRE ו-AGP (פברואר 2026)')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1.02rem', gap: '10px' }}>
              <FileText size={20} />
              צפה בנתוני LIBRE ו-AGP
            </button>
          </div>
        </div>

        {/* Card 2: Insulin Injection Site Examination */}
        <div className="glass-card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
          border: '2px solid #fed7aa',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-gold">בדיקה פיזיקלית • אזורי הזרקה</span>
              <ShieldAlert size={22} color="#ea580c" />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              בדיקת מקומות הזרקת אינסולין וטכניקה
            </h3>
            <p style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '20px', fontWeight: 600 }}>
              בבדיקת אזורי הזרקה וצורת הזרקת אינסולין: המטופל מזריק נכון במקומות הנכונים ומאחסן נכון את האינסולין. אך לא מקפיד להחליף מחט בכל הזרקה וקיבל הסבר לכך.
            </p>

            {/* Action Trigger Button */}
            <button
              onClick={() => setShowInjectionDetail(prev => !prev)}
              className="btn-secondary"
              style={{
                width: '100%',
                justify: 'center',
                padding: '14px',
                background: showInjectionDetail ? '#ffedd5' : 'white',
                borderColor: '#fdba74',
                color: '#c2410c',
                fontWeight: 800,
                marginBottom: '10px'
              }}
            >
              <Info size={18} />
              {showInjectionDetail ? 'הסתר ממצאי בדיקת הזרקות' : 'בדיקת מקומות הזרקה וצורת הזרקת אינסולין'}
            </button>

            {/* Revealed Findings Box */}
            {showInjectionDetail && (
              <div style={{
                marginTop: '14px',
                background: '#fff7ed',
                border: '1.5px solid #fed7aa',
                borderRadius: '14px',
                padding: '16px',
                color: '#c2410c'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={18} color="#ea580c" />
                  ממצאי בדיקת הזרקות והדרכה:
                </div>
                <div style={{ fontSize: '0.94rem', lineHeight: 1.6, color: '#1e293b', fontWeight: 600 }}>
                  בבדיקת אזורי הזרקה וצורת הזרקת אינסולין: המטופל מזריק נכון במקומות הנכונים ומאחסן נכון את האינסולין. אך לא מקפיד להחליף מחט בכל הזרקה וקיבל הסבר לכך.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Section 3: Open Clinical Reflection Questions */}
      <div className="glass-card" style={{ padding: '26px', borderRight: '5px solid #6b21a8', background: '#faf5ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: '#f3e8ff', color: '#7e22ce', padding: '10px', borderRadius: '12px' }}>
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              דילמה וחשיבה קלינית - שאלות פתוחות
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem' }}>לחץ על כל שאלה לצפייה בניתוח והנמקה קלינית</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {openQuestionsData.map((item, idx) => {
            const isOpen = openQuestionIndex === idx;

            return (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '14px',
                border: '1px solid #e9d5ff',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: isOpen ? '#f3e8ff' : 'white',
                    border: 'none',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'right',
                    fontWeight: 800,
                    color: '#581c87',
                    fontSize: '1rem'
                  }}
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '16px 20px', fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, borderTop: '1px solid #f3e8ff', whiteSpace: 'pre-line' }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <RegNote notes={[INDICATION_NOTE, INSULIN_SPC_NOTE]} refs={[REFS.step[0], REFS.step2, REFS.select, REFS.ada2026]} />
      </div>

      {/* Section 4: Clinical Evidence & Studies for Wegovy Benefits */}
      <div className="glass-card" style={{ padding: '28px', borderRight: '6px solid #0284c7', background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '6px' }}>ראיות מחקריות • Wegovy® (Semaglutide 2.4mg)</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              יתרונות קליניים ומחקרים נלווים
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '4px' }}>
              סקירת ממצאי מחקרים קליניים: ירידה במשקל, הגנה קרדיווסקולרית/טרשתית, דום נשימה בשינה וכבד שומני
            </p>
          </div>
        </div>

        {/* Category Selection Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveStudyTab('weight_loss')}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: activeStudyTab === 'weight_loss' ? '2px solid #581c87' : '1px solid #cbd5e1',
              background: activeStudyTab === 'weight_loss' ? '#f3e8ff' : 'white',
              color: activeStudyTab === 'weight_loss' ? '#581c87' : '#475569',
              fontWeight: 800,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeStudyTab === 'weight_loss' ? '0 4px 12px rgba(88, 28, 135, 0.15)' : 'none'
            }}
          >
            <span>🏋️‍♂️</span>
            <span>השפעה על ירידה במשקל (תוכנית STEP)</span>
          </button>

          <button
            onClick={() => setActiveStudyTab('side_effects')}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: activeStudyTab === 'side_effects' ? '2px solid #581c87' : '1px solid #cbd5e1',
              background: activeStudyTab === 'side_effects' ? '#f3e8ff' : 'white',
              color: activeStudyTab === 'side_effects' ? '#581c87' : '#475569',
              fontWeight: 800,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeStudyTab === 'side_effects' ? '0 4px 12px rgba(88, 28, 135, 0.15)' : 'none'
            }}
          >
            <span>🛡️</span>
            <span>סבילות ותופעות לוואי (בחילות)</span>
          </button>

          <button
            onClick={() => setActiveStudyTab('cardio')}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: activeStudyTab === 'cardio' ? '2px solid #581c87' : '1px solid #cbd5e1',
              background: activeStudyTab === 'cardio' ? '#f3e8ff' : 'white',
              color: activeStudyTab === 'cardio' ? '#581c87' : '#475569',
              fontWeight: 800,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeStudyTab === 'cardio' ? '0 4px 12px rgba(88, 28, 135, 0.15)' : 'none'
            }}
          >
            <span>🫀</span>
            <span>השפעה על תוצאים CV</span>
          </button>

          <button
            onClick={() => setActiveStudyTab('fatty_liver')}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: activeStudyTab === 'fatty_liver' ? '2px solid #581c87' : '1px solid #cbd5e1',
              background: activeStudyTab === 'fatty_liver' ? '#f3e8ff' : 'white',
              color: activeStudyTab === 'fatty_liver' ? '#581c87' : '#475569',
              fontWeight: 800,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeStudyTab === 'fatty_liver' ? '0 4px 12px rgba(88, 28, 135, 0.15)' : 'none'
            }}
          >
            <span>🩺</span>
            <span>השפעה על MASH ופיברוזיס כבדי</span>
          </button>

          <button
            onClick={() => setActiveStudyTab('eligibility')}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: activeStudyTab === 'eligibility' ? '2px solid #581c87' : '1px solid #cbd5e1',
              background: activeStudyTab === 'eligibility' ? '#f3e8ff' : 'white',
              color: activeStudyTab === 'eligibility' ? '#581c87' : '#475569',
              fontWeight: 800,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeStudyTab === 'eligibility' ? '0 4px 12px rgba(88, 28, 135, 0.15)' : 'none'
            }}
          >
            <span>📋</span>
            <span>קריטריוני זכאות לוויגובי (גם דום נשימה בשינה בלבד)</span>
          </button>
        </div>

        {/* Tab 1: Weight Loss (STEP Trials) */}
        {activeStudyTab === 'weight_loss' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e9d5ff', boxShadow: '0 4px 16px rgba(88, 28, 135, 0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Research Summary Text (TOP) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', borderRight: '4px solid #581c87' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#581c87', margin: 0 }}>
                    תוצאות מחקרי STEP - יעילות מוכחת בירידה במשקל
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '20px', margin: 0, fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                  <li>
                    <strong style={{ color: '#581c87' }}>ירידה משמעותית במשקל (STEP 1):</strong> הטיפול ב-Wegovy (סמגלוטייד 2.4 מ"ג) הוביל לירידה ממוצעת מרשימה של <span style={{ color: '#d97706', fontWeight: 900 }}>16.9%</span> ממשקל הגוף כעבור 68 שבועות (לעומת 2.4% בלבד בקבוצת הפלצבו).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>ירידה משמעותית במשקל לאורך שנתיים של טיפול (STEP 5):</strong> מחקר ארוך הטווח (104 שבועות / שנתיים) הוכיח שמירה יציבה ומתמשכת על הירידה במשקל עם ירידה ממוצעת של <span style={{ color: '#d97706', fontWeight: 900 }}>16.7%</span>.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>עליונות של סמגלוטייד 2.4 מ"ג בהשוואה ללירגלוטייד 3.0 מ"ג (STEP 8):</strong> במחקר השוואתי ישיר (Head to Head), סמגלוטייד 2.4 מ"ג הראתה ירידה גדולה יותר במשקל של <span style={{ color: '#d97706', fontWeight: 900 }}>17.1%</span> במשקל לעומת 6.6% בלבד בליראגלוטייד 3.0 מ"ג.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>שילוב עם התערבות התנהגותית (STEP 3):</strong> בשילוב טיפול התנהגותי אינטנסיבי (IBT) הושגה ירידה של <span style={{ color: '#d97706', fontWeight: 900 }}>17.6%</span> במשקל.
                  </li>
                </ul>
              </div>

              {/* Slide Image Box (BOTTOM) */}
              <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => openDoc('/labs/step_trials_weight_loss.png', 'שקף מחקר: תוצאות מחקרי STEP לירידה במשקל')}>
                  <img src="/labs/step_trials_weight_loss.png" alt="תוצאות מחקרי STEP לירידה במשקל" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    🔍 לחץ להגדלת שקף המחקר
                  </div>
                </div>
              </div>

              <RegNote
                notes={[
                  'Trial product estimand: Evaluates the treatment effect under the assumption that the trial product is taken as intended',
                  'Results are derived from separate clinical trials with different study designs, populations, comparators and treatment durations; cross-trial comparisons should not be made.'
                ]}
                refs={REFS.step}
              />

            </div>
          </div>
        )}

        {/* Tab 2: Side Effects & Tolerability (Nausea) */}
        {activeStudyTab === 'side_effects' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e9d5ff', boxShadow: '0 4px 16px rgba(88, 28, 135, 0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Research Summary Text (TOP) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', borderRight: '4px solid #581c87' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#581c87', margin: 0 }}>
                    פרופיל סבילות ובטיחות עקבי - תופעת הלוואי של בחילה
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '20px', margin: 0, fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                  <li>
                    <strong style={{ color: '#581c87' }}>תופעות לוואי קלות עד בינוניות (Mild/Moderate):</strong> בחילות המופיעות תחת הטיפול ב-Wegovy 2.4mg הן ברובן בדרגת חומרה קלה עד בינונית בלבד וחולפות מעצמן.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>משך זמן חציוני:</strong> משך הזמן החציוני (Median Duration) של תופעת הבחילה המדווחת עומד על <span style={{ color: '#d97706', fontWeight: 900 }}>8.0 ימים</span>.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>שיא זמני בתקופת הטיטרציה (Dose Escalation Period):</strong> שכיחות הבחילות עולה בעיקר בשבועות הראשונים (שבועות 0–16) במהלך העלייה ההדרגתית במינון, ולאחר מכן במעבר למינון היעד היא הולכת ויורדת בהתמדה עד להתייצבות מלאה.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>שיעור נמוך של תופעות חמורות (Severe):</strong> תופעות לוואי של בחילה בדרגה חמורה (Severe) היו נדירות (הקו הוורוד בתחתית הגרף).
                  </li>
                </ul>
              </div>

              {/* Slide Image Box (BOTTOM) */}
              <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => openDoc('/labs/wegovy_side_effects_nausea.jpg', 'שקף מחקר: פרופיל סבילות ותופעות לוואי (בחילות)')}>
                  <img src="/labs/wegovy_side_effects_nausea.jpg" alt="פרופיל סבילות ותופעות לוואי של Wegovy" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    🔍 לחץ להגדלת שקף המחקר
                  </div>
                </div>
              </div>

              <RegNote refs={[REFS.wegovySpc]} />

            </div>
          </div>
        )}

        {/* Tab 3: Cardiovascular / Atherosclerosis */}
        {activeStudyTab === 'cardio' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e9d5ff', boxShadow: '0 4px 16px rgba(88, 28, 135, 0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Research Summary Text (TOP) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', borderRight: '4px solid #581c87' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#581c87', margin: 0 }}>
                    תוצאות מחקר SELECT - ירידה מובהקת של 20% בסיכון ל- MACE במבוגרים עם מחלה קרדיווסקולרית קיימת ועודף משקל או השמנה, ללא סוכרת
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '20px', margin: 0, fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                  <li>
                    <strong style={{ color: '#581c87' }}>הפחתה מובהקת של 20% בסיכון ל-MACE:</strong> מחקר ה-SELECT הוכיח כי טיפול ב-Wegovy (סמגלוטייד 2.4 מ"ג) מביא לירידה יחסית דרמטית של <span style={{ color: '#d97706', fontWeight: 900 }}>20%</span> בסיכון לאירועים קרדיווסקולריים (3-Point MACE) בהשוואה לפלצבו (HR 0.80, 95% CI: 0.72-0.90, p&lt;0.001).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>3-Point MACE הוגדר כתוצא משולב הכולל:</strong> מוות מסיבות קרדיווסקולריות (CV Death), אוטם שריר הלב לא קטלני (Non-fatal MI) ואירוע מוחי לא קטלני (Non-fatal Stroke / CVA).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>הכללה בהנחיות הקרדיולוגיה האירופיות (ESC 2024):</strong> בעקבות תוצאות מחקר ה-SELECT, הוכנסה Wegovy 2.4mg להנחיות ה-ESC העדכניות (2024) לניהול תסמונת כלילית כרונית (Chronic Coronary Syndrome).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>עבור יעקב:</strong> לאור ההיסטוריה הקרדיווסקולרית של המטופל, הפחתת הסיכון הקרדיווסקולרי מהווה שיקול חשוב בבחירת הטיפול
                  </li>
                </ul>
              </div>

              {/* Slide Image Box (BOTTOM) */}
              <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => openDoc('/labs/semaglutide_select_mace_cardio.png', 'שקף מחקר SELECT: הפחתת אירועים קרדיווסקולריים ומוחיים (MACE)')}>
                  <img src="/labs/semaglutide_select_mace_cardio.png" alt="תוצאות מחקר SELECT להפחתת סיכון קרדיווסקולרי ומוחי" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    🔍 לחץ להגדלת שקף המחקר
                  </div>
                </div>
              </div>

              <RegNote notes={[INDICATION_NOTE]} refs={[REFS.select, REFS.esc2024]} />

            </div>
          </div>
        )}

        {/* Tab 4: Fatty Liver (MASLD / MASH - ESSENCE Study) */}
        {activeStudyTab === 'fatty_liver' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e9d5ff', boxShadow: '0 4px 16px rgba(88, 28, 135, 0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Research Summary Text (TOP) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', borderRight: '4px solid #581c87' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#581c87', margin: 0 }}>
                    תוצאות מחקר ה-ESSENCE - יעילות semaglutide 2.4 mg בחולי MASH עם פיברוזיס F2-F3
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '20px', margin: 0, fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                  <li>
                    <strong style={{ color: '#581c87' }}>שיפור מובהק בדלקת ובנזק הכבדי (MASH Resolution):</strong> במחקר ה-ESSENCE הפאזה ה-3, טיפול ב-Wegovy (סמגלוטייד 2.4 מ"ג) הוביל לנסיגה (Resolution) של דלקת הכבד הסטאטוטית ללא החמרה בפיברוזיס בשיעור גבוה מובהק לעומת פלצבו.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>שיפור בפיברוזיס הכבדי (Fibrosis Improvement):</strong> הושג שיפור מובהק בדרגת הפיברוזיס הכבדי (הצטלקות הכבד) ללא החמרה בדלקת הכבד (Steatohepatitis).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>הפחתת תכולת השומן בכבד ואנזימי כבד (ALT/AST):</strong> טיפול ב-Wegovy מפחית משמעותית את אחוז השומן התוך-כבדי ומשפר את ערכי תפקודי הכבד (ALT, AST).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>חשיבות עבור יעקב:</strong> לאור מחלת הכבד מסוג MASLD, הפחתת משקל מהווה יעד טיפולי חשוב. במטופלים עם MASH ופיברוזיס בדרגות F2–F3 semaglutide 2.4 mg הדגים שיפור ב-MASH ובפיברוזיס
                  </li>
                </ul>
              </div>

              {/* Slide Image Box (BOTTOM) */}
              <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => openDoc('/labs/semaglutide_mash_fatty_liver.png', 'שקף מחקר ESSENCE: השפעת סמגלוטייד על כבד שומני (MASH / MASLD)')}>
                  <img src="/labs/semaglutide_mash_fatty_liver.png" alt="תוצאות מחקר ESSENCE בכבד שומני MASH/MASLD" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    🔍 לחץ להגדלת שקף המחקר
                  </div>
                </div>
              </div>

              <RegNote notes={[INDICATION_NOTE]} refs={[REFS.essence]} />

            </div>
          </div>
        )}

        {/* Tab 5: Eligibility Criteria (Wegovy Eligibility & SHABAN - OSA included) */}
        {activeStudyTab === 'eligibility' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e9d5ff', boxShadow: '0 4px 16px rgba(88, 28, 135, 0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Summary Text (TOP) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#faf5ff', padding: '14px 18px', borderRadius: '12px', borderRight: '4px solid #581c87' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#581c87', margin: 0 }}>
                    קריטריוני זכאות והשתתפות קופות החולים (שב"ן) לטיפול ב-Wegovy® (Semaglutide 2.4mg)
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '20px', margin: 0, fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                  <li>
                    <strong style={{ color: '#581c87' }}>זמינות וסבסוד בביטוחים המשלימים (שב"ן):</strong> תרופת Wegovy® (סמגלוטייד 2.4 מ"ג) זמינה למבוטחי שב"ן בהנחה.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>קריטריון BMI מעל 30 (BMI &gt; 30 kg/m²):</strong> זכאות מלאה למטופלים הסובלים מהשמנה (BMI מעל 30).
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>קריטריון 27 ≤ BMI &lt; 30 עם מחלה נלווית:</strong> זכאות למטופלים עם BMI מ-27 ומעלה בנוכחות לפחות מחלה נלווית אחת הקשורה למשקל, כגון: טרום סוכרת או סוכרת מסוג 2, יתר לחץ דם, דיסליפידמיה, <span style={{ color: '#d97706', fontWeight: 900 }}>דום נשימה חסימתי בשינה (OSA)</span> או מחלה קרדיווסקולרית.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>גיל מאושר לשימוש:</strong> התרופה מאושרת לשימוש במבוגרים ומתבגרים החל מגיל 12 ומעלה.
                  </li>
                  <li>
                    <strong style={{ color: '#581c87' }}>התאמה מלאה למטופל (יעקב):</strong> יעקב (בן 67, BMI בסיס 36.1, סובל מכבד שומני, CVA, IHD ודום נשימה בשינה) עומד במלוא קריטריוני הזכאות לקבלת Wegovy בסבסוד שב"ן!
                  </li>
                </ul>
              </div>

              {/* Slide Image Box (BOTTOM) */}
              <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => openDoc('/labs/wegovy_eligibility_shaban.png', 'שקף: קריטריוני זכאות לוויגובי (סמגלוטייד 2.4 מ"ג) למבוטחי שב"ן')}>
                  <img src="/labs/wegovy_eligibility_shaban.png" alt="קריטריוני זכאות לוויגובי בכל קופות החולים" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    🔍 לחץ להגדלת שקף הזכאות
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Section 5: Treatment Updates & Lifestyle Guidance */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Pill size={24} color="#0284c7" />
          שינויים בטיפול התרופתי והנחיות אורח חיים
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* Card 1: Wegovy 1mg */}
          <div style={{ background: '#fcf5ff', padding: '18px', borderRadius: '16px', border: '1px solid #e9d5ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>
              <HeartPulse size={18} />
              התחלת וויגובי (סמגלוטייד 2.4 מ"ג בטיטרציה המקובלת)
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#7e22ce', marginBottom: '4px' }}>
              (מעבר מאוזמפיק 1 מ"ג)
            </div>
            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, fontWeight: 600 }}>
              תוך הדרכה על ביצוע טיטרציה הדרגתית.
            </div>
          </div>

          {/* Card 2: Physical Activity */}
          <div style={{ background: '#f0fdf4', padding: '18px', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>
              <Dumbbell size={18} />
              פעילות גופנית מותאמת
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>
              אירובי + אנאירובי
            </div>
            <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
              המטופל הודרך על ביצוע פעילות גופנית אירובית ואנאירובית משולבת לשיפור רגישות לאינסולין.
            </div>
          </div>

          {/* Card 3: Dietitian Support */}
          <div style={{ background: '#fefce8', padding: '18px', borderRadius: '16px', border: '1px solid #fef08a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a16207', fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>
              <Apple size={18} />
              ייעוץ ותמיכה תזונתית
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ca8a04', marginBottom: '4px' }}>
              מעקב דיאטנית קלינית
            </div>
            <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
              המטופל הודרך והופנה למעקב קבוע אצל דיאטנית קלינית להתאמת תזונה מבוקרת פחמימות.
            </div>
          </div>

        </div>
        <RegNote notes={[INDICATION_NOTE, INSULIN_SPC_NOTE]} />
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={onPrev} className="btn-secondary" style={{ padding: '14px 28px' }}>
          → חזרה לשלב 1
        </button>
        <button onClick={onNext} className="btn-primary" style={{ padding: '16px 40px' }}>
          התקדמות לשלב הבא ←
        </button>
      </div>

      {/* Document Viewer Modal */}
      {showDocModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{docTitle}</h4>
              <button 
                onClick={() => setShowDocModal(false)}
                style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                סגור
              </button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto', textAlign: 'center' }}>
              <img src={activeDocImage} alt="נתוני דוח Libre פברואר" style={{ maxWidth: '100%', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
