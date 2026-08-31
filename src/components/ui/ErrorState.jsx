import { AlertTriangle } from "lucide-react";

export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 py-16 text-base-content/60">
      <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-error/10 text-error">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-sm btn-outline">
          Retry
        </button>
      )}
    </div>
  );
}
