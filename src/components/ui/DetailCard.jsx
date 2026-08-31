import { Pencil } from "lucide-react";
import { SectionCard } from "./SectionCard";

// Renders a "spec sheet" grid of label/value pairs — used across Account
// Profile, JML request lookups, and JML user detail views.
export function DetailCard({ title, icon, items, onEdit, className = "" }) {
  return (
    <SectionCard
      title={title}
      icon={icon}
      className={className}
      actions={
        onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label={`Edit ${title}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )
      }
    >
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
              {item.label}
            </dt>
            <dd className="text-sm font-medium text-base-content mt-1 wrap-break-word">
              {item.value || <span className="text-base-content/30 font-normal">—</span>}
            </dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
