const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>מצגת: סימולציית טיפול ב-GLP1 בסוכרת והשמנה | TIFERET ELIAV</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      background: #090d16;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      user-select: none;
    }
    header {
      background: rgba(15, 23, 42, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      color: white;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand img {
      height: 38px;
      border-radius: 8px;
      border: 1px solid #c7d2fe;
    }
    .btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn:hover { background: rgba(255, 255, 255, 0.2); }
    .btn-primary {
      background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
      border: none;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }
    .btn-purple {
      background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%);
      border: none;
      box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3);
    }
    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
    }
    .slide-wrapper {
      width: 100%;
      max-width: 1200px;
      aspect-ratio: 16 / 9;
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .slide {
      display: none;
      height: 100%;
      flex-direction: column;
      background: #f8fafc;
    }
    .slide.active {
      display: flex;
    }
    .slide-header {
      padding: 16px 28px;
      border-bottom: 1px solid #e2e8f0;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 4px solid #0284c7;
    }
    .slide-body {
      flex: 1;
      padding: 20px 30px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .slide-footer {
      margin-top: auto;
      padding: 10px 28px;
      border-top: 1px solid #f1f5f9;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      color: #64748b;
    }
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: none;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      font-size: 1.6rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 20;
      backdrop-filter: blur(6px);
      transition: all 0.2s ease;
    }
    .nav-arrow:hover { background: rgba(255, 255, 255, 0.3); }
    .nav-arrow.prev { right: 20px; }
    .nav-arrow.next { left: 20px; }
    footer.bottom-bar {
      background: #0f172a;
      padding: 12px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 14px 18px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 800;
    }

    /* Print styling for PDF export */
    @media print {
      body { background: white; }
      header, footer.bottom-bar, .nav-arrow { display: none !important; }
      main { padding: 0; }
      .slide-wrapper { max-width: 100%; aspect-ratio: auto; box-shadow: none; border-radius: 0; }
      .slide { display: flex !important; page-break-after: always; min-height: 100vh; }
    }
  </style>
</head>
<body>

  <!-- Top Toolbar -->
  <header>
    <div class="brand">
      <img src="./public/tiferet_eliav_logo.jpg" onerror="this.src='/tiferet_eliav_logo.jpg'" alt="Logo">
      <div>
        <div style="font-size: 1rem; font-weight: 800;">TIFERET ELIAV • Diabetes & AI</div>
        <div style="font-size: 0.8rem; color: #94a3b8;">סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 12px;">
      <span id="slideCounterTop" style="color: #38bdf8; font-weight: 800; font-size: 0.95rem;">שקופית 1 / 27</span>
      <a href="./public/GLP1_Presentation_Tiferet_Eliav.pptx" download class="btn btn-purple">
        📥 הורד כ-PowerPoint (.pptx)
      </a>
      <button onclick="window.print()" class="btn">
        🖨️ הדפס / שמור כ-PDF
      </button>
      <button onclick="toggleFullscreen()" class="btn">
        ⛶ מסך מלא
      </button>
    </div>
  </header>

  <!-- Slide Stage -->
  <main id="slideStage">
    <button class="nav-arrow prev" onclick="prevSlide()" title="שקופית קודמת (חץ ימינה)">❯</button>

    <div class="slide-wrapper" id="slideDeck">
      <!-- Slides will be rendered dynamically by JavaScript -->
    </div>

    <button class="nav-arrow next" onclick="nextSlide()" title="שקופית הבאה (חץ שמאלה)">❮</button>
  </main>

  <!-- Bottom Navigation -->
  <footer class="bottom-bar">
    <button onclick="prevSlide()" class="btn" style="background: white; color: #0f172a; border-radius: 20px; padding: 6px 20px;">
      הקודם ❯
    </button>
    <span id="slideCounterBottom" style="color: #cbd5e1; font-weight: 700; font-size: 0.95rem;">1 / 27</span>
    <button onclick="nextSlide()" class="btn btn-primary" style="border-radius: 20px; padding: 6px 20px;">
      ❮ הבא
    </button>
  </footer>

  <script>
    let currentSlide = 1;
    const totalSlides = 27;

    const slidesData = [
      {
        id: 1,
        title: "סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים",
        category: "שער המצגת",
        badge: "TIFERET ELIAV • Diabetes & AI",
        html: \`
          <div style="text-align: center; display: flex; flex-direction: column; justify-content: space-around; height: 100%; padding: 20px;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 14px;">
              <img src="./public/tiferet_eliav_logo.jpg" onerror="this.src='/tiferet_eliav_logo.jpg'" style="height: 65px; border-radius: 12px; border: 2px solid #c7d2fe;">
              <div style="text-align: right;">
                <div style="font-size: 1.3rem; font-weight: 900; color: #4f46e5;">TIFERET ELIAV</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #0284c7;">Diabetes & AI</div>
              </div>
            </div>
            <div>
              <h1 style="font-size: 1.95rem; font-weight: 900; color: #0f172a; margin-bottom: 12px;">סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים</h1>
              <p style="font-size: 1.1rem; color: #475569; max-width: 850px; margin: 0 auto; line-height: 1.6;">
                תיאור מקרה קליני מורכב: יעקב (בן 67) | Double Diabetes (T1D + השמנה BMI 36.1) | רקע CVA 2023 ו-IHD<br>
                ניהול טיפול מתקדם, טיטרציית Wegovy 2.4mg, התאמת מינוני אינסולין וניטור רציף ב-Libre 2
              </p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: right; max-width: 950px; margin: 0 auto; width: 100%;">
              <div class="card" style="background: #e0f2fe; border-color: #bae6fd;">
                <div style="font-weight: 800; color: #0369a1; font-size: 0.95rem; margin-bottom: 4px;">פרופיל מטופל מורכב</div>
                <div style="font-size: 0.82rem; color: #334155;">שילוב סוכרת סוג 1, השמנה (BMI 36.1), CVA, IHD, כבד שומני וכיב כף רגל.</div>
              </div>
              <div class="card" style="background: #f3e8ff; border-color: #e9d5ff;">
                <div style="font-weight: 800; color: #6b21a8; font-size: 0.95rem; margin-bottom: 4px;">טיטרציית Wegovy</div>
                <div style="font-size: 0.82rem; color: #334155;">הגעה ל-2.4mg, קיצוץ 70% באינסולין בולוס והורדת בזאלי ל-36 יחידות.</div>
              </div>
              <div class="card" style="background: #dcfce7; border-color: #a7f3d0;">
                <div style="font-weight: 800; color: #15803d; font-size: 0.95rem; margin-bottom: 4px;">הישגי Libre 2</div>
                <div style="font-size: 0.82rem; color: #334155;">זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL וירידה של 11 ק"ג!</div>
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 2,
        title: "מבנה הלומדה ומסלול הטיפול במטופל",
        category: "מפת הדרך הקלינית",
        badge: "סקירה",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 10px; max-width: 1000px; margin: 0 auto; width: 100%;">
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
              <div><strong style="color: #0f172a; font-size: 1rem;">שלב 1: קבלת המטופל והערכה ראשונית</strong><div style="font-size: 0.82rem; color: #64748b;">אנמנזה מקיפה, תקשורת מקרבת, מחלות רקע, מעבדה, בדיקה גופנית ודילמת Double Diabetes</div></div>
              <span class="badge" style="background: #e0f2fe; color: #0284c7;">שלב 1</span>
            </div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
              <div><strong style="color: #0f172a; font-size: 1rem;">שלב 2: ביקור ראשון (חלק ב')</strong><div style="font-size: 0.82rem; color: #64748b;">החלטה על אינסולין קצר טווח, פריקת Libre, בדיקת הזרקות, ראיות מחקריות (STEP, SELECT, שב"ן)</div></div>
              <span class="badge" style="background: #ccfbf1; color: #0d9488;">שלב 2</span>
            </div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
              <div><strong style="color: #0f172a; font-size: 1rem;">שלב 3: מעקב וטיטרציה תחת Wegovy 2.4mg</strong><div style="font-size: 0.82rem; color: #64748b;">סולם מינוני Wegovy, הורדת 70% באינסולין בולוס, התאמת בזאלי ומניעת היפוגליקמיה</div></div>
              <span class="badge" style="background: #f3e8ff; color: #7e22ce;">שלב 3</span>
            </div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
              <div><strong style="color: #0f172a; font-size: 1rem;">שלב 4: ניתוח מדדי חיישן סוכר Libre 2 / AGP</strong><div style="font-size: 0.82rem; color: #64748b;">זינוק ב-TIR מ-30% ל-79%, סוכר ממוצע 116 mg/dL, GMI 6.1% וניתוח פרופיל יממתי מלא</div></div>
              <span class="badge" style="background: #dcfce7; color: #10b981;">שלב 4</span>
            </div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
              <div><strong style="color: #0f172a; font-size: 1rem;">שלב 5: סיכום קליני ומסקנות מנחות</strong><div style="font-size: 0.82rem; color: #64748b;">הטבה במשקל, בשינה ובפצע כף הרגל, הפחתת סיכון טרשתי ועקרונות לפרקטיקה</div></div>
              <span class="badge" style="background: #fef3c7; color: #d97706;">שלב 5</span>
            </div>
          </div>
        \`
      },
      {
        id: 3,
        title: "שלב 1: קבלת המטופל – תיאור המטופל ורקע משפחתי",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #bae6fd; text-align: right; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-weight: 800; color: #0369a1; font-size: 1.05rem;">פרופיל אישי ומשפחתי – יעקב</div>
              <div style="font-size: 0.9rem;">• <strong>שם וגיל:</strong> יעקב, בן 67 (יליד 1959)</div>
              <div style="font-size: 0.9rem;">• <strong>מצב משפחתי:</strong> נשוי + 8 ילדים, אב וסב למשפחה ברוכת ילדים</div>
              <div style="font-size: 0.9rem;">• <strong>תעסוקה ואורח חיים:</strong> עובד בישיבה, סדר יום לחוץ, נסיעות וטיסות תכופות לחו"ל</div>
              <div style="font-size: 0.9rem;">• <strong>היסטוריית סוכרת:</strong> מאובחנת משנת 2011 (כ-15 שנות מחלה מתועדות)</div>
              <div style="background: #fef3c7; padding: 8px 12px; border-radius: 8px; color: #92400e; font-weight: 800; font-size: 0.88rem;">• <strong>סיפור משפחתי:</strong> היסטוריה משפחתית מובהקת של סוכרת</div>
              <div style="font-size: 0.85rem; color: #475569;">• <strong>רקע וסקולרי:</strong> אירוע מוחי CVA (2023) עם שארית קושי בדיבור, מחלת לב כלילית IHD לאחר צנתור.</div>
            </div>
            <div style="text-align: center; display: flex; flex-direction: column; gap: 10px; align-items: center;">
              <img src="./public/yaakov_first_visit.png" onerror="this.src='/yaakov_first_visit.png'" style="max-height: 200px; border-radius: 12px; border: 2px solid #cbd5e1;">
              <div class="card" style="background: #fffbeb; border-color: #fde68a; font-size: 0.8rem; color: #78350f; text-align: right; width: 100%;">
                <strong>נתוני פתיחה קריטיים:</strong> A1C בסיס 13.4% | משקל 96 ק"ג | BMI 36.1 | נוגדני GAD חיוביים (2.8 U/mL)!
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 4,
        title: "שלב 1: מחלות רקע של המטופל (Past Medical History)",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; align-items: center;">
            <div class="card">
              <div style="font-weight: 800; color: #dc2626; font-size: 1rem; margin-bottom: 8px;">12 מחלות רקע מתועדות:</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.78rem;">
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>היפרליפידמיה</span><b style="color: #0284c7;">1992</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>כבד שומני (Fatty Liver)</span><b style="color: #0284c7;">1994</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>סוכרת שאינה תלויה</span><b style="color: #0284c7;">2004</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>מחלת דיסק מותני</span><b style="color: #0284c7;">2004</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>השמנה (BMI 36.1)</span><b style="color: #0284c7;">2012</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>צנתור כלילי (LAD/RCA)</span><b style="color: #0284c7;">2019</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>מחלת לב איסכמית (IHD)</span><b style="color: #0284c7;">2019</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>טרשת עורקים כלילית</span><b style="color: #0284c7;">2019</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>עודף חומצת שתן</span><b style="color: #0284c7;">2019</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>אירוע מוחי CVA</span><b style="color: #0284c7;">2023</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>דום נשימה בשינה חמור</span><b style="color: #0284c7;">2024</b></div>
                <div class="card" style="padding: 6px 10px; display: flex; justify-content: space-between;"><span>מעשן בעבר (הפסיק)</span><b style="color: #0284c7;">1977-2012</b></div>
              </div>
            </div>
            <div style="text-align: center; display: flex; flex-direction: column; gap: 8px; align-items: center;">
              <img src="./public/labs/medical_conditions.jpg" onerror="this.src='/labs/medical_conditions.jpg'" style="max-height: 200px; border-radius: 12px; border: 1px solid #cbd5e1;">
              <div class="card" style="background: #eff6ff; font-size: 0.8rem; color: #1e3a8a; text-align: right;">
                <strong>משמעות:</strong> ריבוי תחלואה טרשתית (CVA, IHD), כבד שומני והשמנה מחייבים הגנה וסקולרית ממוקדת באמצעות GLP-1 RA.
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 5,
        title: "שלב 1: בדיקה גופנית ומדדי סימנים חיוניים",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div class="card" style="background: #fef2f2; border-color: #fecaca; text-align: right;"><div style="color: #dc2626; font-size: 0.8rem; font-weight: 700;">לחץ דם</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">158/72 mmHg</div><div style="font-size: 0.72rem; color: #64748b;">יל"ד סיסטולי מוגבר</div></div>
              <div class="card" style="background: #eff6ff; border-color: #bfdbfe; text-align: right;"><div style="color: #0284c7; font-size: 0.8rem; font-weight: 700;">דופק</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">80 פעימות/דקה</div><div style="font-size: 0.72rem; color: #64748b;">סדיר</div></div>
              <div class="card" style="background: #fff7ed; border-color: #fed7aa; text-align: right;"><div style="color: #ea580c; font-size: 0.8rem; font-weight: 700;">משקל וגובה</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">96 ק"ג | 163 ס"מ</div><div style="font-size: 0.72rem; color: #64748b;">בסיס בקבלה</div></div>
              <div class="card" style="background: #fef3c7; border-color: #fde68a; text-align: right;"><div style="color: #d97706; font-size: 0.8rem; font-weight: 700;">מדד מסת גוף BMI</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">36.1 kg/m²</div><div style="font-size: 0.72rem; color: #64748b;">השמנה דרגה 2 (מותן 98 ס"מ)</div></div>
              <div class="card" style="background: #f0fdf4; border-color: #bbf7d0; text-align: right;"><div style="color: #16a34a; font-size: 0.8rem; font-weight: 700;">הרגל עישון</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">מעשן בעבר</div><div style="font-size: 0.72rem; color: #64748b;">הפסיק ב-2012</div></div>
              <div class="card" style="background: #faf5ff; border-color: #e9d5ff; text-align: right;"><div style="color: #7e22ce; font-size: 0.8rem; font-weight: 700;">קרקעית העין</div><div style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">NODR</div><div style="font-size: 0.72rem; color: #64748b;">ללא רטינופתיה נראית</div></div>
            </div>
            <div class="card" style="border-right: 6px solid #0284c7; text-align: right;">
              <strong style="color: #0284c7; font-size: 0.95rem;">בדיקת כפות רגליים והיקפיות:</strong>
              <p style="font-size: 0.88rem; color: #1e293b; line-height: 1.5; margin-top: 4px;">
                דופק טיבאלי חלש ברגל ימין עם נוכחות של כיב פעיל המטופל במרפאת פצע. המטופל מביע חרדה עמוקה מאיבוד הרגל ומספר על שכנו שעבר כריתה.
              </p>
            </div>
          </div>
        \`
      },
      {
        id: 6,
        title: "שלב 1: בדיקות מעבדה בסיסיות (Baseline Laboratory)",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; align-items: center;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">HbA1C בסיס</div><div style="font-size: 1.4rem; font-weight: 900; color: #dc2626;">13.4%</div><div style="font-size: 0.72rem; color: #475569;">לא מאוזן קיצוני</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">גלוקוז בצום</div><div style="font-size: 1.4rem; font-weight: 900; color: #ea580c;">220 mg/dL</div><div style="font-size: 0.72rem; color: #475569;">היפרגליקמיה קשה</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">כולסטרול LDL</div><div style="font-size: 1.4rem; font-weight: 900; color: #d97706;">121 mg/dL</div><div style="font-size: 0.72rem; color: #475569;">מעל היעד (<55)</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">יחס ACR בשתן</div><div style="font-size: 1.4rem; font-weight: 900; color: #7e22ce;">180 mg/g</div><div style="font-size: 0.72rem; color: #475569;">מיקרואלבומינוריה</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">תפקוד כליות eGFR</div><div style="font-size: 1.4rem; font-weight: 900; color: #0d9488;">75 mL/min</div><div style="font-size: 0.72rem; color: #475569;">שמור יחסית (G2)</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.78rem;">נוגדני GAD</div><div style="font-size: 1.4rem; font-weight: 900; color: #0284c7;">2.8 U/mL</div><div style="font-size: 0.72rem; color: #475569;">חיובי (אוטואימוני)</div></div>
            </div>
            <div style="text-align: center; display: flex; flex-direction: column; gap: 8px; align-items: center;">
              <img src="./public/labs/biochemistry_labs.png" onerror="this.src='/labs/biochemistry_labs.png'" style="max-height: 200px; border-radius: 12px; border: 1px solid #cbd5e1;">
              <div class="card" style="background: #eff6ff; font-size: 0.8rem; color: #1e3a8a; text-align: right;">
                <strong>אבחנה אנדוקרינולוגית:</strong> נוגדני GAD חיוביים (2.8 U/mL) מעידים על מרכיב אוטואימוני (T1D), אך עודף המשקל הקיצוני גורם לתנגודת קשה.
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 7,
        title: "שלב 1: היסטוריית מדד HbA1C לאורך השנים",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="text-align: right; display: flex; flex-direction: column; gap: 6px;">
              <div style="font-weight: 800; color: #0284c7; font-size: 1rem; margin-bottom: 4px;">מעקב A1C בשנים 2023-2026:</div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #fef2f2; border-color: #fecaca;"><span style="font-weight: 900; color: #dc2626; font-size: 1.1rem;">12.3%</span><span style="font-size: 0.8rem; color: #475569;">10/2023 - לא מאוזן</span></div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #fef2f2; border-color: #fecaca;"><span style="font-weight: 900; color: #dc2626; font-size: 1.1rem;">12.1%</span><span style="font-size: 0.8rem; color: #475569;">06/2024 - היפרגליקמיה</span></div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #fef2f2; border-color: #fecaca;"><span style="font-weight: 900; color: #dc2626; font-size: 1.1rem;">13.2%</span><span style="font-size: 0.8rem; color: #475569;">04/2025 - החמרה</span></div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #fef2f2; border-color: #fecaca;"><span style="font-weight: 900; color: #dc2626; font-size: 1.1rem;">13.4%</span><span style="font-size: 0.8rem; color: #475569;">12/2025 - ערך שיא בבסיס</span></div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #ecfdf5; border-color: #a7f3d0;"><span style="font-weight: 900; color: #059669; font-size: 1.1rem;">5.0%</span><span style="font-size: 0.8rem; color: #059669; font-weight: 800;">03/2026 - תחת Wegovy 2.4mg!</span></div>
              <div class="card" style="display: flex; justify-content: space-between; padding: 6px 12px; background: #ecfdf5; border-color: #a7f3d0;"><span style="font-weight: 900; color: #059669; font-size: 1.1rem;">5.7%</span><span style="font-size: 0.8rem; color: #059669; font-weight: 800;">05/2026 - שמירה על איזון מלא</span></div>
            </div>
            <div style="text-align: center; display: flex; flex-direction: column; gap: 8px; align-items: center;">
              <img src="./public/labs/hba1c_history.jpg" onerror="this.src='/labs/hba1c_history.jpg'" style="max-height: 200px; border-radius: 12px; border: 1px solid #cbd5e1;">
              <div class="card" style="background: #f0fdf4; font-size: 0.8rem; color: #166534; text-align: right;">
                <strong>מהפך:</strong> צניחה היסטורית מ-13.4% ל-5.0% הודות לשבירת התנגודת לאינסולין ע"י Wegovy 2.4mg.
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 8,
        title: "שלב 1: טיפול תרופתי נוכחי בביקור הראשון",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>INS TREGLUDEC 100U</strong><div style="font-size: 0.75rem; color: #64748b;">אינסולין בזאלי פעם ביום</div></div><span class="badge" style="background: #eff6ff; color: #0284c7;">40 יחידות</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>SEMAGLUTIDE 1MG (אוזמפיק)</strong><div style="font-size: 0.75rem; color: #64748b;">GLP-1 RA (נוטל לעיתים רחוקות)</div></div><span class="badge" style="background: #faf5ff; color: #7e22ce;">1 מ"ג / שבוע</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>JARDIANCE DUO 12.5/850</strong><div style="font-size: 0.75rem; color: #64748b;">Empagliflozin + Metformin</div></div><span class="badge" style="background: #f0fdfa; color: #0d9488;">1 טבליה X 2</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>ATORVASTATIN TAB 80MG</strong><div style="font-size: 0.75rem; color: #64748b;">הורדת כולסטרול וליפידים</div></div><span class="badge" style="background: #fef3c7; color: #d97706;">1 טבליה ליום</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>CARTIA TAB 100MG (אספירין)</strong><div style="font-size: 0.75rem; color: #64748b;">מניעה שניונית CVA / IHD</div></div><span class="badge" style="background: #fef2f2; color: #dc2626;">1 טבליה ליום</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>OMEPRADEX 20MG CAP</strong><div style="font-size: 0.75rem; color: #64748b;">הגנה על רירית הקיבה</div></div><span class="badge" style="background: #f8fafc; color: #64748b;">1 קפסולה</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>BETMIGA PR 25MG TAB</strong><div style="font-size: 0.75rem; color: #64748b;">טיפול בשלפוחית השתן</div></div><span class="badge" style="background: #f8fafc; color: #64748b;">1 טבליה</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>OMNIC CAP 0.4MG</strong><div style="font-size: 0.75rem; color: #64748b;">טיפול במערכת השתן</div></div><span class="badge" style="background: #f8fafc; color: #64748b;">2 כמוסות</span></div>
            <div class="card" style="display: flex; justify-content: space-between; align-items: center;"><div><strong>SERTRALINE 100MG TAB</strong><div style="font-size: 0.75rem; color: #64748b;">איזון נפשי ורגשי</div></div><span class="badge" style="background: #f8fafc; color: #64748b;">1 טבליה</span></div>
          </div>
        \`
      },
      {
        id: 9,
        title: "שלב 1: תזכורת – סיבוכי מחלת ההשמנה (Obesity Complications)",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #fbcfe8; text-align: right;">
              <div style="font-weight: 800; color: #db2777; font-size: 1.05rem; margin-bottom: 8px;">מחלה כרונית רב-מערכתית:</div>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6;">
                <li><strong>סיבוכים מטבוליים:</strong> סוכרת סוג 2, החמרה בסוכרת סוג 1, דיסליפידמיה, כבד שומני (MASLD/MASH).</li>
                <li><strong>סיבוכים וסקולריים ומוחיים:</strong> אירועים מוחיים (CVA), מחלת לב איסכמית (IHD), טרשת עורקים.</li>
                <li><strong>סיבוכים מכניים ואיכות חיים:</strong> דום נשימה בשינה (OSA), עומס מפרקי, פגיעה באספקת דם לכפות הרגליים וכיבים כרוניים.</li>
                <li><strong>מסקנה טיפולית:</strong> טיפול בהשמנה באמצעות GLP-1 RA פותר את שורש הבעיה ולא רק את התסמין.</li>
              </ul>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/obesity_complications.png" onerror="this.src='/labs/obesity_complications.png'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 10,
        title: "שלב 1 (חלק א'): תחקור המטופל על ידי האחות (אנמנזה)",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="card"><div style="display: flex; justify-content: space-between;"><strong style="color: #d97706; font-size: 0.85rem;">שאלת האחות: "איך אתה מתנהל ביום יום ומהם הרגלי התזונה שלך?"</strong><span class="badge" style="background: #fffbe5; color: #d97706;">תזונה</span></div><div style="font-size: 0.85rem; color: #1e293b;">תשובת יעקב: <em>"יש לי עבודה מאוד לחוצה, ואני אוכל בנשנושים ולא באופן מסודר."</em></div></div>
            <div class="card"><div style="display: flex; justify-content: space-between;"><strong style="color: #0284c7; font-size: 0.85rem;">שאלת האחות: "האם אתה מבצע פעילות גופנית בחיי היומיום?"</strong><span class="badge" style="background: #f0f9ff; color: #0284c7;">פעילות</span></div><div style="font-size: 0.85rem; color: #1e293b;">תשובת יעקב: <em>"אני עושה הרבה הליכות תוך כדי העבודה כי אני רץ ממקום למקום, אבל חוץ מזה לא עושה פעילות כלשהי."</em></div></div>
            <div class="card"><div style="display: flex; justify-content: space-between;"><strong style="color: #7e22ce; font-size: 0.85rem;">שאלת האחות: "איך השינה שלך בלילה?"</strong><span class="badge" style="background: #fcf5ff; color: #7e22ce;">שינה</span></div><div style="font-size: 0.85rem; color: #1e293b;">תשובת יעקב: <em>"אני לא ישן הרבה, אולי 4 או 5 שעות בלילה, ואני ישן גרוע."</em></div></div>
            <div class="card"><div style="display: flex; justify-content: space-between;"><strong style="color: #dc2626; font-size: 0.85rem;">שאלת האחות: "מה הכי מטריד אותך כרגע מבחינה בריאותית?"</strong><span class="badge" style="background: #fef2f2; color: #dc2626;">חששות</span></div><div style="font-size: 0.85rem; color: #1e293b;">תשובת יעקב: <em>"אני מאוד מפחד מהפצע שיש לי ברגל, כי יש לי שכן שכרתו לו את הרגל ואני מאוד מפחד מזה."</em></div></div>
            <div class="card"><div style="display: flex; justify-content: space-between;"><strong style="color: #059669; font-size: 0.85rem;">שאלת האחות: "האם אתה מקפיד לקחת את הטיפול התרופתי הקבוע שלך?"</strong><span class="badge" style="background: #ecfdf5; color: #059669;">היענות</span></div><div style="font-size: 0.85rem; color: #1e293b;">תשובת יעקב: <em>"אני לוקח את האוזמפיק רק לפעמים כי אני חושש שיפגע בעיניים וחושש בנסיעות מתופעות לוואי."</em></div></div>
          </div>
        \`
      },
      {
        id: 11,
        title: "שלב 1 (חלק ב'): שיח טיפולי ותקשורת מקרבת לבניית אמון",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="card" style="background: #f0fdf4; border-color: #a7f3d0; text-align: right;">
              <strong style="color: #10b981; font-size: 0.9rem;">תגובה 1 (מומלצת) - אמפתית ומגייסת</strong>
              <p style="font-size: 0.8rem; margin: 4px 0;">"יעקב, אני מבינה אותך לגמרי. זה טבעי שתפחד... אתה לא לבד, נשמור על הרגל ביחד."</p>
              <div style="font-size: 0.78rem; color: #10b981; font-weight: 700;">יעקב נרגע: "תודה, אני מוכן לעשות מה שצריך כדי להתאזן."</div>
              <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px;">✅ לגיטימציה לחרדה מפיגה מתח ובונה היענות.</div>
            </div>
            <div class="card" style="background: #fef2f2; border-color: #fecaca; text-align: right;">
              <strong style="color: #ef4444; font-size: 0.9rem;">תגובה 2 - שיפוטית ומאיימת</strong>
              <p style="font-size: 0.8rem; margin: 4px 0;">"יעקב, עם A1C של 13.4% אתה מסכן את עצמך. אם לא תיקח את עצמך בידיים תגיע למצב של השכן."</p>
              <div style="font-size: 0.78rem; color: #ef4444; font-weight: 700;">מתכווץ בכיסא: "אני יודע שאני לא בסדר... זה רק עושה לי חרדה."</div>
              <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px;">❌ הטחת אשמה גורמת להסתגרות.</div>
            </div>
            <div class="card" style="background: #fffbeb; border-color: #fde68a; text-align: right;">
              <strong style="color: #f59e0b; font-size: 0.9rem;">תגובה 3 - טכנית בלבד</strong>
              <p style="font-size: 0.8rem; margin: 4px 0;">"אין מה להילחץ. נחליף חבישה, נתאים תרופות ונשלח לבדיקות מעבדה."</p>
              <div style="font-size: 0.78rem; color: #f59e0b; font-weight: 700;">מהנהן בקרירות: "בסדר, רק שלא יהיו תופעות לוואי."</div>
              <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px;">⚠️ התעלמות מרגש מונעת אמון עמוק.</div>
            </div>
            <div class="card" style="background: #f8fafc; border-color: #e2e8f0; text-align: right;">
              <strong style="color: #64748b; font-size: 0.9rem;">תגובה 4 - מבטלת ("אל תדאג")</strong>
              <p style="font-size: 0.8rem; margin: 4px 0;">"אל תחשוב על דברים רעים, תהיה אופטימי! הכל יסתדר רק קח תרופות."</p>
              <div style="font-size: 0.78rem; color: #64748b; font-weight: 700;">מניע ראשו: "קל לומר תהיה אופטימי, אבל הפצע עדיין מפחיד אותי..."</div>
              <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px;">❌ עידוד שטחי יוצר תחושה שלא מקשיבים לו.</div>
            </div>
          </div>
        \`
      },
      {
        id: 12,
        title: "שלב 1: דילמות קליניות ושאלות אבחון (Double Diabetes)",
        category: "קבלת המטופל",
        badge: "שלב 1",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 0.95rem;">שאלה 1: איזה סוג סוכרת יש למטופל?</strong>
              <p style="font-size: 0.88rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">
                • סוכרת משולבת (<strong>Double Diabetes</strong> - סוכרת סוג 1 + סוכרת סוג 2 / תנגודת קשה) - <strong>✅ נכון מאוד!</strong><br>
                <span style="color: #0369a1; font-size: 0.82rem;">הסבר: מרכיב אוטואימוני (נוגדני GAD חיוביים 2.8 U/mL) יחד עם השמנה קיצונית (BMI 36.1) ותנגודת עמוקה לאינסולין.</span>
              </p>
            </div>
            <div class="card" style="border-color: #e9d5ff; text-align: right;">
              <strong style="color: #7e22ce; font-size: 0.95rem;">שאלה 2: הצורך במינוני עתק וערך ה-GLP-1 RA?</strong>
              <p style="font-size: 0.88rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">
                • השילוב של סוכרת סוג 1 והשמנה יוצר תנגודת היקפית חריפה המצריכה כ-200u אינסולין ליום.<br>
                • <strong>ערך ה-GLP-1 RA במקרה זה:</strong> מוריד משקל, משפר רגישות לאינסולין, חוסך כ-70% במינון הבולוס ומספק <strong>הגנה קרדיווסקולרית ומוחית קריטית</strong> למטופל לאחר CVA ו-IHD!
              </p>
            </div>
          </div>
        \`
      },
      {
        id: 13,
        title: "שלב 2: ביקור ראשון (חלק ב') – החלטה על אינסולין קצר טווח",
        category: "ביקור ראשון (חלק ב')",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #a7f3d0; text-align: right;">
              <div style="font-weight: 800; color: #047857; font-size: 1.05rem; margin-bottom: 8px;">החלטה: הוספת נובורפיד 3 פעמים ביום וחיבור ל-Libre</div>
              <p style="font-size: 0.88rem; color: #1e293b; line-height: 1.6;">
                עקב היפרגליקמיה משמעותית לאחר האוכל ו-A1C מאוד גבוה, הוחלט להוסיף למטופל טיפול באינסולין קצר טווח נובורפיד (Novorapid) 3 פעמים ביום לפני כל ארוחה, והוא חובר לסנסור Libre.
              </p>
              <div style="background: #f0fdf4; padding: 10px; border-radius: 8px; font-size: 0.82rem; color: #15803d; margin-top: 8px;">
                <strong>שלילת חלופות:</strong> DPP4/אקטוס/סולפונילאוריאה נפסלו בשל חוסר יעילות טרשתית, עלייה במשקל ורזרבה לבלבית שאינה ידועה (אין בדיקת C-Peptide).
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div class="card" style="background: #e0f2fe; border-color: #bae6fd; text-align: right;">
                <strong style="color: #0369a1; font-size: 0.9rem;">כיסוי היפרגליקמיה פוסט-פרנדיאלית</strong>
                <div style="font-size: 0.8rem; color: #334155; margin-top: 2px;">ערכי הסוכר לאחר ארוחות הגיעו ל-200-350 mg/dL וחייבו מענה של בולוס.</div>
              </div>
              <div class="card" style="background: #fef3c7; border-color: #fde68a; text-align: right;">
                <strong style="color: #92400e; font-size: 0.9rem;">מעקב רציף Libre</strong>
                <div style="font-size: 0.8rem; color: #334155; margin-top: 2px;">מתן תמונת מצב מדויקת של מגמות הגלוקוז בזמן אמת.</div>
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 14,
        title: "שלב 2: בדיקת מקומות הזרקה ופריקת נתוני קורא Libre (פברואר 2026)",
        category: "ביקור ראשון (חלק ב')",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 1rem;">פריקת קורא Libre (פברואר 2026)</strong>
              <p style="font-size: 0.85rem; color: #334155; line-height: 1.5; margin: 6px 0;">
                חיבור קורא ה-Libre הכחול בכבל USB צהוב למחשב המרפאה. סוכר ממוצע 220 mg/dL, מדד GMI 8.6%, ו-TIR של 30% בלבד!
              </p>
              <img src="./public/labs/AGP_before_wegovy.png" onerror="this.src='/labs/AGP_before_wegovy.png'" style="max-height: 140px; border-radius: 8px; border: 1px solid #cbd5e1;">
            </div>
            <div class="card" style="border-color: #fed7aa; text-align: right;">
              <strong style="color: #ea580c; font-size: 1rem;">בדיקת אזורי הזרקת אינסולין וטכניקה</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6; margin-top: 6px;">
                <li>המטופל מזריק נכון ומאחסן נכון את האינסולין.</li>
                <li><strong>ליקוי:</strong> לא החליף מחט בכל הזרקה (שימוש חוזר).</li>
                <li><strong>ממצא:</strong> גוש ליפודוסטרופיה באזור הבטן.</li>
                <li><strong>הדרכה:</strong> החלפת מחט בכל הזרקה ורוטציה קבועה 4 אצבעות מהטבור לכיוון המותן.</li>
              </ul>
            </div>
          </div>
        \`
      },
      {
        id: 15,
        title: "שלב 2: שאלות לחשיבה קלינית וקבלת החלטות",
        category: "ביקור ראשון (חלק ב')",
        badge: "שלב 2",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div class="card" style="background: #fef2f2; border-color: #fecaca; text-align: right;">
              <strong style="color: #dc2626; font-size: 0.92rem;">1. האם המטופל עומד ביעד האיזון שלו?</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px;">לא, כי ה-A1C עדיין 8.6% וה-TIR עומד על 30% בלבד – המטופל אינו מאוזן כלל.</div>
            </div>
            <div class="card" style="background: #fff7ed; border-color: #fed7aa; text-align: right;">
              <strong style="color: #ea580c; font-size: 0.92rem;">2. האם הטיפול שהמטופל מקבל מספיק אופטימלי למצב שלו?</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px;">לא. מתן מינוני אינסולין גבוהים אינו מוריד משקל ואינו מספק הגנה כנגד סיבוכים טרשתיים.</div>
            </div>
            <div class="card" style="background: #eff6ff; border-color: #bfdbfe; text-align: right;">
              <strong style="color: #0284c7; font-size: 0.92rem;">3. איזה שינויים אפשר ונדרש לבצע? ולמה?</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">
                הוספת טיפול ב-GLP-1 (וויגובי):<br>
                • הורדת משקל והפחתת תיאבון<br>
                • הענקת הגנה קרדיווסקולרית ומוחית לסיבוכים טרשתיים (CVA/IHD)<br>
                • שיפור בתנגודת לאינסולין<br>
                • שיפור בתסמונת דום נשימה בשינה (OSA)
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 16,
        title: "שלב 2: ראיות מחקריות – יעילות מוכחת בירידה במשקל (תוכנית STEP)",
        category: "מחקרים וראיות",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 1rem;">תוצאות מחקרי STEP עבור Wegovy 2.4mg:</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6; margin-top: 8px;">
                <li><strong>STEP 1:</strong> ירידה ממוצעת מרשימה של <b style="color: #d97706;">16.9%</b> ממשקל הגוף כעבור 68 שבועות (לעומת 2.4% בפלצבו).</li>
                <li><strong>STEP 5:</strong> שמירה יציבה ומתמשכת לאורך שנתיים (104 שבועות) עם ירידה של <b style="color: #d97706;">16.7%</b>.</li>
                <li><strong>STEP 8 (ראש בראש מול סקסנדה):</strong> יעילות כפולה ויותר – <b style="color: #d97706;">17.1%</b> ירידה בסמגלוטייד לעומת 6.6% בלבד בלירגלוטייד 3.0 מ"ג.</li>
                <li><strong>משמעות ליעקב:</strong> שבירת התנגודת לאינסולין והפחתת עומס מפרקי וכיב רגלי!</li>
              </ul>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/step_trials_weight_loss.png" onerror="this.src='/labs/step_trials_weight_loss.png'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 17,
        title: "שלב 2: ראיות מחקריות – פרופיל סבילות ובטיחות (תופעות לוואי/בחילות)",
        category: "מחקרים וראיות",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 1rem;">סבילות ובחילות תחת Wegovy 2.4mg:</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6; margin-top: 8px;">
                <li><strong>קלה עד בינונית:</strong> ברובן המכריע תופעות הבחילה הן בדרגה קלה-בינונית וחולפות מעצמן.</li>
                <li><strong>משך זמן קצר:</strong> משך הזמן החציוני של הבחילה עומד על <b style="color: #d97706;">8.0 ימים בלבד</b>.</li>
                <li><strong>שיא זמני בטיטרציה:</strong> מופיע בעיקר בשבועות 0–16 במהלך העלייה במינון ויורד בהתמדה.</li>
                <li><strong>שיעור אפסי של תופעות קשות:</strong> קו הבחילה החמורה שואף לאפס.</li>
                <li><strong>מענה לחששותיו של יעקב:</strong> הסבר זה הפיג את חרדותיו מטיסות ואיפשר התמדה בטיפול.</li>
              </ul>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/wegovy_side_effects_nausea.jpg" onerror="this.src='/labs/wegovy_side_effects_nausea.jpg'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 18,
        title: "שלב 2: ראיות מחקריות – הגנה קרדיווסקולרית ומוחית (מחקר SELECT)",
        category: "מחקרים וראיות",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #fecaca; text-align: right;">
              <strong style="color: #dc2626; font-size: 1rem;">תוצאות מחקר ה-SELECT ההיסטורי:</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6; margin-top: 8px;">
                <li><strong>הפחתה מובהקת של 20% ב-MACE:</strong> Wegovy 2.4mg מביאה לירידה של <b style="color: #d97706;">20%</b> באירועים קרדיווסקולריים (HR 0.80, p&lt;0.001).</li>
                <li><strong>3-Point MACE:</strong> הגנה על מוות לבבי, אוטם שריר הלב, ושבץ מוחי (Stroke/CVA).</li>
                <li><strong>הנחיות ESC 2024:</strong> הוכנסה להנחיות הרשמיות לניהול תסמונת כלילית כרונית.</li>
                <li><strong>חיוני ליעקב:</strong> במטופל בן 67 לאחר CVA (2023) וצנתור IHD, הטיפול מספק הגנה מצילת חיים כנגד אירוע חוזר!</li>
              </ul>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/semaglutide_select_mace_cardio.png" onerror="this.src='/labs/semaglutide_select_mace_cardio.png'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 19,
        title: "שלב 2: קריטריוני זכאות וסבסוד שב\"ן (כולל כבד שומני ודום נשימה)",
        category: "מחקרים וראיות",
        badge: "שלב 2",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 1rem;">סבסוד וזכאות בביטוחים המשלימים (שב\"ן):</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #334155; line-height: 1.6; margin-top: 8px;">
                <li>זמינה בכל הקופות (כללית, מכבי, מאוחדת, לאומית) ב-<strong>50% הנחה</strong> (338-562 ₪ בלבד).</li>
                <li><strong>קריטריון 1:</strong> BMI &gt; 30 kg/m² – זכאות מלאה.</li>
                <li><strong>קריטריון 2:</strong> 27 ≤ BMI &lt; 30 בנוכחות גורם סיכון: <b style="color: #d97706;">כבד שומני</b>, טרום סוכרת, יל\"ד, דיסליפידמיה, דום נשימה בשינה או מחלה קרדיווסקולרית.</li>
                <li><strong>התאמת יעקב:</strong> עומד במלוא הקריטריונים – BMI 36.1, כבד שומני, CVA, IHD ודום נשימה בשינה!</li>
              </ul>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/wegovy_eligibility_shaban.png" onerror="this.src='/labs/wegovy_eligibility_shaban.png'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 20,
        title: "שלב 2: עדכון תוכנית טיפול והנחיות אורח חיים מקיפות",
        category: "ביקור ראשון (חלק ב')",
        badge: "שלב 2",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="card" style="background: #faf5ff; border-color: #e9d5ff; text-align: right;">
              <strong style="color: #7e22ce; font-size: 0.98rem;">התחלת וויגובי 1 מ\"ג (מעבר מאוזמפיק)</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">הדרכה על טיטרציה מדורגת עד למינון היעד של 2.4 מ\"ג. מתן מענה לחששות מנסיעות, הדרכה להזרקה תת-עורית פעם בשבוע ואחסון נכון.</div>
            </div>
            <div class="card" style="background: #f0fdf4; border-color: #a7f3d0; text-align: right;">
              <strong style="color: #10b981; font-size: 0.98rem;">פעילות גופנית מותאמת אישית</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">הדרכה להליכות יומיות מבוקרות תוך התחשבות בכיב ברגל ובנעליים מתאימות, ושילוב תרגילי חיזוק קלים לשיפור קליטת גלוקוז שרירית.</div>
            </div>
            <div class="card" style="background: #fffbeb; border-color: #fde68a; text-align: right;">
              <strong style="color: #d97706; font-size: 0.98rem;">ייעוץ ותמיכה תזונתית מתמשכת</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">הפניה קבועה לדיאטנית קלינית להתאמת תפריט מבוקר פחמימות, אכילת ארוחות מסודרות ומניעת נשנושים סביב שעות העבודה בישיבה.</div>
            </div>
          </div>
        \`
      },
      {
        id: 21,
        title: "שלב 3: מעקב תחת Wegovy 2.4mg והתאמת מינונים",
        category: "מעקב וטיטרציה",
        badge: "שלב 3",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="card" style="border-color: #e9d5ff; text-align: right;">
              <strong style="color: #7e22ce; font-size: 0.95rem;">סולם מינוני Wegovy (Semaglutide) – תהליך טיטרציה מדורג:</strong>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 10px;">
                <div class="card" style="background: #f3e8ff; text-align: center; padding: 10px;"><div style="font-size: 0.72rem; color: #6b21a8;">התחלתי</div><div style="font-size: 1.15rem; font-weight: 900; color: #581c87;">0.25 mg</div></div>
                <div class="card" style="background: #f3e8ff; text-align: center; padding: 10px;"><div style="font-size: 0.72rem; color: #6b21a8;">שלב 2</div><div style="font-size: 1.15rem; font-weight: 900; color: #581c87;">0.5 mg</div></div>
                <div class="card" style="background: #f3e8ff; text-align: center; padding: 10px;"><div style="font-size: 0.72rem; color: #6b21a8;">שלב 3</div><div style="font-size: 1.15rem; font-weight: 900; color: #581c87;">1.0 mg</div></div>
                <div class="card" style="background: #f3e8ff; text-align: center; padding: 10px;"><div style="font-size: 0.72rem; color: #6b21a8;">שלב 4</div><div style="font-size: 1.15rem; font-weight: 900; color: #581c87;">1.7 mg</div></div>
                <div class="card" style="background: #7e22ce; color: white; text-align: center; padding: 10px;"><div style="font-size: 0.72rem; font-weight: 700;">מינון יעד</div><div style="font-size: 1.15rem; font-weight: 900;">2.4 mg</div></div>
              </div>
            </div>
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 0.95rem;">התאמת מינוני האינסולין במקביל:</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #1e293b; line-height: 1.6; margin-top: 6px;">
                <li><strong>נובורפיד בולוס:</strong> קוצץ מ-12u ל-8u לארוחה (~25-35u ליום לעומת כ-120u בבסיס – ירידה של כ-70%!).</li>
                <li><strong>טרגלודק בזאלי:</strong> הופחת והותאם בהדרגה ל-36 יחידות ליום.</li>
                <li><strong>בטיחות למניעת היפו:</strong> אם סוכר בוקר בצום &lt; 90 mg/dL – הורדת 2 יחידות אינסולין בזאלי מיידית.</li>
              </ul>
            </div>
          </div>
        \`
      },
      {
        id: 22,
        title: "שלב 3: הישגים קליניים במעקב ספטמבר 2026",
        category: "מעקב וטיטרציה",
        badge: "שלב 3",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
              <div class="card" style="background: #fff1f2; border-color: #fecdd3; text-align: center;"><div style="color: #e11d48; font-size: 0.8rem; font-weight: 700;">HbA1C גליקמי</div><div style="font-size: 1.8rem; font-weight: 900; color: #e11d48; margin: 4px 0;">5.0%</div><div style="font-size: 0.75rem; color: #475569;">מ-13.4% בבסיס!</div></div>
              <div class="card" style="background: #ecfdf5; border-color: #a7f3d0; text-align: center;"><div style="color: #059669; font-size: 0.8rem; font-weight: 700;">ירידה במשקל</div><div style="font-size: 1.8rem; font-weight: 900; color: #059669; margin: 4px 0;">-11 ק"ג</div><div style="font-size: 0.75rem; color: #475569;">85 ק"ג (BMI 32.0)</div></div>
              <div class="card" style="background: #eff6ff; border-color: #bae6fd; text-align: center;"><div style="color: #0284c7; font-size: 0.8rem; font-weight: 700;">אינסולין בולוס</div><div style="font-size: 1.8rem; font-weight: 900; color: #0284c7; margin: 4px 0;">8u לארוחה</div><div style="font-size: 0.75rem; color: #475569;">קיצוץ מ-12u לארוחה</div></div>
              <div class="card" style="background: #faf5ff; border-color: #e9d5ff; text-align: center;"><div style="color: #7e22ce; font-size: 0.8rem; font-weight: 700;">אינסולין בזאלי</div><div style="font-size: 1.8rem; font-weight: 900; color: #7e22ce; margin: 4px 0;">36u ליום</div><div style="font-size: 0.75rem; color: #475569;">טרגלודק מותאם</div></div>
            </div>
            <div class="card" style="border-right: 6px solid #d97706; text-align: right;">
              <strong style="color: #b45309; font-size: 0.92rem;">כלל קליני מהותי בטיטרציית GLP-1 ב-T1D:</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 4px; line-height: 1.5;">
                חובה לשמור תמיד על כיסוי בזאלי מינימלי מספק למניעת DKA (חמצת סוכרתית), תוך הפחתת בולוס זהירה בהתאם לתזונה ולירידה בתנגודת.
              </div>
            </div>
          </div>
        \`
      },
      {
        id: 23,
        title: "שלב 4: ניתוח מדדי חיישן FreeStyle Libre 2 ו-AGP תחת Wegovy 2.4mg",
        category: "ניטור רציף AGP",
        badge: "שלב 4",
        html: \`
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">זמן בטווח היעד (TIR 70-180)</div><div style="font-size: 1.4rem; font-weight: 900; color: #10b981;">79%</div><div style="font-size: 0.72rem; color: #475569;">עבר את היעד (>70%)!</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">סוכר ממוצע</div><div style="font-size: 1.4rem; font-weight: 900; color: #0284c7;">116 mg/dL</div><div style="font-size: 0.72rem; color: #475569;">צנח מ-220 mg/dL!</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">מדד GMI משוער</div><div style="font-size: 1.4rem; font-weight: 900; color: #0284c7;">6.1%</div><div style="font-size: 0.72rem; color: #475569;">תואם A1C של 6.1%</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">ערכים מעל הטווח (>180)</div><div style="font-size: 1.4rem; font-weight: 900; color: #10b981;">8%</div><div style="font-size: 0.72rem; color: #475569;">מתוכם 0% מעל 250!</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">שונות גלוקוז (%CV)</div><div style="font-size: 1.4rem; font-weight: 900; color: #7e22ce;">37.3%</div><div style="font-size: 0.72rem; color: #475569;">קרוב ליעד (≤36%)</div></div>
              <div class="card" style="text-align: right;"><div style="color: #64748b; font-size: 0.75rem;">היפוגליקמיה (<70)</div><div style="font-size: 1.4rem; font-weight: 900; color: #e11d48;">13%</div><div style="font-size: 0.72rem; color: #475569;">אירועים קלים (0% <54)</div></div>
            </div>
            <div style="text-align: center;">
              <img src="./public/labs/AGP_after_wegovy.png" onerror="this.src='/labs/AGP_after_wegovy.png'" style="max-height: 230px; border-radius: 12px; border: 1px solid #cbd5e1;">
            </div>
          </div>
        \`
      },
      {
        id: 24,
        title: "שלב 4: השוואת מדדי החיישן – לפני וויגובי לעומת תחת Wegovy 2.4mg",
        category: "ניטור רציף AGP",
        badge: "שלב 4",
        html: \`
          <div class="card" style="padding: 0; overflow: hidden;">
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; background: #f1f5f9; padding: 10px 16px; font-weight: 800; font-size: 0.85rem; text-align: center;">
              <span style="text-align: right;">מדד קליני ב-AGP</span>
              <span style="color: #dc2626;">לפני וויגובי (פברואר 2026)</span>
              <span style="color: #059669;">תחת Wegovy 2.4mg (ספטמבר 2026)</span>
            </div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9;"><span style="text-align: right; font-weight: 700;">זמן בטווח היעד (TIR 70-180 mg/dL)</span><span style="color: #dc2626; font-weight: 800;">30% בלבד</span><span style="color: #059669; font-weight: 800;">79% (עבר את היעד!)</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9; background: #f8fafc;"><span style="text-align: right; font-weight: 700;">רמת גלוקוז ממוצעת</span><span style="color: #dc2626; font-weight: 800;">220 mg/dL</span><span style="color: #059669; font-weight: 800;">116 mg/dL (נחתך בחצי!)</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9;"><span style="text-align: right; font-weight: 700;">מדד ניהול גלוקוז משוער (GMI)</span><span style="color: #dc2626; font-weight: 800;">8.6%</span><span style="color: #059669; font-weight: 800;">6.1%</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9; background: #f8fafc;"><span style="text-align: right; font-weight: 700;">ערכים מעל הטווח (>180 mg/dL)</span><span style="color: #dc2626; font-weight: 800;">70% (27% מעל 250)</span><span style="color: #059669; font-weight: 800;">8% בלבד (0% מעל 250!)</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9;"><span style="text-align: right; font-weight: 700;">שונות גלוקוז (%CV)</span><span style="color: #dc2626; font-weight: 800;">32.1%</span><span style="color: #059669; font-weight: 800;">37.3%</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9; background: #f8fafc;"><span style="text-align: right; font-weight: 700;">משקל המטופל ו-BMI</span><span style="color: #dc2626; font-weight: 800;">96 ק"ג (BMI 36.1)</span><span style="color: #059669; font-weight: 800;">85 ק"ג (BMI 32.0)</span></div>
            <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; padding: 8px 16px; font-size: 0.82rem; text-align: center; border-top: 1px solid #f1f5f9;"><span style="text-align: right; font-weight: 700;">מינון אינסולין בולוס (נובורפיד)</span><span style="color: #dc2626; font-weight: 800;">~120u ליום</span><span style="color: #059669; font-weight: 800;">~25-35u ליום (-70%!)</span></div>
          </div>
        \`
      },
      {
        id: 25,
        title: "שלב 5: סיכום קליני של המקרה",
        category: "סיכום מקרה",
        badge: "שלב 5",
        html: \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="card" style="border-color: #bae6fd; text-align: right;">
              <strong style="color: #0284c7; font-size: 1.05rem;">סיכום מקרה קליני – יעקב:</strong>
              <p style="font-size: 0.92rem; color: #1e293b; line-height: 1.7; margin-top: 6px; font-weight: 600;">
                המטופל סבל מהשמנה וריבוי של סיבוכי השמנה וסוכרת, ביניהם כבד שומני, דום נשימה בשינה, ומחלות טרשתיות כמו CVA ו-IHD. בעקבות התחלת הטיפול בהשמנה באמצעות וויגובי (Wegovy), המטופל ירד במשקל, מדווח על שינה טובה יותר, הסוכרת התאזנה משמעותית תוך הורדה במינוני האינסולין, נרשם שיפור בפצע שהתפתח בכף הרגל, והסיכון למחלות טרשתיות הופחת באופן משמעותי.
              </p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
              <div class="card" style="background: #dcfce7; text-align: center;"><div style="font-size: 0.75rem; color: #15803d; font-weight: 700;">TIR בטווח</div><div style="font-size: 1.6rem; font-weight: 900; color: #15803d;">79%</div><div style="font-size: 0.72rem; color: #1e293b;">מ-30% ל-79%!</div></div>
              <div class="card" style="background: #e0f2fe; text-align: center;"><div style="font-size: 0.75rem; color: #0369a1; font-weight: 700;">מדד GMI</div><div style="font-size: 1.6rem; font-weight: 900; color: #0369a1;">6.1%</div><div style="font-size: 0.72rem; color: #1e293b;">סוכר 116 mg/dL</div></div>
              <div class="card" style="background: #ccfbf1; text-align: center;"><div style="font-size: 0.75rem; color: #0f766e; font-weight: 700;">ירידה במשקל</div><div style="font-size: 1.6rem; font-weight: 900; color: #0f766e;">85 ק"ג</div><div style="font-size: 0.72rem; color: #1e293b;">הפחתת 11 ק"ג</div></div>
              <div class="card" style="background: #f3e8ff; text-align: center;"><div style="font-size: 0.75rem; color: #6b21a8; font-weight: 700;">אינסולין בזאלי</div><div style="font-size: 1.6rem; font-weight: 900; color: #6b21a8;">36u</div><div style="font-size: 0.72rem; color: #1e293b;">טרגלודק ליום</div></div>
            </div>
          </div>
        \`
      },
      {
        id: 26,
        title: "שלב 5: ארבעת העקרונות המנחים לפרקטיקה הרפואית",
        category: "עקרונות לפרקטיקה",
        badge: "שלב 5",
        html: \`
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
            <div class="card" style="background: #fffbeb; text-align: right;">
              <strong style="color: #d97706; font-size: 0.98rem;">1. מעקב אורח חיים ותזונה</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 6px; line-height: 1.5;">המטופל נמצא במעקב רציף של דיאטנית וגם מבצע, אם כי בצורה מוגבלת, פעילות גופנית סדירה.</div>
            </div>
            <div class="card" style="background: #faf5ff; text-align: right;">
              <strong style="color: #7e22ce; font-size: 0.98rem;">2. הפחתת תנגודת והורדת משקל</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 6px; line-height: 1.5;">הטיפול ב-GLP-1 RA (Wegovy 2.4mg) הביא לירידה מ-96 ל-85 ק"ג ולהפחתת בולוס (מ-12u ל-8u) ובזאלי (ל-36u).</div>
            </div>
            <div class="card" style="background: #eff6ff; text-align: right;">
              <strong style="color: #0284c7; font-size: 0.98rem;">3. הגנה קרדיווסקולרית ומוחית</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 6px; line-height: 1.5;">שיפור בשינה (דום נשימה), הטבה בפצע בכף הרגל והפחתת סיכון למחלות טרשתיות במטופל לאחר CVA ו-IHD.</div>
            </div>
            <div class="card" style="background: #ecfdf5; text-align: right;">
              <strong style="color: #059669; font-size: 0.98rem;">4. איזון גליקמי מוכח ב-CGM</strong>
              <div style="font-size: 0.85rem; color: #1e293b; margin-top: 6px; line-height: 1.5;">חיישן Libre 2 מראה זינוק מ-30% ל-79% בטווח היעד (TIR) וירידה בסוכר הממוצע מ-220 ל-116 mg/dL.</div>
            </div>
          </div>
        \`
      },
      {
        id: 27,
        title: "שלב 5: תוכנית המשך מעקב וסגירה",
        category: "סיכום ומעקב",
        badge: "שלב 5",
        html: \`
          <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; align-items: center;">
            <div class="card" style="border-color: #a7f3d0; text-align: right;">
              <strong style="color: #059669; font-size: 1.05rem;">הנחיות המשך מעקב עבור יעקב:</strong>
              <ul style="padding-right: 18px; font-size: 0.85rem; color: #1e293b; line-height: 1.7; margin-top: 8px;">
                <li><strong>מינונים מעודכנים:</strong> המשך מינון אחזקתי של Wegovy 2.4 mg אחת לשבוע + טרגלודק <strong>36 יחידות</strong> ליום + נובורפיד 8 יחידות לארוחה.</li>
                <li><strong>מרפאת פצע:</strong> המשך מעקב סדיר במרפאת פצע עד להחלמה מלאה של הכיב בכף הרגל.</li>
                <li><strong>ניטור CGM:</strong> ניטור רציף ב-Libre 2 למעקב אחר היפוגליקמיות לילה ושמירה על TIR > 70%.</li>
                <li><strong>אורח חיים ותזונה:</strong> ליווי דיאטני מתמשך ושמירה על פעילות גופנית מותאמת.</li>
              </ul>
            </div>
            <div class="card" style="border-color: #c7d2fe; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 24px;">
              <img src="./public/tiferet_eliav_logo.jpg" onerror="this.src='/tiferet_eliav_logo.jpg'" style="height: 65px; border-radius: 12px; border: 1.5px solid #c7d2fe;">
              <div style="font-weight: 900; color: #4f46e5; font-size: 1.1rem;">TIFERET ELIAV • Diabetes & AI</div>
              <div style="font-size: 0.85rem; color: #0284c7; font-weight: 700;">סיום הלומדה והמצגת בהצלחה!</div>
              <div style="font-size: 0.78rem; color: #64748b; line-height: 1.5;">
                מהפך טיפולי מבוסס GLP-1 RA במטופל סוכרת, השמנה ומחלות טרשתיות.
              </div>
            </div>
          </div>
        \`
      }
    ];

    function renderSlide(index) {
      const s = slidesData[index - 1];
      const deck = document.getElementById('slideDeck');
      deck.innerHTML = \`
        <div class="slide active">
          <div class="slide-header">
            <div style="text-align: right;">
              <div style="font-size: 0.8rem; font-weight: 800; color: #0284c7; text-transform: uppercase;">\${s.badge} • \${s.category}</div>
              <h2 style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin: 0;">\${s.title}</h2>
            </div>
            <img src="./public/tiferet_eliav_logo.jpg" onerror="this.src='/tiferet_eliav_logo.jpg'" style="height: 38px; border-radius: 8px; border: 1px solid #c7d2fe;">
          </div>
          <div class="slide-body">
            \${s.html}
          </div>
          <div class="slide-footer">
            <span>TIFERET ELIAV • Diabetes & AI | סימולציית טיפול ב-GLP1 בסוכרת והשמנה</span>
            <span style="font-weight: 800; color: #0284c7;">\${s.id} / \${totalSlides}</span>
          </div>
        </div>
      \`;

      document.getElementById('slideCounterTop').innerText = \`שקופית \${index} / \${totalSlides}\`;
      document.getElementById('slideCounterBottom').innerText = \`\${index} / \${totalSlides}\`;
    }

    function nextSlide() {
      if (currentSlide < totalSlides) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    }

    function prevSlide() {
      if (currentSlide > 1) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    // Keyboard navigation (Arrow Left = Next, Arrow Right = Prev in Hebrew RTL)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') nextSlide();
      else if (e.key === 'ArrowRight') prevSlide();
    });

    // Initial render
    renderSlide(currentSlide);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve(__dirname, 'presentation.html'), htmlContent);
fs.writeFileSync(path.resolve(__dirname, 'public/presentation.html'), htmlContent);
console.log('presentation.html created successfully in root and public directories!');
