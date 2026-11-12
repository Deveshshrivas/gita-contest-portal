import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, ROLE_LABELS } from '../constants/roles';
import { DEMO_USERS } from '../mock/users';
import { apiClient } from '../services/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_active_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('AuthContext load error:', e);
    }
    return null;
  });

  const [isAdminMode, setIsAdminMode] = useState(() => {
    const saved = localStorage.getItem('gita_portal_active_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        return u.role !== ROLES.STUDENT && u.role !== ROLES.DONOR;
      } catch {}
    }
    return false;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gita_portal_active_user', JSON.stringify(currentUser));
      const isAdmin = currentUser.role !== ROLES.STUDENT && currentUser.role !== ROLES.DONOR;
      setIsAdminMode(isAdmin);
    } else {
      localStorage.removeItem('gita_portal_active_user');
      setIsAdminMode(false);
    }
  }, [currentUser]);

  // Switch role immediately to any of the 9 system roles
  const switchRole = (roleKey) => {
    const demo = DEMO_USERS.find(u => u.role === roleKey);
    if (demo) {
      setCurrentUser(demo);
      return demo;
    }

    const roleProfiles = {
      [ROLES.SUPER_ADMIN]: {
        name: 'Super Administrator',
        email: 'admin@gitacontest.in',
        title: 'Chief Examination Director & Super Administrator',
        permissions: ['all'],
      },
      [ROLES.ADMIN]: {
        name: 'Platform Administrator',
        email: 'admin.platform@gitacontest.in',
        title: 'Central Operations Administrator',
        permissions: ['exams_manage', 'students_manage', 'reports_view'],
      },
      [ROLES.EXAM_CONTROLLER]: {
        name: 'Gopal Das, M.Tech',
        email: 'controller@gitacontest.in',
        title: 'Controller of Examinations',
        permissions: ['exams_manage', 'questions_manage', 'results_manage'],
      },
      [ROLES.MANAGER]: {
        name: 'Rajesh Sharma',
        email: 'manager.delhi@gitacontest.in',
        title: 'Delhi Regional Center Manager',
        permissions: ['center_manage', 'inventory_manage', 'distribution_manage'],
      },
      [ROLES.EXAM_COORDINATOR]: {
        name: 'Ananya Verma',
        email: 'coordinator.north@gitacontest.in',
        title: 'North Zone Exam Coordinator',
        permissions: ['students_manage', 'attendance_manage', 'stages_manage'],
      },
      [ROLES.FINANCE_MANAGER]: {
        name: 'CA Suresh Iyer',
        email: 'finance@gitacontest.in',
        title: 'Head of Accounts & 80G Compliance',
        permissions: ['finance_manage', 'donations_manage', 'reports_finance'],
      },
      [ROLES.CONTENT_MANAGER]: {
        name: 'Dr. Radharani Devi',
        email: 'content@gitacontest.in',
        title: 'Director of Publications & Curriculum',
        permissions: ['books_manage', 'materials_manage', 'syllabus_manage'],
      },
      [ROLES.STUDENT]: {
        name: 'Arjun Sharma',
        email: 'student.candidate@gitacontest.in',
        title: 'Student Candidate',
        rollNo: 'GLC-2026-8843',
        permissions: ['student_exam', 'student_admit_card', 'student_results'],
      },
      [ROLES.DONOR]: {
        name: 'Pooja Agarwal',
        email: 'donor.patron@gitacontest.in',
        title: 'Vidya Daan Patron & Sponsor',
        permissions: ['donor_view', 'donations_make'],
      },
    };

    const targetProfile = roleProfiles[roleKey] || {
      name: `${ROLE_LABELS[roleKey] || 'User'}`,
      email: `${roleKey}@gitacontest.in`,
      title: ROLE_LABELS[roleKey] || 'Operational User',
      permissions: ['exams_manage'],
    };

    const userObj = {
      id: `usr-${roleKey}`,
      ...targetProfile,
      phone: '+91 98000 00000',
      role: roleKey,
      organization: 'National Gita Leadership Examination Board',
      assignedCenter: 'National Online Center',
    };

    setCurrentUser(userObj);
    return userObj;
  };

  const loginAsStudent = (studentData) => {
    const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentUser = {
      id: `std-${Date.now()}`,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone || '+91 98765 43210',
      role: ROLES.STUDENT,
      title: 'Student Candidate',
      rollNo,
      category: studentData.category || 'Senior (Class 10-12)',
      school: studentData.school || 'Self Study',
      city: studentData.city || 'Delhi',
      state: studentData.state || 'Delhi',
      assignedCenter: studentData.assignedCenter || 'Delhi Public School Examination Center',
      permissions: ['student_exam', 'student_admit_card', 'student_results', 'student_materials'],
    };
    setCurrentUser(studentUser);
    return studentUser;
  };

  const loginAsRole = (roleKey) => {
    return switchRole(roleKey);
  };

  const loginWithCredentials = async (email, password) => {
    try {
      const data = await apiClient.login(email, password);
      if (data?.user) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Login failed' };
    } catch (err) {
      console.warn('[AuthContext] Backend login failed, falling back:', err.message);
      return { success: false, error: err.message };
    }
  };

  const registerUser = async (userData) => {
    try {
      const data = await apiClient.register(userData);
      if (data?.user) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      console.warn('[AuthContext] Backend register failed:', err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    apiClient.logout().catch(() => {});
    localStorage.removeItem('gita_portal_active_user');
    setCurrentUser(null);
  };

  const hasRole = (...allowedRoles) => {
    if (!currentUser) return false;
    if (currentUser.role === ROLES.SUPER_ADMIN) return true; // Super admin has access to everything
    return allowedRoles.includes(currentUser.role);
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.role === ROLES.SUPER_ADMIN || currentUser.permissions?.includes('all')) return true;
    return currentUser.permissions?.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        currentUser,
        currentRole: currentUser?.role || ROLES.STUDENT,
        isAdminMode,
        switchRole,
        loginAsStudent,
        loginAsRole,
        loginWithCredentials,
        registerUser,
        logout,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
