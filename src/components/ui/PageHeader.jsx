import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { MOBILE_PAGE_HEADER_CLASSES } from "../layout/headerBreakpoints";
import { findNavItem } from "../layout/navItems";
import { useHeaderBreadcrumbLabel } from "../layout/HeaderBreadcrumbContext";

export function PageHeader({ title, description, actions }) {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbLabel = useHeaderBreadcrumbLabel();
  const navItem = breadcrumbLabel ? findNavItem(location.pathname) : null;

  return (
    <div
      className={`${MOBILE_PAGE_HEADER_CLASSES} flex-col gap-3 pb-5 mb-6 border-b border-base-200`}
    >
      {navItem && (
        <button
          type="button"
          onClick={() => navigate(navItem.to)}
          className="inline-flex items-center gap-1 self-start text-xs font-medium text-base-content/50 hover:text-base-content transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {navItem.label}
        </button>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl leading-tight font-bold tracking-tight text-base-content">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-base-content/55">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}
