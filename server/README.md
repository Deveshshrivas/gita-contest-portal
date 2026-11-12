# National Gita Exam Platform — Backend API Service

Production-ready, high-concurrency Node.js + Express + MongoDB backend engineered for the **National Gita Leadership Contest & Olympiads** (`http://www.gitacontest.in/contest/`), supporting thousands of concurrent student candidates, multi-stage examinations, question bank security, book sponsorships, and 80G tax receipt distribution.

---

## 1. Technology Architecture

- **Runtime:** Node.js (v24.x LTS) with ES Modules (`"type": "module"`)
- **Web Framework:** Express.js 4.21 with strict security headers (`helmet`, `cors`, `express-rate-limit`)
- **Database:** MongoDB (v7.0) with Mongoose ODM (connection pooling `maxPoolSize: 50`)
- **Authentication:** JWT Access Tokens (15m expiry) + Cryptographic Refresh Tokens (7d expiry) with automatic token rotation & DB revocation
- **Validation:** Zod 3.23 schema validation on all incoming request bodies and query parameters
- **Password Hashing:** `bcryptjs` with 12 computational rounds
- **API Documentation:** Interactive OpenAPI 3.0 Swagger UI mounted at `/api/docs`
- **Testing:** Vitest 2.1 + Supertest for complete end-to-end integration test suites

---

## 2. Quick Start Commands

### Root Convenience Commands
```bash
# Start backend server
npm run server

# Start backend server in watch mode
npm run server:dev

# Seed database with 9 role users, 4 exams, questions, books & campaigns
npm run server:seed

# Run complete backend integration test suite
npm run server:test
```

### Server Directory Commands
```bash
cd server

# Install dependencies
npm install

# Run database seeder
node src/scripts/seed.js

# Launch server on http://localhost:5000
node src/server.js

# Run integration tests
npm test
```

---

## 3. Seeded Accounts & Credentials

All seeded demo accounts are configured with the secure password: **`GitaExam@2026`**

| Role | Name | Email | Permissions / Scope |
| :--- | :--- | :--- | :--- |
| **Super Administrator** | Dr. Achyuta Krishna Das | `superadmin@gitacontest.in` | Global system control, audit logs, role management |
| **Platform Administrator**| Prof. Ramanathan Sharma | `admin@gitacontest.in` | Exams management, centers, candidate oversight |
| **Exam Controller** | Dr. Damodar Swarup | `controller@gitacontest.in` | Question bank, stage cutoffs, answer key approval |
| **Regional Manager** | Shri Brijesh Agarwal | `manager.delhi@gitacontest.in` | Inventory allocation, consignments, centers |
| **Exam Coordinator** | Sunita Deshmukh | `coordinator.mumbai@gitacontest.in` | Student registrations, admit cards, attendance |
| **Finance Manager** | CA Hemant Singhania | `finance@gitacontest.in` | 80G donations, student sponsorships, ledgers |
| **Content Manager** | Dr. Vidya Devi Dasi | `content@gitacontest.in` | Curriculum, Bhagavad Gita books catalog |
| **Student Candidate** | Arjun Sharma | `arjun.sharma@example.com` | Roll No: `GLC-2026-8842`, active examination candidate |
| **Patron Donor** | Shri Rajeshwar Singhania| `donor@gitacontest.in` | 80G tax exemptions, student & book sponsorships |

---

## 4. API Endpoint Reference

