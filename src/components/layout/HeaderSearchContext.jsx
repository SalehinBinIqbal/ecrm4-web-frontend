import { createContext, useContext, useEffect, useState } from "react";

const HeaderSearchContext = createContext(null);

// Mounted once in AppLayout, above both Header and the routed page (Outlet),
// so a page can declare a search box and Header can render it.
export function HeaderSearchProvider({ children }) {
  const [config, setConfig] = useState(null);
  return (
    <HeaderSearchContext.Provider value={{ config, setConfig }}>
      {children}
    </HeaderSearchContext.Provider>
  );
}

function useHeaderSearchContext() {
  const context = useContext(HeaderSearchContext);
  if (!context) {
    throw new Error("useHeaderSearch(Config) must be used within a HeaderSearchProvider");
  }
  return context;
}

// Used by Header itself to read whatever the current page has declared.
// eslint-disable-next-line react-refresh/only-export-components
export function useHeaderSearchConfig() {
  return useHeaderSearchContext().config;
}

// Called by a page to put a search box in the Header. Pass nothing (or
// `null`) to not show one. Automatically clears itself on unmount, so
// navigating away removes the search box.
// eslint-disable-next-line react-refresh/only-export-components
export function useHeaderSearch({ value, onChange, placeholder } = {}) {
  const { setConfig } = useHeaderSearchContext();

  useEffect(() => {
    setConfig({ value, onChange, placeholder });
    return () => setConfig(null);
  }, [value, onChange, placeholder, setConfig]);
}
