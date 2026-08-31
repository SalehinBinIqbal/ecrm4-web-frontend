import { useEffect, useState } from "react";

// Validated categorical palette (see the `dataviz` skill / references/palette.md):
// fixed hue order, never cycled, passes CVD-separation checks in both modes.
const CATEGORICAL_LIGHT = [
  "#2a78d6", // blue
  "#eb6834", // orange
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#e87ba4", // magenta
  "#008300", // green
  "#4a3aa7", // violet
  "#e34948", // red
];

const CATEGORICAL_DARK = [
  "#3987e5",
  "#d95926",
  "#199e70",
  "#c98500",
  "#d55181",
  "#008300",
  "#9085e9",
  "#e66767",
];

// Tracks the `night --prefersdark` daisyUI theme so ApexCharts (which needs
// literal colors, not CSS custom properties) picks the matching step.
export function useCategoricalColors(count) {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => setIsDark(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (isDark ? CATEGORICAL_DARK : CATEGORICAL_LIGHT).slice(0, count);
}
