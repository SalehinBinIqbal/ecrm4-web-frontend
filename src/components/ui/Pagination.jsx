import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="join mt-4">
      <button
        type="button"
        className="join-item btn btn-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`join-item btn btn-sm ${p === page ? "btn-active btn-primary" : ""}`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="join-item btn btn-sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
