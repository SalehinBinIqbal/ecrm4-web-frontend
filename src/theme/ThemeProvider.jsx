import { createContext, useEffect, useState } from "react";

const THEME_KEY = "ecrm_theme";
const LIGHT_THEME = "corporate";
const DARK_THEME = "night";

function getSystemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  // Guards against a stale value left over from a theme that was since
  // renamed/removed in index.css — fall back to following the system
  // instead of pinning to a theme name that no longer has any CSS.
  return stored === LIGHT_THEME || stored === DARK_THEME ? stored : null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null);

// Mounted once at the app root (above the router), so the same theme
// resolution logic runs identically on the login screen and every
// logged-in page instead of only starting once Header first mounts.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme);
  const [systemPrefersDark, setSystemPrefersDark] =
    useState(getSystemPrefersDark);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function handleChange(event) {
      setSystemPrefersDark(event.matches);
    }
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => {
      const current = prev ?? (systemPrefersDark ? DARK_THEME : LIGHT_THEME);
      const next = current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }

  const isDark = theme ? theme === DARK_THEME : systemPrefersDark;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
