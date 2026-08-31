import { ArrowDown, ArrowUp } from "lucide-react";

const TREND_CLASSES = {
  up: "text-success",
  down: "text-error",
};

export function StatCard({
  icon,
  iconClassName = "text-primary bg-primary/10",
  label,
  value,
  sublabel,
  delta,
  trend,
}) {
  return (
    <div className="bg-base-100 rounded-box border border-base-200 shadow-sm p-6">
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${iconClassName}`}
          >
            {icon}
          </span>
        )}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
          {label}
        </p>
      </div>
      <p className="text-3xl font-bold tracking-tight mt-3">{value}</p>
      {sublabel && (
        <p className="text-xs text-base-content/50 mt-1">{sublabel}</p>
      )}
      {delta && (
        <p
          className={`flex items-center gap-1 text-xs font-medium mt-1 ${TREND_CLASSES[trend] ?? "text-base-content/50"}`}
        >
          {trend === "down" ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUp className="h-3 w-3" />
          )}
          {delta}
        </p>
      )}
    </div>
  );
}
