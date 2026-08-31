import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

const VARIANT_STYLES = {
  warning: { icon: "text-warning bg-warning/10", confirmBtn: "btn-primary" },
  danger: { icon: "text-error bg-error/10", confirmBtn: "btn-error" },
  info: { icon: "text-info bg-info/10", confirmBtn: "btn-primary" },
};

export function ConfirmModal({
  open,
  title = "Warning",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "warning",
  loading = false,
  onConfirm,
  onClose,
}) {
  const dialogRef = useRef(null);
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.warning;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box max-w-sm text-center">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <span
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 ${styles.icon}`}
        >
          <AlertTriangle className="h-7 w-7" />
        </span>

        <h3 className="font-bold text-lg">{title}</h3>
        {message && (
          <p className="text-sm text-base-content/60 mt-2">{message}</p>
        )}

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary text-white"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`btn text-white ${styles.confirmBtn}`}
          >
            {loading && <span className="loading loading-spinner loading-xs" />}
            {confirmLabel}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
