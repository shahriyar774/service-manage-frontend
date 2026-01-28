'use client';

import ServiceOfferTasks from '@/components/service-offer-tasks';
import ServiceRequestTasks from '@/components/service-request-tasks';
import ProjectManagerOverview from '@/components/project-manager/ProjectManagerOverview';
import OrderModal from '@/components/project-manager/OrderModal';
import ProcurementSection from '@/components/role-sections/ProcurementSection';
import SuppliersSection from '@/components/role-sections/SuppliersSection';
import ResourcePlannersSection from '@/components/role-sections/ResourcePlannersSection';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import ExtensionModal from '@/components/project-manager/extensionModal';
import { ServiceOrder } from '@/types/data-type';
import SubstitutionModal from '@/components/project-manager/substitutionModal';
import SubstitutionResponseModal from '@/components/project-manager/substitutionResponseModal';

// ✅ NEW: Login component
import Login from '@/components/Login';

const AUTH_STORAGE_KEY = 'ppui_authed_v1';

export default function ProfessionalProcurementUI() {
  // ✅ NEW: login gate states
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const [role, setRole] = useState('projectManager');
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, unclaimed: 0 });

  // -----------------------------
  // UI feedback message (fixed overlay, top-center)
  // -----------------------------
  // We use a fixed-position banner so the layout BELOW does not shift.
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 2500);
  };

  // Reserve constant space at the top of the main content so the header never moves
  // whether toast is visible or not.
  const TOAST_SLOT_HEIGHT_PX = 88;

  // -----------------------------
  // API Configuration
  // -----------------------------
  const AUTH = 'Basic ' + btoa('rest-admin:test');

  // ✅ NEW: read saved auth state once on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
      setIsAuthed(saved === '1');
    } finally {
      setAuthChecked(true);
    }
  }, []);

  // ✅ NEW: login/logout handlers
  const handleLoginSuccess = () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, '1');
    setIsAuthed(true);
    showToast('success', 'Login successful.');
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthed(false);
    setRole('projectManager');
    setTasks([]);
    setStats({ total: 0, unclaimed: 0 });
    showToast('info', 'Logged out.');
  };

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      let url;
      if (role === 'procurement') {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/tasks?group=${role}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-offers/tasks?group=${role}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load task`);
      }

      const data = await response.json();

      setTasks(data?.tasks || []);
      setStats({
        total: data?.count,
        unclaimed: data?.count
      });
    } catch (e) {
      console.error('Connection failed', e);
      setTasks([]);
      setStats({ total: 0, unclaimed: 0 });
      showToast('error', 'Connection failed. Check backend/proxy is running.');
    } finally {
      setLoading(false);
    }
  }, [role]);

  // ✅ Only load tasks after user is authenticated
  useEffect(() => {
    if (!isAuthed) return;
    loadTasks();
  }, [isAuthed, loadTasks]);

  const handleAction = async (taskId: string, action: string, decision: string) => {
    if (action === 'complete' && !decision) {
      console.error("handleAction: decision is required for 'complete'");
      showToast('error', 'Decision missing: cannot complete task.');
      return;
    }

    try {
      const finalDecision = role === 'projectManager' ? 'final_approval' : decision;

      let url;
      if (role === 'procurement') {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/tasks/${taskId}/complete/`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-offers/tasks/${taskId}/complete/`;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: finalDecision
        })
      });

      if (!res.ok) {
        throw new Error(`Task action failed`);
      }

      if (decision === 'approved') {
        showToast('success', 'Task approved successfully.');
      } else if (decision === 'rejected') {
        showToast('error', 'Task rejected.');
      }

      loadTasks();
    } catch (e) {
      console.error('handleAction failed', e);
      showToast('error', 'Action failed. Check Flowable response.');
    }
  };

  // ============================================================
  // UI-ONLY ADDITION (No change to your existing logic above):
  // "All Orders" section with 2 cards: Extension + Substitution
  // + Modal form, approve/reject buttons
  // ============================================================

  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
  const [showSubResponseModal, setShowSubResponseModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);

  const openOrderModal = (order: ServiceOrder, type: string) => {
    setSelectedOrder(order);
    if (type === 'extension') {
      setShowExtensionModal(true);
    } else if (type === 'substitution-response') {
      setShowSubResponseModal(true);
    } else {
      setShowSubstitutionModal(true);
    }
  };

  const EmptyOrdersState = () => (
    <div className="rounded-xl bg-white border border-slate-100 p-4 text-slate-500 text-sm">
      No orders available.
    </div>
  );

  // ✅ NEW: show login page first (and avoid flicker until authChecked)
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Loading...
      </div>
    );
  }

  if (!isAuthed) {
    return <Login onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 text-white p-6 hidden md:block">
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">Service Management</h1>
          
        </div>

        <nav className="space-y-1 mt-8">
          {['projectManager', 'procurement', 'supplierRepresentative', 'resourcePlanners'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                role === r
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {r.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </button>
          ))}

          {/* Logout Button */}

            <button
            onClick={handleLogout}
            className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition-all"
          >
            Logout
          </button>
        </nav>
      </aside>

      

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Fixed slot height: prevents "System Dashboard" from moving */}
        <div style={{ height: TOAST_SLOT_HEIGHT_PX }} />

        {/* Toast displayed in a fixed overlay anchored to the top of the MAIN area */}
        {toast && (
          <div
            className="fixed z-50"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: 16
            }}
          >
            <div
              className={`max-w-2xl w-[min(720px,calc(100vw-32px))] rounded-2xl border px-8 py-5 shadow-lg text-lg font-bold text-center ${
                toast.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : toast.type === 'info'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {toast.message}
            </div>
            
          </div>
        )}

        

        {/* Top Header (will NOT move because we reserved space above) */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        
          
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">System Dashboard</h1>
            <p className="text-slate-500">Managing procurement flow</p>
          </div>

          {role === 'projectManager' && (
            <Link
              href="/service-request"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
            >
              + Initiate Service Request
            </Link>
          )}
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 uppercase">Active Role</p>
            <p className="text-2xl font-bold text-slate-800">
              {role.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase())}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 uppercase">Total Tasks</p>
            <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 uppercase">Awaiting Claim</p>
            <p className="text-2xl font-bold text-amber-500">{stats.unclaimed}</p>
          </div>
        </div>

        {/* Task List Section (Your original list) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">Inbox • Pending Work</h3>
            <button onClick={loadTasks} className="text-indigo-600 text-sm font-semibold hover:underline">
              Refresh List
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-10 text-center animate-pulse text-slate-400 italic">Connecting to Flowable...</div>
            ) : tasks.length === 0 ? (
              <div className="p-16 text-center">
                <p className="text-slate-400 text-lg italic">No active tasks found for your role</p>
                <p className="text-slate-300 text-sm">Switch roles or initiate a process to see tasks</p>
              </div>
            ) : (
              tasks.map((t: any) => (
                <div key={t.task_id}>
                  {role === 'procurement' ? (
                    <ProcurementSection task={t} handleAction={handleAction} />
                  ) : role === 'suppliers' ? (
                    <SuppliersSection task={t} handleAction={handleAction} />
                  ) : role === 'resourcePlanners' ? (
                    <ResourcePlannersSection task={t} handleAction={handleAction} />
                  ) : (
                    <ServiceOfferTasks task={t} handleAction={handleAction} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* NEW UI SECTION: Visible for Project Manager */}
        {role === 'projectManager' && (
          <ProjectManagerOverview tasks={tasks} showToast={showToast} openOrderModal={openOrderModal} />
        )}

        {showExtensionModal && selectedOrder && (
          <ExtensionModal isOpen={showExtensionModal} onClose={setShowExtensionModal} serviceOrder={selectedOrder} />
        )}

        {showSubResponseModal && selectedOrder && (
          <SubstitutionResponseModal
            isOpen={showSubResponseModal}
            onClose={setShowSubResponseModal}
            serviceOrder={selectedOrder}
          />
        )}

        {showSubstitutionModal && selectedOrder && (
          <SubstitutionModal
            isOpen={showSubstitutionModal}
            onClose={setShowSubstitutionModal}
            serviceOrder={selectedOrder}
          />
        )}
      </main>
    </div>
  );
}
