const FILL_CLASSES = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export function ProgressBar({ value, max = 100, tone = "primary", className = "" }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`h-2 rounded-full bg-base-200 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full ${FILL_CLASSES[tone] ?? FILL_CLASSES.primary}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
