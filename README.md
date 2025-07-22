🩺 Market Survey Tool for Oncology Physicians

A modern and scalable Market Survey Tool built with Next.js 15, Tailwind CSS 4, and Supabase to support sales teams in the healthcare sector. This tool is designed to gather detailed insights from oncologists and hematologists regarding their patient distribution, hospital affiliations, funding sources, and treatment cases.

📌 Built by a healthcare software developer for an organization that serves cancer patients, with a mission to make data collection seamless and impactful.

📦 Features

👤 User authentication via Supabase

🏥 Multi-hospital data entry

📈 Real-time calculations and validations

💾 Secure and structured storage of survey responses

📊 Visual layout for patient and case distribution

🚀 Tech Stack

Frontend: Next.js 15, React 19

Styling: Tailwind CSS 4

Backend: Supabase (Auth + DB)

UI: Radix UI, Lucide Icons

Tooling: ESLint, PostCSS, Tailwind Merge

📊 Survey Flow & Logic:

👤 User Role

A salesperson logs in and initiates a new physician survey.

📝 Physician Details:

Full Name

Speciality

Number of hospital tie-ups

🏥 Per-Hospital Information

For each tied-up hospital (e.g., Tata Memorial Hospital):

Patient Volumes

Number of BMT Patients

Number of Patients in a Month

💰 Source of Funds Distribution

(Values accepted as patient counts, auto-calculated % based on total patients)

OOP without Insurance

OOP with Insurance

CGHS

ESI

Railways

ECHS

PSUs

State Government

🔎 Patient Case Distribution by Hospital (%)

Newly Diagnosed

Relapsed/Refractory

2nd Opinion

🧬 Patient Diagnosis Distribution (%)

% ALL Patients

% Other Hemat Malignancies

% NHL Patients

% Glioblastomas

% MM Patients

% Other Solid Tumours

✅ Total (%) - Auto validated to be 100%

🔐 Authentication & Data Storage

Supabase Auth for user login (email/password)

Role-based access (salesperson scope)

Survey data linked to authenticated user

Responses stored in Supabase Tables (normalized)

📁 Project Structure

/
├── app/                   # Next.js 15 App Directory
│   └── survey/            # Survey form pages and logic
├── components/            # Reusable UI components
├── supabase/              # Supabase client and helpers
├── utils/                 # Data transformation and validation utils
├── styles/                # Tailwind & global stylesheets
└── package.json           # Project dependencies and scripts

🛠️ Getting Started

1. Clone the Repository

git clone https://github.com/your-username/physician-survey-form.git
cd physician-survey-form

2. Install Dependencies

npm install

4. Run the App

npm run dev

🧪 Scripts

npm run dev     # Start dev server
npm run build   # Create production build
npm run start   # Start production server
npm run lint    # Run linter

✅ Future Enhancements

CSV/Excel Export for Survey Data

Analytics Dashboard

Multi-device support

Physician search & autocomplete


🙋‍♂️ Author

Sanket RathodLead Software Developer @ ImmunoACTHelping build better tools to fight cancer 🧬

GitHub • LinkedIn

