const STATUS_STYLES = {
  pending: "badge-warning",
  approved: "badge-success",
  active: "badge-success",
  online: "badge-success",
  rejected: "badge-error",
  inactive: "badge-ghost",
  offline: "badge-ghost",
  draft: "badge-ghost",
  available: "badge-success",
  "not available": "badge-error",
  processing: "badge-info",
};

export function StatusBadge({ status }) {
  const key = String(status ?? "").toLowerCase();
  const style = STATUS_STYLES[key] ?? "badge-neutral";
  return <span className={`badge badge-soft ${style} badge-sm font-medium`}>{status}</span>;
}
