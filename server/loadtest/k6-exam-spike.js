import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 High-Concurrency Stress & Spike Test
 * Simulates up to 10,000 concurrent examination candidates taking the Gita Olympiad.
 *
 * Execution:
 *   k6 run --vus 1000 --duration 5m server/loadtest/k6-exam-spike.js
 */

export const options = {
  stages: [
    { duration: '1m', target: 2000 },  // Ramp up to 2,000 candidates
    { duration: '2m', target: 10000 }, // Spike to 10,000 concurrent candidates
    { duration: '3m', target: 10000 }, // Stay at 10,000 candidates during exam window
    { duration: '1m', target: 0 },     // Ramp down after submissions
  ],
  thresholds: {
    http_req_duration: ['p(95)<350', 'p(99)<800'], // 95% of autosaves must finish under 350ms
    http_req_failed: ['rate<0.01'],                 // Under 1% errors under peak load
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:5000/api/v1';

export default function () {
  // 1. Health check & exam listing
  const listRes = http.get(`${BASE_URL}/exams`);
  check(listRes, {
    'exams list 200': (r) => r.status === 200,
  });

  // 2. Candidate Login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: 'arjun.sharma@example.com',
      password: 'GitaExam@2026',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  const loginSuccess = check(loginRes, {
    'login status is 200': (r) => r.status === 200,
  });

  if (!loginSuccess) {
    sleep(1);
    return;
  }

  const token = loginRes.json('data.accessToken');
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // 3. Start Exam Attempt
  const startRes = http.post(
    `${BASE_URL}/attempts/start`,
    JSON.stringify({ examId: 'glc-2026', stageNumber: 1 }),
    { headers: authHeaders }
  );

  check(startRes, {
    'attempt started': (r) => r.status === 200 || r.status === 201,
  });

  const attemptId = startRes.json('data.attempt.attemptId');

  if (attemptId) {
    // 4. Periodic Autosave answers simulation every 10-15 seconds
    for (let q = 1; q <= 5; q++) {
      sleep(Math.random() * 2 + 1);

      const saveRes = http.post(
        `${BASE_URL}/attempts/${attemptId}/save`,
        JSON.stringify({
          questionId: `q-${q}`,
          selectedOption: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
          isReview: false,
          currentQuestionIndex: q - 1,
        }),
        { headers: authHeaders }
      );

      check(saveRes, {
        'autosave 200': (r) => r.status === 200,
      });
    }

    // 5. Submit Exam Attempt
    const submitRes = http.post(`${BASE_URL}/attempts/${attemptId}/submit`, '{}', {
      headers: authHeaders,
    });

    check(submitRes, {
      'submit evaluated': (r) => r.status === 200,
    });
  }

  sleep(1);
}
