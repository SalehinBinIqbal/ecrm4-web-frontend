export function FilterBar({ children, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-end gap-4 p-4 rounded-box bg-base-100 border border-base-200 shadow-sm mb-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function FilterField({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
          {label}
        </span>
      )}
      {children}
    </label>
  );
}
