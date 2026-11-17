# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นางสาวกัญจณะ คุ้มทรัพย์ 
**รหัสนักศึกษา:** 68030013
**วันที่สอบ:** 14 / พ.ย. / 2569

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (local Docker staging; Neon planned for cloud) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | ยังไม่ได้ Deploy; Local: http://localhost:80 |
| Backend API | ยังไม่ได้ Deploy; Local: http://localhost:3002 |
| Health Check| http://localhost:3002/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** การเชื่อมต่อ payment gateway จริง และ load/stress test บน Production

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 16 (Neon.tech) |
| Browser   | Microsoft Edge 157.0.4341.60 |
| OS        | Windows 11 (10.0.26200) |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| การชำระเงินผิดพลาด | สูญเสียรายได้และทำให้ยอดบัญชีไม่ตรง | P1 |
| ออเดอร์ซ้ำ/จัดโต๊ะผิด | ครัวเตรียมอาหารซ้ำและกระทบการให้บริการ | P2 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test
Test Files: 2 passed | Tests: 20 passed
```

### Newman Pass Rate
```
Requests: 21 | Passed: 21 | Failed: 0 | Assertions: 27/27 | Pass Rate: 100%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | 200 + JWT | Pass |
| TC-005 | Auth | Wrong password | 401 | 401 | Pass |
| TC-007 | Security | No token | 401 | 401 | Pass |
| TC-010 | Security | SQL Injection | Empty/400 | 200, no unintended rows | Pass |
| TC-011 | Security | Waiter update price | 403 | 403 | Pass |
| TC-015 | Order | Double booking | 409 | 409 | Pass |
| TC-019 | Payment | Underpayment | 400 | 400 | Pass |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

## BUG-001: ปฏิเสธการชำระเงินต่ำกว่ายอดรวม (แก้ไขแล้ว)

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`
**Status:** Fixed and verified by Newman TC-019

### Steps to Reproduce
1. สร้างและยืนยันออเดอร์ที่มียอดรวมมากกว่า 1
2. ส่งยอดชำระที่ต่ำกว่ายอดรวมไปยัง endpoint

### Expected / Actual Result
Expected: HTTP 400 และไม่มีการบันทึก Payment หรือเปลี่ยนสถานะออเดอร์
Actual (ก่อนแก้): อนุญาตให้คำนวณ change ติดลบ; หลังแก้ Newman TC-019 ได้ HTTP 400 พร้อมข้อความ insufficient payment

### Business Impact
...

---

## 🚀 Deployment Guide

<!-- ส่วนที่ 5 -->

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
# Student repository: https://github.com/lucenamadearson/RMS-Exam-2025-68030013
# โฟลเดอร์ workspace ปัจจุบันไม่มี Git metadata; clone repository ก่อนใช้งาน:
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:${BACKEND_PORT:-3001}/api/health
# Vite reads BACKEND_PORT from root .env for its /api proxy (defaults to 3001).
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env
npm install && npx prisma db push && npm run db:seed && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Set locally; never commit secrets |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://your-app.vercel.app` |

### Neon PostgreSQL Database Setup
1. Create or select a PostgreSQL 16 project in Neon.
2. Set its rotated connection string as `DATABASE_URL` in Render's environment settings.
3. Run `npx prisma db push` to create the schema before seeding.

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://your-backend.onrender.com/api`

### Render Deployment (Backend + Database)
1. สร้าง PostgreSQL database บน Render (ตามขั้นตอนด้านบน)
2. New Web Service → Connect GitHub repo → เลือก branch
3. Root Directory: (ว่าง) หรือ `backend` ถ้าใช้ Dockerfile แยก
4. Environment: Docker
5. Build Command: (ว่าง - ใช้ Dockerfile)
6. Start Command: (ว่าง - ใช้ Dockerfile CMD)
7. Add Environment Variables ใน Environment tab:
   - `DATABASE_URL`: จาก database ที่สร้าง
   - `JWT_SECRET`: random string
   - `CORS_ORIGIN`: frontend URL
8. Deploy → Monitor logs

หรือใช้ `render.yaml` สำหรับ auto-configuration:
- Push `render.yaml` ไป GitHub
- ใน Render Dashboard → Settings → YAML → Enable

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅ Pass (local staging) |
| Login | POST /api/auth/login | ✅ Pass (local staging) |
| Add Menu | POST /api/menu | ✅ Pass (Newman) |
| Open Order | POST /api/orders | ✅ Pass (Newman) |
| Payment | POST /api/payments | ✅ Pass (Newman) |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
Local verification: Backend Vitest 20/20, Newman 21/21 requests and 27/27 assertions, frontend production build passed. GitHub Actions has not been verified from the Student Repository.

Frontend/API smoke evidence: [`tests/reports/frontend-api-smoke.txt`](./tests/reports/frontend-api-smoke.txt) and [`tests/reports/frontend-login.png`](./tests/reports/frontend-login.png).
```

---

## 🔐 Default Credentials (Testing Only)

These seeded accounts are for local testing only. Replace credentials and secrets before any public deployment.

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
