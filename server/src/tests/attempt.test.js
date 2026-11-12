import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { connectDB, disconnectDB } from '../config/db.js';

describe('Exam Attempt & Auto-Grading API Integration Tests', () => {
  let studentToken = '';
  let attemptId = '';
  let examId = '';
  let questions = [];

  beforeAll(async () => {
    await connectDB();

    // Register a brand new candidate for clean attempt state
    const uniqueEmail = `candidate-attempt-${Date.now()}@example.com`;
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Arjuna Candidate',
        email: uniqueEmail,
        password: 'Password@123',
        role: 'student',
      });
    expect(regRes.status).toBe(201);
    studentToken = regRes.body.data.accessToken;

    // Get an active exam
    const examsRes = await request(app).get('/api/v1/exams');
    expect(examsRes.body.data.length).toBeGreaterThan(0);
    const activeExam = examsRes.body.data[0];
    examId = activeExam._id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('POST /api/v1/attempts/start should create a new attempt and enforce server timer', async () => {
    const res = await request(app)
      .post('/api/v1/attempts/start')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ examId, stageNumber: 1 });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.attempt).toBeDefined();
    expect(res.body.data.attempt.attemptId).toMatch(/^att-/);
    expect(res.body.data.secondsLeft).toBeGreaterThan(0);
    expect(Array.isArray(res.body.data.questions)).toBe(true);
    expect(res.body.data.questions.length).toBeGreaterThan(0);

    attemptId = res.body.data.attempt.attemptId;
    questions = res.body.data.questions;

    // CRITICAL SECURITY CHECK: Ensure correctAnswer and explanation are NOT leaked to candidate
    for (const q of questions) {
      expect(q.correctAnswer).toBeUndefined();
      expect(q.explanation).toBeUndefined();
    }
  });

  it('POST /api/v1/attempts/:attemptId/save should autosave question answers and review marks', async () => {
    const q1 = questions[0];
    const res = await request(app)
      .post(`/api/v1/attempts/${attemptId}/save`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        questionId: q1.id,
        selectedOption: 'B',
        isReview: true,
        currentQuestionIndex: 0,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.answers[q1.id]).toBe('B');
    expect(res.body.data.reviewMarks[q1.id]).toBe(true);
  });

  it('GET /api/v1/attempts/:attemptId should return attempt progress and status', async () => {
    const res = await request(app)
      .get(`/api/v1/attempts/${attemptId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.attempt.attemptId).toBe(attemptId);
  });

  it('POST /api/v1/attempts/:attemptId/submit should evaluate score, produce result and certificate if passed', async () => {
    // Answer remaining questions
    for (let i = 1; i < questions.length; i++) {
      await request(app)
        .post(`/api/v1/attempts/${attemptId}/save`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          questionId: questions[i].id,
          selectedOption: 'A',
          isReview: false,
          currentQuestionIndex: i,
        });
    }

    const res = await request(app)
      .post(`/api/v1/attempts/${attemptId}/submit`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.totalQuestions).toBe(questions.length);
    expect(typeof res.body.data.score).toBe('number');
    expect(typeof res.body.data.percentage).toBe('number');
    expect(['pass', 'fail']).toContain(res.body.data.resultStatus);

    // After submission, explanations are released in question review snapshot
    expect(res.body.data.questionReviews).toBeDefined();
    expect(res.body.data.questionReviews.length).toBeGreaterThan(0);
    expect(res.body.data.questionReviews[0].correctAnswer).toBeDefined();
  });
});
