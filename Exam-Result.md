# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | นางสาวกัญจณะ คุ้มทรัพย์ |
| รหัสนักศึกษา | 68030013 |
| วันที่สอบ | 14 พ.ย. 2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Repository:** `https://github.com/lucenamadearson/RMS-Exam-2025-68030013` (ได้รับ URL จากนักศึกษา; ยังไม่ได้ยืนยันการเข้าถึงจาก workspace)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js 22 LTS + Express + TypeScript |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM | Prisma |
| Testing | Vitest (Unit) + Newman (E2E) |
| Container | Docker / Docker Compose |
| CI/CD | GitHub Actions |

---

## Production URLs

ระบบ Cloud ยังไม่ได้ Deploy; ผลด้านล่างจึงแสดงเฉพาะ local staging

| Service | URL (กรอก URL จริง) | สถานะ |
|---------|---------------------|-------|
| Frontend | ยังไม่ได้ Deploy; local `http://localhost:5173/login` (Vite) / `http://localhost:80` (Docker) | — |
| Backend | ยังไม่ได้ Deploy; local `http://localhost:3002` | — |
| API Health Check (`/api/health`) | `http://localhost:3002/api/health` — HTTP 200 | ✅ Local |
| Database | PostgreSQL 16 ใน Docker Compose; Neon ยังไม่ได้ทดสอบ | ✅ Local |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | ยืนยันการเข้าสู่ระบบและป้องกันการเข้าถึง API โดยไม่มี/ใช้ token ไม่ถูกต้อง |
| Menu | ตรวจสอบรายการและการจัดการเมนู รวมถึงสิทธิ์ตามบทบาท |
| Order | ตรวจสอบการเปิดโต๊ะ เพิ่มรายการ ยืนยัน และป้องกันออเดอร์ซ้ำ |
| Payment | ตรวจสอบยอดชำระ เงินทอน และการปฏิเสธยอดที่ต่ำกว่ายอดรวม |
| Report | ตรวจสอบว่ายอดขายที่รายงานสอดคล้องกับรายการชำระเงิน |
| Security | ตรวจสอบ JWT, role-based access, input ที่ไม่ปลอดภัย และช่องโหว่ dependency |

