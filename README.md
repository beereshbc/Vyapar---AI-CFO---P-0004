<div align="center">

#  VyaparAI CFO

### India's AI-Powered Financial Officer for Kirana & MSME Store Owners

[![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF6B00?style=for-the-badge)](https://github.com)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20Sonnet%204.6-7C3AED?style=for-the-badge&logo=anthropic)](https://anthropic.com)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=for-the-badge)](https://razorpay.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2020-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)

> **"Apni Dukan Ka Smart CFO"** — Udhaar track karo. GST file karo. Cash flow samjho. Sab ek jagah — MunafaAI ke saath.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Security](#-security) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 📖 What is VyaparAI CFO?

VyaparAI CFO is a **production-grade, full-stack SaaS platform** built for India's 6.3 crore small and micro store owners — kirana stores, medical shops, general stores, and more. It replaces the traditional paper notebook (bahi-khata) with an intelligent, AI-powered financial management system.

The app solves three core problems that every small Indian store owner faces daily:

1. **Udhaar (Credit) Management** — Tracking who owes money, how much, and for how long
2. **GST Compliance** — Creating tax invoices and generating filing summaries without a CA
3. **Payment Recovery** — Automatically collecting dues via UPI AutoPay and an escalating legal ladder

Built by **Munafaakumar S H**, powered by **Anthropic Claude AI**.

---

## ✨ Features

### 🏦 Udhaar Ledger
- Full credit tracking per customer with running balance
- Add entries via form or **voice input** (Hindi + English)
- Color-coded status: Green (healthy) → Amber (warning) → Red (overdue)
- Phonetic search — type "Ram" and find "Ramesh"
- Filter by: All | Overdue | AutoPay Active | New | Suspicious

### 📲 QR Onboarding System
- Each store gets a **unique UUID-based QR code**
- Customer scans → self-registers → face selfie KYC → UPI AutoPay setup — all in under 5 minutes
- Downloadable QR as PNG or print-ready A4 PDF poster
- QR analytics: scans today / this week / total
- Share QR directly via WhatsApp

### 🤖 AI Agent — Munafa
- Powered by **Claude Sonnet 4.6** via Anthropic API
- Speaks **English, Hindi, Kannada, and Marathi** (auto-detects your language)
- Every morning delivers 3 specific, data-driven business insights
- Chat interface for natural language queries:
  - *"Aaj kitna udhaar diya?"*
  - *"Sabse badi udhaar list dikhao"*
  - *"Is mahine GST kitna banta hai?"*
- Returns structured action cards for confirmations

### 💳 Razorpay Payments + UPI AutoPay
- Standard UPI / Card / Net Banking payments
- **UPI AutoPay mandates** — auto-deduct when balance exceeds threshold
- Webhook-verified payment processing
- Payout dashboard with T+1/T+2 settlements
- Payment link generator with QR

### ⚖️ 5-Stage Legal Escalation Ladder
Fully automated via daily cron job (9 AM IST):

| Days Overdue | Action |
|---|---|
| 7 days | WhatsApp friendly reminder |
| 30 days | Formal warning message |
| 60 days | Legal notice PDF generated |
| 90 days | AutoPay force-trigger |
| 365 days | Legal complaint assistance |

### 📊 Udhaar Score Engine
A proprietary 0–100 credit score, auto-recalculated daily:
- **+20** for paying within 7 days
- **+15** for 3+ consecutive on-time payments
- **-30** for 90+ days overdue
- **+5** AutoPay active / **-15** AutoPay cancelled
- **-25** for suspicious activity flag

### 🧾 GST Billing
- Full invoice creation with line items, HSN codes, GST rates (5/12/18/28%)
- Auto-calculation of CGST + SGST
- PDF download and WhatsApp sharing
- GSTR-1 and GSTR-3B monthly summaries
- Filing deadline countdown with alerts
- Export CSV for CA sharing

### 📦 Inventory Management
- Stock levels with reorder alerts
- Color-coded: In Stock (green) | Low (amber) | Out of Stock (red)
- AI-powered reorder suggestions from Munafa
- Purchase order PDF generation
- Stock movement log (purchase in / sale out / manual)

### 🌐 Multi-language Support
Full UI in **4 languages** via i18next:
- English
- हिंदी (Hindi)
- ಕನ್ನಡ (Kannada)
- मराठी (Marathi)

---

## 🛠 Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| React 18 + Vite | Core framework, fast HMR builds |
| TailwindCSS | Utility-first responsive styling |
| React Router v6 | Protected + nested routing |
| @tanstack/react-query | Server state, caching, background sync |
| Axios | HTTP client with JWT interceptors |
| Recharts | All charts and analytics |
| React Hook Form + Zod | Form validation |
| i18next | 4-language internationalization |
| QRCode.react | QR code generation |
| html2canvas + jsPDF | Invoice PDF download |
| React Webcam | Face selfie capture for KYC |

### Backend
| Package | Purpose |
|---|---|
| Node.js 20 LTS + Express.js | Server framework |
| MongoDB Atlas + Mongoose | Primary database + ODM |
| JWT (access 15min + refresh 7d) | Authentication |
| bcryptjs (12 rounds) | Password hashing |
| Helmet.js | Security headers |
| express-rate-limit | Brute force protection |
| Razorpay Node.js SDK | Payments + AutoPay mandates |
| @anthropic-ai/sdk | Claude AI integration |
| node-cron | Scheduled jobs (9 AM daily) |
| multer + sharp | Image upload processing |
| crypto (AES-256-GCM) | Field-level encryption |

### AI & Integrations
- **AI Model:** `claude-sonnet-4-6` via Anthropic API
- **Payments:** Razorpay (UPI, Cards, AutoPay, Webhooks)
- **Storage:** MongoDB Atlas
- **Fonts:** Google Fonts — Inter + Noto Sans Devanagari

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary (Saffron) | `#FF6B00` |
| Secondary (Forest Green) | `#1A7A4A` |
| Accent (Gold) | `#F5A623` |
| Background | `#FFF8F0` |
| Danger | `#DC2626` |
| Warning | `#F59E0B` |
| Success | `#16A34A` |

**UI Principles:**
- Mobile-first (designed for 375px screens)
- Bottom nav on mobile, sidebar on desktop (≥768px)
- Indian number format: ₹1,00,000 (not ₹100,000)
- Dates in DD MMM YYYY format (e.g., 15 Apr 2026)
- Loading skeleton screens on all data fetches
- Empty state illustrations with helpful messages

---

## 🏗 Architecture

```
vyapar-ai-cfo/
├── frontend/                    # React 18 + Vite
│   └── src/
│       ├── components/          # UI, layout, udhaar, payment, AI components
│       ├── pages/               # 13 pages (landing, auth, shopkeeper, udhaarist)
│       ├── services/            # API service layer (axios)
│       ├── hooks/               # Custom React hooks
│       ├── context/             # Auth + App context
│       ├── utils/               # Currency, date, score formatters
│       └── i18n/                # en / hi / kn / mr locale files
│
├── backend/                     # Node.js 20 + Express
│   └── src/
│       ├── models/              # 10 Mongoose schemas
│       ├── controllers/         # Business logic (9 controllers)
│       ├── routes/              # REST API routes (9 route files)
│       ├── middleware/          # Auth, rate limit, audit logger, validator
│       └── services/            # Razorpay, AI, QR, Score, Escalation, Notifications
│
└── docs/                        # Architecture + API documentation
```

### Database Models
- `User` — Shopkeeper account with 2FA, device tracking, plan info
- `Store` — Store profile, QR token, Razorpay account, theme preference
- `Customer` — Udhaarist KYC, encrypted fields, AutoPay mandate, Udhaar Score
- `Udhaar` — Credit transaction ledger with running balance
- `Payment` — Payment records linked to Razorpay
- `Inventory` — Stock items with HSN, reorder levels
- `Invoice` — GST invoices with line items
- `AutoPayMandate` — Razorpay subscription/mandate tracking
- `Alert` — System-generated alerts
- `AuditLog` — Security audit trail for every action

---

## 🔐 Security

VyaparAI CFO implements military-grade security across all layers:

- **JWT Strategy:** Access tokens (15 min) in memory; Refresh tokens (7 days) in `httpOnly` cookies only — never in `localStorage`
- **AES-256-GCM Encryption:** Phone numbers, email addresses, face photos, and home addresses are encrypted at the field level before saving to MongoDB. Each field uses a unique IV.
- **Password Policy:** bcrypt with 12 salt rounds. Minimum 8 chars, must include uppercase, number, and special character.
- **OTP Security:** 6-digit OTP, 5-minute expiry, max 3 attempts, 10-minute lockout, max 3 requests/hour per phone.
- **Rate Limiting:**
  - Auth endpoints: 5 requests / 15 min per IP
  - OTP: 3 requests / hour per phone
  - AI chat: 30 requests / min per user
  - Payments: 10 requests / min per user
- **Multi-tenancy Isolation:** Every database query is filtered by `storeId` + authenticated user's `storeId`. Cross-store data access is architecturally impossible.
- **Razorpay Webhooks:** HMAC-SHA256 signature verification on every incoming webhook before processing.
- **Audit Logging:** Every significant action (login, add udhaar, payment received, legal notice, settings change) is written to the `AuditLog` collection with userId, IP, timestamp, and endpoint.
- **Helmet.js:** Full suite of security headers including CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20 LTS
- MongoDB Atlas account
- Razorpay account (test keys work)
- Anthropic API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/vyapar-ai-cfo.git
cd vyapar-ai-cfo
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables (see below)
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev
```

### 4. Seed Demo Data
```bash
cd backend
npm run seed
```
This loads **Sharma General Store, Davangere** with 10 realistic customers, 8 products, 30 days of transaction history, and 5 GST invoices.

---

## ⚙️ Environment Variables

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vyapar_ai_cfo
JWT_SECRET=your_super_long_random_jwt_secret_minimum_64_chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
REFRESH_TOKEN_SECRET=another_long_random_secret_minimum_64_chars
ENCRYPTION_KEY=64_char_hex_key_for_aes_256_gcm
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
VITE_APP_NAME=Vyapar AI CFO
VITE_QR_BASE_URL=http://localhost:5173/qr
```

---

## 📱 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/register` | Multi-step Store Registration | Public |
| `/login` | Login (OTP + Password) | Public |
| `/qr/:storeQRToken` | Customer QR Onboarding | Public |
| `/dashboard` | Shopkeeper Dashboard | Protected |
| `/udhaar` | Udhaar Ledger | Protected |
| `/give-udhaar` | Give Udhaar + QR System | Protected |
| `/customers/:id` | Customer Detail Page | Protected |
| `/gst` | GST Billing + Invoices | Protected |
| `/inventory` | Inventory Management | Protected |
| `/payouts` | Payout Dashboard | Protected |
| `/ai` | Aadaya AI Chat | Protected |
| `/settings` | Settings (5 tabs) | Protected |
| `/my-udhaar` | Udhaarist Dashboard | Customer |

---

## 🤖 Munafa — AI CFO System Prompt

Munafa is configured with deep context about Indian MSME finance. He:
- Responds in the user's language (auto-detected)
- Uses ₹ and Indian number format in all responses
- Has access to the store's live financial data on every message
- Returns structured JSON action cards for confirmed operations
- Proactively flags suspicious patterns in customer data
- Provides specific rupee-amount advice, never generic suggestions

---

## ⏰ Scheduled Jobs

| Job | Schedule | Action |
|---|---|---|
| Legal Escalation Ladder | Daily at 9 AM IST | Checks all overdue customers, auto-escalates stage |
| Udhaar Score Recalculation | Daily at 9 AM IST | Recalculates score for all customers with balance |
| AutoPay Trigger Check | Every 30 minutes | Checks mandates due for deduction |
| Daily AI Briefing | Daily at 7 AM IST | Generates Munafa's morning insights for each store |

---

## 📊 Demo Data (Seed)

**Store:** Sharma General Store, Davangere, Karnataka
**GSTIN:** 29AAPFS1234C1Z5

| Customer | Balance | Days Overdue | Score | Status |
|---|---|---|---|---|
| Raju Yadav | ₹12,000 | 91 days | 15 | 🔴 Stage 5 + Suspicious |
| Mohan Lal | ₹8,000 | 65 days | 22 | 🔴 Stage 3, AutoPay Failed |
| Ramesh Kumar | ₹4,500 | 35 days | 45 | 🟡 Stage 2, AutoPay Active |
| Pappu Singh | ₹3,000 | 15 days | 67 | 🟡 AutoPay Active |
| Kamla Bai | ₹2,200 | 20 days | 55 | 🟡 No AutoPay |
| Sunita Devi | ₹1,200 | 5 days | 82 | 🟢 AutoPay Active |
| Rekha Gupta | ₹900 | 3 days | 73 | 🟢 AutoPay Active |
| Lalita Sharma | ₹700 | 2 days | 88 | 🟢 No AutoPay |
| Geeta Bai | ₹500 | Today | 91 | 🟢 No AutoPay |
| Vikram Patel | ₹0 | — | 95 | ✅ Model Customer |

---

## ✅ Launch Checklist

- [ ] Shopkeeper registers in under 3 minutes with store photo
- [ ] Dashboard shows 4 KPI cards, AI briefing, cash flow chart
- [ ] 4 dashboard themes visually distinct
- [ ] Udhaar list shows score gauges, legal badges, suspicious flags
- [ ] QR code downloadable as PNG and A4 PDF poster
- [ ] Customer scans QR → selfie → AutoPay → success in under 5 minutes
- [ ] Razorpay checkout processes payment end-to-end (test mode)
- [ ] AutoPay mandate creation works
- [ ] Munafa responds in Hindi and English with live store context
- [ ] Voice input shows recording waveform animation
- [ ] Language toggle switches all text (EN/HI/KN/MR)
- [ ] GST invoice creates with auto tax + PDF download
- [ ] Legal escalation badges visible on Raju Yadav, Mohan Lal
- [ ] Suspicious flag visible on Raju Yadav
- [ ] All numbers in Indian format: ₹1,00,000
- [ ] All dates in DD MMM YYYY format
- [ ] Loading skeleton screens on all data fetches
- [ ] Toast notifications on all key actions
- [ ] Fully responsive at 375px mobile width
- [ ] Audit log records all major actions
- [ ] No console errors in production build

---

## 🚨 Absolute Rules (Never Break These)

1. **Never** store raw card numbers, UPI VPAs, or Aadhaar — Razorpay handles all payment credentials (PCI-DSS compliant)
2. **Never** expose JWT refresh tokens in `localStorage` — `httpOnly` cookies only
3. **Never** skip input validation on any endpoint — `express-validator` on every route
4. **Never** trust client-side data — re-validate amount, customerId, storeId on every backend call
5. **Always** verify Razorpay webhook HMAC signature before processing any payment event
6. **Always** encrypt face photos, phone numbers, and addresses before persisting
7. **Never** allow cross-store data access — filter every query by authenticated user's storeId
8. **Always** log to AuditLog on: login, add udhaar, payment received, legal notice, settings change
9. **Never** skip error handling — every async function must have try/catch
10. **Always** use HTTPS in production — force SSL redirect

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Munafaakumar S H**

Built with ❤️ for Bharat's 6.3 Crore Store Owners.

---

<div align="center">

**VyaparAI CFO** — Powered by [Anthropic Claude](https://anthropic.com) • Payments by [Razorpay](https://razorpay.com) • Made in India 🇮🇳

</div>

