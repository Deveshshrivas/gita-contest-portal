import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import DonorLayout from './layouts/DonorLayout';
import FloatingRoleSwitcher from './components/ui/FloatingRoleSwitcher';

// ── Public Pages ──
import Home from './pages/public/Home';
import AvailableExams from './pages/public/AvailableExams';
import ContestDetail from './pages/public/ContestDetail';
import BooksCatalog from './pages/public/BooksCatalog';
import StudyMaterial from './pages/public/StudyMaterial';
import DonationsPublic from './pages/public/DonationsPublic';
import Leaderboard from './pages/public/Leaderboard';
import Verification from './pages/public/Verification';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// ── Auth Pages ──
import Login from './features/auth/Login';
import Register from './pages/student/Register';

// ── Student Portal Pages ──
import StudentDashboard from './pages/student/StudentDashboard';
import ExamLobby from './pages/student/ExamLobby';
import LiveExam from './pages/student/LiveExam';
import ExamResult from './pages/student/ExamResult';

// ── Administration Portal Pages ──
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageContests from './pages/admin/ManageContests';
import ManageQuestions from './pages/admin/ManageQuestions';
import ManageCandidates from './pages/admin/ManageCandidates';
import ManageResults from './pages/admin/ManageResults';
import AdminBooks from './pages/admin/AdminBooks';
import AdminDistribution from './pages/admin/AdminDistribution';
import AdminDonations from './pages/admin/AdminDonations';
import AdminFinances from './pages/admin/AdminFinances';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSyllabus from './pages/admin/AdminSyllabus';
import AdminMaterials from './pages/admin/AdminMaterials';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// ── Donor Portal Pages ──
import DonorDashboard from './features/dashboard/DonorDashboard';
import DonorHistory from './features/donations/DonorHistory';
import DonorImpact from './features/donations/DonorImpact';

// Layout wrapper for Public & Student pages
function PublicShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-vedic-cream/30 w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        {/* ── Public Website ── */}
        <Route path="/" element={<PublicShell><Home /></PublicShell>} />
        <Route path="/exams" element={<PublicShell><AvailableExams /></PublicShell>} />
        <Route path="/contest/:id" element={<PublicShell><ContestDetail /></PublicShell>} />
        <Route path="/books" element={<PublicShell><BooksCatalog /></PublicShell>} />
        <Route path="/study-material" element={<PublicShell><StudyMaterial /></PublicShell>} />
        <Route path="/donations" element={<PublicShell><DonationsPublic /></PublicShell>} />
        <Route path="/leaderboard" element={<PublicShell><Leaderboard /></PublicShell>} />
        <Route path="/verify" element={<PublicShell><Verification /></PublicShell>} />
        <Route path="/about" element={<PublicShell><About /></PublicShell>} />
        <Route path="/contact" element={<PublicShell><Contact /></PublicShell>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PublicShell><Register /></PublicShell>} />

        {/* ── Student Portal ── */}
        <Route path="/student/dashboard" element={<PublicShell><StudentDashboard /></PublicShell>} />
        <Route path="/student/lobby/:id" element={<PublicShell><ExamLobby /></PublicShell>} />
        <Route path="/student/results/:id" element={<PublicShell><ExamResult /></PublicShell>} />

        {/* Distraction-Free Live Exam (No public navbar/footer) */}
        <Route path="/student/exam" element={<LiveExam />} />

        {/* ── Administration Portal (Multi-Role) ── */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/contests" element={<AdminLayout><ManageContests /></AdminLayout>} />
        <Route path="/admin/questions" element={<AdminLayout><ManageQuestions /></AdminLayout>} />
        <Route path="/admin/candidates" element={<AdminLayout><ManageCandidates /></AdminLayout>} />
        <Route path="/admin/results" element={<AdminLayout><ManageResults /></AdminLayout>} />
        <Route path="/admin/books" element={<AdminLayout><AdminBooks /></AdminLayout>} />
        <Route path="/admin/distribution" element={<AdminLayout><AdminDistribution /></AdminLayout>} />
        <Route path="/admin/donations" element={<AdminLayout><AdminDonations /></AdminLayout>} />
        <Route path="/admin/finances" element={<AdminLayout><AdminFinances /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/syllabus" element={<AdminLayout><AdminSyllabus /></AdminLayout>} />
        <Route path="/admin/materials" element={<AdminLayout><AdminMaterials /></AdminLayout>} />
        <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

        {/* ── Donor Portal ── */}
        <Route path="/donor/dashboard" element={<DonorLayout><DonorDashboard /></DonorLayout>} />
        <Route path="/donor/history" element={<DonorLayout><DonorHistory /></DonorLayout>} />
        <Route path="/donor/impact" element={<DonorLayout><DonorImpact /></DonorLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ExamProvider>
          <AppContent />
        </ExamProvider>
      </AuthProvider>
    </Router>
  );
}
