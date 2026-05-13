# School ERP 2

Welcome to **School ERP 2**, a modern, full-stack educational resource planning platform built to streamline school management processes for administrators, faculty members, students, and parents.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn-ui
- **Database ORM:** Prisma
- **Database Engine:** SQLite (configured for local development)
- **Authentication:** NextAuth.js
- **Charts:** Recharts
- **Icons:** Lucide React

## 🌟 Key Features

The platform provides dedicated portals for four main roles:

### 1. 👨‍💼 Admin Portal
Provides full oversight and management of the institution:
- **Dashboard & Analytics:** High-level overview of school operations.
- **Academics & Exams:** Manage classes, subjects, and examination schedules.
- **User Management:** Onboard and manage Staff and Students.
- **Finance:** Monitor fee ledgers, payments, and financial health.
- **Leaves & Meetings:** Approve staff/student leaves and schedule meetings.
- **Communication:** Broadcast notices and events to specific or all roles.

### 2. 👩‍🏫 Faculty Portal
Empowers teachers to manage their academic responsibilities:
- **Academics & Tasks:** Plan lessons and manage daily tasks.
- **Attendance:** Mark and review daily student attendance.
- **Leaves:** Apply for and track personal leaves.
- **Students & Notices:** Access student profiles and view school notices.
- **Finance:** View salary and related financial details.

### 3. 🎓 Student Portal
Offers tools for students to track their academic progress:
- **Dashboard & Timetable:** View daily schedules and overall status.
- **AI Assistant:** Get automated assistance with studies and platform queries.
- **Exams & Performance:** Access exam schedules, results, and performance analytics.
- **Resources & Reports:** Download study materials and view progress reports.
- **Gamification:** Track streaks, achievements, and leaderboard rankings.
- **Leaves & Notices:** Apply for leaves and stay updated with school announcements.

### 4. 👨‍👩‍👧 Parent Portal
Enables parents to stay involved in their child's education:
- **Child's Dashboard:** Monitor attendance, timetable, and overall performance.
- **Finance:** View fee ledgers, pending dues, and payment history.
- **Exams & Reports:** Access report cards and upcoming exam schedules.
- **Achievements & Leaderboard:** Celebrate the child's academic and extra-curricular milestones.
- **Leaves & Notices:** Apply for leaves on behalf of the child and receive school updates.

## 🛠 Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

## ⚙️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install / bun install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root of your project and add the following:
   ```env
   # Database Configuration (SQLite)
   DATABASE_URL="file:./dev.db"

   # NextAuth Secret
   # You can generate one using: `openssl rand -base64 32`
   AUTH_SECRET="your-secret-key-here"
   ```

3. **Database Setup:**
   Run Prisma migrations to generate the client and push the schema to the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed the Database (Optional but recommended):**
   Populate the database with initial sample data:
   ```bash
   npm run prisma:seed
   # The package.json contains "prisma": { "seed": "npx tsx prisma/seed.ts" }
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

## 📁 Project Structure

- `app/`: Next.js App Router containing public routes and API endpoints.
- `app/(protected)/`: Dedicated role-based portals (`admin`, `faculty`, `student`, `parent`).
- `components/`: Reusable React components (UI elements, forms, layouts).
- `lib/`: Utility functions and configuration files.
- `prisma/`: Prisma schema (`schema.prisma`) and seed scripts.
- `public/`: Static assets like images and fonts.

## 📄 License
This project is proprietary and confidential.
