'use client';

import { OfferType } from "@/types/data-type";
import { useEffect, useState } from "react";

export default function SupplierOffersSection({ tasks }: { tasks: any[] }) {
  const [offers, setOffers] = useState<OfferType[]>([]);

  useEffect(() => {
    fetchOffers()
  }, [])
  
  const fetchOffers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-offers`)

      if (response.ok) {
        const data = await response.json()
        setOffers(data)
      }
    } catch (error) {
      console.error('Error fetching active orders:', error)
    }
  }


  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">Supplier Offers</h4>
          <p className="text-sm text-slate-500 mt-1">
            View supplier offers after the offer deadline
          </p>
        </div>

        {/* Optional badge - UI only */}
        
      </div>

      <div className="p-6">
        {/* Table displaying the supplier offers */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-2 text-left text-slate-600">Title</th>
                <th className="px-4 py-2 text-left text-slate-600">Role</th>
                <th className="px-4 py-2 text-left text-slate-600">Duration</th>
                <th className="px-4 py-2 text-left text-slate-600">Provider Name</th>
                <th className="px-4 py-2 text-left text-slate-600">Specialist Name</th>
                <th className="px-4 py-2 text-left text-slate-600">Total Cost</th>
                <th className="px-4 py-2 text-left text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {offers.length > 0 ? (
                offers.map((task: OfferType) => (
                  <tr key={task?.id} className="border-b">
                    <td className="px-4 py-2">{task.title || 'N/A'}</td>
                    <td className="px-4 py-2">{task.role || 'N/A'}</td>
                    <td className="px-4 py-2">{task.duration || 'N/A'}</td>
                    <td className="px-4 py-2">{task.provider_name || 'N/A'}</td>
                    <td className="px-4 py-2">{task.specialist_name || 'N/A'}</td>
                    <td className="px-4 py-2">€{task.total_cost || 'N/A'}</td>
                    <td className="px-4 py-2">{task.status || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-2 text-center text-slate-400">
                    No supplier offers available.
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
