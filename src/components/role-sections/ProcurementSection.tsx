'use client';

import ServiceRequestTasks from '@/components/service-request-tasks';

export default function ProcurementSection({
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
            Procurement Review
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Validate request and provide feedback for improvement
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
          Task
        </span>
      </div>

      <div className="p-4">
        {/* Existing behavior retained */}
        <ServiceRequestTasks task={task} handleAction={handleAction} />
      </div>
    </div>
  );
}
