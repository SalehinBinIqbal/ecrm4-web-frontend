// Single source of truth for where the mobile PageHeader (title, description,
// search) hands off to the desktop Header (title in the top bar, search
// there too). Tailwind needs the full class names written out literally to
// detect them, so change the breakpoint in BOTH strings below together if
// you ever want a different cutoff than `md`.
export const DESKTOP_HEADER_CLASSES = "hidden md:block";
export const MOBILE_PAGE_HEADER_CLASSES = "flex md:hidden";
