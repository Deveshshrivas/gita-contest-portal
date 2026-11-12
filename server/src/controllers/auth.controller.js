import * as authService from '../services/auth.service.js';
import { User } from '../models/User.js';
import { sendSuccess } from '../utils/response.js';

export async function register(req, res, next) {
  try {
    const user = await authService.registerUser(req.body, req);
    const loginResult = await authService.loginUser(req.body.email, req.body.password, req.ip, req.headers['user-agent'], req);
    return sendSuccess(res, loginResult, 'Candidate account registered successfully', 201);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password, req.ip, req.headers['user-agent'], req);
    return sendSuccess(res, result, 'Sign in successful');
  } catch (err) {
    next(err);
  }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshSession(refreshToken, req.ip, req.headers['user-agent']);
    return sendSuccess(res, result, 'Token refreshed successfully');
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await authService.logoutSession(refreshToken);
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    return sendSuccess(res, req.user, 'Current user profile');
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const allowedUpdates = ['name', 'phone', 'school', 'city', 'state', 'category'];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true });
    return sendSuccess(res, updatedUser, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
}
