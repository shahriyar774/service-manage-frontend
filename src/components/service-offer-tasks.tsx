'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function ServiceOfferTasks({task, handleAction}: {task: any, handleAction: any}) {
    const offer = task?.offer || null;

    if (!offer) {
        return null;
    }

  return (
    <div className='p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-lg leading-tight">Offer ID: {offer.id.substring(0, 8)}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className='text-md text-slate-600 font-medium'>{task.task_name}</span>
                    <span className='text-md text-green-600 font-medium'>{offer.status}</span>
                </div> 

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-600 font-medium">Provider Name: {offer.provider_name}</span>
                    <span className="text-sm text-slate-600 font-medium">| Specialist Name: {offer.specialist_name}</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-600 font-medium">Daily Rate: €{offer.daily_rate}</span>
                    <span className="text-sm text-slate-600 font-medium">| Travel Cost: €{offer.travel_cost}</span>
                    <span className="text-sm text-green-600 font-medium">| Total Cost: €{offer.total_cost}</span>
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
