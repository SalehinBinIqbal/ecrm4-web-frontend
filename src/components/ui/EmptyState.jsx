import { Inbox } from "lucide-react";

export function EmptyState({ message = "No data available", icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 py-16 text-base-content/50">
      <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-base-200/70">
        {icon ?? <Inbox className="h-6 w-6" />}
      </span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
