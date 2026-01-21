'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const API_BASE = "/api/flowable";
const AUTH = "Basic " + btoa("rest-admin:test");
const ASSIGNEE_USER = "rest-admin"; // same user as your Basic Auth

export default function ServiceRequestForm() {
    const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    role_name: '',
    technology: '',
    specialization: '',
    experience_level: 'JUNIOR',
    start_date: '',
    end_date: '',
    expected_man_days: '',
    skills: '',
    certifications: '',
    languages: '',
    status: 'DRAFT',
    task_description: '',
    offer_deadline: ''
  });

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData, 
                criteria_json: {
                    skills: formData.skills.split(','),
                    certifications: formData.certifications.split(','),
                    languages: formData.languages.split(',')
                }
            }),
        }
      )

      if (response.ok) {
        showToast('success', 'Service request created.');
        setTimeout(() => {
          router.push('/')
        }, 500)
      } else {
        showToast('error', 'Failed to create service request.');
      }
    } catch (error) {
      showToast('error', 'Network error. Please check your connection and try again.');
      console.error('Create service request error:', error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Fixed slot height: prevents "System Dashboard" from moving */}
        <div style={{ height: 88 }} />

        {/* Toast displayed in a fixed overlay anchored to the top of the MAIN area */}
        {toast && (
          <div
            className="fixed z-50"
            style={{
              // align to the center of the viewport (works with/without sidebar)
              left: "50%",
              transform: "translateX(-50%)",
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
    
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-tight">System Dashboard</h1>
          </Link>

          {/* Add any buttons if required for Project Manager here */}
        </header>

        {/* Service Request Form */}
        <h2 className="text-3xl font-semibold text-center mb-8">Create Service Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
          <div>
            <label htmlFor="title" className="block font-medium text-lg">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="roleName" className="block font-medium text-lg">Role Name</label>
            <input
              type="text"
              id="roleName"
              name="role_name"
              value={formData.role_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="technology" className="block font-medium text-lg">Technology</label>
            <input
              type="text"
              id="technology"
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block font-medium text-lg">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="experienceLevel" className="block font-medium text-lg">Experience Level</label>
            <select
              id="experienceLevel"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="EXPERT">Expert</option>
              <option value="LEAD">Lead</option>
              <option value="SENIOR">Senior</option>
              <option value="MID">Mid</option>
              <option value="JUNIOR">Junior</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block font-medium text-lg">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block font-medium text-lg">End Date</label>
            <input
              type="date"
              id="endDate"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="expectedManDays" className="block font-medium text-lg">Expected Man Days</label>
            <input
              type="number"
              id="expectedManDays"
              name="expected_man_days"
              value={formData.expected_man_days}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="skills" className="block font-medium text-lg">Skills</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Comma separated values"
            />
          </div>

          <div>
            <label htmlFor="certifications" className="block font-medium text-lg">Certifications</label>
            <textarea
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Comma separated values"
            />
          </div>

          <div>
            <label htmlFor="languages" className="block font-medium text-lg">Languages</label>
            <textarea
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter valid JSON here"
            />
          </div>

          <div>
            <label htmlFor="status" className="block font-medium text-lg">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div>
            <label htmlFor="taskDescription" className="block font-medium text-lg">Task Description</label>
            <textarea
              id="taskDescription"
              name="task_description"
              value={formData.task_description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="offerDeadline" className="block font-medium text-lg">Offer Deadline</label>
            <input
              type="date"
              id="offerDeadline"
              name="offer_deadline"
              value={formData.offer_deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
