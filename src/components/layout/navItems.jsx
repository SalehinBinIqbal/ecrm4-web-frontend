import {
  House,
  LineChart,
  PieChart,
  Users,
  Repeat,
  Building2,
  Megaphone,
  Package,
} from "lucide-react";

const ICON_CLASS = "h-[18px] w-[18px]";

export const NAV_ITEMS = [
  {
    to: "/home",
    label: "Home",
    pageName: "Home",
    icon: <House className={ICON_CLASS} />,
  },
  {
    key: "report",
    label: "Reports",
    icon: <LineChart className={ICON_CLASS} />,
    children: [
      {
        to: "/report/dynamic",
        label: "Dynamic Report",
        pageName: "Dynamic Report",
      },
      {
        to: "/report/ff-contact-location",
        label: "FF Contact Location Report",
        pageName: "FF Contact Location Report",
      },
      {
        to: "/report/ff-live-location",
        label: "FF Live Location Report",
        pageName: "FF Live Location Report",
      },
    ],
  },
  {
    to: "/dashboard/view",
    label: "Dashboards",
    pageName: "Dashboards",
    icon: <PieChart className={ICON_CLASS} />,
  },
  {
    to: "/user/list",
    label: "Users",
    pageName: "Users",
    icon: <Users className={ICON_CLASS} />,
  },
  {
    key: "jml",
    label: "JML",
    icon: <Repeat className={ICON_CLASS} />,
    children: [
      {
        to: "/jml/request",
        label: "Create Request",
        pageName: "Create JML Request",
      },
      {
        to: "/jml/requests",
        label: "Request List",
        pageName: "JML Request List",
      },
      {
        to: "/jml/approvals",
        label: "Approve List",
        pageName: "JML Approve List",
      },
      { to: "/jml/users", label: "Users", pageName: "JML Users" },
    ],
  },
  {
    to: "/agency/list",
    label: "Agencies",
    pageName: "Agencies",
    icon: <Building2 className={ICON_CLASS} />,
  },
  {
    to: "/campaign/list",
    label: "Campaigns",
    pageName: "Campaigns",
    icon: <Megaphone className={ICON_CLASS} />,
  },
  {
    to: "/product/list",
    label: "Products",
    pageName: "Products",
    icon: <Package className={ICON_CLASS} />,
  },
];

// Routes reachable from the account dropdown rather than the sidebar, but
// that still need a Header page title.
const EXTRA_LABELS = [
  { to: "/account/profile", label: "Profile", pageName: "Profile" },
  { to: "/account/security", label: "Security", pageName: "Security" },
];

function matchesPath(pathname, to) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

// Returns { to, label, pageName } for whichever nav entry (sidebar item or
// extra account-dropdown route) matches this path, or null. Used both for
// the Header's plain page title and to resolve a breadcrumb's clickable
// parent.
export function findNavItem(pathname) {
  for (const item of NAV_ITEMS) {
    if (item.to && matchesPath(pathname, item.to))
      return { to: item.to, label: item.label, pageName: item.pageName };
    const child = item.children?.find((entry) =>
      matchesPath(pathname, entry.to),
    );
    if (child)
      return { to: child.to, label: child.label, pageName: child.pageName };
  }
  const extra = EXTRA_LABELS.find((entry) => matchesPath(pathname, entry.to));
  return extra
    ? { to: extra.to, label: extra.label, pageName: extra.pageName }
    : null;
}

export function findNavLabel(pathname) {
  return findNavItem(pathname)?.label ?? null;
}

export function findActiveGroupKey(pathname) {
  const item = NAV_ITEMS.find((entry) =>
    entry.children?.some((child) => matchesPath(pathname, child.to)),
  );
  return item?.key ?? null;
}
