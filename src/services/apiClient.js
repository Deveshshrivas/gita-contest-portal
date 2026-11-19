/**
 * Production-ready API Client for the Gita Exam Management Platform.
 * Supports JWT authentication header injection, refresh token rotation,
 * and standard RESTful methods.
 */

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '');

const BASE_URL =
  import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:5000/api/v1' : null);

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.refreshPromise = null;
  }

  getAccessToken() {
    return localStorage.getItem('gita_exam_access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('gita_exam_refresh_token');
  }

  setTokens(accessToken, refreshToken) {
    if (accessToken) localStorage.setItem('gita_exam_access_token', accessToken);
    if (refreshToken) localStorage.setItem('gita_exam_refresh_token', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('gita_exam_access_token');
    localStorage.removeItem('gita_exam_refresh_token');
  }

  async refreshAuthToken() {
    if (!this.baseUrl) return null;
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      throw new Error('No refresh token available');
    }

    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        try {
          const res = await fetch(`${this.baseUrl}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!res.ok) {
            this.clearTokens();
            throw new Error('Refresh token expired or invalid');
          }

          const json = await res.json();
          const { accessToken, refreshToken: newRefreshToken } = json.data;
          this.setTokens(accessToken, newRefreshToken);
          return accessToken;
        } finally {
          this.refreshPromise = null;
        }
      })();
    }

    return this.refreshPromise;
  }

  async request(endpoint, options = {}) {
    if (!this.baseUrl) {
      throw new Error('No live backend configured. Running in client-side demonstration mode.');
    }
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (networkError) {
      console.warn(`[ApiClient] Network request failed for ${url}:`, networkError.message);
      throw networkError;
    }

    // Handle token expiration & automatic retry
    if (response.status === 401 && this.getRefreshToken() && !options._retry) {
      try {
        const newAccessToken = await this.refreshAuthToken();
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        return this.request(endpoint, {
          ...options,
          headers,
          _retry: true,
        });
      } catch (err) {
        console.warn('[ApiClient] Failed to refresh token, proceeding with error:', err.message);
      }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.error?.message || data?.message || `HTTP ${response.status} Error`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  }

  // ── AUTH ENDPOINTS ──
  async login(email, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.accessToken && res.data?.refreshToken) {
      this.setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res.data;
  }

  async register(userData) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.data?.accessToken && res.data?.refreshToken) {
      this.setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res.data;
  }

  async getCurrentUser() {
    const res = await this.request('/auth/me');
    return res.data;
  }

  async logout() {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await this.request('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (e) {
      console.warn('[ApiClient] Logout error:', e);
    } finally {
      this.clearTokens();
    }
  }

  // ── EXAM ENDPOINTS ──
  async getExams(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/exams${query ? `?${query}` : ''}`);
    return res.data;
  }

  async getExam(idOrSlug) {
    const res = await this.request(`/exams/${idOrSlug}`);
    return res.data;
  }

  async createExam(examData) {
    const res = await this.request('/exams', {
      method: 'POST',
      body: JSON.stringify(examData),
    });
    return res.data;
  }

  async updateExam(idOrSlug, examData) {
    const res = await this.request(`/exams/${idOrSlug}`, {
      method: 'PATCH',
      body: JSON.stringify(examData),
    });
    return res.data;
  }

  async enrollInExam(examIdOrSlug) {
    const res = await this.request(`/exams/${examIdOrSlug}/enroll`, {
      method: 'POST',
    });
    return res.data;
  }

  // ── ATTEMPTS & EXAM RUNTIME ──
  async startAttempt(examId, stageNumber = 1) {
    const res = await this.request('/attempts/start', {
      method: 'POST',
      body: JSON.stringify({ examId, stageNumber }),
    });
    return res.data;
  }

  async saveAnswer(attemptId, payload) {
    const res = await this.request(`/attempts/${attemptId}/save`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  }

  async getAttempt(attemptId) {
    const res = await this.request(`/attempts/${attemptId}`);
    return res.data;
  }

  async submitAttempt(attemptId) {
    const res = await this.request(`/attempts/${attemptId}/submit`, {
      method: 'POST',
    });
    return res.data;
  }

  // ── CERTIFICATE VERIFICATION ──
  async verifyCertificate(code) {
    const res = await this.request(`/certificates/verify/${encodeURIComponent(code)}`);
    return res.data;
  }

  // ── BOOKS & INVENTORY ──
  async getBooks(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/books${query ? `?${query}` : ''}`);
    return res.data;
  }

  async updateBookStock(bookId, stockData) {
    const res = await this.request(`/books/${bookId}/stock`, {
      method: 'PATCH',
      body: JSON.stringify(stockData),
    });
    return res.data;
  }

  // ── DONATIONS & 80G ──
  async getCampaigns() {
    const res = await this.request('/donations/campaigns');
    return res.data;
  }

  async createDonation(donationData) {
    const res = await this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
    return res.data;
  }

  // ── ADMIN STATS, USERS & AUDIT ──
  async getAdminOverview() {
    const res = await this.request('/admin/overview');
    return res.data;
  }

  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/admin/users${query ? `?${query}` : ''}`);
    return res.data;
  }

  async createUser(userData) {
    const res = await this.request('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return res.data;
  }

  async getAuditLogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/admin/audit-logs${query ? `?${query}` : ''}`);
    return res.data;
  }
}

export const apiClient = new ApiClient(BASE_URL);
