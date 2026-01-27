'use client';

import { ServiceOrder, SpecialistDetails, SubstitutionType } from '@/types/data-type';
import Link from 'next/link';
import React, { useState, useEffect, SetStateAction } from 'react';


export default function SubstitutionResponseModal({
  isOpen,
  onClose,
  serviceOrder,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder
}) {
  const [substitutionDetails, setSubstitutionDetails] = useState<SubstitutionType | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string>("");

  // Auto-calculate additional cost when man days change
  useEffect(() => {
    if (serviceOrder?.pm_pending_subid) {
      fetchSubstitutionDetails()
    }
  }, [serviceOrder?.pm_pending_subid]);

  const fetchSubstitutionDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${serviceOrder?.pm_pending_subid}`)

      if (response.ok) {
        const data = await response.json()
        setSubstitutionDetails(data)
      }
    } catch (error) {
      console.error('Error fetching substitution details:', error)
    }
  }

  // Handle form submission
  const handleSubmit = async (action: string) => {
    if (action === 'reject' && !rejectionReason.trim()){
      setErrors("Rejection reason is required");
      return
    }

    setIsSubmitting(true);

    let url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${serviceOrder?.pm_pending_subid}/approve_substitution/`;
    let payload: any = {
      user_role: "PROJECT_MANAGER",
    }

    if (action === 'reject') {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${serviceOrder?.pm_pending_subid}/reject/`;
      payload = {
        user_role: "PROJECT_MANAGER",
        reason: rejectionReason,
      }
    }

    try {
      const response = await fetch(
        url, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert(`Substitution request ${action}ed successfully!`);
      } else {
        alert(`Failed to ${action} Substitution request!`);
      }
    } catch (error) {
      console.log(error);
      alert(`Network error. Please check your connection and try again.`);
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

        <div className="p-6">
          {/* Service Order Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Title:</span> {substitutionDetails?.service_order_title}
            </p>
            <p className="text-sm text-blue-900 mb-1 group">
              <span className="font-semibold">Current Specialist (Outgoing):</span> 
              <span>{serviceOrder.current_specialist_name}</span>
            </p>
            <p className="text-sm text-blue-900 mb-1 group">
              <span className="font-semibold">Incoming Specialist:</span> 
              <span>{substitutionDetails?.incoming_specialist_name}</span>
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Incoming Specialist Daily Rate:</span> €{substitutionDetails?.incoming_specialist_daily_rate}
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Reason For Substitution:</span> {substitutionDetails?.reason}
            </p>
          </div>

          <div className="space-y-5">
            <label className="text-sm font-semibold text-slate-700">Reason for Rejection *</label>
            <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed reason for requesting extension..."
            />
            {errors && <span className="text-red-600 text-sm">{errors}</span>}
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
                    onClick={() => handleSubmit('reject')}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                >
                {isSubmitting ? 'Rejecting...' : 'Reject'}
                </button>
                <button
                    onClick={() =>  handleSubmit('approve')}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    {isSubmitting ? 'Approvinng...' : 'Approve'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