#### Out of Scope
| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| การเชื่อมต่อผู้ให้บริการชำระเงินจริง | ระบบทดสอบบันทึกวิธีชำระเงินในฐานข้อมูล ไม่มีการเชื่อมต่อธนาคารหรือ payment gateway |
| Load/Stress test ระดับ Production | ต้องใช้สภาพแวดล้อมและปริมาณผู้ใช้ที่ได้รับอนุมัติแยกต่างหาก |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบการคำนวณเงินทอนและกฎตรวจสอบยอดชำระ |
| API Testing (E2E) | Postman / Newman | รัน Collection 21 กรณีกับ API ที่เชื่อม PostgreSQL และตรวจ status/response ด้วย pm.test |
| Security Testing | Newman + npm audit | ตรวจ JWT, สิทธิ์ role, input ค้นหา และ dependency ที่มีช่องโหว่ระดับ high ขึ้นไป |
| Smoke Testing | Manual | ตรวจ health check, login, เปิดออเดอร์ และชำระเงินหลังติดตั้ง |
| Staging Test | Docker Compose | สร้าง PostgreSQL, backend และ frontend แล้วตรวจการสื่อสารระหว่าง service |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 (10.0.26200) |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| Docker | 29.6.1 |
| PostgreSQL | 16 (local Docker Compose; Neon not yet connected) |
| Browser | Microsoft Edge 157.0.4341.60 |
| Newman | 6.2.3 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria
- Backend และ Frontend รันใน local ได้; workspace นี้ไม่มี Git metadata
- ใช้ PostgreSQL ใน Docker สำหรับ staging; Neon ยังไม่เชื่อมต่อ
- `/api/health` ตอบ `{"status":"ok"}` บน local staging
- Postman Collection ผ่าน 21 requests

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 80% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | ยังไม่ทดสอบ — ไม่มี Production deployment |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | การชำระเงิน | ยอดผิดหรือเงินทอนติดลบทำให้ร้านสูญเสียรายได้และบัญชีไม่ตรง | Critical |
| 2 | การเปิดออเดอร์/จองโต๊ะ | ออเดอร์ซ้ำอาจทำให้ครัวเตรียมอาหารซ้ำและโต๊ะถูกจัดการผิด | High |
| 3 | การยืนยันตัวตนและสิทธิ์ | ผู้ใช้ที่ไม่มีสิทธิ์อาจเข้าถึงข้อมูลหรือแก้ไขเมนู/ออเดอร์ | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 + JWT | ✅ Pass |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 | ✅ Pass |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | HTTP 401 | ✅ Pass |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: testOrderId, amountPaid: exactTotal}` | HTTP 201 + change = 0 | HTTP 201 + change = 0 | ✅ Pass |
| TC-005 | Positive | Menu | ดึงรายการเมนู | GET /api/menu พร้อม token | HTTP 200 และได้รายการเมนู | HTTP 200 + array | ✅ Pass |
| TC-006 | Positive | Order | เปิดออเดอร์สำหรับโต๊ะว่าง | `{tableId: 2}` พร้อม token | HTTP 201 และสถานะออเดอร์เป็น open | HTTP 201 + open | ✅ Pass |
| TC-007 | Negative | Payment | ชำระเงินต่ำกว่ายอดรวม | `{orderId: confirmedOrderId, amountPaid: 1}` | HTTP 400 และไม่สร้าง Payment | HTTP 400 Insufficient payment amount | ✅ Pass |
| TC-008 | Negative | Auth / Role | Waiter พยายามแก้ราคาเมนู | PUT /api/menu/:id ด้วย waiter token | HTTP 403 Forbidden | HTTP 403 | ✅ Pass |
| TC-009 | Security | Menu | ค้นหาด้วยข้อความ SQL injection | `GET /api/menu?search=' OR '1'='1` | ไม่รัน input เป็น SQL; HTTP 200 | HTTP 200, ไม่คืนข้อมูลที่ไม่ตรงคำค้น | ✅ Pass |
| TC-010 | Security | Auth | เรียก API ด้วย token ปลอม | `Authorization: Bearer invalid.token.value` | HTTP 401 Unauthorized | HTTP 401 | ✅ Pass |
| TC-011 | Edge | Order | เปิดออเดอร์ซ้ำบนโต๊ะที่มีออเดอร์ open | สร้างออเดอร์ 2 ครั้งด้วย tableId เดิม | ครั้งที่สอง HTTP 409 และไม่มีออเดอร์ซ้ำ | HTTP 409 | ✅ Pass |

**สรุปผล:** ผ่าน 11 / 11 กรณี (100%); Vitest ผ่าน 20 / 20 tests; Newman ผ่าน 21 / 21 requests และ 27 / 27 assertions

ผล Vitest ฉบับเต็ม: [vitest-backend-result.txt](./tests/reports/vitest-backend-result.txt)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030013-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030013-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env-ci.json` (local test used base_url override to port 3002) |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | `http://localhost:3002/api` ใน Newman local run | Base URL ของ Backend API |
| `{{token}}` | ตั้งค่าอัตโนมัติจาก login test | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | ตั้งค่าอัตโนมัติจาก admin login | Request ที่ต้องการสิทธิ์ Admin |

#### pm.test Scripts ใน Collection
> ⚠️ ทุก Request ใน Collection ต้องมี `pm.test(...)` ตรวจสอบ Response  
> ตัวอย่าง:
> ```javascript
> pm.test("Status code is 200", function () {
>     pm.response.to.have.status(200);
> });
> pm.test("Response has JWT token", function () {
>     const jsonData = pm.response.json();
>     pm.expect(jsonData).to.have.property('token');
> });
> ```

**ทุก Request มี pm.test แล้ว:** ✅ ใช่ (21 test scripts, 27 assertions)

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-002 Admin Login | POST | `/api/auth/login` | HTTP 200 + JWT | ✅ Pass |
| TC-008 Get Menu | GET | `/api/menu` | HTTP 200 + array | ✅ Pass |
| TC-019 Underpayment | POST | `/api/payments` | HTTP 400 Insufficient payment amount | ✅ Pass |

