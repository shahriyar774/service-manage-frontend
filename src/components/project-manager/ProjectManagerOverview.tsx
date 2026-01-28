'use client';

import SupplierOffersSection from './SupplierOffersSection';
import RequestStatusSection from './RequestStatusSection';
import OrdersSection from './OrdersSection';
import { SetStateAction } from 'react';
import { ServiceOrder } from '@/types/data-type';

export default function ProjectManagerOverview({
  tasks,
  showToast,
  openOrderModal,
}: {
  tasks: any[];
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
  openOrderModal: (order: ServiceOrder, type: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10">
      <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
        <h3 className="font-bold text-slate-700 text-lg tracking-wider">
          Project Manager Overview
        </h3>
      </div>

      <div className="p-6 space-y-8">
        <SupplierOffersSection tasks={tasks} />
        <RequestStatusSection tasks={tasks} />
        <OrdersSection openOrderModal={openOrderModal} showToast={showToast} />
      </div>
    </div>
  );
}
