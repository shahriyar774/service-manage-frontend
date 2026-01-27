'use client';

import ServiceOfferTasks from '@/components/service-offer-tasks';

export default function ResourcePlannersSection({
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
            Resource Planning
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate internal resource availability and proceed with planning tasks
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
          Planning
        </span>
      </div>

      <div className="p-4">
        {/* Existing behavior retained */}
        <ServiceOfferTasks task={task} handleAction={handleAction} />
      </div>
    </div>
  );
}