**สรุป:** ผ่าน 21 / 21 Request

#### Postman Evidence

Collection: [RMS-68030013-TestSuite.json](./tests/postman/RMS-68030013-TestSuite.json); environment: [env-ci.json](./tests/postman/env-ci.json); run output: [newman-cli-result.txt](./tests/reports/newman-cli-result.txt).

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection กับ local staging (พอร์ต host 3002 เพราะ 3001 ถูกใช้งาน)
newman run tests/postman/RMS-68030013-TestSuite.json --environment tests/postman/env-ci.json --env-var "base_url=http://localhost:3002/api" --reporters cli
```

#### ผลการรัน Newman (Local)

**ผลจาก Newman บน local PostgreSQL staging:**

```
Requests: 21 | Failed: 0
Test scripts: 21 | Failed: 0
Assertions: 27 | Failed: 0
Pass rate: 100%
Duration: 2.8s | Average response: 50ms
```

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 21 |
| Tests Passed (assertions) | 27 |
| Tests Failed | 0 |
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`[Newman CLI output](./tests/reports/newman-cli-result.txt)`

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน workspace | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ยังไม่ได้รัน; workspace นี้ไม่มี Git metadata และยังไม่ได้ตรวจผลใน Student Repository |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ยังไม่มี Actions run; local Newman 21/21 requests, 27/27 assertions |

**CI Pass Rate:** ยังไม่มี Actions run; local Newman ผ่าน 21/21 requests และ 27/27 assertions (100%)

GitHub Actions image not available; local Newman output: [newman-cli-result.txt](./tests/reports/newman-cli-result.txt).

---

## Security Scan Report

> ส่วนที่ 3.4 — Rubric 1.7: รันทั้ง Backend + Frontend + บันทึกผล + ระบุ CVE + เพิ่มใน CI

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| **รวม** | 0 |

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| ไม่พบ | — | — | — | — | High/Critical ไม่พบ; audit ระดับ high ผ่าน |

**รูปที่ 5 — ผล npm audit Backend**

Backend audit summary: 0 vulnerabilities at `--audit-level=moderate` after updating Vitest and overriding vulnerable transitive `esbuild` and `qs` versions. [Full output](./tests/reports/npm-audit-backend.txt)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| **รวม** | 0 |

**รูปที่ 6 — ผล npm audit Frontend**

Frontend audit summary: 0 vulnerabilities. [Full output](./tests/reports/npm-audit-frontend.txt)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**เพิ่ม `npm audit --audit-level=high` ให้ backend และ frontend ใน `.github/workflows/cicd.yml`:** ✅ ใช่; local audits ผ่านเกณฑ์ high

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

Local audit outputs are saved at `tests/reports/npm-audit-backend.txt` and `tests/reports/npm-audit-frontend.txt`.

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: API ยอมรับการชำระเงินต่ำกว่ายอดรวม

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Payment |
| **Status** | Fixed and verified by Newman TC-019 |

#### Steps to Reproduce
1. เปิดออเดอร์และเพิ่มรายการอาหารให้มี totalAmount มากกว่า 0
2. ยืนยันออเดอร์
3. เรียก `POST /api/payments` ด้วย `{orderId, amountPaid}` ที่ต่ำกว่า totalAmount

#### Expected Result
> ควรตอบ HTTP 400 และไม่สร้าง Payment หรือเปลี่ยนสถานะออเดอร์

#### Actual Result
> ก่อนแก้ไข route คำนวณ `change` ติดลบ; หลังแก้ไข Newman TC-019 ได้ HTTP 400 พร้อม `Insufficient payment amount`

#### Evidence

[ผลทดสอบ BUG-001 ใน Newman CLI](./tests/reports/newman-cli-result.txt)

#### Business Impact
> หากเกิดขึ้นจริง ร้านอาจบันทึกรับเงินไม่ครบและยอดขาย/เงินทอนไม่ตรงกับเงินสดที่รับ

---

### BUG-002: เปิดออเดอร์ซ้ำบนโต๊ะเดียวกันได้

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** | Order Management |
| **Status** | Fixed and verified by Newman TC-015 |

#### Steps to Reproduce
1. เข้าสู่ระบบด้วย token ที่ถูกต้อง
2. สร้างออเดอร์สถานะ open สำหรับโต๊ะที่ว่าง
3. ส่ง `POST /api/orders` ซ้ำด้วย `tableId` เดิม

#### Expected Result
> คำขอครั้งที่สองควรตอบ HTTP 409 และไม่สร้างออเดอร์ซ้ำ

#### Actual Result
> ก่อนแก้ไข route อนุญาตให้สร้างออเดอร์ซ้ำ; หลังแก้ไข Newman TC-015 ได้ HTTP 409 เมื่อโต๊ะมี active order

#### Evidence

[ผลทดสอบ BUG-002 ใน Newman CLI](./tests/reports/newman-cli-result.txt)

#### Business Impact
> พนักงานครัวอาจได้รับรายการซ้ำ โต๊ะอาจถูกคิดเงินผิด และรายงานยอดขายคลาดเคลื่อน

---

## Deployment Guide

> ส่วนที่ 4 & 5 — คู่มือการติดตั้ง

### Prerequisites

| รายการ | เวอร์ชันที่ต้องการ |
|--------|------------------|
| Node.js | 22 LTS |
| Git | ล่าสุด |
| Docker | ล่าสุด |
| Docker Compose | v2+ |

---

### Local Setup (Docker Compose + Manual)

#### On-Premises Setup
> **ส่วนที่ 4.1 — ติดตั้งบนเครื่องตนเองในรูปแบบ On-Premises Server (8 คะแนน)**

**ขั้นตอนการติดตั้ง:**

```bash
# 1. Clone the assignment source repository
git clone https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# เปิดไฟล์ backend/.env แล้วกรอกค่า:
#   DATABASE_URL=postgresql://...
#   JWT_SECRET=...
#   CORS_ORIGIN=http://localhost:5173
#   NODE_ENV=development

