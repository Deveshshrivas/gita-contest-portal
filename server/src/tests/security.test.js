import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { connectDB, disconnectDB } from '../config/db.js';
import { Book } from '../models/Book.js';
import { Certificate } from '../models/Certificate.js';

describe('Security, RBAC & Business Rules Integration Tests', () => {
  let superAdminToken = '';
  let studentToken = '';

  beforeAll(async () => {
    await connectDB();

    const adminLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'superadmin@gitacontest.in',
        password: 'Admin@Gita2026',
      });
    expect(adminLoginRes.status).toBe(200);
    superAdminToken = adminLoginRes.body.data.accessToken;

    const studentRegRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Security Test Student',
        email: `student-security-${Date.now()}@test.com`,
        password: 'Password@123',
        role: 'student',
      });
    expect(studentRegRes.status).toBe(201);
    studentToken = studentRegRes.body.data.accessToken;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('RBAC & Route Protection', () => {
    it('GET /api/v1/admin/overview should reject student with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/api/v1/admin/overview')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/admin/audit-logs should reject non-super_admin with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/api/v1/admin/audit-logs')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/admin/overview should allow super_admin with 200 OK', async () => {
      const res = await request(app)
        .get('/api/v1/admin/overview')
        .set('Authorization', `Bearer ${superAdminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.candidates.total).toBeDefined();
    });
  });

  describe('Question Bank Answer Key Privacy', () => {
    it('GET /api/v1/questions without admin authorization must NEVER leak correctAnswer or explanation', async () => {
      const res = await request(app)
        .get('/api/v1/questions')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      for (const q of res.body.data) {
        expect(q.correctAnswer).toBeUndefined();
        expect(q.explanation).toBeUndefined();
      }
    });

    it('GET /api/v1/questions with super_admin authorization SHOULD include answer key for preview/review', async () => {
      const res = await request(app)
        .get('/api/v1/questions')
        .set('Authorization', `Bearer ${superAdminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      const sample = res.body.data[0];
      expect(sample.correctAnswer).toBeDefined();
    });
  });

  describe('Negative Stock Protection in Inventory', () => {
    it('PATCH /api/v1/books/:id/stock should reject stock allocations that exceed received inventory', async () => {
      // Find a book
      const book = await Book.findOne();
      expect(book).toBeDefined();

      // Attempt to allocate 999,999 units when received is small
      const res = await request(app)
        .patch(`/api/v1/books/${book.id}/stock`)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          stockAllocated: 999999,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('Negative Stock Protection');
    });
  });

  describe('Cryptographic Certificate Verification', () => {
    it('GET /api/v1/certificates/verify/:code should verify valid certificate and return recipient details', async () => {
      // Find or create test certificate
      let cert = await Certificate.findOne();
      if (!cert) {
        const dummyUser = (await Book.findOne())._id;
        cert = await Certificate.create({
          certificateId: `GITA-2026-CERT-${Date.now()}`,
          verificationCode: `VRF-${Date.now()}`,
          user: dummyUser,
          result: new mongoose.Types.ObjectId(),
          rollNo: 'GLC-2026-0001',
          candidateName: 'Test Candidate',
          examName: 'National Gita Olympiad',
          stageNumber: 1,
          score: 28,
          totalMarks: 30,
          percentage: 93.3,
          meritTier: 'National Gold Rank',
          isValid: true,
        });
      }

      const res = await request(app).get(`/api/v1/certificates/verify/${cert.verificationCode}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isValid).toBe(true);
      expect(res.body.data.candidateName).toBe(cert.candidateName);
    });

    it('GET /api/v1/certificates/verify/:code should report invalid for nonexistent certificate', async () => {
      const res = await request(app).get('/api/v1/certificates/verify/FAKE-INVALID-CODE-999');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isValid).toBe(false);
      expect(res.body.data.message).toContain('No active or valid Certificate');
    });
  });
});
