'use client';

import { ServiceRequestType } from "@/types/data-type";
import { useEffect, useState } from "react";

export default function RequestStatusSection({ tasks }: { tasks: any[] }) {
  const [serviceReq, setServiceReq] = useState<ServiceRequestType[]>([]);

  useEffect(() => {
    fetchRequestsOrders()
  }, [])
  
  const fetchRequestsOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests`)

      if (response.ok) {
        const data = await response.json()
        setServiceReq(data)
      }
    } catch (error) {
      console.error('Error fetching active orders:', error)
    }
  }


  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <h4 className="text-lg font-semibold text-slate-900">All Request Status</h4>
        <p className="text-sm text-slate-500 mt-1">
          Track all service requests and their current state
        </p>
      </div>

      <div className="p-6">
        {/* Table displaying the request statuses */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-2 text-left text-slate-600">Title</th>
                <th className="px-4 py-2 text-left text-slate-600">Role Name</th>
                <th className="px-4 py-2 text-left text-slate-600">Experience Level</th>
                <th className="px-4 py-2 text-left text-slate-600">Duration</th>
                <th className="px-4 py-2 text-left text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceReq.length > 0 ? (
                serviceReq.map((task: ServiceRequestType) => (
                  <tr key={task.id} className="border-b">
                    <td className="px-4 py-2">{task.title || 'N/A'}</td>
                    <td className="px-4 py-2">{task.role_name || 'N/A'}</td>
                    <td className="px-4 py-2">{task.experience_level || 'N/A'}</td>
                    <td className="px-4 py-2">{task.start_date} to {task.end_date}</td>
                    <td className="px-4 py-2">{task.status || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-slate-400">
                    No requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
