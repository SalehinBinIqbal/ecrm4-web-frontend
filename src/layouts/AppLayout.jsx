import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
// import { Sidebar } from "../components/layout/Sidebar";
import { HeaderSearchProvider } from "../components/layout/HeaderSearchContext";
import { HeaderBreadcrumbProvider } from "../components/layout/HeaderBreadcrumbContext";
import { SidebarIconDrawer } from "../components/layout/SidebarIconDrawer";

export function AppLayout() {
  return (
    <HeaderSearchProvider>
      <HeaderBreadcrumbProvider>
        <div className="drawer lg:drawer-open">
          <input id="app-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex h-screen flex-col overflow-hidden min-w-0">
            <Header />

            <main className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-5 md:p-8 bg-base-300/60">
              <div className="min-w-0 w-full max-w-350 mx-auto">
                <Outlet />
              </div>
            </main>
          </div>

          <div className="drawer-side z-40">
            <label
              htmlFor="app-drawer"
              aria-label="Close sidebar"
              className="drawer-overlay"
            />
            {/* <Sidebar /> */}
            <SidebarIconDrawer />
          </div>
        </div>
      </HeaderBreadcrumbProvider>
    </HeaderSearchProvider>
  );
}