Interactive documentation is live at: [`http://localhost:5000/api/docs`](http://localhost:5000/api/docs)

### Authentication (`/api/v1/auth`)
- `POST /register`: Register student account with auto-assigned roll number
- `POST /login`: Authenticate credentials and receive access + refresh token pair
- `POST /refresh`: Secure refresh token rotation
- `POST /logout`: Invalidate session and revoke refresh token
- `GET /me`: Fetch authenticated user profile and permissions

### Examinations (`/api/v1/exams`)
- `GET /`: List published examinations (supports filtering by `category`, `isFree`, `status`)
- `GET /:idOrSlug`: Fetch exam details, syllabus, stages, and eligibility
- `POST /`: Create new Olympiad/Contest (Admin only)
- `PATCH /:idOrSlug`: Update exam configuration, timers, or passing criteria (Admin only)
- `POST /:idOrSlug/enroll`: Enroll authenticated candidate in an examination

### Question Bank (`/api/v1/questions`)
- `GET /`: Candidate question list (**correct answers and explanations are cryptographically hidden**)
- `POST /`: Add question with Chapter (1-18), verse reference, options, and explanation (Admin only)
- `PATCH /:id`: Edit question details (Admin only)
- `DELETE /:id`: Archive/remove question (Admin only)

### Exam Runtime & Attempts (`/api/v1/attempts`)
- `POST /start`: Start unexpired attempt; calculates server-side `expiresAt`
- `POST /:attemptId/save`: Periodic autosave of answers and review flags
- `GET /:attemptId`: Resume existing in-progress attempt on page reload
- `POST /:attemptId/submit`: Idempotent submission, automatic scoring, pass/fail evaluation, and instant certificate issuance

### Certificates (`/api/v1/certificates`)
- `GET /verify/:code`: **Public cryptographic verification** of certificate ID, roll number, or QR hash
- `GET /my`: Candidate's earned certificates of merit

### Books & Negative Stock Protection (`/api/v1/books`)
- `GET /`: Books inventory and distribution status
- `POST /`: Add book edition to catalog (Admin only)
- `PATCH /:id/stock`: Update stock received/allocated/distributed with **Negative Stock Defense**
- `POST /consignments`: Create dispatched consignment with courier tracking

### Donations & 80G Tax Exemption (`/api/v1/donations`)
- `GET /campaigns`: Active sponsorship campaigns (per-book and per-student unit costs)
- `POST /`: Submit donation with automated 80G receipt number generation (`REC-ISKCON-YYYY-XXXX`)
- `GET /`: View donation ledger with PAN numbers and audit trail

### System Administration (`/api/v1/admin`)
- `GET /overview`: High-level counts of candidates, pass rates, books distributed, funds raised
- `GET /users`: User directory with role filtering
- `PATCH /users/:id/role`: Administrative role reassignment
- `POST /candidates/:id/promote`: Manual or emergency multi-stage candidate promotion
- `GET /audit-logs`: Security audit logs with sanitized parameters (Super Admin only)

---

## 5. Security & Production Business Logic

1. **Negative Stock Defense:**
   The `Book` model and stock service enforce `stockAvailable = stockReceived - (stockAllocated + stockDistributed) >= 0`. Any consignment or update that produces a negative stock balance is rejected with HTTP 400.

2. **Exam Answer Key Privacy:**
   The `Question` schema sets `select: false` on `correctAnswer` and `explanation`. Candidates never receive answers in network payloads before submitting their exam attempt. Upon submission, explanations are released solely within the evaluated `Result` review snapshot.

3. **Server-Side Timer Enforcement:**
   When an attempt is started, the server calculates `expiresAt = startedAt + durationSeconds`. Candidates cannot tamper with client clocks; requests after expiry are automatically submitted and graded based on saved answers.

4. **Cryptographic Certificate Verification:**
   Every certificate generates a deterministic SHA-256 hash incorporating the certificate ID, result ID, and roll number, enabling tamper-proof QR code verification by educational institutions.

---

## 6. 10,000 Concurrent Candidates Load Testing Strategy

### Architecture Capacity
- Node.js cluster mode / PM2 multi-core processes
- MongoDB connection pool (`maxPoolSize: 50` per node)
- Redis for distributed caching & rate limiting (`authRateLimiter`, `globalRateLimiter`)
- Asynchronous job queue (`emailQueue`, `certificateQueue`) offloading PDF rendering from the HTTP event loop

### Running k6 Stress Test
```bash
# Run 10,000 virtual users spike test
k6 run --vus 10000 --duration 5m server/loadtest/k6-exam-spike.js
```

### Running Artillery Scenario
```bash
npx artillery run server/loadtest/artillery-scenario.yml
```
