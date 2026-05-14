# 🎓 School ERP 2 (SchoolSinc2)

Welcome to **School ERP 2**, a modern, full-stack educational resource planning platform designed to streamline school administration, enhance faculty productivity, and empower students and parents with real-time academic insights. 

Built for performance and reliability, the application utilizes a serverless PostgreSQL database (Neon) for flawless deployment on Vercel.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS (with highly customized utility classes)
- **UI Components:** Radix UI / shadcn-ui
- **Database ORM:** Prisma
- **Database Engine:** Serverless PostgreSQL (Neon)
- **Authentication:** NextAuth.js
- **Data Export:** Built-in client-side CSV generation
- **Charts:** Recharts
- **Icons:** Lucide React

---

## 🌟 Key Features & Role Portals

The platform provides dedicated, highly secured portals for four main roles:

### 1. 👨‍💼 Admin Portal
Provides comprehensive oversight and management of the entire institution:
- **Dashboard & Analytics:** High-level overview of school operations, active users, and financial health.
- **Student Directory:** View, search, and filter students. Includes a **one-click CSV Export** feature to download student data directly to Excel.
- **Interactive Notice Board:** Fully interactive "Quick Actions" dashboard. Click to open modal dialogs to draft and publish School Announcements, Emergency Alerts, and Fee Reminders instantly to the live board.
- **User Management:** Securely onboard new Staff, Students, and Parents (automatically generates linked parent accounts).
- **Finance:** Monitor fee ledgers, payments, and financial health.

### 2. 👩‍🏫 Faculty Portal
Empowers teachers to manage their academic responsibilities:
- **Academics & Tasks:** Plan lessons and manage daily tasks via an integrated task board.
- **Attendance:** Mark and review daily student attendance.
- **Leaves:** Apply for and track personal leaves.
- **Students & Notices:** Access student profiles and view school notices pushed by administration.

### 3. 🎓 Student Portal
Offers tools for students to track their academic progress:
- **Dashboard & Timetable:** View daily schedules and overall status.
- **Exams & Performance:** Access exam schedules, results, and performance analytics.
- **Resources:** Download study materials, worksheets, and view progress reports.
- **Leaves & Notices:** Apply for leaves and stay updated with school announcements.

### 4. 👨‍👩‍👧 Parent Portal
Enables parents to stay involved in their child's education:
- **Child's Dashboard:** Monitor attendance, timetable, and overall performance.
- **Finance:** View fee ledgers, pending dues, and payment history.
- **Exams & Reports:** Access report cards and upcoming exam schedules.

---

## 🛠 Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- A free [Neon.tech](https://neon.tech/) account (for the Serverless Postgres database)

---

## ⚙️ Local Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root of your project and add the following details. You can get your Postgres connection string from your Neon dashboard:
   ```env
   # Database Configuration (Neon Serverless PostgreSQL)
   DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

   # NextAuth Secret
   # You can generate one using: `openssl rand -base64 32`
   AUTH_SECRET="your-secure-random-secret-key-here"
   ```

3. **Database Setup:**
   Synchronize your Prisma schema with your fresh Neon database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed the Database:**
   Populate the database with initial sample data (Admin, Faculty, Student, Parent, and dummy resources):
   ```bash
   npm run prisma:seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Vercel Deployment Instructions

This project is perfectly optimized for immediate deployment on Vercel. To deploy:

1. Push your code to a GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. Before clicking "Deploy", expand the **Environment Variables** section and add:
   - `DATABASE_URL`: Your Neon Postgres connection string.
   - `AUTH_SECRET`: Your NextAuth secret key.
4. Click **Deploy**.

### Troubleshooting Vercel Deployments:
*   **"Vercel Login Page" or "Unauthorized" when sharing the link:** This happens because Vercel automatically protects preview deployments. Go to your Vercel Project **Settings** -> **Deployment Protection** -> Toggle **Vercel Authentication OFF**.
*   **500 Application Error:** This means the application cannot connect to the database. Ensure your `DATABASE_URL` is correctly pasted in Vercel's Environment Variables and that you have clicked **Redeploy**.

---

## 📁 Project Structure

- `app/`: Next.js App Router containing public routes and API endpoints.
- `app/(protected)/`: Dedicated role-based portals (`admin`, `faculty`, `student`, `parent`).
- `components/`: Reusable React components (UI elements, forms, layouts, dialogs, charts).
- `actions/`: Next.js Server Actions for secure database mutations (e.g., `admin-create-user.ts`).
- `lib/`: Utility functions and configuration files (e.g., Prisma client initialization).
- `prisma/`: Prisma schema (`schema.prisma`) and seed scripts.
- `public/`: Static assets like images and fonts.

---

## 📄 License
This project is proprietary and confidential.
