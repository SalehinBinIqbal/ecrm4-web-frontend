import { useNavigate } from "react-router";
import {
  UserCheck,
  Users2,
  Plus,
  ClipboardCheck,
  PieChart,
  LineChart,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionCard } from "../components/ui/SectionCard";

const QUICK_LINKS = [
  {
    label: "Create JML Request",
    description: "Start a new join, move, or leave request",
    to: "/jml/request",
    icon: <Plus className="h-5 w-5" />,
    tone: "text-primary bg-primary/10",
  },
  {
    label: "Approve List",
    description: "Review requests assigned to you",
    to: "/jml/approvals",
    icon: <ClipboardCheck className="h-5 w-5" />,
    tone: "text-secondary bg-secondary/10",
  },
  {
    label: "Dashboards",
    description: "View consumer stats by region and area",
    to: "/dashboard/view",
    icon: <PieChart className="h-5 w-5" />,
    tone: "text-accent bg-accent/10",
  },
  {
    label: "Reports",
    description: "Dynamic and field force location reports",
    to: "/report/dynamic",
    icon: <LineChart className="h-5 w-5" />,
    tone: "text-info bg-info/10",
  },
  {
    label: "Users",
    description: "Manage system users and access",
    to: "/user/list",
    icon: <Users2 className="h-5 w-5" />,
    tone: "text-success bg-success/10",
  },
  {
    label: "Campaigns",
    description: "Browse and manage active campaigns",
    to: "/campaign/list",
    icon: <Megaphone className="h-5 w-5" />,
    tone: "text-warning bg-warning/10",
  },
];

const STATS = [
  {
    title: "Total Online Users",
    total: 2,
    icon: <UserCheck className="h-7 w-7" />,
    tone: "text-primary bg-primary/10",
    ring: "ring-primary/10",
    breakdown: [
      { label: "Management", value: 2 },
      { label: "Field Force", value: 0 },
    ],
  },
  {
    title: "Total Active Users",
    total: 0,
    icon: <Users2 className="h-7 w-7" />,
    tone: "text-secondary bg-secondary/10",
    ring: "ring-secondary/10",
    breakdown: [
      { label: "Management", value: 0 },
      { label: "Field Force", value: 0 },
    ],
  },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title="Home" description="Welcome to Prism ECRM!" />

      <h1 className="hidden md:block text-4xl font-bold mb-6">
        Welcome to Prism ECRM!
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.title}
            className="bg-base-100 rounded-box border border-base-200 shadow-sm p-6"
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ring-8 ${stat.tone} ${stat.ring}`}
              >
                {stat.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                  {stat.title}
                </p>
                <p className="text-4xl font-bold tracking-tight mt-0.5">
                  {stat.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {stat.breakdown.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-1.5 text-xs font-medium bg-base-200/60 rounded-full px-3 py-1.5"
                >
                  <span className="text-base-content/50">{row.label}</span>
                  <span className="text-base-content">
                    {row.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Quick Access" className="mt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.to}
              type="button"
              onClick={() => navigate(link.to)}
              className="group flex items-start gap-3 text-left p-4 rounded-box border border-base-200 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${link.tone}`}
              >
                {link.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-base-content">
                  {link.label}
                </p>
                <p className="text-xs text-base-content/50 mt-0.5">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-base-content/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
