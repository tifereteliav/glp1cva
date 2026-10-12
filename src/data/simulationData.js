// Content aligned with the presentation approved by the sponsor's medical review (Oct 2026).
// Keep wording here identical to the approved deck.

export const patientProfile = {
  name: "יעקב",
  age: 67,
  maritalStatus: "נשוי + 8 ילדים",
  occupation: "עובד בישיבה",
  familyHistory: "סוכרת ידועה במשפחה",
  diabetesHistory: "סוכרת מאובחנת משנת 2011 (כ-15 שנים)",
  image: "/yaakov_first_visit.png",
  originalImage: "/yaakov_first_visit.png",

  physicalExam: {
    bloodPressure: "158/72 mmHg",
    pulse: "80 פעימות לדקה (סדיר)",
    weight: "96 ק\"ג (בביקור ראשון)",
    height: "163 ס\"מ",
    bmi: 36.1,
    waist: "98 ס\"מ",
    smoking: "מעשן בעבר (הפסיק ב-2012)",
    footExam: "דופק טיבאלי חלש ברגל ימין עם נוכחות של כיב פעיל מטופל במרפאת פצע",
    eyeExam: "NODR (ללא רטינופתיה סוכרתית)"
  },

  baselineLabs: {
    a1c: "13.4%",
    ldl: "121 mg/dL",
    acr: "180 mg/g",
    gfr: "75 mL/min"
  },

  medicalHistory: [
    { name: "HYPERLIPIDEMIA UNSPECIFIED (יתר שומנים בדם)", year: "1992" },
    { name: "FATTY LIVER (כבד שומני)", year: "1994" },
    { name: "DIABETES MELLITUS NON-INSULIN DEPENDENT", year: "2004 (מאובחן 2011)" },
    { name: "DISCITIS LUMBAR REGION (L5-L3-S1)", year: "2004" },
    { name: "OBESITY (BMI 36.1, משקל 96 ק\"ג)", year: "2012" },
    { name: "RIGHT HEART CARDIAC CATHETERIZATION (צנתור LAD 50%, RCA 40%)", year: "2019" },
    { name: "ISCHEMIC HEART DISEASE (IHD - מחלת לב כלילית)", year: "2019" },
    { name: "CORONARY ATHEROSCLEROSIS (טרשת עורקים כלילית)", year: "2019" },
    { name: "HYPERURICEMIA (עודף חומצת שתן בדם)", year: "2019" },
    { name: "CEREBROVASCULAR ACCIDENT - CVA (אירוע מוחי)", year: "2023" },
    { name: "SLEEP APNEA SEVERE (דום נשימה בשינה חמור)", year: "2024" },
    { name: "PAST SMOKER (עישן בעבר, הפסיק ב-2012)", year: "1977-2012" }
  ],

  medicationsBaselineCurrent: [
    { name: "INS DEGLUDEC 100U/1ML (טרגלודק)", dose: "40 יחידות פעם ביום", purpose: "אינסולין בזאלי פעם ביום" },
    { name: "SEMAGLUTIDE 1MG (סמגלוטייד 1 מ\"ג - אוזמפיק)", dose: "1 מ\"ג פעם בשבוע", purpose: "טיפול ב-GLP-1 RA" },
    { name: "JARDIANCE DUO 12.5MG/850MG", dose: "1 טבליה X 2 ביום", purpose: "איזון גלוקוז משולב (Empagliflozin + Metformin)" },
    { name: "ATORVASTATIN TAB 80MG", dose: "1 טבליה ביום", purpose: "הורדת שומנים בדם וכולסטרול (LDL)" },
    { name: "CARTIA TAB 100MG (אספירין/דילול דם)", dose: "1 טבליה ביום", purpose: "מניעת אירועים קרדיווסקולריים ומוחיים (CVA)" },
    { name: "OMEPRADEX (omeprazole) 20MG CAP", dose: "1 קפסולה ביום", purpose: "הגנה על רירית הקיבה" },
    { name: "BETMIGA PR (Mirabegron) 25MG TAB", dose: "1 טבליה ביום", purpose: "טיפול בשלפוחית השתן" },
    { name: "OMNIC (Tamsulosin) CAP 0.4MG", dose: "1 כמוסה ביום", purpose: "טיפול במערכת השתן" },
    { name: "SERTRALINE 100MG TAB", dose: "1 טבליה ביום", purpose: "איזון נפשי ורגשי" }
  ]
};

export const simulationStages = [
  {
    id: 1,
    title: "שלב 1: קבלת המטופל והערכה ראשונית",
    subtitle: "מפגש ראשון במרפאה - אבחנה דיפרנציאלית והערכת בסיס",
    badge: "ביקור ראשון (חלק א')",
    date: "ינואר 2026"
  },
  {
    id: 2,
    title: "שלב 2: ביקור ראשון (חלק ב')",
    subtitle: "החלטה על אינסולין קצר טווח, פריקת Libre, בדיקת הזרקות, דילמה וחשיבה קלינית, יתרונות קליניים ומחקרים נלווים",
    badge: "ביקור ראשון (חלק ב')",
    date: ""
  },
  {
    id: 3,
    title: "שלב 3: מעקב תחת Wegovy 2.4mg והתאמת מינונים",
    subtitle: "בוצעה העלאה הדרגתית במינון הוויגובי וכעת המטופל מקבל וויגובי 2.4 מ\"ג תוך ביצוע טיטרציה של הורדה במינוני האינסולין.",
    badge: "מעקב וויגובי (סמגלוטייד 2.4 מ\"ג)",
    date: "ספטמבר 2026"
  },
  {
    id: 4,
    title: "שלב 4: ניתוח מדדי חיישן FreeStyle Libre 2 ו-AGP",
    subtitle: "TIR עלה מ-30% ל-79%, סוכר ממוצע 116 mg/dL ו-GMI 6.1%",
    badge: "מעקב ספטמבר 2026",
    date: "ספטמבר 2026"
  },
  {
    id: 5,
    title: "שלב 5: סיכום קליני של המקרה",
    subtitle: "ארבע תובנות מרכזיות מהמקרה",
    badge: "סיכום מקרה",
    date: "סיכום ומעקב"
  }
];

// Regulatory text reused across stages (taken verbatim from the approved deck)
export const INDICATION_NOTE =
  "Semaglutide 2.4mg (Wegovy®) is indicated as an adjunct to a reduced-calorie diet and increased physical activity for weight management, including weight loss and weight maintenance.";

export const INSULIN_SPC_NOTE =
  "When initiating semaglutide in patients with type 2 diabetes, consider reducing the dose of concomitantly administered insulin or insulin secretagogues (such as sulfonylureas) to reduce the risk of hypoglycaemia";

export const INDIVIDUAL_CASE_NOTE =
  "Individual patient case; outcomes may not be representative of results in other patients.";
