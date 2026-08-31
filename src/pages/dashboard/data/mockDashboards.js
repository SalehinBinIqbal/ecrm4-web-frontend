const REGION_DATA = [
  { region: "Dhaka South", total: 1814768 },
  { region: "Chittagong", total: 1533603 },
  { region: "Rajshahi", total: 1304868 },
  { region: "Dhaka North", total: 1003304 },
  { region: "Khulna", total: 860316 },
  { region: "Sylhet", total: 754210 },
  { region: "Barishal", total: 512480 },
  { region: "Rangpur", total: 247519 },
];

const AREA_DATA = [
  { area: "Dhaka Central", total: 922055 },
  { area: "Dhaka West", total: 608375 },
  { area: "Khulna City", total: 576665 },
  { area: "CTG North", total: 550135 },
  { area: "Rajshahi City", total: 489491 },
];

export const DASHBOARDS = [
  {
    id: "single-view",
    title: "Single View Dashboard",
    description: "Consumer distribution across region, age group, profession and gender.",
    totalConsumer: 8031068,
  },
  {
    id: "project-strata-analysis",
    title: "Project Strata Analysis Dashboard",
    description: "Consumer footfall analysis across region, area, house, territory and point.",
    totalConsumer: 8031068,
  },
  {
    id: "ra-compliance",
    title: "RA Compliance Dashboard",
    description: "Red / amber / green contact marking and compliance alerts.",
    totalConsumer: 818480,
  },
  {
    id: "campaign-based",
    title: "Campaign-Based Dashboards",
    description: "Per-campaign consumer analysis dashboards (One View, PJ Frost, and more).",
    totalConsumer: 36885519,
  },
];

export function getDashboard(id) {
  return DASHBOARDS.find((dashboard) => dashboard.id === id) ?? null;
}

export function getDashboardBreakdown() {
  return { regionData: REGION_DATA, areaData: AREA_DATA };
}

const KPI_STATS = [
  {
    id: "coverage",
    label: "Coverage Today",
    value: "86%",
    delta: "+4.2% vs last week",
    trend: "up",
  },
  {
    id: "checkins",
    label: "Check-ins Logged",
    value: "12,180",
    sublabel: "of 14,160 planned",
  },
  {
    id: "overdue",
    label: "Overdue Visits",
    value: "214",
    delta: "+38 vs yesterday",
    trend: "down",
  },
  {
    id: "attendance",
    label: "Attendance Not Marked",
    value: "37",
    sublabel: "of 412 supervisors",
  },
];

const ROUTE_BOARD = {
  dueCount: 14160,
  subtitle: "412 supervisors · 6 clusters · 38 routes unassigned",
  overdueCount: 214,
  rows: [
    {
      icon: "check",
      label: "Dhaka North — 42 of 46 supervisors reporting",
      status: "91%",
      tone: "success",
    },
    {
      icon: "dot",
      label: "Chattogram — 9 routes idle over 40 min",
      status: "Attention",
      tone: "warning",
    },
    {
      icon: "warning",
      label: "Khulna — 11 routes unassigned for 18 Aug",
      status: "Assign",
      tone: "error",
    },
  ],
};

const CLUSTER_COVERAGE = [
  { cluster: "Dhaka North", supervisors: 96, outlets: 1240, percent: 91 },
  { cluster: "Dhaka South", supervisors: 88, outlets: 1080, percent: 87 },
  { cluster: "Chattogram", supervisors: 74, outlets: 920, percent: 84 },
  { cluster: "Sylhet", supervisors: 52, outlets: 640, percent: 78 },
  { cluster: "Khulna", supervisors: 48, outlets: 580, percent: 72 },
  { cluster: "Rajshahi", supervisors: 54, outlets: 520, percent: 69 },
];

const LIVE_CAMPAIGNS = [
  {
    title: "Eid display check",
    subtitle: "Field task · 6 clusters · 4,820 outlets",
    percent: 62,
    icon: "eye",
  },
  {
    title: "Monsoon stock survey",
    subtitle: "Field task · Dhaka North, Dhaka South",
    percent: 78,
    icon: "map",
  },
  {
    title: "New SKU launch alert",
    subtitle: "Communication · All RAs",
    percent: 94,
    icon: "message",
  },
];

const WORKFORCE_QUEUE = [
  {
    title: "FF Assignment",
    subtitle: "38 routes unassigned for 18 Aug",
    action: "Assign",
    icon: "assign",
  },
  {
    title: "Attendance exceptions",
    subtitle: "37 supervisors not marked · 11 on leave",
    action: "Review",
    icon: "attendance",
  },
  {
    title: "PTR Shifting",
    subtitle: "14 requests today · 6 above headroom",
    action: "Review",
    icon: "shift",
  },
  {
    title: "PTR Allocation",
    subtitle: "4 clusters not sent · locks at 09:00",
    action: "Open",
    icon: "allocation",
  },
];

// Planned vs. completed check-ins per cluster — distinct from CLUSTER_COVERAGE
// (supervisor/outlet counts) and from REGION_DATA/AREA_DATA (consumer totals).
const CLUSTER_CHECKINS = [
  { cluster: "Dhaka North", planned: 2480, completed: 2257 },
  { cluster: "Dhaka South", planned: 2160, completed: 1879 },
  { cluster: "Chattogram", planned: 1840, completed: 1546 },
  { cluster: "Sylhet", planned: 1280, completed: 998 },
  { cluster: "Khulna", planned: 1160, completed: 835 },
  { cluster: "Rajshahi", planned: 1040, completed: 718 },
];

// Ties back to the "Attendance Not Marked: 37 of 412" KPI and the "Attendance
// exceptions" workforce queue row (37 not marked = 11 on leave + 26 unexplained).
const ATTENDANCE_BREAKDOWN = [
  { label: "Marked", value: 375 },
  { label: "On Leave", value: 11 },
  { label: "Not Marked", value: 26 },
];

export function getDashboardOverview() {
  return {
    kpis: KPI_STATS,
    routeBoard: ROUTE_BOARD,
    clusterCoverage: CLUSTER_COVERAGE,
    liveCampaigns: LIVE_CAMPAIGNS,
    workforceQueue: WORKFORCE_QUEUE,
    clusterCheckins: CLUSTER_CHECKINS,
    attendanceBreakdown: ATTENDANCE_BREAKDOWN,
  };
}
