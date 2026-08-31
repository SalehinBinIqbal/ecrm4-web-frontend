import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useHeaderBreadcrumb } from "../../../components/layout/HeaderBreadcrumbContext";
import { DetailCard } from "../../../components/ui/DetailCard";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { ErrorState } from "../../../components/ui/ErrorState";
import { useToast } from "../../../components/ui/ToastProvider";
import { getRequests, updateRequestStatus } from "../data/mockJmlRequests";

const REJECT_REASONS = [
  "He is not a valid employee",
  "He is already in the system",
  "He is a nonchalant",
  "Other",
];

export function ApproveDetailPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [request, setRequest] = useState(() =>
    getRequests().find((r) => r.ticketId === ticketId),
  );
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const rejectDialogRef = useRef(null);

  useHeaderBreadcrumb(request?.fullName ?? null);

  useEffect(() => {
    const dialog = rejectDialogRef.current;
    if (!dialog) return;
    if (rejectOpen && !dialog.open) dialog.showModal();
    if (!rejectOpen && dialog.open) dialog.close();
  }, [rejectOpen]);

  if (!request) {
    return (
      <ErrorState
        message="Request not found."
        onRetry={() => navigate("/jml/approvals")}
      />
    );
  }

  const isPending = request.requestStatus === "Pending";

  function handleApprove() {
    updateRequestStatus(ticketId, "Approved");
    setRequest((current) => ({ ...current, requestStatus: "Approved" }));
    setApproveOpen(false);
    showToast("Request approved successfully.", "success");
  }

  function handleReject() {
    if (!reason) return;
    updateRequestStatus(ticketId, "Rejected");
    setRequest((current) => ({ ...current, requestStatus: "Rejected" }));
    setRejectOpen(false);
    setReason("");
    showToast("Request rejected.", "info");
  }

  return (
    <div>
      <PageHeader
        title={request.fullName}
        actions={
          <div className="flex items-center gap-2">
            {isPending && (
              <>
                <button
                  type="button"
                  onClick={() => setApproveOpen(true)}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setRejectOpen(true)}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        }
      />
      <div className="hidden md:flex justify-end items-center gap-2 mb-6">
        {isPending && (
          <>
            <button
              type="button"
              onClick={() => setApproveOpen(true)}
              className="btn btn-success"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => setRejectOpen(true)}
              className="btn btn-error"
            >
              Reject
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DetailCard
          title="Basic Information"
          items={[
            { label: "Full Name", value: request.fullName },
            { label: "Official Phone Number", value: request.phone },
            { label: "Email", value: request.email },
            { label: "Line Manager Email", value: request.lineManagerEmail },
            { label: "Designation", value: request.designation },
            { label: "Effective Date", value: request.effectiveDate },
            { label: "Request Type", value: request.requestType },
            {
              label: "Request Status",
              value: <StatusBadge status={request.requestStatus} />,
            },
            { label: "Account Type", value: request.accountType },
          ]}
        />
        <DetailCard
          title="Location Assigned"
          items={[{ label: "Region", value: request.region.join(" , ") }]}
        />
      </div>

      <ConfirmModal
        open={approveOpen}
        title="Warning"
        message="Are you sure you want to approve the request? This action can't be undone."
        confirmLabel="Continue"
        cancelLabel="Cancel"
        onConfirm={handleApprove}
        onClose={() => setApproveOpen(false)}
      />

      <dialog
        ref={rejectDialogRef}
        className="modal"
        onClose={() => setRejectOpen(false)}
      >
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg">
            Please choose reason for rejection
          </h3>
          <div className="mt-4 space-y-2">
            {REJECT_REASONS.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="reject-reason"
                  className="radio radio-sm"
                  checked={reason === option}
                  onChange={() => setReason(option)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          <div className="modal-action">
            <button
              type="button"
              onClick={() => setRejectOpen(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={!reason}
              className="btn btn-error btn-sm"
            >
              Reject Request
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setRejectOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
}
