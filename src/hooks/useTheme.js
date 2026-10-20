import { useEffect, useState, useCallback } from "react";
import { STORAGE_KEYS } from "../config/storageKeys";
import { APP_CONFIG } from "../config/appConfig";

export default function useTheme() {
  // Check if user has an explicit saved preference in localStorage
  const [themeMode, setThemeModeState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (parsed === "light" || parsed === "dark") {
          return parsed;
        }
      }
      // If no explicit preference stored, auto-detect from system prefers-color-scheme
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
    } catch (e) {
      console.warn("Theme initialization error:", e);
    }
    return APP_CONFIG.DEFAULT_THEME || "light";
  });

  // Track if user explicitly clicked/set a theme override
  const [hasExplicitOverride, setHasExplicitOverride] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) !== null;
    } catch {
      return false;
    }
  });

  // Sync theme class to body and documentElement
  useEffect(() => {
    const isLight = themeMode === "light";
    document.body.classList.toggle("light-theme", isLight);
    document.documentElement.classList.toggle("light-theme", isLight);
  }, [themeMode]);

  // Listen to system color scheme changes if user hasn't set an explicit override
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.THEME);
        if (!stored) {
          setThemeModeState(e.matches ? "dark" : "light");
        }
      } catch (err) {
        console.warn("System theme change error:", err);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    } else if (mediaQuery.addListener) {
      // Legacy Safari/iOS fallback
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, []);

  const setThemeMode = useCallback((newMode) => {
    setThemeModeState(prev => {
      const next = typeof newMode === 'function' ? newMode(prev) : newMode;
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      setHasExplicitOverride(true);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => (prev === "dark" ? "light" : "dark"));
  }, [setThemeMode]);

  const resetToSystemTheme = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.THEME);
    } catch (e) {
      console.error(e);
    }
    setHasExplicitOverride(false);
    if (typeof window !== "undefined" && window.matchMedia) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeModeState(isDark ? "dark" : "light");
    } else {
      setThemeModeState(APP_CONFIG.DEFAULT_THEME || "light");
    }
  }, []);

  return {
    themeMode,
    setThemeMode,
    toggleTheme,
    resetToSystemTheme,
    hasExplicitOverride
  };
}