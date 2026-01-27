'use client';

import { ServiceOrder } from "@/types/data-type";
import { SetStateAction, useEffect, useState } from "react";

const EmptyOrdersState = () => (
  <div className="rounded-xl bg-white border border-slate-100 p-4 text-slate-500 text-sm">
    No orders available
  </div>
);

export default function OrdersSection({
  openOrderModal,
  showToast,
}: {
  openOrderModal: (order: ServiceOrder, type: string) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
}) {
    const [orders, setOrders] = useState<ServiceOrder[]>([]);
  
    useEffect(() => {
      fetchOrders()
    }, [])
    
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/service-orders`)
  
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error('Error fetching active orders:', error)
      }
    }


  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* Header Section */}
      {/* <div className="px-6 py-4 border-b border-slate-100">
        <h4 className="text-lg font-semibold text-slate-900">All Orders</h4>
        <p className="text-sm text-slate-500 mt-1">
          Manage service order changes: Extension and Substitution
        </p>
      </div> */}

      {/* Table Section */}
      <div className="p-6 space-y-6">
        {/* Orders Table */}
        <div className="rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Orders Overview
              </h5>
              <p className="text-xs text-slate-500 mt-1">
                Manage service order changes: Extension and Substitution
              </p>
            </div>
          </div>

          <div className="p-4">
            {orders.length === 0 ? (
              <EmptyOrdersState />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-600">
                      <th className="px-4 py-3 text-left font-semibold">Title</th>
                      <th className="px-4 py-3 text-left font-semibold">Duration</th>
                      <th className="px-4 py-3 text-left font-semibold">Supplier Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Specialist Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Contract Value</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order: ServiceOrder) => (
                      <tr key={order.id} className="bg-white hover:bg-slate-50/60">
                        <td className="px-4 py-3 text-slate-900 font-medium">{order.title ?? 'N/A'}</td>
                        <td className="px-4 py-3 text-slate-700">{order.start_date} to {order.current_end_date}</td>
                        <td className="px-4 py-3 text-slate-700">{order.supplier_name ?? 'N/A'}</td>
                        <td className="px-4 py-3 text-slate-700">
                          {order.current_specialist_name ?? 'N/A'}
                          {order.has_been_substituted && (
                          <p style={{ "textDecoration": "line-through"}}>
                            {order.original_specialist_name}
                          </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          €{order.current_contract_value}
                          {order.has_been_extended && (
                          <p style={{ "textDecoration": "line-through"}}>
                            €{order.original_contract_value}
                          </p>
                          )}
                        </td>
                        <td className="px-4 py-3">{order.status ?? 'N/A'}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                                onClick={() => { openOrderModal(order, 'extension')}}
                                className={`text-white px-4 py-2 rounded-xl font-semibold shadow-sm transition-all bg-indigo-600 hover:bg-indigo-700`}
                                disabled={order?.pending_extension_id ? true : false}
                              >
                                {order?.pending_extension_id ? "Requested" : "Request Extension"}
                              </button>
                              {order?.pm_pending_subid ? (
                                <button
                                  onClick={() => openOrderModal(order, 'substitution-response')}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-sm transition-all"
                                >
                                  Accept/Reject Substitution
                                </button>
                              ) : (
                                <button
                                  onClick={() => openOrderModal(order, 'substitution')}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-sm transition-all"
                                  disabled={order?.pending_substitution_id ? true : false}
                                >
                                  {order?.pending_substitution_id ? "Requested" : "Request Substitution"}
                                </button>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ======== Extension and Substitution Buttons ======== */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
          {/* Extension Button */}
          {/* <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              {/* <div>
                <h5 className="text-lg font-bold text-slate-900">Extension</h5>
                <p className="text-sm text-slate-500">
                  Extend end date, add man-days, and update contract value.
                </p>
              </div> */}
            {/* </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openOrderModal('extension')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-sm transition-all"
              >
                Extension
              </button>
            </div>
          // </div> */} 

          {/* Substitution Button */}
          {/* <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              {/* <div>
                <h5 className="text-lg font-bold text-slate-900">Substitution</h5>
                <p className="text-sm text-slate-500">
                  Replace a specialist due to performance, availability, or project changes.
                </p>
              </div> */}
            {/* </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openOrderModal('substitution')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-sm transition-all"
              >
                Substitution
              </button>
            </div> */}
          {/* // </div> */} 
        {/* // </div> */}
      </div>
    </section>
  );
}