# 3. รัน Backend (Port 3001)
cd backend && npm install && npm run dev

# 4. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd frontend && npm install && npm run dev
```

> ⚠️ **หมายเหตุเรื่อง Port**:
> - **Local / On-Premises**: ขั้นตอนกำหนด Port 3001 แต่ URL หลักฐานในข้อสอบระบุ `localhost:3000/api/health` ให้ตรวจสอบค่า `PORT` ใน `backend/.env.example` ของ Repository จริง แล้วใช้ port ที่ระบบรันจริง
> - Render Blueprint ตั้ง `PORT=10000`; ตั้งค่า `VITE_API_URL` เป็น URL จริงของ Backend หลังสร้าง service

#### การตั้งค่า Service / Port จริงที่ใช้ (Rubric 2.1 ข้อ 2)

| Service | Port ที่รันจริง | ค่า CORS_ORIGIN ที่ตั้ง | ค่า VITE_API_URL ที่ตั้ง |
|---------|---------------|------------------------|------------------------|
| Backend API | host 3002 → container 3001 | `http://localhost:5173` | — |
| Frontend | 80 | — | `/api` |

#### ผล Smoke Test — On-Premises

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3002/api/health` | `{"status":"ok"}` | ✅ Pass |
| Frontend | `http://localhost:5173/login` | Login page rendered in Edge; screenshot saved | ✅ Pass |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

Health check passed in Newman TC-001; see `tests/reports/newman-cli-result.txt`.

**Frontend smoke evidence:** [frontend-login.png](./tests/reports/frontend-login.png). API results: [staging-smoke.txt](./tests/reports/staging-smoke.txt)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

- [x] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [x] กำหนด Port Mapping: backend container → 3001 (host → 3002 บนเครื่องนี้), frontend → 80
- [x] เพิ่ม Health Check สำหรับ backend service
- [x] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | PostgreSQL container `db:5432/rms_db` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | `http://localhost:5173` (default) |
| `NODE_ENV` | backend | `production` |
| `VITE_API_URL` | frontend | `/api` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี | deps → builder → runner |
| Frontend | ✅ มี | builder → nginx |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

