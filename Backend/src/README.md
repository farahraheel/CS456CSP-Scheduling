# 📅 CS456CSP-Scheduling

## 👥 أعضاء الفريق
- فرح عبدالحفيظ رحيل رحيل
- لينا محمد سكانجي

##  اسم المشروع
نظام ذكي لجدولة الاجتماعات باستخدام خوارزميات الإرضاء بالقيود (CSP)

## 📌 وصف المشروع
يهدف هذا المشروع إلى تطوير نظام ذكي لجدولة الاجتماعات بين الفرق المختلفة، بحيث يتم أخذ قيود الوقت وتوفر الأعضاء والغرف في الحسبان.  
يعتمد النظام على خوارزميات **CSP (Constraint Satisfaction Problem)** 

- Backtracking
- Forward Checking
- MRV

وذلك لاختيار الوقت المناسب للاجتماع بحيث يتم تقليل التضارب وتحقيق أعلى درجة من التوافق.

## 🗂️ هيكلية المشروع

📁 backend/
└── 📁 algorithm/
└── 📁 csp/
├── backtrack.ts
├── constraints.ts
├── scheduler.ts
└── types.ts


## ⚙️ التقنيات المستخدمة
- **TypeScript**
- **React**
- **Node.js**
- **SQLite** (لقاعدة البيانات)


## 🚀 كيفية تشغيل المشروع
open terminel 
cd meeting-schedule-app
cd frontend 
npm start

cd meeting-schedule-app
cd backend
npm start


### 1. تثبيت التبعيات:
```bash
npm install
