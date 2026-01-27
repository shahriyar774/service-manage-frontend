'use client';

import { ServiceOrder } from '@/types/data-type';
import React, { useState, useEffect, SetStateAction } from 'react';

interface ExtensionFormData {
  additionalManDays: number;
  newEndDate: string;
  additionalCost: number;
  reason: string;
}

export default function ExtensionModal({
  isOpen,
  onClose,
  serviceOrder
}: {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder
}) {
  const [formData, setFormData] = useState<ExtensionFormData>({
    additionalManDays: 0,
    newEndDate: '',
    additionalCost: 0,
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-calculate additional cost when man days change
  useEffect(() => {
    if (formData.additionalManDays > 0) {
      const calculatedCost = formData.additionalManDays * serviceOrder.daily_rate;
      setFormData((prev: any) => ({
        ...prev,
        additionalCost: calculatedCost,
      }));
    }
  }, [formData.additionalManDays, serviceOrder.daily_rate]);

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required.';
    }
    if (!formData.newEndDate) {
      newErrors.newEndDate = 'New end date is required.';
    }
    if (!formData.additionalManDays || formData.additionalManDays <= 0) {
      newErrors.additionalManDays = 'Please enter a valid number of man-days.';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/extensions/`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_order: serviceOrder.id,
            initiated_by: 'PROJECT_MANAGER',
            additional_man_days: formData.additionalManDays,
            new_end_date: formData.newEndDate,
            additional_cost: formData.additionalCost,
            reason: formData.reason
          })
        }
      );

      if (response.ok) {
        alert(`Extension request initiated successfully!`);
      } else {
        alert(`Failed to initiate Extension request!`);
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
              Extension Form
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-semibold text-slate-700">New End Date *</label>
                    <input
                    type="date"
                    value={formData.newEndDate}
                    onChange={(e) => setFormData((p) => ({ ...p, newEndDate: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                    {errors.newEndDate && <span className="text-red-600 text-sm">{errors.newEndDate}</span>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-700">Additional Man Days *</label>
                    <input
                        type="number"
                        value={formData.additionalManDays || ''}
                        onChange={(e) => setFormData({ ...formData, additionalManDays: parseInt(e.target.value) || 0 })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.additionalManDays ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter number of additional man days"
                        min="1"
                    />
                    {errors.additionalManDays && (
                    <span className="text-red-600 text-sm">{errors.additionalManDays}</span>
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-700">Additional Cost (€) *</label>
                    <input
                        type="number"
                        value={formData.additionalCost || ''}
                        onChange={(e) => setFormData({ ...formData, additionalCost: parseFloat(e.target.value) || 0 })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.additionalCost ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Auto-calculated based on man days"
                        min="0"
                        step="0.01"
                        />
                    {errors.additionalCost && (
                        <span className="text-sm text-red-600">{errors.additionalCost}</span>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1'>
                <label className="text-sm font-semibold text-slate-700">Reason *</label>
                <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.reason ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Provide detailed reason for requesting extension..."
                />
                {errors.reason && <span className="text-red-600 text-sm">{errors.reason}</span>}
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
