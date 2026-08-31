import { createContext, useContext, useEffect, useState } from "react";

const HeaderBreadcrumbContext = createContext(null);

// Mounted once in AppLayout, above Header, PageHeader, and the routed page.
export function HeaderBreadcrumbProvider({ children }) {
  const [currentLabel, setCurrentLabel] = useState(null);
  return (
    <HeaderBreadcrumbContext.Provider value={{ currentLabel, setCurrentLabel }}>
      {children}
    </HeaderBreadcrumbContext.Provider>
  );
}

function useHeaderBreadcrumbContext() {
  const context = useContext(HeaderBreadcrumbContext);
  if (!context) {
    throw new Error("useHeaderBreadcrumb(Label) must be used within a HeaderBreadcrumbProvider");
  }
  return context;
}

// Used by Header and PageHeader to know whether the current page has
// registered a specific name (e.g. "Single View Dashboard") that should be
// shown after a clickable parent crumb, instead of just the plain nav label.
// eslint-disable-next-line react-refresh/only-export-components
export function useHeaderBreadcrumbLabel() {
  return useHeaderBreadcrumbContext().currentLabel;
}

// Called by a detail-style page (one reached by drilling into a list) to
// show "<parent nav label> / <label>" in the desktop Header, and a small
// "back to <parent>" link above the mobile PageHeader title. The parent is
// resolved automatically from the current route via navItems — pass just
// this page's own specific name. Clears itself on unmount.
// eslint-disable-next-line react-refresh/only-export-components
export function useHeaderBreadcrumb(label) {
  const { setCurrentLabel } = useHeaderBreadcrumbContext();
  useEffect(() => {
    setCurrentLabel(label);
    return () => setCurrentLabel(null);
  }, [label, setCurrentLabel]);
}
