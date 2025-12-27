# Konimbo Landing – Contact Form with Airtable

אפליקציית Landing Page פשוטה ומודרנית הכוללת טופס יצירת קשר,
השולח נתונים ל־Airtable בצורה מאובטחת באמצעות API Server-side.

הפרויקט נבנה בהתאם ל־Best Practices של Web מודרני:
אבטחה, הפרדת אחריות (Frontend / Backend) ויכולת הרחבה עתידית.

---

## טכנולוגיות

- **Next.js** – Framework מבוסס React הכולל גם Frontend וגם Backend
- **React** – בניית ממשק המשתמש
- **Node.js** – סביבת הרצה ל־API
- **Airtable API** – אחסון הלידים
- **Tailwind CSS** – עיצוב מבוסס Utility Classes
- **Fetch API** – תקשורת HTTP

---

##  מבנה הפרויקט

konimbo-landing/
├── components/
│ └── ContactForm.js
│ קומפוננטת React של טופס יצירת קשר
│
├── pages/
│ ├── index.js
│ │ עמוד הבית (Landing Page)
│ │
│ └── api/
│ └── submit.js
│ API Route – קוד שרץ בצד השרת
│ אחראי לשליחת הנתונים ל־Airtable
│
├── styles/
│ └── globals.css
│ טעינת Tailwind והגדרות CSS גלובליות
│
├── .env.local
│ משתני סביבה (API Keys) – לא נכנס ל־Git
│
├── tailwind.config.js
│ קונפיגורציית Tailwind
│
├── postcss.config.mjs
│ קונפיגורציית PostCSS
│
├── package.json
└── README.md


---

## משתני סביבה (חובה)

יש ליצור קובץ בשם **`.env.local`** בשורש הפרויקט:

AIRTABLE_TOKEN=pat*******
AIRTABLE_BASE_ID=appfljVfX6L8zPpmG
AIRTABLE_TABLE_ID=tblmHLLJbdnpdoaAx

## הרצת הפרויקט מקומית
## התקנת תלויות
npm install

## הרצה
npm run dev

## גישה לאפליקציה
http://localhost:3000

