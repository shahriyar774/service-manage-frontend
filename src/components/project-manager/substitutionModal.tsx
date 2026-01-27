'use client';

import { ServiceOrder, SpecialistDetails } from '@/types/data-type';
import React, { useState, useEffect, SetStateAction } from 'react';


export default function SubstitutionModal({
  isOpen,
  onClose,
  serviceOrder
}: {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder
}) {
  const [reason, setReason] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string>('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!reason.trim()){
      setErrors("Rejection reason is required");
      return
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/initiate/`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_order: serviceOrder.id,
            initiated_by: 'PROJECT_MANAGER',
            outgoing_specialist_id: serviceOrder.current_specialist_id,
            outgoing_specialist_name: serviceOrder.current_specialist_name,
            reason: reason
          })
        }
      );

      if (response.ok) {
        alert('Substitution request initiated successfully!');
      } else {
        alert('Failed to initiate Substitution request!');
      }
    } catch (error) {
      console.log('Error initiating substitution request', error)
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      onClose(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h4 className="text-xl font-bold text-slate-900">
              Substitution Form
            </h4>
            <p className="text-sm text-slate-500">Fill required fields and submit</p>
          </div>
          <button
            onClick={() => onClose(false)}
            className="px-3 py-2 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-5">
            {/* Current Specialist Name */}
            <p className="text-lg font-semibold text-slate-700">
                Current Specialist: <span className="font-medium text-slate-900">{serviceOrder.current_specialist_name}</span>
            </p>

            <div className='grid grid-cols-1'>
                <label className="text-sm font-semibold text-slate-700 mb-2">Reason *</label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value="">Select a reason...</option>
                    <option value="LOW_PERFORMANCE">Low Performance</option>
                    <option value="JOB_CHANGE">Specialist Job Change</option>
                    <option value="HEALTH_ISSUES">Health Issues</option>
                    <option value="PERSONAL_REASONS">Personal Reasons</option>
                    <option value="SKILL_MISMATCH">Skill Mismatch</option>
                    <option value="CLIENT_REQUEST">Client Request</option>
                    <option value="OTHER">Other</option>
                </select>
                {errors && (
                    <span className="text-red-600 text-sm">{errors}</span>
                )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:justify-end">
                <button
                onClick={() => onClose(false)}
                className="px-5 py-2.5 rounded-xl font-semibold bg-slate-100 hover:bg-slate-200"
                >
                Cancel
                </button>
                <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
