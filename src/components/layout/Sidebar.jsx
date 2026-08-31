import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown, X } from "lucide-react";

import logo from "../../assets/ECRM_Logo.svg";
import { NAV_ITEMS, findActiveGroupKey } from "./navItems";

export function Sidebar() {
  const location = useLocation();
  const activeGroupKey = findActiveGroupKey(location.pathname);
  const [openKey, setOpenKey] = useState(() => activeGroupKey);
  const [trackedPathname, setTrackedPathname] = useState(location.pathname);

  // Re-derive the open accordion group whenever the route changes, without
  // an effect (React allows adjusting state during render on a prop/route
  // change, guarded by a comparison, per https://react.dev/learn/you-might-not-need-an-effect).
  if (location.pathname !== trackedPathname) {
    setTrackedPathname(location.pathname);
    if (activeGroupKey) setOpenKey(activeGroupKey);
  }

  // Mirrors the X button's behavior (unchecking the drawer-toggle) so
  // navigating to a page also closes the mobile drawer. A no-op on desktop,
  // where lg:drawer-open keeps the sidebar visible regardless.
  function closeDrawer() {
    const drawerToggle = document.getElementById("app-drawer");
    if (drawerToggle) drawerToggle.checked = false;
  }

  return (
    <aside className="h-screen w-72 shrink-0 min-w-fit flex flex-col overflow-hidden bg-base-100 border-r border-base-200">
      <div className="flex items-center gap-2.5 h-16 px-5 shrink-0 border-b border-base-200">
        <img src={logo} alt="Prism ECRM" className="w-12" />
        <span className="font-bold text-lg tracking-tight shrink-0">ECRM</span>
        <label
          htmlFor="app-drawer"
          className="btn btn-square btn-ghost btn-sm ml-auto lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </label>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-0.5">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.key}>
              <button
                type="button"
                onClick={() =>
                  setOpenKey((current) =>
                    current === item.key ? null : item.key,
                  )
                }
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeGroupKey === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/65 hover:bg-base-200"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left truncate">{item.label}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-50 transition-transform ${
                    openKey === item.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openKey === item.key && (
                <ul className="mt-0.5 ml-5.5 pl-4 border-l border-base-200 space-y-0.5 py-0.5">
                  {item.children.map((child) => (
                    <li key={child.to}>
                      <NavLink
                        to={child.to}
                        onClick={closeDrawer}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-base-content/60 hover:bg-base-200"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/65 hover:bg-base-200"
                }`
              }
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </NavLink>
          ),
        )}
      </nav>

      <footer className="shrink-0 px-4 py-3.5 text-center text-xs text-base-content/35 border-t border-base-200">
        Copyright © Prism ECRM {new Date().getFullYear()}
      </footer>
    </aside>
  );
}
