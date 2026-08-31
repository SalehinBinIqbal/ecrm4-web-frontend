import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Menu,
  Sun,
  UserCircle,
  ShieldCheck,
  LogOut,
  MoonStar,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useTheme } from "../../theme/useTheme";
import { findNavItem } from "./navItems";
import { ConfirmModal } from "../ui/ConfirmModal";
import { DESKTOP_HEADER_CLASSES } from "./headerBreakpoints";
import { useHeaderSearchConfig } from "./HeaderSearchContext";
import { useHeaderBreadcrumbLabel } from "./HeaderBreadcrumbContext";
import { SearchInput } from "../ui/SearchInput";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, getUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const searchConfig = useHeaderSearchConfig();
  const breadcrumbLabel = useHeaderBreadcrumbLabel();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const user = getUser() ?? { name: "User", role: "", initials: "?" };
  const navItem = findNavItem(location.pathname);
  const pageTitle = navItem?.pageName ?? "Home";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // daisyUI's dropdown stays open via :focus-within, so a menu item's click
  // handler must blur the active element itself to close it.
  function closeDropdownThen(action) {
    return () => {
      document.activeElement?.blur();
      action();
    };
  }

  return (
    <header className="sticky top-0 z-30 shrink-0 flex h-16 items-center justify-between gap-3 px-2.5 sm:px-3 bg-base-100 border-b border-base-200">
      <div className="flex items-center gap-3 min-w-0">
        <label
          htmlFor="app-drawer"
          className="btn btn-square btn-ghost btn-sm lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </label>

        <span
          className={`${DESKTOP_HEADER_CLASSES} text-xl font-bold tracking-tight truncate`}
        >
          {breadcrumbLabel ? (
            <>
              <button
                type="button"
                onClick={() => navigate(navItem.to)}
                className="text-base-content/40 hover:text-base-content transition-colors"
              >
                {pageTitle}
              </button>
              <span className="mx-2 text-base-content/25">/</span>
              {breadcrumbLabel}
            </>
          ) : (
            pageTitle
          )}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {searchConfig && (
          <SearchInput
            value={searchConfig.value}
            onChange={searchConfig.onChange}
            placeholder={searchConfig.placeholder}
            className="input-sm w-23 sm:w-40 lg:w-64"
          />
        )}

        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm text-base-content/60"
          aria-label="Notifications"
        >
          <div className="indicator">
            <Bell className="h-5 w-5" />
            <span
              className="badge badge-error indicator-item"
              style={{
                "--size": "0.6rem",
                "--indicator-t": "3px",
                "--indicator-e": "5px",
              }}
            />
          </div>
        </button>

        <label
          className="toggle border-primary bg-primary/30 text-orange-400 has-checked:border-primary/30 has-checked:bg-white/10 has-checked:text-white"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <Sun className="h-4.5 w-4.5 text-white" />
          <MoonStar className="h-4.5 w-4.5 text-black" />
        </label>

        <div className="divider divider-horizontal mx-0.5" />

        <div className="dropdown dropdown-end cursor-pointer">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 hover:bg-base-200 transition-colors"
          >
            <div className="avatar avatar-placeholder">
              <div className="text-primary-content w-8 rounded-full ring-2 bg-primary ring-primary/30">
                <span className="text-xs font-semibold text-white">
                  {user.initials}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-tight text-left">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-[10px] text-base-content/50">
                {user.role}
              </span>
            </div>
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-40 mt-2 w-52 p-2 shadow-lg border border-base-200">
            <li>
              <button
                type="button"
                onClick={closeDropdownThen(() => navigate("/account/profile"))}
              >
                <UserCircle className="h-4 w-4" />
                Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={closeDropdownThen(() => navigate("/account/security"))}
              >
                <ShieldCheck className="h-4 w-4" />
                Security
              </button>
            </li>
            <div className="divider my-1" />
            <li className="text-error">
              <button
                type="button"
                onClick={closeDropdownThen(() => setLogoutModalOpen(true))}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmModal
        open={logoutModalOpen}
        title="Are you sure you want to log out?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleLogout}
        onClose={() => setLogoutModalOpen(false)}
      />
    </header>
  );
}
