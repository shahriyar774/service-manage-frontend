'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function ServiceRequestTasks({task, handleAction}: {task: any, handleAction: any}) {
    const service_request = task?.service_request || null;

    if (!service_request) {
        return null;
    }

  return (
    <div className='p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-lg leading-tight">{service_request.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                <span className='text-md text-slate-600 font-medium'>{task.task_name}</span>
                <span className="text-sm text-slate-400 font-medium">ID: {service_request.id.substring(0, 8)}</span>
                </div> 

                <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-600 font-medium">Role: {service_request.role_name}</span>
                <span className="text-sm text-slate-600 font-medium">| Technology: {service_request.technology}</span>
                <span className="text-sm text-slate-600 font-medium">| Specialization: {service_request.specialization}</span>
                <span className="text-sm text-slate-600 font-medium">| Experience: {service_request.experience_level}</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-600 font-medium">Start: {service_request.start_date}</span>
                <span className="text-sm text-slate-600 font-medium">| End: {service_request.end_date}</span>
                <span className="text-sm text-red-400 font-medium">| Offer Deadline: {service_request.offer_deadline}</span>
                </div>

                <div className="mt-1">
                <p className="text-sm text-slate-600 font-medium">Task Description:</p>
                <p className="text-sm text-slate-600 font-medium">{service_request.task_description}</p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <div className="flex gap-2 w-full md:w-auto">
                <button
                onClick={() => handleAction(task.task_id, 'complete', 'approved')}
                className="flex-1 md:flex-none px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
                >
                Approve
                </button>
                <button
                onClick={() => handleAction(task.task_id, 'complete', 'rejected')}
                className="flex-1 md:flex-none px-6 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg font-bold text-sm hover:bg-rose-50 transition-all"
                >
                Reject
                </button>
            </div>
        </div>
    </div>
  );
}
