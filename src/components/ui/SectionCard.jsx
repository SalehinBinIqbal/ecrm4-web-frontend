export function SectionCard({ title, icon, actions, className = "", children }) {
  return (
    <div
      className={`bg-base-100 rounded-box border border-base-200 shadow-sm ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0">
                {icon}
              </span>
            )}
            <h2 className="font-semibold text-[15px] text-base-content truncate">{title}</h2>
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
}
