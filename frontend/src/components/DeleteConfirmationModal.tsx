import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  itemType?: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "item",
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: "400px" }}>
        <div
          className="modal-body"
          style={{ textAlign: "center", padding: "32px 24px" }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#FEE2E2] flex items-center justify-center text-[var(--danger)]">
              <AlertTriangle size={24} strokeWidth={2} />
            </div>
          </div>

          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
            Delete {itemType}?
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {itemName}
            </span>
            ?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button onClick={onClose} className="btn btn-outline flex-1">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn btn-danger flex-1">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
