import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Shield,
  PlusCircle,
  Search,
  Edit2,
  Mail,
  Phone,
  Building,
  CheckCircle,
  Lock,
  User,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { apiClient } from '../../services/apiClient';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../constants/roles';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ROLE_DEFAULT_TITLES = {
  [ROLES.SUPER_ADMIN]: 'Chief Examination Director & Super Administrator',
  [ROLES.ADMIN]: 'Central Operations Administrator',
  [ROLES.EXAM_CONTROLLER]: 'Controller of Examinations',
  [ROLES.MANAGER]: 'Regional Examination Center Manager',
  [ROLES.EXAM_COORDINATOR]: 'Zone Exam Coordinator',
  [ROLES.FINANCE_MANAGER]: 'Head of Accounts & 80G Compliance',
  [ROLES.CONTENT_MANAGER]: 'Director of Publications & Curriculum',
  [ROLES.STUDENT]: 'Student Candidate',
  [ROLES.DONOR]: 'Patron & Educational Sponsor',
};

export default function AdminUsers() {
  const [users, setUsers] = useState(() => mockApi.getUsers());
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [targetRole, setTargetRole] = useState(ROLES.EXAM_COORDINATOR);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'Password@123',
    role: ROLES.ADMIN,
    title: ROLE_DEFAULT_TITLES[ROLES.ADMIN],
    organization: 'National Gita Leadership Examination Board',
    assignedCenter: 'Headquarters (New Delhi)',
    phone: '',
  });

  // Load live users from backend database if accessible
  useEffect(() => {
    let isMounted = true;
    apiClient
      .getUsers()
      .then((res) => {
        if (!isMounted) return;
        const liveUsers = Array.isArray(res) ? res : res?.data || res?.users || [];
        if (liveUsers.length > 0) {
          // Normalize _id to id if necessary
          const normalized = liveUsers.map((u) => ({
            ...u,
            id: u.id || u._id,
          }));
          setUsers(normalized);
        }
      })
      .catch((err) => {
        console.info('[AdminUsers] Using local users store:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.organization || '').toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setTargetRole(user.role);
    setShowRoleModal(true);
  };

  const handleSaveRole = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      mockApi.updateUserRole(editingUser.id, targetRole);
      // Attempt backend update as well
      await apiClient
        .request(`/admin/users/${editingUser.id}/role`, {
          method: 'PATCH',
          body: JSON.stringify({ role: targetRole }),
        })
        .catch(() => {});

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, role: targetRole } : u))
      );
      setSuccessMsg(`Role updated to ${ROLE_LABELS[targetRole]} for ${editingUser.name}`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } finally {
      setShowRoleModal(false);
    }
  };

  const handleRoleChangeInNewUser = (newRole) => {
    setNewUser((prev) => ({
      ...prev,
      role: newRole,
      title: ROLE_DEFAULT_TITLES[newRole] || `${ROLE_LABELS[newRole]} Officer`,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    setIsSubmitting(true);
    try {
      let created = null;
      try {
        const res = await apiClient.createUser(newUser);
        created = res?.data || res;
      } catch (backendErr) {
        console.warn('[AdminUsers] Backend user create failed, saving to storage:', backendErr.message);
      }

      const finalUser = {
        id: created?._id || created?.id || `usr-${Date.now()}`,
        name: newUser.name.trim(),
        email: newUser.email.trim().toLowerCase(),
        role: newUser.role,
        title: newUser.title.trim(),
        organization: newUser.organization.trim(),
        assignedCenter: newUser.assignedCenter.trim(),
        phone: newUser.phone.trim() || '+91 98765 43210',
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      mockApi.addUser(finalUser);
      setUsers((prev) => [finalUser, ...prev]);

      setSuccessMsg(
        `User "${finalUser.name}" successfully created with role: ${ROLE_LABELS[finalUser.role]}!`
      );
      setTimeout(() => setSuccessMsg(null), 5000);

      // Reset form
      setNewUser({
        name: '',
        email: '',
        password: 'Password@123',
        role: ROLES.ADMIN,
        title: ROLE_DEFAULT_TITLES[ROLES.ADMIN],
        organization: 'National Gita Leadership Examination Board',
        assignedCenter: 'Headquarters (New Delhi)',
        phone: '',
      });
      setShowAddModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrative Staff & User Profiles
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create and manage accounts across all 9 profiles: Super Admin, Admin, Controllers, Managers, Coordinators, Candidates, and Donors.
          </p>
        </div>

        <Button
          size="sm"
          icon={PlusCircle}
          onClick={() => setShowAddModal(true)}
          className="shrink-0 font-bold shadow-xs bg-vedic-primary hover:bg-vedic-dark text-white cursor-pointer"
        >
          + Add New Staff / User
        </Button>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by staff name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedRole('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedRole === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            All Roles ({users.length})
          </button>
          {Object.keys(ROLE_LABELS).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedRole === r
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {ROLE_LABELS[r].split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User / Staff Member</th>
                <th className="py-3 px-4">Assigned Role Profile</th>
                <th className="py-3 px-4">Department / Org</th>
                <th className="py-3 px-4">Assigned Location</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No users found matching current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const colorMeta = ROLE_COLORS[u.role] || {
                    bg: 'bg-slate-100 text-slate-700 border-slate-200',
                  };

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 uppercase">
                            {(u.name || 'U').charAt(0)}
                          </div>
                          <div>
                            <strong className="text-slate-900 block font-semibold">{u.name}</strong>
                            <span className="text-[11px] text-slate-400">{u.title || 'Official'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${colorMeta.bg}`}
                        >
                          {ROLE_LABELS[u.role] || u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {u.organization || 'National Examination Board'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {u.assignedCenter || 'National Hub'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="font-mono text-[11px]">{u.email}</div>
                        <div className="text-[10px] text-slate-400">{u.phone || '+91 98000 00000'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleOpenEdit(u)}
                          icon={Edit2}
                        >
                          Modify Role
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE NEW USER MODAL ── */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Staff or Platform User"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <p className="text-xs text-slate-500">
            Create an official account with any profile. The user can sign into the platform immediately with their email and password.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhakanta Das"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Login ID) *
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gitacontest.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Role Profile */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Role Profile *
              </label>
              <select
                value={newUser.role}
                onChange={(e) => handleRoleChangeInNewUser(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none bg-white font-medium"
              >
                {Object.keys(ROLE_LABELS).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Initial Password *
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Title / Designation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Title / Designation
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Exam Controller"
              value={newUser.title}
              onChange={(e) => setNewUser({ ...newUser, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Organization */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Organization / Department
              </label>
              <div className="relative">
                <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={newUser.organization}
                  onChange={(e) => setNewUser({ ...newUser, organization: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                />
              </div>
            </div>

            {/* Assigned Center */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Center / Location
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={newUser.assignedCenter}
                  onChange={(e) => setNewUser({ ...newUser, assignedCenter: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contact Phone / WhatsApp
            </label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-vedic-primary hover:bg-vedic-dark text-white font-bold cursor-pointer"
            >
              {isSubmitting ? 'Creating User...' : 'Create User Account'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── EDIT ROLE MODAL ── */}
      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title={editingUser ? `Assign Permissions: ${editingUser.name}` : 'Change User Role'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveRole} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Select Role Profile</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none bg-white font-medium"
            >
              {Object.keys(ROLE_LABELS).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">Access Scope:</span>
            <p>
              Updating the user profile role changes their system access and administrative authorization immediately.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowRoleModal(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Role Assignment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
