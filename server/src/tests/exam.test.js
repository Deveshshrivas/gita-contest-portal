import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { connectDB, disconnectDB } from '../config/db.js';

describe('Exam Management API Integration Tests', () => {
  let adminToken = '';
  let studentToken = '';
  let createdExamId = '';
  let createdExamSlug = '';

  beforeAll(async () => {
    await connectDB();

    // Log in as Super Admin
    const adminLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'superadmin@gitacontest.in',
        password: 'Admin@Gita2026',
      });
    expect(adminLoginRes.status).toBe(200);
    adminToken = adminLoginRes.body.data.accessToken;

    // Register a fresh test student
    const studentLoginRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Exam Test Student',
        email: `student-exam-${Date.now()}@test.com`,
        password: 'Password@123',
        role: 'student',
      });
    expect(studentLoginRes.status).toBe(201);
    studentToken = studentLoginRes.body.data.accessToken;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('GET /api/v1/exams should return published exams publicly', async () => {
    const res = await request(app).get('/api/v1/exams');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/exams should allow admin to create a new Olympiad exam', async () => {
    const newExam = {
      name: `Test Gita Olympiad ${Date.now()}`,
      subtitle: 'Integration Test Exam Cycle',
      badge: 'State Level',
      category: 'College & Youth',
      isFree: true,
      totalQuestions: 15,
      durationMinutes: 45,
      totalMarks: 30,
      passingMarks: 18,
      passingPercentage: 60,
      negativeMarking: true,
      negativeMarkValue: 0.5,
      eligibility: 'All college students',
      instructions: ['Read instructions carefully', 'No tabs allowed'],
    };

    const res = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newExam);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(newExam.name);
    expect(res.body.data.slug).toBeDefined();

    createdExamId = res.body.data._id;
    createdExamSlug = res.body.data.slug;
  });

  it('GET /api/v1/exams/:id should retrieve the created exam by slug or id', async () => {
    const res = await request(app).get(`/api/v1/exams/${createdExamSlug}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdExamId);
  });

  it('POST /api/v1/exams/:id/enroll should allow student to enroll in the exam', async () => {
    const res = await request(app)
      .post(`/api/v1/exams/${createdExamId}/enroll`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.exam).toBeDefined();
    expect(res.body.data.candidate).toBeDefined();
  });

  it('PATCH /api/v1/exams/:id should allow admin to update exam configuration', async () => {
    const res = await request(app)
      .patch(`/api/v1/exams/${createdExamId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ subtitle: 'Updated Integration Test Subtitle' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.subtitle).toBe('Updated Integration Test Subtitle');
  });
});
