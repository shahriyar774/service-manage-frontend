'use client';

export default function OrderModal({
  orderModalOpen,
  orderType,
  orderForm,
  setOrderForm,
  closeOrderModal,
  submitOrderForm,
}: {
  orderModalOpen: boolean;
  orderType: 'extension' | 'substitution';
  orderForm: any;
  setOrderForm: React.Dispatch<React.SetStateAction<any>>;
  closeOrderModal: () => void;
  submitOrderForm: () => void;
}) {
  if (!orderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h4 className="text-xl font-bold text-slate-900">
              {orderType === 'extension' ? 'Extension' : 'Substitution'} Form
            </h4>
            <p className="text-sm text-slate-500">Fill required fields and submit</p>
          </div>
          <button
            onClick={closeOrderModal}
            className="px-3 py-2 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Common */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Request ID</label>
              <input
                value={orderForm.requestId}
                onChange={(e) => setOrderForm((p: any) => ({ ...p, requestId: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="e.g., SO-001"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Reason *</label>
              <input
                value={orderForm.reason}
                onChange={(e) => setOrderForm((p: any) => ({ ...p, reason: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Short reason for change"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Comment</label>
            <textarea
              value={orderForm.comment}
              onChange={(e) => setOrderForm((p: any) => ({ ...p, comment: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 min-h-[90px]"
              placeholder="Additional information (optional)"
            />
          </div>

          {/* Extension fields */}
          {orderType === 'extension' && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h5 className="font-bold text-slate-800 mb-3">Extension Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">New End Date *</label>
                  <input
                    type="date"
                    value={orderForm.newEndDate}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, newEndDate: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Additional Man Days *</label>
                  <input
                    type="number"
                    value={orderForm.additionalManDays}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, additionalManDays: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="e.g., 10"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">New Contract Value (€) *</label>
                  <input
                    type="number"
                    value={orderForm.newContractValueEUR}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, newContractValueEUR: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="e.g., 12000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Substitution fields */}
          {orderType === 'substitution' && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h5 className="font-bold text-slate-800 mb-3">Substitution Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Current Specialist *</label>
                  <input
                    value={orderForm.currentSpecialist}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, currentSpecialist: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="Current specialist name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Replacement Specialist *</label>
                  <input
                    value={orderForm.replacementSpecialist}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, replacementSpecialist: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="Replacement specialist name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Start Date *</label>
                  <input
                    type="date"
                    value={orderForm.substitutionStartDate}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, substitutionStartDate: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">End Date (optional)</label>
                  <input
                    type="date"
                    value={orderForm.substitutionEndDate}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, substitutionEndDate: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Specialist Daily Rate (€) *</label>
                  <input
                    type="number"
                    value={orderForm.newContractValueEUR}
                    onChange={(e) => setOrderForm((p: any) => ({ ...p, newContractValueEUR: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="e.g., 12000"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-3 md:justify-end">
            <button
              onClick={closeOrderModal}
              className="px-5 py-2.5 rounded-xl font-semibold bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={submitOrderForm}
              className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