Dockerfiles: [backend/Dockerfile](./backend/Dockerfile) and [frontend/Dockerfile](./frontend/Dockerfile).

#### Volume Mapping (Rubric 2.5 ข้อ 4)

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| `postgres_data` | Docker-managed named volume | `/var/lib/postgresql/data` | เก็บข้อมูล PostgreSQL local |

#### Network Configuration (Rubric 2.5 ข้อ 5)

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `rms-exam-2025-68030013-main_default` | bridge | db, backend, frontend |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3002/api/health` (host) → container 3001 | `{"status":"ok"}` | ✅ Pass |
| Frontend | `http://localhost:80` | Container returned HTTP 200; visual evidence is Vite at port 5173 | ✅ Pass |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

`[Docker Compose status](./tests/reports/staging-docker-ps.txt)`; health output: [staging-smoke.txt](./tests/reports/staging-smoke.txt)

Latest image rebuild was not verified: BuildKit's frontend process stopped with SIGBUS, after which Docker Desktop reported that its engine could not start. Details: [docker-build-attempt.txt](./tests/reports/docker-build-attempt.txt).

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

Neon connection string was provided during setup but was not used for staging tests; the tested database is local PostgreSQL in Docker. Rotate the shared Neon credential before using it again.

---

### Render + Vercel Deployment Steps
> ส่วนที่ 5.2 & 5.3

#### Backend บน Render.com

> 📌 Repository มีไฟล์ `render.yaml` ที่ root — สามารถใช้ **New Blueprint** บน Render Dashboard เพื่อ Deploy อัตโนมัติจากไฟล์นี้แทนการตั้งค่าทีละอย่าง

```
Build Command:  docker build -t rms-backend ./backend
Dockerfile:     ./backend/Dockerfile
PORT:           10000  ← Render กำหนดให้ใช้ port นี้สำหรับ Docker service
```

> ⚠️ **PORT บน Render = 10000** เสมอ ไม่ใช่ 3001 — ต้องตั้งค่า `PORT=10000` ใน Environment Variables บน Render Dashboard ด้วย

#### Frontend บน Vercel

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

Cloud services have not been configured or deployed.

| Variable | Service | ค่าที่ตั้งจริงบน Cloud |
|----------|---------|----------------------|
| `PORT` | Backend (Render) | `10000` |
| `DATABASE_URL` | Backend (Render) | Not configured |
| `JWT_SECRET` | Backend (Render) | Not configured |
| `CORS_ORIGIN` | Backend (Render) | Not configured |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | Not configured |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

ยังไม่ได้ Deploy ระบบ Cloud จึงยังทดสอบ Production ไม่ได้

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ยังไม่ทดสอบบน Production |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ยังไม่ทดสอบบน Production |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ยังไม่ทดสอบบน Production |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ยังไม่ทดสอบบน Production |

**Production Smoke Test ผ่าน:** 0 / 4 (ยังไม่มี Production deployment)

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

Local health evidence: [staging-smoke.txt](./tests/reports/staging-smoke.txt)

**รูปที่ 13 — Smoke Test Feature 2: Login**

Local login page screenshot: [frontend-login.png](./tests/reports/frontend-login.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

Order API passed in Newman; Production screenshot not available before deployment.

**รูปที่ 15 — Smoke Test Feature 4: Payment**

Payment API passed in Newman; Production screenshot not available before deployment.

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

- [x] เพิ่ม trigger เมื่อมีการ push/PR ไปที่สาขาหลัก (`main` / `master`)
- [x] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [x] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [x] เพิ่ม step ติดตั้งและรัน Newman
- [x] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

GitHub Actions ยังไม่รันจาก workspace นี้ เพราะไม่มี Git metadata; ผลที่ยืนยันได้เป็น local run

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | 21 requests / 27 assertions (local) |
| Tests Passed | 21 requests / 27 assertions |
| Tests Failed | 0 |
| **Pass Rate** | **100% local; GitHub Actions not run** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

ยังไม่มีผล GitHub Actions จาก workspace นี้; workflow อยู่ที่ `.github/workflows/cicd.yml` และต้องตรวจผลหลังเชื่อมโค้ดกับ Student Repository

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
