const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function buildFullPresentation() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9'; // 13.33 x 7.5 inches
  pres.author = 'TIFERET ELIAV • Diabetes & AI';
  pres.company = 'TIFERET ELIAV';
  pres.title = 'סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים';

  // Branding Colors
  const NAVY = '0F172A';
  const BLUE = '0284C7';
  const INDIGO = '4F46E5';
  const PURPLE = '7E22CE';
  const TEAL = '0D9488';
  const GREEN = '059669';
  const RED = 'DC2626';
  const AMBER = 'D97706';
  const GRAY_BG = 'F8FAFC';
  const WHITE = 'FFFFFF';
  const BORDER_COLOR = 'CBD5E1';
  const DARK_TEXT = '1E293B';
  const MUTED_TEXT = '64748B';

  const logoPath = path.resolve(__dirname, 'public/tiferet_eliav_logo.jpg');
  const hasLogo = fs.existsSync(logoPath);

  function addHeader(slide, title, category, stageBadge = null) {
    // Header container
    slide.addShape(pres.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: 1.15,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 1 }
    });

    // Top subtle gradient bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: 0.06,
      fill: { color: BLUE }
    });

    // Logo on the left
    if (hasLogo) {
      slide.addImage({
        path: logoPath,
        x: 0.5, y: 0.16, w: 1.6, h: 0.82
      });
    }

    // Category / Badge
    const badgeText = stageBadge ? `${stageBadge} • ${category}` : category;
    slide.addText(badgeText, {
      x: 2.3, y: 0.14, w: 10.5, h: 0.28,
      fontSize: 10.5, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Main slide title
    slide.addText(title, {
      x: 2.3, y: 0.42, w: 10.5, h: 0.65,
      fontSize: 20, bold: true, color: NAVY, align: 'right', rtl: true, fontFace: 'Arial'
    });
  }

  function addFooter(slide, pageNum, totalPages = 27) {
    slide.addShape(pres.ShapeType.rect, {
      x: 0, y: 7.08, w: '100%', h: 0.42,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 1 }
    });

    slide.addText('TIFERET ELIAV • Diabetes & AI | סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים', {
      x: 0.5, y: 7.12, w: 10.5, h: 0.32,
      fontSize: 9.5, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addText(`${pageNum} / ${totalPages}`, {
      x: 11.8, y: 7.12, w: 1.0, h: 0.32,
      fontSize: 9.5, bold: true, color: BLUE, align: 'center', fontFace: 'Arial'
    });
  }

  function addCard(slide, x, y, w, h, bgColor = 'FFFFFF', borderColor = 'E2E8F0') {
    slide.addShape(pres.ShapeType.roundRect, {
      x, y, w, h, r: 0.15,
      fill: { color: bgColor },
      line: { color: borderColor, width: 1.2 }
    });
  }

  // ========================================================
  // SLIDE 1: Title Slide
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: 'F8FAFC' };

    slide.addShape(pres.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: 0.15,
      fill: { color: BLUE }
    });

    if (hasLogo) {
      slide.addImage({
        path: logoPath,
        x: 5.3, y: 0.8, w: 2.7, h: 1.4
      });
    }

    slide.addText('TIFERET ELIAV • Diabetes & AI', {
      x: 1.5, y: 2.35, w: 10.3, h: 0.4,
      fontSize: 16, bold: true, color: INDIGO, align: 'center', fontFace: 'Arial'
    });

    slide.addText('סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים', {
      x: 0.8, y: 2.85, w: 11.7, h: 1.1,
      fontSize: 27, bold: true, color: NAVY, align: 'center', rtl: true, fontFace: 'Arial'
    });

    slide.addText('מפגש קליני מורכב: יעקב (בן 67) | Double Diabetes (T1D + השמנה BMI 36.1) | רקע CVA 2023 ו-IHD\nניהול טיפול מתקדם, טיטרציית Wegovy 2.4mg, התאמת מינוני אינסולין וניטור רציף ב-Libre 2', {
      x: 1.2, y: 4.1, w: 11.0, h: 0.75,
      fontSize: 13.5, color: DARK_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
    });

    const pillars = [
      { t: 'פרופיל מטופל מורכב', d: 'שילוב סוכרת סוג 1, השמנה (BMI 36.1), רקע מוחי CVA, צנתור IHD, דום נשימה וכיב ברגל', bg: 'E0F2FE', bc: 'BAE6FD', c: '0369A1' },
      { t: 'התאמת טיפול וטיטרציה', d: 'טיטרציית Wegovy עד 2.4mg, הפחתת 70% באינסולין בולוס והורדת בזאלי ל-36 יחידות', bg: 'F3E8FF', bc: 'E9D5FF', c: '6B21A8' },
      { t: 'הישגי חיישן Libre 2', d: 'זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL, GMI 6.1% וירידה של 11 ק"ג', bg: 'DCFCE7', bc: 'A7F3D0', c: '15803D' }
    ];

    pillars.forEach((p, idx) => {
      const cx = 1.0 + idx * 3.85;
      slide.addShape(pres.ShapeType.roundRect, {
        x: cx, y: 5.15, w: 3.6, h: 1.5, r: 0.15,
        fill: { color: p.bg },
        line: { color: p.bc, width: 1.5 }
      });
      slide.addText(p.t, {
        x: cx + 0.15, y: 5.25, w: 3.3, h: 0.35,
        fontSize: 13, bold: true, color: p.c, align: 'center', rtl: true, fontFace: 'Arial'
      });
      slide.addText(p.d, {
        x: cx + 0.15, y: 5.65, w: 3.3, h: 0.9,
        fontSize: 10, color: DARK_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 1);
  }

  // ========================================================
  // SLIDE 2: Curriculum Overview & Patient Journey
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'מבנה הלומדה ומסלול הטיפול במטופל', 'מפת הדרך הקלינית');

    const stages = [
      { num: 'שלב 1', title: 'קבלת המטופל והערכה ראשונית', sub: 'אנמנזה מקיפה, תקשורת מקרבת, מחלות רקע, מעבדה, בדיקה גופנית ודילמת Double Diabetes', col: '0284C7', bg: 'E0F2FE' },
      { num: 'שלב 2', title: 'ביקור ראשון (חלק ב\')', sub: 'החלטה על אינסולין קצר טווח, פריקת Libre, בדיקת הזרקות, ראיות מחקריות (STEP, SELECT, שב"ן)', col: '0D9488', bg: 'CCFBF1' },
      { num: 'שלב 3', title: 'מעקב וטיטרציה תחת Wegovy 2.4mg', sub: 'סולם מינוני Wegovy, הורדת 70% באינסולין בולוס, התאמת בזאלי ומניעת היפוגליקמיה', col: '7E22CE', bg: 'F3E8FF' },
      { num: 'שלב 4', title: 'ניתוח מדדי חיישן סוכר Libre 2 / AGP', sub: 'זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL, GMI 6.1% וניתוח פרופיל יממתי מלא', col: '10B981', bg: 'DCFCE7' },
      { num: 'שלב 5', title: 'סיכום קליני ומסקנות מנחות', sub: 'הטבה במשקל, בשינה ובפצע כף הרגל, הפחתת סיכון טרשתי ועקרונות לפרקטיקה', col: 'D97706', bg: 'FEF3C7' }
    ];

    stages.forEach((s, idx) => {
      const y = 1.45 + idx * 1.05;
      addCard(slide, 0.8, y, 11.7, 0.95, 'FFFFFF', 'E2E8F0');

      // Stage pill
      slide.addShape(pres.ShapeType.roundRect, {
        x: 10.7, y: y + 0.18, w: 1.5, h: 0.55, r: 0.1,
        fill: { color: s.bg },
        line: { color: s.col, width: 1.5 }
      });
      slide.addText(s.num, {
        x: 10.7, y: y + 0.25, w: 1.5, h: 0.4,
        fontSize: 12, bold: true, color: s.col, align: 'center', rtl: true, fontFace: 'Arial'
      });

      // Stage Title & Subtitle
      slide.addText(s.title, {
        x: 1.2, y: y + 0.12, w: 9.3, h: 0.35,
        fontSize: 14, bold: true, color: NAVY, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(s.sub, {
        x: 1.2, y: y + 0.48, w: 9.3, h: 0.38,
        fontSize: 10.5, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 2);
  }

  // ========================================================
  // SLIDE 3: Stage 1 - Patient Profile & Demographics
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: קבלת המטופל – תיאור המטופל ורקע משפחתי', 'קבלת המטופל', 'שלב 1');

    // Right Column: Demographics & Story Card
    addCard(slide, 5.2, 1.4, 7.3, 5.35, 'FFFFFF', 'BAE6FD');

    slide.addText('פרופיל אישי ומשפחתי – יעקב', {
      x: 5.5, y: 1.6, w: 6.7, h: 0.4,
      fontSize: 16, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const patientDetails = [
      '•  שם וגיל: יעקב, בן 67 (יליד 1959)',
      '•  מצב משפחתי: נשוי + 8 ילדים, אב וסב למשפחה ברוכת ילדים',
      '•  תעסוקה ואורח חיים: עובד בישיבה, סדר יום לחוץ, נסיעות וטיסות תכופות לחו"ל',
      '•  היסטוריית סוכרת: מאובחנת משנת 2011 (כ-15 שנות מחלה מתועדות)',
      '•  סיפור משפחתי: היסטוריה משפחתית מובהקת של סוכרת בקרב קרובי משפחה',
      '•  רקע וסקולרי וקרדיווסקולרי: אירוע מוחי CVA (2023) עם שארית קושי בדיבור ואי יציבות, מחלת לב איסכמית IHD לאחר צנתור (חסימות 40%-50%)',
      '•  תסמונת דום נשימה בשינה (Severe Sleep Apnea): מאובחנת משנת 2024',
      '•  כבד שומני (Fatty Liver): מאובחן משנת 1994 (למעלה מ-30 שנה)'
    ];

    slide.addText(patientDetails.join('\n\n'), {
      x: 5.5, y: 2.15, w: 6.7, h: 4.4,
      fontSize: 11.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Column: Patient Image & Clinical Quick Stats
    addCard(slide, 0.8, 1.4, 4.1, 5.35, 'FFFFFF', 'E2E8F0');

    const patientImgPath = path.resolve(__dirname, 'public/yaakov_first_visit.png');
    if (fs.existsSync(patientImgPath)) {
      slide.addImage({
        path: patientImgPath,
        x: 1.0, y: 1.6, w: 3.7, h: 3.2
      });
    }

    // Mini Highlight Box
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0, y: 4.95, w: 3.7, h: 1.6, r: 0.1,
      fill: { color: 'FEF3C7' },
      line: { color: 'FDE68A', width: 1 }
    });

    slide.addText('נתוני פתיחה קריטיים:', {
      x: 1.1, y: 5.05, w: 3.5, h: 0.3,
      fontSize: 11, bold: true, color: AMBER, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addText('• A1C בסיס: 13.4% (לא מאוזן באופן קיצוני)\n• משקל בסיס: 96 ק"ג | גובה: 163 ס"מ\n• BMI התחלתי: 36.1 (השמנה דרגה 2)\n• נוגדני GAD חיוביים (2.8 U/mL) משנת 2010', {
      x: 1.1, y: 5.35, w: 3.5, h: 1.1,
      fontSize: 10, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 3);
  }

  // ========================================================
  // SLIDE 4: Stage 1 - Past Medical History
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: מחלות רקע של המטופל (Past Medical History)', 'קבלת המטופל', 'שלב 1');

    // Right Box: 12 Medical conditions table
    addCard(slide, 5.0, 1.4, 7.5, 5.35, 'FFFFFF', 'FECACA');

    slide.addText('רשימת מחלות רקע ואבחנות מתועדות בתיק הרפואי', {
      x: 5.2, y: 1.55, w: 7.1, h: 0.35,
      fontSize: 14, bold: true, color: RED, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const conditions = [
      { name: 'HYPERLIPIDEMIA UNSPECIFIED (יתר שומנים בדם)', yr: '1992' },
      { name: 'FATTY LIVER (כבד שומני)', yr: '1994' },
      { name: 'DIABETES MELLITUS NON-INSULIN DEPENDENT', yr: '2004 (2011)' },
      { name: 'DISCITIS LUMBAR REGION (L5-L3-S1)', yr: '2004' },
      { name: 'OBESITY (BMI 36.1, משקל 96 ק"ג)', yr: '2012' },
      { name: 'RIGHT HEART CARDIAC CATHETERIZATION (צנתור LAD 50%, RCA 40%)', yr: '2019' },
      { name: 'ISCHEMIC HEART DISEASE (IHD - מחלת לב כלילית)', yr: '2019' },
      { name: 'CORONARY ATHEROSCLEROSIS (טרשת עורקים כלילית)', yr: '2019' },
      { name: 'HYPERURICEMIA (עודף חומצת שתן בדם)', yr: '2019' },
      { name: 'CEREBROVASCULAR ACCIDENT - CVA (אירוע מוחי)', yr: '2023' },
      { name: 'SLEEP APNEA SEVERE (דום נשימה בשינה חמור)', yr: '2024' },
      { name: 'PAST SMOKER (עישן בעבר, הפסיק ב-2012)', yr: '1977-2012' }
    ];

    conditions.forEach((c, idx) => {
      const cy = 2.0 + idx * 0.38;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.2, y: cy, w: 7.1, h: 0.34, r: 0.05,
        fill: { color: idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
        line: { color: 'E2E8F0', width: 0.5 }
      });
      slide.addText(c.name, {
        x: 6.7, y: cy + 0.02, w: 5.5, h: 0.3,
        fontSize: 9.5, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(c.yr, {
        x: 5.3, y: cy + 0.02, w: 1.3, h: 0.3,
        fontSize: 9, bold: true, color: BLUE, align: 'center', fontFace: 'Arial'
      });
    });

    // Left Box: Document Image & Clinical Insight
    addCard(slide, 0.8, 1.4, 3.9, 5.35, 'FFFFFF', 'E2E8F0');

    const medDocImg = path.resolve(__dirname, 'public/labs/medical_conditions.jpg');
    if (fs.existsSync(medDocImg)) {
      slide.addImage({
        path: medDocImg,
        x: 1.0, y: 1.6, w: 3.5, h: 3.3
      });
    }

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0, y: 5.05, w: 3.5, h: 1.5, r: 0.1,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 }
    });

    slide.addText('משמעות קלינית:', {
      x: 1.1, y: 5.15, w: 3.3, h: 0.3,
      fontSize: 11, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });
    slide.addText('ריבוי תחלואה טרשתית (CVA, IHD, צנתור), השמנה משמעותית וכבד שומני מעמידים את המטופל בסיכון קרדיווסקולרי ומוחי גבוה במיוחד ומחייבים הגנה וסקולרית ממוקדת.', {
      x: 1.1, y: 5.45, w: 3.3, h: 1.0,
      fontSize: 9.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 4);
  }

  // ========================================================
  // SLIDE 5: Stage 1 - Physical Exam & Vital Signs
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: בדיקה גופנית ומדדי סימנים חיוניים', 'קבלת המטופל', 'שלב 1');

    const vitals = [
      { t: 'לחץ דם', val: '158/72 mmHg', sub: 'יל"ד סיסטולי מוגבר', bg: 'FEF2F2', bc: 'FECACA', c: 'DC2626' },
      { t: 'דופק', val: '80 פעימות/דקה', sub: 'קצב לב סדיר', bg: 'EFF6FF', bc: 'BFDBFE', c: '0284C7' },
      { t: 'משקל וגובה', val: '96 ק"ג | 163 ס"מ', sub: 'משקל התחלתי בקבלה', bg: 'FFF7ED', bc: 'FED7AA', c: 'EA580C' },
      { t: 'מדד מסת גוף BMI', val: '36.1 kg/m²', sub: 'השמנה דרגה 2 (מותניים: 98 ס"מ)', bg: 'FEF3C7', bc: 'FDE68A', c: 'D97706' },
      { t: 'הרגל עישון', val: 'מעשן בעבר', sub: 'עישן 1977-2012 (הפסיק)', bg: 'F0FDF4', bc: 'BBF7D0', c: '16A34A' },
      { t: 'קרקעית העין', val: 'NODR', sub: 'ללא רטינופתיה סוכרתית נראית', bg: 'FAF5FF', bc: 'E9D5FF', c: '7E22CE' }
    ];

    vitals.forEach((v, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const vx = 0.8 + col * 3.95;
      const vy = 1.45 + row * 1.9;

      addCard(slide, vx, vy, 3.8, 1.75, v.bg, v.bc);
      slide.addText(v.t, {
        x: vx + 0.2, y: vy + 0.2, w: 3.4, h: 0.3,
        fontSize: 12, bold: true, color: v.c, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(v.val, {
        x: vx + 0.2, y: vy + 0.55, w: 3.4, h: 0.55,
        fontSize: 20, bold: true, color: NAVY, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(v.sub, {
        x: vx + 0.2, y: vy + 1.15, w: 3.4, h: 0.4,
        fontSize: 10.5, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    // Foot exam bottom full-width alert card
    addCard(slide, 0.8, 5.4, 11.7, 1.35, 'FFFFFF', 'BAE6FD');
    slide.addShape(pres.ShapeType.rect, {
      x: 12.35, y: 5.4, w: 0.15, h: 1.35,
      fill: { color: BLUE }
    });

    slide.addText('ממצאי בדיקת כפות רגליים והיקפיות:', {
      x: 1.0, y: 5.5, w: 11.2, h: 0.35,
      fontSize: 13, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addText('דופק טיבאלי חלש ברגל ימין עם נוכחות של כיב פעיל המטופל באופן קבוע במרפאת פצע.\nהמטופל מביע חרדה עמוקה מהכיב ומספר על שכנו שעבר כריתת רגל בעקבות סיבוך דומה.', {
      x: 1.0, y: 5.88, w: 11.2, h: 0.75,
      fontSize: 11.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 5);
  }

  // ========================================================
  // SLIDE 6: Stage 1 - Baseline Labs
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: בדיקות מעבדה בסיסיות (Baseline Laboratory)', 'קבלת המטופל', 'שלב 1');

    // Right Column: Labs Grid
    const labs = [
      { name: 'HbA1C בסיס', val: '13.4%', note: 'לא מאוזן באופן קריטי (דצמבר 2025)', c: 'DC2626', bg: 'FEF2F2' },
      { name: 'גלוקוז בצום', val: '220 mg/dL', note: 'היפרגליקמיה חמורה בצום (H)', c: 'EA580C', bg: 'FFF7ED' },
      { name: 'כולסטרול LDL', val: '121 mg/dL', note: 'רחוק מיעד <55 mg/dL למטופל לאחר CVA', c: 'D97706', bg: 'FEF3C7' },
      { name: 'יחס ACR בשתן', val: '180 mg/g', note: 'מיקרואלבומינוריה / פגיעה כלייתית התחלתית', c: '7E22CE', bg: 'FAF5FF' },
      { name: 'תפקוד כליות eGFR', val: '75 mL/min', note: 'תפקוד כלייתי שמור יחסית (דרגה G2)', c: '0D9488', bg: 'F0FDFA' },
      { name: 'נוגדני GAD', val: '2.8 U/mL', note: 'חיובי (משנת 2010) - עדות למרכיב אוטואימוני', c: '0284C7', bg: 'EFF6FF' }
    ];

    addCard(slide, 4.8, 1.4, 7.7, 5.35, 'FFFFFF', 'E2E8F0');

    labs.forEach((l, idx) => {
      const ly = 1.6 + idx * 0.82;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.0, y: ly, w: 7.3, h: 0.72, r: 0.08,
        fill: { color: l.bg },
        line: { color: 'CBD5E1', width: 0.8 }
      });
      slide.addText(l.name, {
        x: 9.8, y: ly + 0.15, w: 2.4, h: 0.38,
        fontSize: 12, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(l.val, {
        x: 8.2, y: ly + 0.12, w: 1.5, h: 0.45,
        fontSize: 16, bold: true, color: l.c, align: 'center', fontFace: 'Arial'
      });
      slide.addText(l.note, {
        x: 5.1, y: ly + 0.15, w: 3.0, h: 0.38,
        fontSize: 9.5, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    // Left Column: Original Lab Doc Image
    addCard(slide, 0.8, 1.4, 3.8, 5.35, 'FFFFFF', 'BAE6FD');

    const labDocImg = path.resolve(__dirname, 'public/labs/biochemistry_labs.png');
    if (fs.existsSync(labDocImg)) {
      slide.addImage({
        path: labDocImg,
        x: 0.95, y: 1.55, w: 3.5, h: 3.5
      });
    }

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.95, y: 5.2, w: 3.5, h: 1.4, r: 0.1,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 }
    });
    slide.addText('אבחנה אנדוקרינולוגית מרכזית:', {
      x: 1.05, y: 5.28, w: 3.3, h: 0.3,
      fontSize: 10.5, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });
    slide.addText('נוגדני GAD חיוביים (2.8 U/mL משנת 2010) וסוכרת משנת 2011 מאשרים מרכיב אוטואימוני של סוכרת סוג 1, אך ההשמנה (BMI 36.1) יוצרת תנגודת קשה ומחייבת מינוני אינסולין עצומים.', {
      x: 1.05, y: 5.58, w: 3.3, h: 0.95,
      fontSize: 9.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 6);
  }

  // ========================================================
  // SLIDE 7: Stage 1 - HbA1C History Over Time
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: היסטוריית מדד HbA1C לאורך השנים', 'קבלת המטופל', 'שלב 1');

    // Right Box: History Timeline
    addCard(slide, 5.0, 1.4, 7.5, 5.35, 'FFFFFF', 'E2E8F0');

    slide.addText('מעקב ערכי HbA1C מתועד בשנים 2023-2026', {
      x: 5.2, y: 1.6, w: 7.1, h: 0.35,
      fontSize: 15, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const a1cHist = [
      { date: '10/2023', val: '12.3%', state: 'חוסר איזון קיצוני', col: 'DC2626' },
      { date: '06/2024', val: '12.1%', state: 'היפרגליקמיה מתמשכת', col: 'DC2626' },
      { date: '04/2025', val: '13.2%', state: 'החמרה הדרגתית', col: 'DC2626' },
      { date: '12/2025 (בסיס)', val: '13.4%', state: 'ערך שיא - טרם התחלת Wegovy', col: 'DC2626' },
      { date: '03/2026 (מעקב)', val: '5.0%', state: 'תחת Wegovy 2.4mg והתאמת אינסולין!', col: '059669' },
      { date: '05/2026 (מעקב)', val: '5.7%', state: 'המשך שמירה על איזון מושלם ויציב', col: '059669' }
    ];

    a1cHist.forEach((h, idx) => {
      const hy = 2.15 + idx * 0.72;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.2, y: hy, w: 7.1, h: 0.62, r: 0.08,
        fill: { color: idx >= 4 ? 'ECFDF5' : 'FEF2F2' },
        line: { color: idx >= 4 ? 'A7F3D0' : 'FECACA', width: 1 }
      });
      slide.addText(h.date, {
        x: 10.3, y: hy + 0.12, w: 1.9, h: 0.38,
        fontSize: 12, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(h.val, {
        x: 8.7, y: hy + 0.1, w: 1.5, h: 0.42,
        fontSize: 16, bold: true, color: h.col, align: 'center', fontFace: 'Arial'
      });
      slide.addText(h.state, {
        x: 5.3, y: hy + 0.12, w: 3.3, h: 0.38,
        fontSize: 10, bold: true, color: h.col, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    // Left Box: A1C History Doc Image
    addCard(slide, 0.8, 1.4, 4.0, 5.35, 'FFFFFF', 'E2E8F0');

    const a1cDocImg = path.resolve(__dirname, 'public/labs/hba1c_history.jpg');
    if (fs.existsSync(a1cDocImg)) {
      slide.addImage({
        path: a1cDocImg,
        x: 1.0, y: 1.6, w: 3.6, h: 3.4
      });
    }

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0, y: 5.15, w: 3.6, h: 1.45, r: 0.1,
      fill: { color: 'F0FDF4' },
      line: { color: 'BBF7D0', width: 1 }
    });
    slide.addText('מהפך גליקמי תחת Wegovy:', {
      x: 1.1, y: 5.25, w: 3.4, h: 0.3,
      fontSize: 11, bold: true, color: GREEN, align: 'right', rtl: true, fontFace: 'Arial'
    });
    slide.addText('שנים של HbA1C מעל 12%-13% נפתרו בעקבות השילוב של Wegovy 2.4mg והפחתת התנגודת לאינסולין, עם צניחה ל-5.0%-5.7% ללא אירועי היפוגליקמיה חמורים!', {
      x: 1.1, y: 5.55, w: 3.4, h: 0.95,
      fontSize: 9.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 7);
  }

  // ========================================================
  // SLIDE 8: Stage 1 - Baseline Medications
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: טיפול תרופתי נוכחי בביקור הראשון', 'קבלת המטופל', 'שלב 1');

    const meds = [
      { name: 'INS TREGLUDEC 100U/1ML (טרגלודק)', dose: '40 יחידות פעם ביום', role: 'אינסולין בזאלי (ארוך טווח)', col: '0284C7', bg: 'EFF6FF' },
      { name: 'SEMAGLUTIDE 1MG (אוזמפיק)', dose: '1 מ"ג פעם בשבוע', role: 'GLP-1 RA (נוטל לעיתים רחוקות עקב חששות מטיסות)', col: '7E22CE', bg: 'FAF5FF' },
      { name: 'JARDIANCE DUO 12.5MG/850MG', dose: '1 טבליה X 2 ביום', role: 'איזון גלוקוז משולב (Empagliflozin + Metformin)', col: '0D9488', bg: 'F0FDFA' },
      { name: 'ATORVASTATIN TAB 80MG', dose: '1 טבליה ביום', role: 'הורדת שומנים בדם וכולסטרול LDL', col: 'D97706', bg: 'FEF3C7' },
      { name: 'CARTIA TAB 100MG (אספירין)', dose: '1 טבליה ביום', role: 'מניעה שניונית של אירועים קרדיווסקולריים ומוחיים (CVA)', col: 'DC2626', bg: 'FEF2F2' },
      { name: 'OMEPRADEX 20MG CAP', dose: '1 קפסולה ביום', role: 'הגנה על רירית הקיבה', col: '64748B', bg: 'F8FAFC' },
      { name: 'BETMIGA PR 25MG TAB', dose: '1 טבליה ביום', role: 'טיפול בשלפוחית השתן', col: '64748B', bg: 'F8FAFC' },
      { name: 'OMNIC CAP 0.4MG', dose: '2 כמוסות ביום', role: 'טיפול במערכת השתן', col: '64748B', bg: 'F8FAFC' },
      { name: 'SERTRALINE 100MG TAB', dose: '1 טבליה ביום', role: 'איזון נפשי ורגשי', col: '64748B', bg: 'F8FAFC' }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    meds.forEach((m, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const mx = 0.95 + (1 - col) * 5.85; // RTL column ordering
      const my = 1.55 + row * 1.0;

      slide.addShape(pres.ShapeType.roundRect, {
        x: mx, y: my, w: 5.65, h: 0.9, r: 0.08,
        fill: { color: m.bg },
        line: { color: 'CBD5E1', width: 0.8 }
      });

      slide.addText(m.name, {
        x: mx + 0.15, y: my + 0.1, w: 5.35, h: 0.3,
        fontSize: 11, bold: true, color: m.col, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(m.role, {
        x: mx + 2.0, y: my + 0.45, w: 3.5, h: 0.35,
        fontSize: 9.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(m.dose, {
        x: mx + 0.1, y: my + 0.45, w: 1.8, h: 0.35,
        fontSize: 9.5, bold: true, color: m.col, align: 'left', fontFace: 'Arial'
      });
    });

    addFooter(slide, 8);
  }

  // ========================================================
  // SLIDE 9: Stage 1 - Obesity Complications Diagram
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: תזכורת – סיבוכי מחלת ההשמנה (Obesity Complications)', 'קבלת המטופל', 'שלב 1');

    // Right Box: Clinical Insights
    addCard(slide, 5.2, 1.4, 7.3, 5.35, 'FFFFFF', 'FCE7F3');

    slide.addText('ההשמנה כמחלה כרונית רב-מערכתית', {
      x: 5.4, y: 1.6, w: 6.9, h: 0.35,
      fontSize: 15, bold: true, color: 'DB2777', align: 'right', rtl: true, fontFace: 'Arial'
    });

    const obesityBullets = [
      '•  מחלת ההשמנה הינה מחלה כרונית פרוגרסיבית המשפיעה על כל מערכות הגוף ומהווה גורם שורש ישיר למחלות נלוות קשות.',
      '•  סיבוכים מטבוליים:',
      '   - תנגודת קשה לאינסולין, סוכרת סוג 2 והחמרה קיצונית בסוכרת סוג 1 (Double Diabetes)',
      '   - דיסליפידמיה אגרסיבית, טרשת עורקים ומחלת לב איסכמית (IHD)',
      '   - כבד שומני (MASLD/MASH) המוביל לשחמת כבד',
      '•  סיבוכים וסקולריים ומוחיים:',
      '   - אירועים מוחיים (CVA) ומיקרו/מאקרו-וסקולופתיה',
      '   - יתר לחץ דם עורקי ועומס לבבי מוגבר',
      '•  סיבוכים מכניים ואיכות חיים:',
      '   - תסמונת דום נשימה חסימתי בשינה (OSA) הגורמת לעייפות יומיומית',
      '   - עומס על מערכת השלד, כאבי גב כרוניים ופגיעה באספקת דם לכפות הרגליים המובילה לכיבים כרוניים',
      '•  מסקנה טיפולית: טיפול ממוקד בהשמנה באמצעות GLP-1 RA מעניק מענה רב-מערכתי בו-זמנית!'
    ];

    slide.addText(obesityBullets.join('\n'), {
      x: 5.4, y: 2.05, w: 6.9, h: 4.5,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.2, 5.35, 'FFFFFF', 'E2E8F0');

    const obesityImg = path.resolve(__dirname, 'public/labs/obesity_complications.png');
    if (fs.existsSync(obesityImg)) {
      slide.addImage({
        path: obesityImg,
        x: 0.95, y: 1.55, w: 3.9, h: 5.05
      });
    }

    addFooter(slide, 9);
  }

  // ========================================================
  // SLIDE 10: Stage 1 - Nurse Anamnesis Q&A
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1 (חלק א\'): תחקור המטופל על ידי האחות (אנמנזה)', 'קבלת המטופל', 'שלב 1');

    const anamnesis = [
      { q: '1. איך אתה מתנהל ביום יום ומהם הרגלי התזונה שלך?', a: '"יש לי עבודה מאוד לחוצה, ואני אוכל בנשנושים ולא באופן מסודר."', tag: 'סדר יום ותזונה', c: 'D97706', bg: 'FFFBEB' },
      { q: '2. האם אתה מבצע פעילות גופנית בחיי היומיום?', a: '"אני עושה הרבה הליכות תוך כדי העבודה כי אני רץ ממקום למקום, אבל חוץ מזה אני לא עושה פעילות גופנית כלשהי."', tag: 'פעילות גופנית', c: '0284C7', bg: 'EFF6FF' },
      { q: '3. איך השינה שלך בלילה?', a: '"אני לא ישן הרבה, אולי 4 או 5 שעות בלילה, ואני ישן גרוע."', tag: 'איכות ומשך השינה', c: '7E22CE', bg: 'FAF5FF' },
      { q: '4. מה הכי מטריד אותך כרגע מבחינה בריאותית?', a: '"אני מאוד מפחד מהפצע שיש לי ברגל, כי יש לי שכן שכרתו לו את הרגל ואני מאוד מפחד מזה."', tag: 'חששות וגורמים מטרידים', c: 'DC2626', bg: 'FEF2F2' },
      { q: '5. האם אתה מקפיד לקחת את הטיפול התרופתי הקבוע שלך?', a: '"אני לוקח את האוזמפיק רק לפעמים כי אני חושש שזה יכול לפגוע לי בעיניים, וגם אני חושש לקחת את זה כי אני מרבה לטוס ולעבור בין מדינות וחושש מתופעות לוואי."', tag: 'היענות לתרופות', c: '059669', bg: 'ECFDF5' }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    anamnesis.forEach((item, idx) => {
      const ay = 1.55 + idx * 1.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0, y: ay, w: 11.3, h: 0.9, r: 0.08,
        fill: { color: item.bg },
        line: { color: 'CBD5E1', width: 0.8 }
      });

      // Question line
      slide.addText(`שאלת האחות: ${item.q}`, {
        x: 3.5, y: ay + 0.08, w: 8.6, h: 0.35,
        fontSize: 11, bold: true, color: item.c, align: 'right', rtl: true, fontFace: 'Arial'
      });

      // Tag badge
      slide.addText(item.tag, {
        x: 1.2, y: ay + 0.08, w: 2.2, h: 0.32,
        fontSize: 9.5, bold: true, color: item.c, align: 'left', fontFace: 'Arial'
      });

      // Patient answer line
      slide.addText(`תשובת יעקב: ${item.a}`, {
        x: 1.2, y: ay + 0.45, w: 10.9, h: 0.38,
        fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 10);
  }

  // ========================================================
  // SLIDE 11: Stage 1 - Therapeutic Communication Styles
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1 (חלק ב\'): שיח טיפולי ותקשורת מקרבת לבניית אמון', 'קבלת המטופל', 'שלב 1');

    const responses = [
      {
        num: 'תגובה 1 (מומלצת)',
        title: 'תגובה אמפתית, מנרמלת ומגייסת',
        statement: '"יעקב, אני מבינה אותך לגמרי. זה הכי טבעי בעולם שתפחד מהפצע ברגל, בטח אחרי מה שקרה לשכן שלך. העומס בעבודה והשינה המועטה לא מוסיפים... דע שאתה לא לבד בזה, יש פה צוות שלם לצידך. נשמור על הרגל שלך ביחד ונאזן את הסוכר צעד אחר צעד."',
        reaction: 'נושם לרווחה, מחייך: "תודה רבה, החשש משתק אותי, אני מוכן לעשות מה שצריך כדי להתאזן."',
        feedback: '✅ לגיטימציה לחרדה והצעת שותפות בגובה העיניים מפיגות מתח ומביאות להיענות מקסימלית.',
        c: '10B981', bg: 'F0FDF4', bc: 'A7F3D0'
      },
      {
        num: 'תגובה 2 (שיפוטית)',
        title: 'תגובה מאיימת ומעוררת אשמה',
        statement: '"יעקב, אתה חייב להבין שעם HbA1C של 13.4% ונשנושים אתה מסכן את עצמך. אם לא תיקח את עצמך בידיים, הפצע ברגל ידרדר ותגיע למצבים קשים כמו השכן."',
        reaction: 'מתכווץ בכיסא בחוסר אונים: "אני יודע שאני לא בסדר... הדיבורים האלה רק עושים לי יותר חרדה..."',
        feedback: '❌ הטחת אשמה מגבירה חרדה וגורמת להסתגרות והימנעות מטיפול.',
        c: 'EF4444', bg: 'FEF2F2', bc: 'FECACA'
      },
      {
        num: 'תגובה 3 (טכנית)',
        title: 'תגובה פרוטוקולית ללא אמפתיה',
        statement: '"טוב יעקב, אין מה להיכנס ללחץ. לגבי הפצע נחליף חבישה, נתאים תרופות חדשות ונשלח לבדיקות."',
        reaction: 'מהנהן בקרירות: "בסדר, מה שתגידי... רק מקווה שלא יהיו תופעות לוואי."',
        feedback: '⚠️ התעלמות מהמצוקה הרגשית מונעת בניית אמון טיפולי עמוק.',
        c: 'F59E0B', bg: 'FFFBEB', bc: 'FDE68A'
      },
      {
        num: 'תגובה 4 (מבטלת)',
        title: 'ביטול חששות שטחי ("אל תדאג")',
        statement: '"אל תחשוב על דברים רעים כמו כריתות, תהיה אופטימי! יהיה בסדר, רק קח את התרופות."',
        reaction: 'מניע ראשו באי-נוחות: "קל לומר תהיה אופטימי, אבל הפצע עדיין מפחיד אותי..."',
        feedback: '❌ עידוד שטחי מבטל את הרגש של המטופל וגורם לתחושה שלא מקשיבים לו.',
        c: '64748B', bg: 'F8FAFC', bc: 'E2E8F0'
      }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    responses.forEach((r, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const rx = 0.95 + (1 - col) * 5.85; // RTL
      const ry = 1.55 + row * 2.5;

      addCard(slide, rx, ry, 5.7, 2.38, r.bg, r.bc);

      slide.addText(`${r.num} - ${r.title}`, {
        x: rx + 0.15, y: ry + 0.1, w: 5.4, h: 0.3,
        fontSize: 11, bold: true, color: r.c, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(r.statement, {
        x: rx + 0.15, y: ry + 0.42, w: 5.4, h: 0.85,
        fontSize: 9.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(`תגובת יעקב: ${r.reaction}`, {
        x: rx + 0.15, y: ry + 1.3, w: 5.4, h: 0.48,
        fontSize: 9, bold: true, color: r.c, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(r.feedback, {
        x: rx + 0.15, y: ry + 1.82, w: 5.4, h: 0.48,
        fontSize: 8.5, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 11);
  }

  // ========================================================
  // SLIDE 12: Stage 1 - Clinical Questions & Dilemmas
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 1: דילמות קליניות ושאלות אבחון (Double Diabetes)', 'קבלת המטופל', 'שלב 1');

    // Question 1 Card
    addCard(slide, 0.8, 1.4, 11.7, 2.55, 'FFFFFF', 'BAE6FD');
    slide.addText('שאלה קלינית 1: איזה סוג סוכרת לדעתך יש למטופל?', {
      x: 1.0, y: 1.55, w: 11.3, h: 0.35,
      fontSize: 13, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const q1Opts = [
      'א. סוכרת סוג 1 (תשובה חלקית בלבד: אמנם יש נוגדני GAD חיוביים ומרכיב אוטואימוני, אך מתעלמת מתנגודת קשה והשמנה)',
      'ב. סוכרת סוג 2 (לא מדויק: נוגדני GAD חיוביים מאשרים מרכיב אוטואימוני מובהק של T1D)',
      'ג. סוכרת משולבת (Double Diabetes - סוכרת סוג 1 + סוכרת סוג 2 / תנגודת קשה) - ✅ תשובה נכונה ומדויקת!'
    ];
    slide.addText(q1Opts.join('\n'), {
      x: 1.0, y: 1.95, w: 11.3, h: 1.0,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0, y: 3.0, w: 11.3, h: 0.8, r: 0.08,
      fill: { color: 'F0FDF4' },
      line: { color: 'A7F3D0', width: 1 }
    });
    slide.addText('נימוק קליני: Double Diabetes מתרחשת כאשר למטופל עם T1D אוטואימוני יש גם השמנה משמעותית (BMI 36.1) הגורמת לתנגודת קשה ביותר לאינסולין ולצורך במינונים קיצוניים.', {
      x: 1.1, y: 3.08, w: 11.1, h: 0.65,
      fontSize: 10, color: '15803D', bold: true, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Question 2 Card
    addCard(slide, 0.8, 4.15, 11.7, 2.65, 'FFFFFF', 'E9D5FF');
    slide.addText('שאלה קלינית 2: כיצד תסביר את הצורך במינוני עתק ומה הערך המוסף של GLP-1 RA?', {
      x: 1.0, y: 4.3, w: 11.3, h: 0.35,
      fontSize: 13, bold: true, color: PURPLE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addText('הסבר מקיף: השילוב של סוכרת סוג 1 (נוגדני GAD חיוביים) יחד עם השמנה דרגה 2 (BMI 36.1) יוצר מעגל קסמים של תנגודת היקפית והזרקת מינוני אינסולין ענקיים (200 יחידות ליום!).\n\nערכו הייחודי של טיפול ב-GLP-1 RA במקרה זה:\n1. שבירת התנגודת לאינסולין והורדת משקל דרמטית.\n2. קיצוץ חד במינוני האינסולין (הפחתת 70% בבולוס).\n3. הענקת הגנה קרדיווסקולרית ומוחית חיונית למניעת אירוע מוחי או לבבי חוזר במטופל לאחר CVA ו-IHD.', {
      x: 1.0, y: 4.7, w: 11.3, h: 1.95,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 12);
  }

  // ========================================================
  // SLIDE 13: Stage 2 - Treatment Decision: Short-Acting Insulin
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: ביקור ראשון (חלק ב\') – החלטה על אינסולין קצר טווח', 'ביקור ראשון (חלק ב\')', 'שלב 2');

    // Right Box: Decision & Rationale
    addCard(slide, 5.2, 1.4, 7.3, 5.35, 'FFFFFF', 'A7F3D0');

    slide.addText('ההחלטה הטיפולית בביקור הראשון (ינואר 2026)', {
      x: 5.4, y: 1.6, w: 6.9, h: 0.35,
      fontSize: 15, bold: true, color: GREEN, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const decisionText = [
      'עקב היפרגליקמיה משמעותית לאחר האוכל ו-A1C מאוד גבוה (13.4%), הוחלט להוסיף למטופל טיפול באינסולין קצר טווח נובורפיד (Novorapid) 3 פעמים ביום לפני כל ארוחה, והוא חובר לסנסור Libre.',
      '',
      'ניתוח שלילת חלופות טיפוליות:',
      '•  DPP4: לא הוכיח יעילות במניעת מחלות טרשתיות, השפעתו על משקל ניטרלית ויעילותו בהורדת A1C מוגבלת מאוד.',
      '•  אקטוס (Actos): מעלה סיכון לעלייה במשקל ולאגירת נוזלים, ואינו מספק מענה לעליות סוכר חדות לאחר ארוחה.',
      '•  אקרבוז (Acarbose): יעילות מוגבלת מאוד, מלווה בתופעות לוואי גסטרואינטסטינליות קשות.',
      '•  נובונורם / אמריל (סולפונילאוריאה): רמת הרזרווה הלבלבית אינה ידועה (אין בדיקת C-Peptide), רמת ה-A1C מאוד גבוהה והמטופל מרבה לנשנש ופחות לאכול ארוחות קבועות.',
      '•  משאבת אינסולין: המטופל אינו זכאי בסל לקבלת משאבה.',
      '•  אינסולין ארוך טווח בלבד: המטופל כבר מטופל בטרגלודק, אך הבעיה העיקרית היא ספייקים פוסט-פרנדיאליים (200-350 mg/dL).'
    ];

    slide.addText(decisionText.join('\n'), {
      x: 5.4, y: 2.05, w: 6.9, h: 4.5,
      fontSize: 10, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Key Highlights
    addCard(slide, 0.8, 1.4, 4.2, 5.35, 'FFFFFF', 'E0F2FE');

    slide.addText('מרכיבי ההתערבות המיידית:', {
      x: 1.0, y: 1.6, w: 3.8, h: 0.35,
      fontSize: 13, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const steps = [
      { t: 'נובורפיד לפני ארוחות', d: 'מתן מענה ספציפי לעליות הסוכר החדות לאחר האוכל והתאמה לגודל הארוחה.' },
      { t: 'חיבור לחיישן Libre', d: 'התחלת ניטור סוכר רציף לקבלת תמונה מלאה של תנודתיות הגלוקוז.' },
      { t: 'הדרכת הזרקות', d: 'רוטציה קבועה במרחק 4 אצבעות מהטבור לכיוון המותן ומניעת ליפודוסטרופיה.' },
      { t: 'הכנה ל-Wegovy', d: 'תכנון שילוב GLP-1 RA להורדת משקל ותנגודת.' }
    ];

    steps.forEach((st, idx) => {
      const sy = 2.15 + idx * 1.15;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0, y: sy, w: 3.8, h: 1.0, r: 0.08,
        fill: { color: 'FFFFFF' },
        line: { color: 'BAE6FD', width: 1 }
      });
      slide.addText(st.t, {
        x: 1.1, y: sy + 0.1, w: 3.6, h: 0.3,
        fontSize: 11, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(st.d, {
        x: 1.1, y: sy + 0.42, w: 3.6, h: 0.5,
        fontSize: 9, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 13);
  }

  // ========================================================
  // SLIDE 14: Stage 2 - Libre Download & Injection Technique
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: בדיקת מקומות הזרקה ופריקת נתוני קורא Libre (פברואר 2026)', 'ביקור ראשון (חלק ב\')', 'שלב 2');

    // Right Card: Libre Reader & Cable Download
    addCard(slide, 6.8, 1.4, 5.7, 5.35, 'FFFFFF', 'BAE6FD');

    slide.addText('פריקת נתוני קורא Libre (פברואר 2026)', {
      x: 7.0, y: 1.6, w: 5.3, h: 0.35,
      fontSize: 14, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    slide.addText('חיבור קורא ה-Libre הכחול בכבל USB צהוב למחשב המרפאה לפריקת נתוני הסוכר הרציפים.', {
      x: 7.0, y: 2.05, w: 5.3, h: 0.6,
      fontSize: 11, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const agpImg = path.resolve(__dirname, 'public/labs/AGP_before_wegovy.png');
    if (fs.existsSync(agpImg)) {
      slide.addImage({
        path: agpImg,
        x: 7.0, y: 2.75, w: 5.3, h: 3.8
      });
    }

    // Left Card: Injection Site Examination
    addCard(slide, 0.8, 1.4, 5.7, 5.35, 'FFFFFF', 'FED7AA');

    slide.addText('בדיקת מקומות הזרקת אינסולין וטכניקה', {
      x: 1.0, y: 1.6, w: 5.3, h: 0.35,
      fontSize: 14, bold: true, color: AMBER, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const injectionDetails = [
      '•  בדיקה פיזיקלית של אזורי הזרקה: נצפה גוש ליפודוסטרופיה באזור הבטן עקב הזרקות חוזרות באותו מיקום.',
      '•  הערכת טכניקה ואחסון: המטופל מזריק נכון במקומות הנכונים ומאחסן נכון את האינסולין במקרר/טמפ\' חדר.',
      '•  ליקוי שנמצא: המטופל לא הקפיד להחליף מחט בכל הזרקה ועשה שימוש חוזר במחטים.',
      '•  הדרכה קלינית שניתנה:',
      '   - החלפת מחט חדשה וסטרילית בכל הזרקה ללא יוצא מן הכלל.',
      '   - רוטציה קבועה במרחק 4 אצבעות מהטבור לכיוון המותן למניעת החמרת הליפודוסטרופיה.',
      '   - הסבר כי הזרקה לתוך רקמה מצולקת/שומנית משבשת קשות את ספיגת האינסולין וגורמת לתנודות גלוקוז בלתי צפויות.'
    ];

    slide.addText(injectionDetails.join('\n\n'), {
      x: 1.0, y: 2.15, w: 5.3, h: 4.3,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 14);
  }

  // ========================================================
  // SLIDE 15: Stage 2 - Clinical Reflection Questions
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: שאלות לחשיבה קלינית וקבלת החלטות', 'ביקור ראשון (חלק ב\')', 'שלב 2');

    const reflections = [
      {
        q: '1. האם המטופל עומד ביעד האיזון שלו?',
        a: 'לא! מדד ה-A1C עומד על 8.6% (בדוח פברואר) וסוכר ממוצע 220 mg/dL, עם זמן בטווח היעד (TIR) של 30% בלבד. המטופל רחוק מאוד מיעדי האיזון המקובלים (TIR > 70%, A1C < 7%).',
        c: 'DC2626', bg: 'FEF2F2', bc: 'FECACA'
      },
      {
        q: '2. האם הטיפול שהמטופל מקבל מספיק אופטימלי למצב שלו?',
        a: 'לא! מתן מינוני אינסולין גבוהים אינו מספק מענה לתנגודת לאינסולין, אינו מוריד משקל ואינו מספק הגנה כנגד סיבוכים טרשתיים ואירועי לב/מוח חוזרים.',
        c: 'EA580C', bg: 'FFF7ED', bc: 'FED7AA'
      },
      {
        q: '3. איזה שינויים אפשר ונדרש לבצע? ולמה?',
        a: 'הוספת טיפול ב-GLP-1 RA (Wegovy):\n• הורדת משקל משמעותית והפחתת תיאבון.\n• הענקת הגנה קרדיווסקולרית ומוחית חיונית למניעת אירועים טרשתיים במטופל לאחר CVA ו-IHD.\n• שיפור ישיר בתנגודת לאינסולין המאפשר צמצום ניכר במינוני האינסולין.\n• שיפור בתסמונת דום נשימה בשינה (OSA) וסיוע להחלמת כיב כף הרגל.',
        c: '0284C7', bg: 'EFF6FF', bc: 'BAE6FD'
      }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    reflections.forEach((r, idx) => {
      const ry = 1.55 + idx * 1.68;
      addCard(slide, 1.0, ry, 11.3, 1.55, r.bg, r.bc);

      slide.addText(r.q, {
        x: 1.2, y: ry + 0.12, w: 10.9, h: 0.35,
        fontSize: 12.5, bold: true, color: r.c, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(r.a, {
        x: 1.2, y: ry + 0.48, w: 10.9, h: 0.98,
        fontSize: 10, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 15);
  }

  // ========================================================
  // SLIDE 16: Stage 2 - Studies: STEP Weight Loss
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: ראיות מחקריות – יעילות מוכחת בירידה במשקל (תוכנית STEP)', 'מחקרים וראיות', 'שלב 2');

    // Right Box: Research Findings
    addCard(slide, 5.5, 1.4, 7.0, 5.35, 'FFFFFF', 'BAE6FD');

    slide.addText('תוצאות מחקרי STEP עבור Wegovy (Semaglutide 2.4mg)', {
      x: 5.7, y: 1.6, w: 6.6, h: 0.35,
      fontSize: 14, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const stepPoints = [
      '•  ירידה דרמטית במשקל (STEP 1): טיפול ב-Wegovy 2.4mg הוביל לירידה ממוצעת מרשימה של 16.9% ממשקל הגוף כעבור 68 שבועות (לעומת 2.4% בלבד בפלצבו).',
      '•  שמירה על המשקל לאורך זמן (STEP 5): מעקב ארוך טווח של שנתיים (104 שבועות) הוכיח שמירה יציבה ומתמשכת על הירידה במשקל עם ירידה ממוצעת של 16.7%.',
      '•  עליונות מובהקת בהשוואה ללירגלוטייד (STEP 8): במחקר Head-to-Head ישיר, סמגלוטייד 2.4 מ"ג הראתה יעילות כפולה ויותר עם ירידה של 17.1% לעומת 6.6% בלבד בסקסנדה (לירגלוטייד 3.0 מ"ג).',
      '•  שילוב עם התערבות התנהגותית (STEP 3): בשילוב טיפול התנהגותי אינטנסיבי (IBT) הושגה ירידה ממוצעת של 17.6% במשקל.',
      '•  משמעות עבור יעקב: ירידה במשקל מורידה דרמטית את התנגודת לאינסולין, מפחיתה עומס על כף הרגל ומשפרת את תסמונת דום הנשימה בשינה!'
    ];

    slide.addText(stepPoints.join('\n\n'), {
      x: 5.7, y: 2.1, w: 6.6, h: 4.4,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.5, 5.35, 'FFFFFF', 'E2E8F0');

    const stepImg = path.resolve(__dirname, 'public/labs/step_trials_weight_loss.png');
    if (fs.existsSync(stepImg)) {
      slide.addImage({
        path: stepImg,
        x: 0.95, y: 1.55, w: 4.2, h: 5.05
      });
    }

    addFooter(slide, 16);
  }

  // ========================================================
  // SLIDE 17: Stage 2 - Studies: Tolerability & Nausea
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: ראיות מחקריות – פרופיל סבילות ובטיחות (תופעות לוואי/בחילות)', 'מחקרים וראיות', 'שלב 2');

    // Right Box: Text Findings
    addCard(slide, 5.5, 1.4, 7.0, 5.35, 'FFFFFF', 'E2E8F0');

    slide.addText('פרופיל סבילות ובטיחות – ניהול תופעת הבחילה', {
      x: 5.7, y: 1.6, w: 6.6, h: 0.35,
      fontSize: 14, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const nauseaPoints = [
      '•  דרגת חומרה קלה עד בינונית (Mild / Moderate): בחילות המופיעות תחת Wegovy הן ברובן המכריע קלות עד בינוניות בלבד וחולפות מעצמן.',
      '•  משך זמן חציוני קצר ביותר: משך הזמן החציוני (Median Duration) של תופעת הבחילה עומד על 8.0 ימים בלבד!',
      '•  שיא זמני בתקופת הטיטרציה (Dose Escalation): שכיחות הבחילות עולה זמנית בשבועות 0–16 במהלך העלייה ההדרגתית במינון, ויורדת בהתמדה עד להתייצבות מלאה.',
      '•  שיעור אפסי של תופעות חמורות (Severe): תופעות לוואי של בחילה בדרגה חמורה נדירות ביותר (הקו הוורוד בתחתית התיעוד שואף לאפס).',
      '•  הדרכה למטופל (מענה לחששותיו של יעקב): אכילת כמויות קטנות, שתייה מרובה והסבר שהתופעה חולפת במהירות, מפיגים את החשש מנסיעות ומחזקים התמדה.'
    ];

    slide.addText(nauseaPoints.join('\n\n'), {
      x: 5.7, y: 2.1, w: 6.6, h: 4.4,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.5, 5.35, 'FFFFFF', 'E2E8F0');

    const nauseaImg = path.resolve(__dirname, 'public/labs/wegovy_side_effects_nausea.jpg');
    if (fs.existsSync(nauseaImg)) {
      slide.addImage({
        path: nauseaImg,
        x: 0.95, y: 1.55, w: 4.2, h: 5.05
      });
    }

    addFooter(slide, 17);
  }

  // ========================================================
  // SLIDE 18: Stage 2 - Studies: Cardiovascular SELECT Trial
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: ראיות מחקריות – הגנה קרדיווסקולרית ומוחית (מחקר SELECT)', 'מחקרים וראיות', 'שלב 2');

    // Right Box: SELECT Findings
    addCard(slide, 5.5, 1.4, 7.0, 5.35, 'FFFFFF', 'FECACA');

    slide.addText('מחקר ה-SELECT ההיסטורי: ירידה מובהקת של 20% ב-MACE', {
      x: 5.7, y: 1.6, w: 6.6, h: 0.35,
      fontSize: 14, bold: true, color: RED, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const selectPoints = [
      '•  הפחתה מובהקת של 20% בסיכון ל-MACE: מחקר ה-SELECT הוכיח כי Wegovy 2.4mg מביא לירידה יחסית של 20% באירועים קרדיווסקולריים מיוחלים (HR 0.80, 95% CI: 0.72-0.90, p<0.001).',
      '•  הגנה מקיפה על 3 המדדים המרכזיים (3-Point MACE):',
      '   - מוות מסיבות קרדיווסקולריות (Cardiovascular Death)',
      '   - אוטם שריר הלב לא קטלני (Non-fatal Myocardial Infarction)',
      '   - אירוע מוחי לא קטלני (Non-fatal Stroke / CVA)',
      '•  הנחיות הקרדיולוגיה האירופיות (ESC 2024): בעקבות ה-SELECT, הוכנסה Wegovy 2.4mg להנחיות הרשמיות לניהול תסמונת כלילית כרונית.',
      '•  חשיבות מכרעת עבור יעקב: במטופל בן 67 לאחר CVA (2023) ועם IHD (חסימות 50%), Wegovy מעניקה הגנה מוחית ולבבית קריטית למניעת אירוע חוזר!'
    ];

    slide.addText(selectPoints.join('\n\n'), {
      x: 5.7, y: 2.1, w: 6.6, h: 4.4,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.5, 5.35, 'FFFFFF', 'E2E8F0');

    const selectImg = path.resolve(__dirname, 'public/labs/semaglutide_select_mace_cardio.png');
    if (fs.existsSync(selectImg)) {
      slide.addImage({
        path: selectImg,
        x: 0.95, y: 1.55, w: 4.2, h: 5.05
      });
    }

    addFooter(slide, 18);
  }

  // ========================================================
  // SLIDE 19: Stage 2 - Eligibility & SHABAN Subsidies
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: קריטריוני זכאות וסבסוד שב"ן (כולל כבד שומני ודום נשימה)', 'מחקרים וראיות', 'שלב 2');

    // Right Box: Criteria Details
    addCard(slide, 5.5, 1.4, 7.0, 5.35, 'FFFFFF', 'BAE6FD');

    slide.addText('זכאות וסבסוד קופות החולים (שב"ן) ל-Wegovy 2.4mg', {
      x: 5.7, y: 1.6, w: 6.6, h: 0.35,
      fontSize: 14, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const shabanPoints = [
      '•  סבסוד נרחב בכל קופות החולים: Wegovy זמינה בכל קופות החולים (כללית מושלם/פלטינום, מכבי שלי/זהב, מאוחדת שיא, לאומית זהב) ב-50% הנחה (338-562 ₪ בלבד בהתאם למינון).',
      '•  קריטריון 1: BMI מעל 30 (BMI > 30 kg/m²) – זכאות מלאה למטופלים הסובלים מהשמנה.',
      '•  קריטריון 2: 27 ≤ BMI < 30 עם גורם סיכון/סיבוך נלווה: כבד שומני, טרום סוכרת, סוכרת סוג 2, יתר לחץ דם, דיסליפידמיה, דום נשימה בשינה (OSA) או מחלה קרדיווסקולרית.',
      '•  הכללת כבד שומני (MASLD) כקריטריון מזכה רשמי!',
      '•  התאמת יעקב לקריטריונים: יעקב עומד בקריטריונים בהצטיינות – BMI בסיס 36.1, וסובל מכבד שומני, CVA, IHD ודום נשימה בשינה!'
    ];

    slide.addText(shabanPoints.join('\n\n'), {
      x: 5.7, y: 2.1, w: 6.6, h: 4.4,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.5, 5.35, 'FFFFFF', 'E2E8F0');

    const shabanImg = path.resolve(__dirname, 'public/labs/wegovy_eligibility_shaban.png');
    if (fs.existsSync(shabanImg)) {
      slide.addImage({
        path: shabanImg,
        x: 0.95, y: 1.55, w: 4.2, h: 5.05
      });
    }

    addFooter(slide, 19);
  }

  // ========================================================
  // SLIDE 20: Stage 2 - Treatment Plan & Lifestyle Updates
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 2: עדכון תוכנית טיפול והנחיות אורח חיים מקיפות', 'ביקור ראשון (חלק ב\')', 'שלב 2');

    const updates = [
      {
        t: 'התחלת טיפול ב-Wegovy (Semaglutide)',
        sub: 'מעבר מאוזמפיק 1 מ"ג ל-Wegovy בטיטרציה מדורגת',
        d: 'הסבר למטופל על פרוטוקול טיטרציה חודשי: 0.25 -> 0.5 -> 1.0 -> 1.7 -> 2.4 מ"ג.\nמתן מענה לחששות מנסיעות, הדרכה להזרקה תת-עורית פעם בשבוע ואחסון נכון.',
        c: '7E22CE', bg: 'FAF5FF', bc: 'E9D5FF'
      },
      {
        t: 'פעילות גופנית מותאמת אישית',
        sub: 'שילוב אירובי ואנאירובי לשיפור רגישות לאינסולין',
        d: 'הדרכה להליכות יומיות מבוקרות (התחשבות בכיב ברגל ובנעליים מתאימות), יחד עם תרגילי חיזוק שריר קלים בישיבה/עמידה לשיפור קליטת גלוקוז שרירית.',
        c: '10B981', bg: 'F0FDF4', bc: 'A7F3D0'
      },
      {
        t: 'ייעוץ ותמיכה תזונתית מתמשכת',
        sub: 'מעקב קבוע אצל דיאטנית קלינית',
        d: 'הפניה מסודרת לדיאטנית מומחית סוכרת להתאמת תפריט מבוקר פחמימות, מניעת נשנושים סביב שעות העבודה בישיבה ואכילת ארוחות מסודרות.',
        c: 'D97706', bg: 'FFFBEB', bc: 'FDE68A'
      }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    updates.forEach((u, idx) => {
      const uy = 1.6 + idx * 1.65;
      addCard(slide, 1.0, uy, 11.3, 1.5, u.bg, u.bc);

      slide.addText(u.t, {
        x: 1.2, y: uy + 0.12, w: 10.9, h: 0.35,
        fontSize: 13, bold: true, color: u.c, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(u.sub, {
        x: 1.2, y: uy + 0.45, w: 10.9, h: 0.3,
        fontSize: 10.5, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(u.d, {
        x: 1.2, y: uy + 0.78, w: 10.9, h: 0.65,
        fontSize: 10, color: MUTED_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 20);
  }

  // ========================================================
  // SLIDE 21: Stage 3 - Titration Scale & Insulin Adjustments
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 3: מעקב תחת Wegovy 2.4mg והתאמת מינונים', 'מעקב וטיטרציה', 'שלב 3');

    // Wegovy Titration Steps Display
    addCard(slide, 0.8, 1.4, 11.7, 2.3, 'FFFFFF', 'E9D5FF');

    slide.addText('מד סולם מינוני Wegovy (Semaglutide) – תהליך טיטרציה מדורג והגעה למינון היעד', {
      x: 1.0, y: 1.55, w: 11.3, h: 0.35,
      fontSize: 13, bold: true, color: PURPLE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const doses = [
      { dose: '0.25 mg', lbl: 'מינון התחלתי', sub: 'הסתגלות' },
      { dose: '0.5 mg', lbl: 'שלב 2', sub: 'העלאה חודש 2' },
      { dose: '1.0 mg', lbl: 'שלב 3', sub: 'מעבר מאוזמפיק' },
      { dose: '1.7 mg', lbl: 'שלב 4', sub: 'שלב ביניים' },
      { dose: '2.4 mg', lbl: 'מינון יעד נוכחי', sub: 'מינון מלא פעיל!' }
    ];

    doses.forEach((d, idx) => {
      const dx = 1.0 + idx * 2.3;
      const isTarget = idx === 4;

      slide.addShape(pres.ShapeType.roundRect, {
        x: dx, y: 2.05, w: 2.15, h: 1.45, r: 0.12,
        fill: { color: isTarget ? '7E22CE' : 'F3E8FF' },
        line: { color: isTarget ? '581C87' : 'D8B4FE', width: 1.5 }
      });

      slide.addText(d.lbl, {
        x: dx + 0.1, y: 2.15, w: 1.95, h: 0.28,
        fontSize: 9.5, bold: true, color: isTarget ? WHITE : PURPLE, align: 'center', rtl: true, fontFace: 'Arial'
      });

      slide.addText(d.dose, {
        x: dx + 0.1, y: 2.45, w: 1.95, h: 0.5,
        fontSize: 18, bold: true, color: isTarget ? WHITE : NAVY, align: 'center', fontFace: 'Arial'
      });

      slide.addText(d.sub, {
        x: dx + 0.1, y: 3.0, w: 1.95, h: 0.35,
        fontSize: 9, color: isTarget ? 'E9D5FF' : MUTED_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
      });
    });

    // Insulin Titration Card
    addCard(slide, 0.8, 3.85, 11.7, 2.9, 'FFFFFF', 'BAE6FD');

    slide.addText('התאמות מינוני אינסולין במקביל לירידה במשקל ובתנגודת:', {
      x: 1.0, y: 4.0, w: 11.3, h: 0.35,
      fontSize: 13, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const insulinPoints = [
      '•  אינסולין קצר טווח (נובורפיד בולוס): קוצץ מ-35-40u לארוחה (~120u ליום) ל-8-12u לארוחה (~25-35u ליום) – ירידה דרמטית של כ-70% בצריכת הבולוס!',
      '•  אינסולין בזאלי (טרגלודק Degludec): הותאם והופחת בהדרגה מ-66 יחידות ל-36 יחידות פעם ביום.',
      '•  פרוטוקול בטיחות למניעת היפוגליקמיה:',
      '   במידה וערכי הסוכר בצום בבוקר יורדים מתחת ל-90 mg/dL – להוריד מיד 2 יחידות מהאינסולין הבזאלי (Degludec).',
      '•  חשיבות קלינית עליונה: במטופל סוכרת סוג 1 חובה לשמור תמיד על אינסולין בזאלי מספק למניעת קטואצידוזיס (DKA), למרות הירידה המרשימה בתנגודת!'
    ];

    slide.addText(insulinPoints.join('\n\n'), {
      x: 1.0, y: 4.45, w: 11.3, h: 2.15,
      fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 21);
  }

  // ========================================================
  // SLIDE 22: Stage 3 - Clinical Achievements (Cards)
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 3: הישגים קליניים במעקב ספטמבר 2026', 'מעקב וטיטרציה', 'שלב 3');

    const metrics = [
      {
        t: 'איזון גליקמי HbA1C',
        val: '5.0%',
        sub: 'צניחה מ-13.4% בבסיס!',
        d: 'ירידה מוחלטת של 8.4% ב-A1C ללא אירועי היפוגליקמיה חמורים.',
        c: 'E11D48', bg: 'FFF1F2', bc: 'FECDD3'
      },
      {
        t: 'ירידה במשקל וב-BMI',
        val: '-11 ק"ג',
        sub: 'משקל: 85 ק"ג (מ-96 ק"ג)',
        d: 'BMI ירד מ-36.1 ל-32.0, הפחתת היקף מותניים והקלה בעומס על הרגליים.',
        c: '059669', bg: 'ECFDF5', bc: 'A7F3D0'
      },
      {
        t: 'אינסולין בולוס (נובורפיד)',
        val: '8u לארוחה',
        sub: 'קוצץ מ-12u לארוחה',
        d: 'הפחתה של כ-70% בעומס האינסולין האקסוגני תודות לשיפור ברגישות.',
        c: '0284C7', bg: 'EFF6FF', bc: 'BAE6FD'
      },
      {
        t: 'אינסולין בזאלי (טרגלודק)',
        val: '36 יחידות',
        sub: 'מינון יציב ובטוח',
        d: 'התאמה מבוקרת עם פרוטוקול צום <90 mg/dL לשמירה מלאה מפני DKA.',
        c: '7E22CE', bg: 'FAF5FF', bc: 'E9D5FF'
      }
    ];

    metrics.forEach((m, idx) => {
      const mx = 0.8 + idx * 2.95;
      addCard(slide, mx, 1.45, 2.8, 4.0, m.bg, m.bc);

      slide.addText(m.t, {
        x: mx + 0.15, y: 1.65, w: 2.5, h: 0.35,
        fontSize: 11.5, bold: true, color: m.c, align: 'center', rtl: true, fontFace: 'Arial'
      });

      slide.addText(m.val, {
        x: mx + 0.15, y: 2.1, w: 2.5, h: 0.7,
        fontSize: 26, bold: true, color: m.c, align: 'center', fontFace: 'Arial'
      });

      slide.addText(m.sub, {
        x: mx + 0.15, y: 2.9, w: 2.5, h: 0.35,
        fontSize: 10, bold: true, color: DARK_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
      });

      slide.addText(m.d, {
        x: mx + 0.15, y: 3.35, w: 2.5, h: 1.9,
        fontSize: 9.5, color: MUTED_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
      });
    });

    // Bottom Alert Box
    addCard(slide, 0.8, 5.65, 11.7, 1.15, 'FFFFFF', 'FDE68A');
    slide.addText('שאלת בטיחות קלינית: מהו הכלל הקליני החשוב ביותר בעת טיטרציית GLP-1 ב-T1D?', {
      x: 1.0, y: 5.75, w: 11.3, h: 0.3,
      fontSize: 11, bold: true, color: AMBER, align: 'right', rtl: true, fontFace: 'Arial'
    });
    slide.addText('ב-T1D חובה לנטר ברציפות, להפחית בולוס בהתאם לתזונה ולתנגודת, אך לשמור על כיסוי בזאלי מספק למניעת DKA קטואצידוזיס!', {
      x: 1.0, y: 6.05, w: 11.3, h: 0.65,
      fontSize: 10, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 22);
  }

  // ========================================================
  // SLIDE 23: Stage 4 - AGP & Continuous Glucose Monitoring
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 4: ניתוח מדדי חיישן FreeStyle Libre 2 ו-AGP תחת Wegovy 2.4mg', 'ניטור רציף AGP', 'שלב 4');

    // Right Box: Metrics & AGP interpretation
    addCard(slide, 5.2, 1.4, 7.3, 5.35, 'FFFFFF', 'A7F3D0');

    slide.addText('תוצאות דוח ה-AGP המעודכן (24/8/2026 - 6/9/2026)', {
      x: 5.4, y: 1.6, w: 6.9, h: 0.35,
      fontSize: 14, bold: true, color: GREEN, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const agpStats = [
      { t: 'זמן בטווח היעד (TIR 70-180 mg/dL)', v: '79%', n: 'עבר בהצלחה רבה את היעד הבינלאומי (>70%)!' },
      { t: 'רמת גלוקוז ממוצעת', v: '116 mg/dL', n: 'ירדה מ-220 mg/dL בדוח הקודם!' },
      { t: 'מדד ניהול גלוקוז משוער (GMI)', v: '6.1%', n: 'תואם A1C של כ-6.1% (43 mmol/mol)' },
      { t: 'ערכים מעל הטווח (>180 mg/dL)', v: '8%', n: 'ירדו מ-70% ל-8% בלבד (0% מעל 250!)' },
      { t: 'שונות גלוקוז (%CV)', v: '37.3%', n: 'קרובה מאוד ליעד היציבות (≤36%)' },
      { t: 'אירועי היפוגליקמיה (<70 mg/dL)', v: '13%', n: 'אירועים קלים (54-69), 0% אירועים חמורים (<54)' }
    ];

    agpStats.forEach((s, idx) => {
      const sy = 2.05 + idx * 0.72;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.4, y: sy, w: 6.9, h: 0.65, r: 0.08,
        fill: { color: idx === 0 ? 'ECFDF5' : 'F8FAFC' },
        line: { color: idx === 0 ? 'A7F3D0' : 'E2E8F0', width: 1 }
      });
      slide.addText(s.t, {
        x: 7.7, y: sy + 0.12, w: 4.4, h: 0.4,
        fontSize: 10.5, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
      slide.addText(s.v, {
        x: 6.6, y: sy + 0.1, w: 1.1, h: 0.45,
        fontSize: 15, bold: true, color: idx === 0 ? GREEN : BLUE, align: 'center', fontFace: 'Arial'
      });
      slide.addText(s.n, {
        x: 5.5, y: sy + 0.12, w: 1.1, h: 0.4,
        fontSize: 8.5, color: MUTED_TEXT, align: 'center', fontFace: 'Arial'
      });
    });

    // Left Box: Image
    addCard(slide, 0.8, 1.4, 4.2, 5.35, 'FFFFFF', 'E2E8F0');

    const agpAfterImg = path.resolve(__dirname, 'public/labs/AGP_after_wegovy.png');
    if (fs.existsSync(agpAfterImg)) {
      slide.addImage({
        path: agpAfterImg,
        x: 0.95, y: 1.55, w: 3.9, h: 5.05
      });
    }

    addFooter(slide, 23);
  }

  // ========================================================
  // SLIDE 24: Stage 4 - Head-to-Head AGP Comparison
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 4: השוואת מדדי החיישן – לפני וויגובי לעומת תחת Wegovy 2.4mg', 'ניטור רציף AGP', 'שלב 4');

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    // Table Header
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0, y: 1.6, w: 11.3, h: 0.6, r: 0.08,
      fill: { color: 'F1F5F9' },
      line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('מדד קליני ב-AGP', { x: 7.8, y: 1.72, w: 4.3, h: 0.35, fontSize: 12, bold: true, color: NAVY, align: 'right', rtl: true, fontFace: 'Arial' });
    slide.addText('לפני וויגובי (פברואר 2026)', { x: 4.5, y: 1.72, w: 3.2, h: 0.35, fontSize: 11.5, bold: true, color: RED, align: 'center', rtl: true, fontFace: 'Arial' });
    slide.addText('תחת Wegovy 2.4mg (ספטמבר 2026)', { x: 1.2, y: 1.72, w: 3.2, h: 0.35, fontSize: 11.5, bold: true, color: GREEN, align: 'center', rtl: true, fontFace: 'Arial' });

    const compRows = [
      { m: 'זמן בטווח היעד (TIR 70-180 mg/dL)', b: '30% בלבד', a: '79% (עבר את היעד!)', imp: true },
      { m: 'רמת גלוקוז ממוצעת', b: '220 mg/dL', a: '116 mg/dL (נחתך בחצי!)', imp: true },
      { m: 'מדד ניהול גלוקוז משוער (GMI)', b: '8.6%', a: '6.1%', imp: true },
      { m: 'ערכים מעל הטווח (>180 mg/dL)', b: '70% (מתוכם 27% מעל 250!)', a: '8% בלבד (0% מעל 250!)', imp: true },
      { m: 'שונות גלוקוז (%CV)', b: '32.1%', a: '37.3%', imp: false },
      { m: 'משקל המטופל ו-BMI', b: '96 ק"ג (BMI 36.1)', a: '85 ק"ג (BMI 32.0)', imp: true },
      { m: 'מינון אינסולין בולוס (נובורפיד)', b: '~120u ליום (35-40u לארוחה)', a: '~25-35u ליום (8-12u לארוחה)', imp: true }
    ];

    compRows.forEach((r, idx) => {
      const ry = 2.3 + idx * 0.58;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0, y: ry, w: 11.3, h: 0.52, r: 0.05,
        fill: { color: idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
        line: { color: 'E2E8F0', width: 0.5 }
      });
      slide.addText(r.m, { x: 7.8, y: ry + 0.1, w: 4.3, h: 0.32, fontSize: 10.5, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial' });
      slide.addText(r.b, { x: 4.5, y: ry + 0.1, w: 3.2, h: 0.32, fontSize: 10.5, bold: true, color: RED, align: 'center', rtl: true, fontFace: 'Arial' });
      slide.addText(r.a, { x: 1.2, y: ry + 0.1, w: 3.2, h: 0.32, fontSize: 10.5, bold: true, color: GREEN, align: 'center', rtl: true, fontFace: 'Arial' });
    });

    addFooter(slide, 24);
  }

  // ========================================================
  // SLIDE 25: Stage 5 - Clinical Case Summary
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 5: סיכום קליני של המקרה', 'סיכום מקרה', 'שלב 5');

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'BAE6FD');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.2, y: 1.65, w: 10.9, h: 2.1, r: 0.12,
      fill: { color: 'F0F9FF' },
      line: { color: 'BAE6FD', width: 1.5 }
    });

    slide.addText('סיכום המקרה המרפאי:', {
      x: 1.4, y: 1.8, w: 10.5, h: 0.35,
      fontSize: 14, bold: true, color: BLUE, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const summaryVerbatim = 'המטופל סבל מהשמנה וריבוי של סיבוכי השמנה וסוכרת, ביניהם כבד שומני, דום נשימה בשינה, ומחלות טרשתיות כמו CVA ו-IHD. בעקבות התחלת הטיפול בהשמנה באמצעות וויגובי (Wegovy), המטופל ירד במשקל, מדווח על שינה טובה יותר, הסוכרת התאזנה משמעותית תוך הורדה במינוני האינסולין, נרשם שיפור בפצע שהתפתח בכף הרגל, והסיכון למחלות טרשתיות הופחת באופן משמעותי.';

    slide.addText(summaryVerbatim, {
      x: 1.4, y: 2.2, w: 10.5, h: 1.4,
      fontSize: 12, bold: true, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Key Stat Bubbles
    const stats = [
      { t: 'זמן בטווח היעד (TIR)', v: '79%', s: 'זינוק מ-30% ל-79%!', c: '10B981', bg: 'DCFCE7' },
      { t: 'אינדיקטור גליקמי (GMI)', v: '6.1%', s: 'סוכר ממוצע 116 mg/dL', c: '0284C7', bg: 'E0F2FE' },
      { t: 'ירידה במשקל המטופל', v: '85 ק"ג', s: 'הפחתה של 11 ק"ג', c: '0D9488', bg: 'CCFBF1' },
      { t: 'אינסולין בזאלי מותאם', v: '36u', s: 'טרגלודק ליום', c: '7E22CE', bg: 'F3E8FF' }
    ];

    stats.forEach((st, idx) => {
      const sx = 1.2 + idx * 2.75;
      slide.addShape(pres.ShapeType.roundRect, {
        x: sx, y: 4.0, w: 2.6, h: 2.45, r: 0.1,
        fill: { color: st.bg },
        line: { color: 'FFFFFF', width: 2 }
      });
      slide.addText(st.t, { x: sx + 0.1, y: 4.15, w: 2.4, h: 0.35, fontSize: 10, bold: true, color: st.c, align: 'center', rtl: true, fontFace: 'Arial' });
      slide.addText(st.v, { x: sx + 0.1, y: 4.55, w: 2.4, h: 0.7, fontSize: 24, bold: true, color: st.c, align: 'center', fontFace: 'Arial' });
      slide.addText(st.s, { x: sx + 0.1, y: 5.35, w: 2.4, h: 0.5, fontSize: 9.5, color: DARK_TEXT, align: 'center', rtl: true, fontFace: 'Arial' });
    });

    addFooter(slide, 25);
  }

  // ========================================================
  // SLIDE 26: Stage 5 - Guiding Clinical Principles
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 5: ארבעת העקרונות המנחים לפרקטיקה הרפואית', 'עקרונות לפרקטיקה', 'שלב 5');

    const takeaways = [
      {
        t: '1. מעקב אורח חיים ותזונה',
        d: 'המטופל נמצא במעקב רציף של דיאטנית קלינית ומבצע, גם אם בצורה מוגבלת, פעילות גופנית סדירה המותאמת למצבו הבריאותי.',
        c: 'D97706', bg: 'FFFBEB', bc: 'FDE68A'
      },
      {
        t: '2. הפחתת תנגודת לאינסולין והורדת משקל',
        d: 'הטיפול ב-GLP-1 RA (Wegovy 2.4mg) הביא לירידה במשקל מ-96 ק"ג ל-85 ק"ג ולהפחתה דרמטית במינון האינסולין הבולוס (מ-12u ל-8u לארוחה) והאינסולין הבזאלי (ל-36u).',
        c: '7E22CE', bg: 'FAF5FF', bc: 'E9D5FF'
      },
      {
        t: '3. הגנה קרדיווסקולרית ומוחית והטבה בסיבוכים',
        d: 'שיפור משמעותי באיכות השינה (דום נשימה בשינה), הטבה בהחלמת הפצע בכף הרגל והפחתת הסיכון למחלות טרשתיות במטופל לאחר CVA ו-IHD.',
        c: '0284C7', bg: 'EFF6FF', bc: 'BAE6FD'
      },
      {
        t: '4. איזון גליקמי מוכח ב-CGM',
        d: 'חיישן Libre 2 מדגים זינוק מרהיב מ-30% ל-79% בטווח היעד (TIR) וירידה בסוכר הממוצע מ-220 ל-116 mg/dL עם GMI של 6.1%.',
        c: '059669', bg: 'ECFDF5', bc: 'A7F3D0'
      }
    ];

    addCard(slide, 0.8, 1.4, 11.7, 5.35, 'FFFFFF', 'E2E8F0');

    takeaways.forEach((tk, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const tx = 0.95 + (1 - col) * 5.85; // RTL
      const ty = 1.6 + row * 2.45;

      addCard(slide, tx, ty, 5.65, 2.3, tk.bg, tk.bc);

      slide.addText(tk.t, {
        x: tx + 0.2, y: ty + 0.15, w: 5.25, h: 0.35,
        fontSize: 13, bold: true, color: tk.c, align: 'right', rtl: true, fontFace: 'Arial'
      });

      slide.addText(tk.d, {
        x: tx + 0.2, y: ty + 0.55, w: 5.25, h: 1.6,
        fontSize: 10.5, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
      });
    });

    addFooter(slide, 26);
  }

  // ========================================================
  // SLIDE 27: Stage 5 - Follow-up Plan & Conclusion
  // ========================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: GRAY_BG };
    addHeader(slide, 'שלב 5: תוכנית המשך מעקב וסגירה', 'סיכום ומעקב', 'שלב 5');

    // Right Card: Follow-up recommendations for Yaakov
    addCard(slide, 5.2, 1.4, 7.3, 5.35, 'FFFFFF', 'A7F3D0');

    slide.addText('הנחיות המשך מעקב קליני עבור יעקב:', {
      x: 5.4, y: 1.6, w: 6.9, h: 0.35,
      fontSize: 14, bold: true, color: GREEN, align: 'right', rtl: true, fontFace: 'Arial'
    });

    const followUpPlan = [
      '•  מינונים תרופתיים מעודכנים:',
      '   - המשך מינון אחזקתי של Wegovy 2.4 mg אחת לשבוע.',
      '   - המשך אינסולין בזאלי Degludec (טרגלודק) 36 יחידות ליום.',
      '   - אינסולין נובורפיד 8 יחידות לפני כל ארוחה לפי מעקב ערכים.',
      '•  מעקב מרפאת פצע: המשך ביקורים שבועיים במרפאת פצע להשלמת סגירת הכיב ברגל ימין.',
      '•  ניטור רציף ב-Libre 2: המשך סריקה יומיומית, מעקב אחר התראות היפוגליקמיה ליליות ושמירה על TIR > 70%.',
      '•  תזונה ופעילות גופנית: מפגש חודשי עם דיאטנית קלינית ושמירה על שגרת הליכות מותאמת.',
      '•  בדיקות מעבדה תקופתיות: בדיקת HbA1C, ליפידים ותפקודי כליה (eGFR, ACR) בעוד 3 חודשים.'
    ];

    slide.addText(followUpPlan.join('\n\n'), {
      x: 5.4, y: 2.05, w: 6.9, h: 4.5,
      fontSize: 10, color: DARK_TEXT, align: 'right', rtl: true, fontFace: 'Arial'
    });

    // Left Card: Final Branding & Certificate
    addCard(slide, 0.8, 1.4, 4.2, 5.35, 'FFFFFF', 'BAE6FD');

    if (hasLogo) {
      slide.addImage({
        path: logoPath,
        x: 1.6, y: 1.7, w: 2.6, h: 1.3
      });
    }

    slide.addText('TIFERET ELIAV • Diabetes & AI', {
      x: 1.0, y: 3.15, w: 3.8, h: 0.35,
      fontSize: 12, bold: true, color: INDIGO, align: 'center', fontFace: 'Arial'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 3.65, w: 3.6, h: 2.85, r: 0.1,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 }
    });

    slide.addText('סיום הלומדה והמצגת בהצלחה!', {
      x: 1.2, y: 3.8, w: 3.4, h: 0.35,
      fontSize: 12, bold: true, color: BLUE, align: 'center', rtl: true, fontFace: 'Arial'
    });

    slide.addText('המקרה של יעקב ממחיש את המהפך הטיפולי שמאפשר טיפול מבוסס GLP-1 RA (Wegovy 2.4mg) במטופלי סוכרת והשמנה מורכבים – שיפור דרמטי באיזון הסוכרת, ירידה במשקל, הפחתת עומס אינסולין והגנה טרשתית מצילת חיים.', {
      x: 1.2, y: 4.25, w: 3.4, h: 2.1,
      fontSize: 9.5, color: DARK_TEXT, align: 'center', rtl: true, fontFace: 'Arial'
    });

    addFooter(slide, 27);
  }

  // Write presentation to file
  const outputPath = path.resolve(__dirname, 'GLP1_Presentation_Tiferet_Eliav.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log('Complete 27-slide presentation generated successfully at:', outputPath);
}

buildFullPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
