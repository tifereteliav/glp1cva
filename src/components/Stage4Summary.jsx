import React from 'react';
import { Award, CheckCircle2, RefreshCw, FileCheck2, Sparkles, BookOpen, ShieldCheck, HeartPulse } from 'lucide-react';
import RegNote from './RegNote';
import WegovySpcAbstract from './WegovySpcAbstract';
import { INDICATION_NOTE, INDIVIDUAL_CASE_NOTE } from '../data/simulationData';

export default function Stage4Summary({ data, patient, onRestart, score }) {
  const takeaways = [
    {
      title: "מעקב אורח חיים ותזונה",
      desc: "המטופל נמצא במעקב רציף של דיאטנית קלינית ומבצע, גם אם בצורה מוגבלת, פעילות גופנית סדירה המותאמת למצבו הבריאותי."
    },
    {
      title: "הורדת משקל",
      desc: `הטיפול ב- Wegovy (Semaglutide 2.4mg) הביא לירידה במשקל מ-96 ק"ג ל-85 ק"ג לצד הפחתה במינון האינסולין הבולוס (מ-12u ל-8u לארוחה) והאינסולין הבזאלי (מ-40u ל-36u).`
    },
    {
      title: "תועלת קרדיווסקולרית רלוונטית למטופל בסיכון גבוה",
      desc: "המטופל דיווח על שיפור משמעותי באיכות השינה (דום נשימה בשינה), במהלך המעקב נצפה שיפור בפצע בכף הרגל. לאור היסטוריה של CVA ו- IHD והשמנה, שיפור בגורמי הסיכון מהווה שיקול טיפולי משמעותי."
    },
    {
      title: "שיפור במדדים גליקמיים שנמדדו באמצעות CGM",
      desc: "חיישן Libre 2 מדגים זינוק מרהיב מ-30% ל-79% בטווח היעד (TIR) וירידה בסוכר הממוצע מ-220 ל-116 mg/dL עם GMI של 6.1%."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '36px 30px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(224,242,254,0.9) 100%)',
        border: '2px solid rgba(2, 132, 199, 0.3)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '50%', color: '#0284c7' }}>
            <Award size={42} />
          </div>
        </div>
        <span className="badge badge-gold" style={{ fontSize: '1rem', padding: '8px 20px', marginBottom: '12px' }}>
          סיום הסימולציה הקלינית בהצלחה
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>
          סיכום מקרה: ניהול טיפול ב-Wegovy במטופל עם השמנה וסיבוכים
        </h2>
        
        {/* User-specified Case Summary Text */}
        <div style={{
          background: 'white',
          padding: '24px 28px',
          borderRadius: '18px',
          border: '1.5px solid #bae6fd',
          textAlign: 'right',
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '1.12rem', color: '#1e293b', lineHeight: 1.75, margin: 0, fontWeight: 600 }}>
            המטופל סבל מהשמנה וריבוי של סיבוכי השמנה וסוכרת, ביניהם כבד שומני, דום נשימה בשינה, ומחלות טרשתיות כמו CVA ו-IHD. במהלך המעקב לאחר כל השינויים בטיפול והתחלת טיפול ב-Wegovy® (Semaglutide 2.4mg) נצפו ירידה במשקל, שיפור במדדים הגליקמיים והפחתה במינוני האינסולין. בנוסף, המטופל דיווח על שיפור בשינה ונצפה שיפור בפצע בכף הרגל.
          </p>
        </div>

        <RegNote notes={[INDIVIDUAL_CASE_NOTE]} style={{ textAlign: 'left' }} />
      </div>

      {/* Highlights & Outcome Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 700 }}>זמן בטווח היעד (TIR)</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#10b981', margin: '6px 0' }}>79%</div>
          <div style={{ fontSize: '0.85rem', color: '#047857' }}>עלה מ-30% ל-79%</div>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 700 }}>אינדיקטור גליקמי (GMI)</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0284c7', margin: '6px 0' }}>6.1%</div>
          <div style={{ fontSize: '0.85rem', color: '#0369a1' }}>סוכר ממוצע 116 mg/dL</div>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 700 }}>ירידה במשקל המטופל</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0d9488', margin: '6px 0' }}>85 ק"ג</div>
          <div style={{ fontSize: '0.85rem', color: '#0f766e' }}>ירידה מ-96 ק"ג בבסיס (BMI 36.1 ← 32.0)</div>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 700 }}>אינסולין בזאלי מותאם</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#7e22ce', margin: '6px 0' }}>36u</div>
          <div style={{ fontSize: '0.85rem', color: '#6b21a8' }}>טרגלודק (דגלודק) ליום</div>
        </div>
      </div>

      {/* Core Clinical Takeaways */}
      <div className="glass-card" style={{ padding: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={24} color="#0284c7" />
          ארבע תובנות מרכזיות מהמקרה:
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {takeaways.map((item, idx) => (
            <div key={idx} style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}>
              <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <RegNote notes={[INDICATION_NOTE]} />
      </div>

      {/* Patient Follow-up Plan */}
      <div className="glass-card" style={{ padding: '28px', background: '#f0fdf4', border: '1.5px solid #a7f3d0' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HeartPulse size={24} color="#10b981" />
          הנחיות המשך מעקב קליני עבור יעקב:
        </h3>
        <ul style={{ paddingRight: '24px', color: '#047857', lineHeight: 1.8, fontSize: '1.02rem', margin: 0 }}>
          <li><strong>מינונים תרופתיים מעודכנים:</strong> המשך מינון אחזקתי של Wegovy 2.4 mg (סמגלוטייד) אחת לשבוע; המשך אינסולין בזאלי Degludec (טרגלודק) 36 יחידות ליום; אינסולין נובורפיד (אספארט) 8 יחידות לפני כל ארוחה לפי מעקב ערכים.</li>
          <li><strong>מעקב מרפאת פצע:</strong> המשך ביקורים שבועיים במרפאת פצע להשלמת סגירת הכיב ברגל ימין.</li>
          <li><strong>ניטור רציף ב-Libre 2:</strong> המשך סריקה יומיומית, מעקב אחר התראות היפוגליקמיה ליליות ושמירה על TIR &gt; 70%.</li>
          <li><strong>תזונה ופעילות גופנית:</strong> מפגש חודשי עם דיאטנית קלינית ושמירה על שגרת הליכות מותאמת.</li>
          <li><strong>בדיקות מעבדה תקופתיות:</strong> בדיקת HbA1C, ליפידים ותפקודי כליה (eGFR, ACR) בעוד 3 חודשים.</li>
        </ul>
      </div>

      {/* Closing message (as in the approved deck) */}
      <div className="glass-card" style={{ padding: '24px 28px', textAlign: 'center', background: 'linear-gradient(135deg, #231b45 0%, #4a2a7a 100%)', color: 'white' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '10px' }}>סיום הלומדה בהצלחה!</div>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0, color: '#d6d0f0' }}>
          המקרה של יעקב מדגים את השינויים הקליניים שנצפו במהלך טיפול ב-Wegovy® (Semaglutide 2.4 mg) כחלק מגישה טיפולית כוללת: ירידה במשקל, שיפור באיזון הגליקמי והפחתה במינוני האינסולין לצד שיפור במספר גורמי סיכון קרדיו-מטבוליים
        </p>
      </div>

      <WegovySpcAbstract />

      {/* Restart Simulation Button */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={onRestart} className="btn-primary" style={{ padding: '16px 44px', fontSize: '1.15rem' }}>
          <RefreshCw size={22} />
          התחל את הסימולציה מחדש
        </button>
      </div>

    </div>
  );
}
