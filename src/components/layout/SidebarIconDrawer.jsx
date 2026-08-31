import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

import logo from "../../assets/ECRM_Logo.svg";
import { NAV_ITEMS, findActiveGroupKey } from "./navItems";

// Same layout/behavior as Sidebar.jsx, but adds a desktop-only collapse
// toggle that shrinks the sidebar to an icon-only rail. The <aside> root
// carries an "is-drawer-open" / "is-drawer-close" marker class, and
// descendants react to it via the matching Tailwind variants declared in
// index.css (`@custom-variant is-drawer-close (.is-drawer-close &)`), so
// most of the icon-only styling lives in className rather than JS branches.
export function SidebarIconDrawer() {
  const location = useLocation();
  const activeGroupKey = findActiveGroupKey(location.pathname);
  const [openKey, setOpenKey] = useState(() => activeGroupKey);
  const [trackedPathname, setTrackedPathname] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  // Collapse is a desktop-only (lg+) concept. Drop out of it when the
  // viewport narrows below lg so the mobile drawer never opens pre-collapsed
  // with no way to reach the (desktop-only) toggle button.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function handleChange(event) {
      if (!event.matches) setCollapsed(false);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  if (location.pathname !== trackedPathname) {
    setTrackedPathname(location.pathname);
    if (activeGroupKey) setOpenKey(activeGroupKey);
  }

  function closeDrawer() {
    const drawerToggle = document.getElementById("app-drawer");
    if (drawerToggle) drawerToggle.checked = false;
  }

  // dropdown-hover keeps the flyout open via :focus-within once a link
  // inside it has been clicked/focused, so blur it to close the flyout too.
  function closeFlyoutThenNavigate() {
    closeDrawer();
    document.activeElement?.blur();
  }

  return (
    <aside
      className={`relative h-screen shrink-0 flex flex-col bg-base-100 border-r border-base-200 transition-[width] duration-200 ${
        collapsed
          ? "is-drawer-close w-20 overflow-visible"
          : "is-drawer-open w-72 overflow-hidden"
      }`}
    >
      <div
        className={`relative group flex items-center h-16 shrink-0 border-b border-base-200 ${
          collapsed ? "justify-center px-2" : "gap-2.5 px-5"
        }`}
      >
        <img
          src={logo}
          alt="Prism ECRM"
          className="w-12 shrink-0 transition-opacity is-drawer-close:group-hover:opacity-0"
        />
        <span className="font-bold text-lg tracking-tight shrink-0 is-drawer-close:hidden">
          ECRM
        </span>
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          title={collapsed ? "Open sidebar" : "Close sidebar"}
          className="hidden lg:flex btn btn-square btn-ghost btn-sm transition-opacity is-drawer-open:ml-auto is-drawer-close:absolute is-drawer-close:inset-0 is-drawer-close:m-auto is-drawer-close:opacity-0 is-drawer-close:pointer-events-none is-drawer-close:group-hover:opacity-100 is-drawer-close:group-hover:pointer-events-auto"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
        <label
          htmlFor="app-drawer"
          className="btn btn-square btn-ghost btn-sm ml-auto lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </label>
      </div>

      {/* daisyUI's tooltip/dropdown-content are position:absolute, so they'd
          get clipped by a scrolling ancestor. The icon rail's item count
          fits without scrolling, so drop the scroll container (and its
          clipping) while collapsed to let flyouts escape past the rail. */}
      <nav
        className={`flex-1 min-h-0 px-3 py-3 space-y-0.5 ${
          collapsed
            ? "overflow-visible px-2"
            : "overflow-y-auto overflow-x-hidden"
        }`}
      >
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div
              key={item.key}
              className={
                collapsed ? "dropdown dropdown-right dropdown-hover w-full" : ""
              }
            >
              <div
                tabIndex={0}
                role="button"
                onClick={
                  collapsed
                    ? undefined
                    : () =>
                        setOpenKey((current) =>
                          current === item.key ? null : item.key,
                        )
                }
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors is-drawer-close:justify-center is-drawer-close:px-2 ${
                  activeGroupKey === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/65 hover:bg-base-200"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left truncate is-drawer-close:hidden">
                  {item.label}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-50 transition-transform is-drawer-close:hidden ${
                    openKey === item.key ? "rotate-180" : ""
                  }`}
                />
              </div>

              {collapsed ? (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-40 w-fit p-2 shadow-lg border border-base-200"
                >
                  <li className="menu-title px-3">{item.label}</li>
                  {item.children.map((child) => (
                    <li className="mb-0.5" key={child.to}>
                      <NavLink
                        to={child.to}
                        onClick={closeFlyoutThenNavigate}
                        className={({ isActive }) =>
                          `truncate transition-colors ${
                            isActive
                              ? "active bg-primary/10 text-primary font-medium"
                              : "text-base-content/60 hover:bg-base-200"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                openKey === item.key && (
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
                )
              )}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeDrawer}
              data-tip={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors is-drawer-close:justify-center is-drawer-close:px-2 ${
                  collapsed ? "tooltip tooltip-right" : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/65 hover:bg-base-200"
                }`
              }
            >
              {item.icon}
              <span className="truncate is-drawer-close:hidden">
                {item.label}
              </span>
            </NavLink>
          ),
        )}
      </nav>

      <footer className="shrink-0 px-4 py-3.5 text-center text-xs text-base-content/35 border-t border-base-200 is-drawer-close:hidden">
        Copyright © Prism ECRM {new Date().getFullYear()}
      </footer>
    </aside>
  );
}
