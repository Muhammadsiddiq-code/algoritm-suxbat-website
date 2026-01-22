cd teacher-panel
npm install
npm start
```
**Port: 3000**
**URL: http://localhost:3000**

---

## FOYDALANISH BOSQICHLARI:

1. **Admin Panel (http://localhost:3001):**
   - Bo'limlar yarating
   - Har bir bo'limga savollar qo'shing
   - O'qituvchilar yarating (login va parol bering)

2. **Teacher Panel (http://localhost:3000):**
   - Admin bergan login va parol bilan kiring
   - Bo'lim tanlang
   - O'quvchi ismini kiriting
   - Suhbat o'tkazing
   - Natijani ko'ring va saqlang
   - "Suhbat qilingan o'quvchilar" bo'limida barcha natijalarni ko'ring

---

## LOYIHA STRUKTURASI:
```
project/
├── backend/                 # Port 5577
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── admin-panel/            # Port 3001
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPanel.jsx
│   │   │   └── AdminPanel.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── config.js
│   └── package.json
│
└── teacher-panel/          # Port 3000
    ├── src/
    │   ├── components/
    │   │   ├── TeacherLogin.jsx
    │   │   ├── TeacherLogin.css
    │   │   ├── TeacherDashboard.jsx
    │   │   ├── TeacherDashboard.css
    │   │   ├── TeacherQuiz.jsx
    │   │   └── TeacherQuiz.css
    │   ├── App.jsx
    │   ├── App.css
    │   └── config.js
    └── package.json