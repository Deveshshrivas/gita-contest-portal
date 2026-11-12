import crypto from 'crypto';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { logAuditAction } from '../middleware/audit.middleware.js';

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function registerUser(userData, req) {
  const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
  if (existingUser) {
    const error = new Error('An account with this email address already exists');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(userData.password);

  // Generate unique roll number for candidates
  const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newUser = await User.create({
    name: userData.name,
    email: userData.email.toLowerCase(),
    passwordHash,
    phone: userData.phone || '',
    role: userData.role || 'student',
    category: userData.category || 'Senior (Class 10-12)',
    school: userData.school || 'Self Study',
    city: userData.city || 'New Delhi',
    state: userData.state || 'Delhi',
    assignedCenter: userData.assignedCenter || 'National Online Portal',
    rollNo,
    status: 'active',
    currentStage: 1,
    stageStatus: {
      stage1: { status: 'pending' },
      stage2: { status: 'locked' },
      stage3: { status: 'locked' },
    },
  });

  await logAuditAction({
    action: 'USER_REGISTER',
    req,
    targetResource: 'User',
    targetId: newUser._id,
    details: { email: newUser.email, role: newUser.role, rollNo: newUser.rollNo },
  });

  return newUser;
}

export async function loginUser(email, password, ip = '', userAgent = '', req = null) {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (user.status === 'suspended') {
    const error = new Error('Your account has been suspended. Please contact administration.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Generate Tokens
  const payload = { userId: user._id.toString(), role: user.role };
  const accessToken = signAccessToken(payload);
  const rawRefreshToken = signRefreshToken(payload);

  // Store hashed refresh token in database
  const tokenHash = hashToken(rawRefreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await RefreshToken.create({
    tokenHash,
    user: user._id,
    expiresAt,
    ipAddress: ip,
    userAgent,
  });

  if (req) {
    await logAuditAction({
      action: 'USER_LOGIN',
      req: { ...req, user },
      targetResource: 'User',
      targetId: user._id,
      details: { email: user.email, role: user.role },
    });
  }

  // Return clean user object without password
  const cleanUser = user.toJSON();

  return {
    user: cleanUser,
    accessToken,
    refreshToken: rawRefreshToken,
  };
}

export async function refreshSession(rawRefreshToken, ip = '', userAgent = '') {
  let payload;
  try {
    payload = verifyRefreshToken(rawRefreshToken);
  } catch (err) {
    const error = new Error('Invalid or expired refresh token');
    error.statusCode = 401;
    throw error;
  }

  const tokenHash = hashToken(rawRefreshToken);
  const storedToken = await RefreshToken.findOne({ tokenHash });

  if (!storedToken || storedToken.revokedAt) {
    const error = new Error('Session has been revoked. Please sign in again.');
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(payload.userId);
  if (!user || user.status !== 'active') {
    const error = new Error('User account not found or inactive');
    error.statusCode = 401;
    throw error;
  }

  // Revoke current refresh token (Rotation)
  storedToken.revokedAt = new Date();
  await storedToken.save();

  // Issue new pair
  const newPayload = { userId: user._id.toString(), role: user.role };
  const newAccessToken = signAccessToken(newPayload);
  const newRawRefreshToken = signRefreshToken(newPayload);
  const newTokenHash = hashToken(newRawRefreshToken);

  await RefreshToken.create({
    tokenHash: newTokenHash,
    user: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ipAddress: ip,
    userAgent,
  });

  return {
    user: user.toJSON(),
    accessToken: newAccessToken,
    refreshToken: newRawRefreshToken,
  };
}

export async function logoutSession(rawRefreshToken) {
  if (!rawRefreshToken) return;
  const tokenHash = hashToken(rawRefreshToken);
  await RefreshToken.updateOne({ tokenHash }, { $set: { revokedAt: new Date() } });
}
