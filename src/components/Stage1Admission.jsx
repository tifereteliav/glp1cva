import React, { useState } from 'react';
import { 
  User, Activity, FileText, ShieldAlert, HeartPulse, ChevronDown, ChevronUp, 
  Pill, Stethoscope, BarChart2, CheckCircle2, Footprints, ArrowLeft, 
  Utensils, Moon, AlertTriangle, MessageSquare, Heart, Smile, AlertCircle, 
  ThumbsUp, Sparkles, CheckCircle, XCircle 
} from 'lucide-react';
import RegNote, { AI_IMAGE_NOTE, REFS } from './RegNote';
import { INDICATION_NOTE } from '../data/simulationData';

export default function Stage1Admission({ data, patient, onNext }) {
  // State for interactive collapsible sections (ALL CLOSED BY DEFAULT)
  const [openSections, setOpenSections] = useState({
    history: false,
    physical: false,
    labs: false,
    meds: false,
    obesityComplications: false
  });

  // State for interactive Anamnesis dialogue cards
  const [openAnamnesis, setOpenAnamnesis] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  // State for Nurse Response Selection in Dialogue Module
  const [selectedNurseResponseIndex, setSelectedNurseResponseIndex] = useState(null);

  const [showDocModal, setShowDocModal] = useState(false);
  const [activeDocImage, setActiveDocImage] = useState(null);

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAnamnesis = (index) => {
    setOpenAnamnesis(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAllAnamnesis = () => {
    const allOpen = Object.values(openAnamnesis).every(v => v);
    setOpenAnamnesis({
      0: !allOpen,
      1: !allOpen,
      2: !allOpen,
      3: !allOpen,
      4: !allOpen
    });
  };

  const openDoc = (path) => {
    setActiveDocImage(path);
    setShowDocModal(true);
  };

  const anamnesisItems = [
    {
      id: 'diet',
      category: 'סדר יום ותזונה',
      nurseQuestion: 'איך אתה מתנהל ביום יום ומהם הרגלי התזונה שלך?',
      patientAnswer: 'יש לי עבודה מאוד לחוצה, ואני אוכל בנשנושים ולא באופן מסודר.',
      icon: Utensils,
      color: '#d97706',
      bgColor: '#fffbe5'
    },
    {
      id: 'activity',
      category: 'פעילות גופנית',
      nurseQuestion: 'האם אתה מבצע פעילות גופנית בחיי היומיום?',
      patientAnswer: 'אני עושה הרבה הליכות תוך כדי העבודה כי אני רץ ממקום למקום, אבל חוץ מזה אני לא עושה פעילות גופנית כלשהי.',
      icon: Footprints,
      color: '#0284c7',
      bgColor: '#f0f9ff'
    },
    {
      id: 'sleep',
      category: 'איכות ומשך השינה',
      nurseQuestion: 'איך השינה שלך בלילה?',
      patientAnswer: 'אני לא ישן הרבה, אולי 4 או 5 שעות בלילה, ואני ישן גרוע.',
      icon: Moon,
      color: '#7e22ce',
      bgColor: '#fcf5ff'
    },
    {
      id: 'concerns',
      category: 'חששות וגורמים מטרידים',
      nurseQuestion: 'מה הכי מטריד אותך כרגע מבחינה בריאותית?',
      patientAnswer: 'אני מאוד מפחד מהפצע שיש לי ברגל, כי יש לי שכן שכרתו לו את הרגל ואני מאוד מפחד מזה.',
      icon: AlertTriangle,
      color: '#dc2626',
      bgColor: '#fef2f2'
    },
    {
      id: 'medication_adherence',
      category: 'היענות לטיפול התרופתי',
      nurseQuestion: 'האם אתה מקפיד לקחת את הטיפול התרופתי הקבוע שלך?',
      patientAnswer: 'אני לוקח את האוזמפיק (סמגלוטייד SC) רק לפעמים כי אני חושש שזה יכול לפגוע לי בעיניים, וגם אני חושש לקחת את זה כי אני מרבה לטוס ולעבור בין מדינות וחושש מתופעות לוואי.',
      icon: Pill,
      color: '#059669',
      bgColor: '#ecfdf5'
    }
  ];

  const nurseDialogueOptions = [
    {
      id: 'empathetic',
      optionLabel: 'תגובה 1',
      revealedTitle: '🟢 תגובה אמפתית, מנרמלת ומגייסת (מומלצת)',
      nurseStatement: 'יעקב, אני מבינה אותך לגמרי. זה הכי טבעי בעולם שתפחד מהפצע ברגל, בטח אחרי מה שקרה לשכן שלך. העומס המטורף בעבודה והשינה המועטה בטוח לא מוסיפים לזה... דע שאתה לא לבד בזה, יש פה צוות שלם שיעזור לך ולצידך לאורך כל הדרך. אנחנו הולכים לשמור על הרגל שלך ביחד, וביחד נתקדם ונאזן את הסוכר צעד אחר צעד, בקצב שמתאים לך.',
      patientReaction: 'נושם לרווחה, מביט באחות בעיניים רגועות יותר ומחייך קלות',
      patientQuote: 'תודה רבה, החשש מסיבוכים לפעמים משתק אותי אבל אני שמח שיש כאן צוות שמבין ועוזר ואני מוכן לעשות מה שצריך כדי להתאזן.',
      feedback: '✅ תגובה מומלצת ביותר! מתן לגיטימציה לחרדה והצעת שותפות בגובה העיניים מפיגים את המתח ויוצרים נכונות גבוהה לשיתוף פעולה.',
      badgeColor: '#10b981',
      isCorrect: true
    },
    {
      id: 'critical',
      optionLabel: 'תגובה 2',
      revealedTitle: '🔴 תגובה שיפוטית - תגובה מאיימת ומעוררת אשמה',
      nurseStatement: 'יעקב, אתה חייב להבין שעם HbA1C של 13.4% והתנהלות כזו של נשנושים וחוסר שינה, אתה מסכן את עצמך. אם לא תתחיל לקחת את עצמך בידיים, לעשות דיאטה מסודרת ולהתעמל, הפצע ברגל רק ילך ויידרדר ותגיע למצבים קשים כמו השכן.',
      patientReaction: 'מתכווץ בכיסא בחוסר אונים',
      patientQuote: 'אני יודע שאני לא בסדר... הדיבורים האלה רק עושים לי יותר חרדה...',
      feedback: '❌ הטחת אשמה מגבירה חרדה וגורמת להסתגרות והימנעות מטיפול.',
      badgeColor: '#ef4444',
      isCorrect: false
    },
    {
      id: 'technical',
      optionLabel: 'תגובה 3',
      revealedTitle: '🟡 תגובה טכנית - תגובה פרוטוקולית ללא אמפתיה',
      nurseStatement: 'טוב יעקב, אין מה להיכנס ללחץ ממה שקרה לשכן. לגבי הפצע ברגל - אנחנו נחליף לך חבישה במרפאת פצע, נתאים לך טיפול תרופתי חדש ונשלח אותך לעשות בדיקות מעבדה מעודכנות.',
      patientReaction: 'מהנהן בקרירות',
      patientQuote: 'בסדר, מה שתגידי... רק מקווה שלא יהיו תופעות לוואי.',
      feedback: '⚠️ התעלמות מהמצוקה הרגשית מונעת בניית אמון טיפולי עמוק.',
      badgeColor: '#f59e0b',
      isCorrect: false
    },
    {
      id: 'dismissive',
      optionLabel: 'תגובה 4',
      revealedTitle: '⚪ תגובה מבטלת - ביטול חששות שטחי ("אל תדאג")',
      nurseStatement: 'אל תחשוב על דברים רעים כמו כריתות, תהיה אופטימי! יהיה בסדר, רק תדאג לקחת את התרופות בזמן והכל יסתדר.',
      patientReaction: 'מניע ראשו באי-נוחות',
      patientQuote: 'קל לומר תהיה אופטימי, אבל הפצע עדיין מפחיד אותי...',
      feedback: '❌ עידוד שטחי מבטל את הרגש של המטופל וגורם לתחושה שלא מקשיבים לו.',
      badgeColor: '#6b7280',
      isCorrect: false
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '24px 30px', borderRight: '6px solid #0284c7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>{data.badge} • {data.date}</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{data.title}</h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginTop: '4px' }}>{data.subtitle}</p>
          </div>
          <div style={{ background: '#f0f9ff', padding: '12px 20px', borderRadius: '16px', border: '1px solid #bae6fd' }}>
            <span style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600 }}>סטטוס קליני</span>
            <div style={{ fontWeight: 900, color: '#0284c7', fontSize: '1.25rem' }}>סוכרת והשמנה</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Portrait & Demographics | Right Collapsible Clinical Accordions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Portrait & Patient Description + Family Background */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="patient-image-container" style={{ height: '320px' }}>
            <img src={patient.image} alt="יעקב - ביקור ראשון במרפאה" />
          </div>
          <div dir="ltr" style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'left', marginTop: '-8px' }}>{AI_IMAGE_NOTE}</div>

          {/* Patient Description & Family Background Box */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid #bae6fd',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.05)'
          }}>
            <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#0284c7" />
              תיאור המטופל והרקע המשפחתי:
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.96rem', color: '#334155', lineHeight: 1.5 }}>
              <div>• <strong>שם וגיל:</strong> {patient.name}, בן {patient.age}</div>
              <div>• <strong>מצב משפחתי:</strong> {patient.maritalStatus}</div>
              <div>• <strong>תעסוקה ורקע:</strong> {patient.occupation}</div>
              <div>• <strong>היסטוריית סוכרת:</strong> {patient.diabetesHistory}</div>
              <div style={{ background: '#fef3c7', padding: '10px 14px', borderRadius: '12px', color: '#92400e', fontWeight: 800, marginTop: '4px' }}>
                • <strong>סיפור משפחתי:</strong> {patient.familyHistory}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Interactive Toggle Collapsible Buttons/Cards (CLOSED BY DEFAULT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Collapsible 1: מחלות רקע של המטופל */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
            <button
              onClick={() => toggleSection('history')}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fee2e2', padding: '8px', borderRadius: '10px', color: '#ef4444' }}>
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    מחלות רקע של המטופל
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>לחץ לפתיחה/סגירה • סוכרת, IHD, CVA, כבד שומני ועוד</span>
                </div>
              </div>
              {openSections.history ? <ChevronUp size={22} color="#64748b" /> : <ChevronDown size={22} color="#64748b" />}
            </button>

            {openSections.history && (
              <div style={{ padding: '0 24px 20px 24px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '16px' }}>
                  {patient.medicalHistory.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#f8fafc',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{item.name}</span>
                      <span className="badge badge-blue" style={{ fontSize: '0.78rem', padding: '2px 8px' }}>{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Collapsible 2: בדיקה גופנית */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
            <button
              onClick={() => toggleSection('physical')}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#e0f2fe', padding: '8px', borderRadius: '10px', color: '#0284c7' }}>
                  <Stethoscope size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    בדיקה גופנית ומדדי סימנים חיוניים
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>לחץ לפתיחה/סגירה • לחץ דם, משקל, BMI, עישון ובדיקת כפות רגליים</span>
                </div>
              </div>
              {openSections.physical ? <ChevronUp size={22} color="#64748b" /> : <ChevronDown size={22} color="#64748b" />}
            </button>

            {openSections.physical && (
              <div style={{ padding: '0 24px 20px 24px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '16px', marginBottom: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>לחץ דם</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{patient.physicalExam.bloodPressure}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>דופק</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{patient.physicalExam.pulse}</div>
                  </div>

                  <div style={{ background: '#fff7ed', padding: '12px 16px', borderRadius: '12px', border: '1px solid #ffedd5' }}>
                    <div style={{ fontSize: '0.82rem', color: '#c2410c', fontWeight: 600 }}>משקל וגובה</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ea580c' }}>{patient.physicalExam.weight} | {patient.physicalExam.height}</div>
                  </div>

                  <div style={{ background: '#fef3c7', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '0.82rem', color: '#b45309', fontWeight: 600 }}>BMI (מדד מסת גוף)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#d97706' }}>{patient.physicalExam.bmi}</div>
                    <div style={{ fontSize: '0.75rem', color: '#92400e' }}>היקף מותניים: {patient.physicalExam.waist}</div>
                  </div>

                  <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#047857', fontWeight: 600 }}>הרגל עישון</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={18} />
                      {patient.physicalExam.smoking}
                    </div>
                  </div>

                  <div style={{ background: '#fcf5ff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
                    <div style={{ fontSize: '0.82rem', color: '#6b21a8', fontWeight: 600 }}>בדיקת עיניים (רטינה)</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7e22ce' }}>
                      {patient.physicalExam.eyeExam}
                    </div>
                  </div>
                </div>

                {/* Foot Exam Special Box */}
                <div style={{
                  background: '#f0f9ff',
                  border: '1.5px solid #bae6fd',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <Footprints size={24} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.95rem', marginBottom: '2px' }}>
                      בדיקת כפות רגליים:
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                      {patient.physicalExam.footExam}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collapsible 3: בדיקות מעבדה של המטופל */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
            <button
              onClick={() => toggleSection('labs')}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#ccfbf1', padding: '8px', borderRadius: '10px', color: '#0d9488' }}>
                  <Activity size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    בדיקות מעבדה של המטופל
                  </h3>
                </div>
              </div>
              {openSections.labs ? <ChevronUp size={22} color="#64748b" /> : <ChevronDown size={22} color="#64748b" />}
            </button>

            {openSections.labs && (
              <div style={{ padding: '0 24px 20px 24px', borderTop: '1px solid #f1f5f9' }}>
                
                {/* Lab Gauges Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '16px', marginBottom: '20px' }}>
                  
                  <div style={{ background: '#f0f9ff', padding: '14px', borderRadius: '14px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 700 }}>HbA1C בסיס</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7' }}>{patient.baselineLabs.a1c}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>13.4% (דצמבר 2025)</div>
                  </div>

                  <div style={{ background: '#fff7ed', padding: '14px', borderRadius: '14px', border: '1px solid #fed7aa' }}>
                    <div style={{ fontSize: '0.82rem', color: '#c2410c', fontWeight: 700 }}>גלוקוז בצום</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ea580c' }}>220 mg/dL</div>
                    <div style={{ fontSize: '0.75rem', color: '#9a3412' }}>תוצאת מעבדה (H)</div>
                  </div>

                  <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '14px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#047857', fontWeight: 700 }}>LDL-Cholesterol</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{patient.baselineLabs.ldl}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>121 mg/dL</div>
                  </div>

                  <div style={{ background: '#fefce8', padding: '14px', borderRadius: '14px', border: '1px solid #fef08a' }}>
                    <div style={{ fontSize: '0.82rem', color: '#a16207', fontWeight: 700 }}>ACR (חלבון בשתן)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ca8a04', marginTop: '4px' }}>{patient.baselineLabs.acr}</div>
                    <div style={{ fontSize: '0.75rem', color: '#854d0e' }}>180 mg/g (מיקרואלבומינוריה)</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>eGFR (תפקוד כליות)</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f766e' }}>{patient.baselineLabs.gfr}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>75 mL/min</div>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* Collapsible 4: טיפול תרופתי נוכחי */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
            <button
              onClick={() => toggleSection('meds')}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fef3c7', padding: '8px', borderRadius: '10px', color: '#d97706' }}>
                  <Pill size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    טיפול תרופתי נוכחי בביקור
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>לחץ לפתיחה/סגירה • דגלודק (טרגלודק) 40u, Jardiance Duo ותרופות נוספות</span>
                </div>
              </div>
              {openSections.meds ? <ChevronUp size={22} color="#64748b" /> : <ChevronDown size={22} color="#64748b" />}
            </button>

            {openSections.meds && (
              <div style={{ padding: '0 24px 20px 24px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  {patient.medicationsBaselineCurrent.map((med, idx) => (
                    <div key={idx} style={{
                      background: '#f8fafc',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{med.name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{med.purpose}</div>
                      </div>
                      <span className="badge badge-gold" style={{ fontSize: '0.82rem' }}>{med.dose}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Collapsible 5: תזכורת על סיבוכי מחלת ההשמנה */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
            <button
              onClick={() => toggleSection('obesityComplications')}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fce7f3', padding: '8px', borderRadius: '10px', color: '#db2777' }}>
                  <AlertCircle size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    תזכורת על סיבוכי מחלת ההשמנה
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>לחץ לפתיחה/סגירה • סיבוכים מטבוליים ומכניים (תרשים רפואי)</span>
                </div>
              </div>
              {openSections.obesityComplications ? <ChevronUp size={22} color="#64748b" /> : <ChevronDown size={22} color="#64748b" />}
            </button>

            {openSections.obesityComplications && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%)',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid #fbcfe8',
                  color: '#9d174d',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  fontWeight: 600
                }}>
                  <strong>מחלת ההשמנה הינה מחלה כרונית רב-מערכתית</strong> הקשורה למגוון רחב של סיבוכים מטבוליים (סוכרת, מחלות לב, כבד שומני, דיסליפידמיה) וסיבוכים מכניים (דום נשימה בשינה, שחיקת מפרקים, כאבים בכפות הרגליים ועוד).
                </div>

                <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => openDoc('/labs/obesity_complications.png')}>
                  <img 
                    src="/labs/obesity_complications.png" 
                    alt="תרשים סיבוכי מחלת ההשמנה" 
                    style={{ 
                      maxWidth: '100%', 
                      borderRadius: '14px', 
                      border: '1px solid #cbd5e1',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                <div dir="ltr" style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'left', marginTop: '-8px' }}>{AI_IMAGE_NOTE}</div>

                <div style={{
                  background: '#ecfdf5',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1.5px solid #a7f3d0',
                  color: '#065f46',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  fontWeight: 600
                }}>
                  <strong>מסקנה טיפולית: </strong>
                  במחקרים קליניים באוכלוסיות שונות של אנשים עם עודף משקל או השמנה, טיפול בסמגלוטייד 2.4 מ"ג נקשר לשיפור בתוצאים ספציפיים, לרבות ירידה במשקל, הפחתת אירועים קרדיווסקולריים באוכלוסייה עם מחלה קרדיווסקולרית קיימת, ושיפור בתוצאים היסטולוגיים באנשים עם MASH ופיברוזיס F2–F3
                </div>

                <RegNote notes={[INDICATION_NOTE]} refs={[...REFS.obesity, REFS.feet, REFS.step[0], REFS.select, REFS.essence]} style={{ marginTop: 0 }} />

                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => openDoc('/labs/obesity_complications.png')} 
                    className="btn-primary" 
                    style={{ fontSize: '0.92rem', padding: '10px 22px', background: '#db2777', borderColor: '#db2777' }}
                  >
                    <FileText size={18} />
                    צפה בתרשים סיבוכי מחלת ההשמנה במסך מלא
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Part A: Interactive Anamnesis Section */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderRight: '6px solid #0284c7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#e0f2fe', padding: '12px', borderRadius: '14px', color: '#0284c7' }}>
              <Stethoscope size={28} />
            </div>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '4px', fontSize: '0.8rem' }}>חלק א' - אנמנזה</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                תחקור המטופל על ידי האחות
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px', margin: 0 }}>
                לחץ/י על השאלות שלהלן כדי לראות את תשובותיו של יעקב לאחות המרפאה
              </p>
            </div>
          </div>
          <div>
            <button 
              onClick={toggleAllAnamnesis} 
              className="btn-secondary" 
              style={{ fontSize: '0.88rem', padding: '8px 16px' }}
            >
              {Object.values(openAnamnesis).every(v => v) ? 'סגור את כל התשובות' : 'פתח את כל התשובות'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {anamnesisItems.map((item, idx) => {
            const isOpen = !!openAnamnesis[idx];
            const ItemIcon = item.icon;

            return (
              <div 
                key={item.id}
                style={{
                  borderRadius: '16px',
                  border: isOpen ? `2px solid ${item.color}` : '1.5px solid #e2e8f0',
                  background: isOpen ? item.bgColor : '#ffffff',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Question Clickable Header */}
                <button
                  onClick={() => toggleAnamnesis(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'right',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div style={{ 
                      background: isOpen ? item.color : '#f1f5f9', 
                      color: isOpen ? '#ffffff' : item.color,
                      padding: '10px', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}>
                      <ItemIcon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge" style={{ background: '#e2e8f0', color: '#334155', fontSize: '0.75rem', fontWeight: 700 }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700 }}>
                          שאלת האחות # {idx + 1}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        "{item.nurseQuestion}"
                      </h4>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: isOpen ? item.color : '#64748b', fontWeight: 700 }}>
                      {isOpen ? 'הסתר תשובה' : 'לחץ לצפייה בתשובה'}
                    </span>
                    {isOpen ? <ChevronUp size={20} color={item.color} /> : <ChevronDown size={20} color="#64748b" />}
                  </div>
                </button>

                {/* Expanded Dialogue Answer Box */}
                {isOpen && (
                  <div style={{ 
                    padding: '0 22px 20px 22px', 
                    borderTop: `1px solid ${isOpen ? 'rgba(0,0,0,0.06)' : '#f1f5f9'}`
                  }}>
                    <div style={{ 
                      marginTop: '16px',
                      background: '#ffffff',
                      padding: '18px 20px',
                      borderRadius: '14px',
                      border: '1.5px solid #cbd5e1',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                      }}>
                        יעקב
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem' }}>תשובת המטופל (יעקב):</span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>ציטוט מהאנמנזה</span>
                        </div>
                        <p style={{ 
                          fontSize: '1.05rem', 
                          fontWeight: 700, 
                          color: '#1e293b', 
                          lineHeight: 1.6, 
                          margin: 0,
                          background: '#f8fafc',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          borderRight: '4px solid #0284c7'
                        }}>
                          "{item.patientAnswer}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Therapeutic Dialogue & Empathy Decision Module */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)', borderRight: '6px solid #10b981' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '12px', color: '#10b981' }}>
              <Heart size={24} />
            </div>
            <div>
              <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.8rem' }}>
                חלק ב' - שיח טיפולי ותקשורת מקרבת
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                מה תגידי ליעקב כדי לבנות אמון ולגייס אותו לטיפול?
              </h3>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.5, marginTop: '8px' }}>
            לאחר שיעקב שיתף אותך בעומס הרב בעבודה, בתזונה הבלתי מסודרת, בשינה הירודה ובפחד העמוק שלו מכריתת רגל – 
            <strong> קרא/י את תגובות האחות האפשריות, בחר/י תגובה וצפה/י כיצד יעקב מגיב ואיזה סגנון תקשורת זה מייצג:</strong>
          </p>
        </div>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {nurseDialogueOptions.map((opt, index) => {
            const isSelected = selectedNurseResponseIndex === index;

            return (
              <div 
                key={opt.id}
                style={{
                  borderRadius: '16px',
                  border: isSelected ? `2.5px solid ${opt.badgeColor}` : '1.5px solid #cbd5e1',
                  background: isSelected ? '#ffffff' : '#f8fafc',
                  padding: '20px',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      className="badge" 
                      style={{ 
                        background: isSelected ? opt.badgeColor : '#e2e8f0', 
                        color: isSelected ? 'white' : '#334155', 
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        padding: '5px 14px'
                      }}
                    >
                      {isSelected ? opt.revealedTitle : opt.optionLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedNurseResponseIndex(index)}
                    className={isSelected ? "btn-primary" : "btn-secondary"}
                    style={{
                      fontSize: '0.88rem',
                      padding: '8px 18px',
                      background: isSelected ? opt.badgeColor : undefined,
                      borderColor: isSelected ? opt.badgeColor : undefined
                    }}
                  >
                    {isSelected ? 'תגובה נבחרת ✓' : 'בחרי בתגובה זו'}
                  </button>
                </div>

                <div style={{ 
                  background: '#ffffff', 
                  padding: '16px 20px', 
                  borderRadius: '12px', 
                  borderRight: `4px solid ${isSelected ? opt.badgeColor : '#0284c7'}`,
                  fontSize: '1.02rem',
                  color: '#1e293b',
                  lineHeight: 1.6,
                  fontWeight: 600
                }}>
                  <strong style={{ color: '#0369a1' }}>דברי האחות: </strong>
                  "{opt.nurseStatement}"
                </div>

                {/* Patient Reaction & Feedback Box (Revealed ONLY when selected) */}
                {isSelected && (
                  <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    {/* Patient Immediate Reaction */}
                    <div style={{
                      background: opt.isCorrect ? '#f0fdf4' : '#fef2f2',
                      border: `1.5px solid ${opt.isCorrect ? '#86efac' : '#fca5a5'}`,
                      padding: '18px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px'
                    }}>
                      <div style={{
                        background: opt.isCorrect ? '#16a34a' : '#dc2626',
                        color: 'white',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
                      }}>
                        יעקב
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: opt.isCorrect ? '#15803d' : '#991b1b', marginBottom: '6px' }}>
                          תגובה אפשרית של יעקב ({opt.patientReaction}):
                        </div>
                        <div style={{ 
                          fontSize: '1.05rem', 
                          fontWeight: 800, 
                          color: '#0f172a', 
                          lineHeight: 1.55,
                          background: 'white',
                          padding: '14px 18px',
                          borderRadius: '10px',
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRight: `4px solid ${opt.isCorrect ? '#16a34a' : '#dc2626'}`
                        }}>
                          "{opt.patientQuote}"
                        </div>
                      </div>
                    </div>

                    {/* Educational Feedback */}
                    <div style={{
                      background: '#f8fafc',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: '#334155',
                      lineHeight: 1.5
                    }}>
                      {opt.feedback}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Advance to Stage 2 Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
          <button 
            onClick={onNext}
            className="btn-primary"
            style={{ 
              padding: '16px 40px', 
              fontSize: '1.1rem', 
              gap: '10px',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.3)'
            }}
          >
            התקדמות לשלב 2 (ביקור ראשון במרפאה)
            <ArrowLeft size={20} />
          </button>
        </div>

      </div>

      {/* Original Document Viewer Modal */}
      {showDocModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>מסמך רפואי מקורי</h4>
              <button 
                onClick={() => setShowDocModal(false)}
                style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                סגור
              </button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto', textAlign: 'center' }}>
              <img src={activeDocImage} alt="מסמך רפואי" style={{ maxWidth: '100%', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
