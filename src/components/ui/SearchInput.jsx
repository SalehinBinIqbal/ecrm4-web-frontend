import { Search } from "lucide-react";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  className = "w-64",
}) {
  return (
    <label
      className={`input input-ghost bg-base-300/60 rounded-full flex items-center gap-2 ${className}`}
    >
      <Search className="h-4 w-4 text-base-content/40" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="grow"
      />
    </label>
  );
}
