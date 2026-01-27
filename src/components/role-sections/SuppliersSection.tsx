'use client';

import ServiceOfferTasks from '@/components/service-offer-tasks';

export default function SuppliersSection({
  task,
  handleAction,
}: {
  task: any;
  handleAction: (taskId: string, action: string, decision: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Supplier Actions
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Review offer tasks and submit/complete supplier-side activities
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          Offer
        </span>
      </div>

      <div className="p-4">
        {/* Existing behavior retained */}
        <ServiceOfferTasks task={task} handleAction={handleAction} />
      </div>
    </div>
  );
}
