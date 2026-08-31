import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Download,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  UserX,
  Circle,
  Eye,
  Map,
  MessageSquare,
  UserPlus,
  Clock,
  Upload,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useHeaderBreadcrumb } from "../../../components/layout/HeaderBreadcrumbContext";
import { SectionCard } from "../../../components/ui/SectionCard";
import { FilterBar, FilterField } from "../../../components/ui/FilterBar";
import { DataTable } from "../../../components/ui/DataTable";
import { ErrorState } from "../../../components/ui/ErrorState";
import { StatCard } from "../../../components/ui/StatCard";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import Chart from "../../../components/charts/Chart";
import PieChart from "../../../components/charts/PieChart";
import { useCategoricalColors } from "../../../components/charts/chartColors";
import { downloadCsv } from "../../../lib/downloadCsv";
import {
  getDashboard,
  getDashboardBreakdown,
  getDashboardOverview,
} from "../data/mockDashboards";
import {
  CAMPAIGN_OPTIONS,
  LOCATION_OPTIONS,
} from "../../report/data/mockReports";

const REGION_COLUMNS = [
  { key: "region", header: "Region" },
  {
    key: "total",
    header: "Total Consumer",
    render: (row) => row.total.toLocaleString(),
  },
];

const AREA_COLUMNS = [
  { key: "area", header: "Area" },
  {
    key: "total",
    header: "Total Consumer",
    render: (row) => row.total.toLocaleString(),
  },
];

const CLUSTER_CHECKINS_COLUMNS = [
  { key: "cluster", header: "Cluster" },
  { key: "planned", header: "Planned" },
  { key: "completed", header: "Completed" },
];

const KPI_ICON_MAP = {
  coverage: {
    icon: <TrendingUp className="h-5 w-5" />,
    iconClassName: "text-success bg-success/10",
  },
  checkins: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    iconClassName: "text-primary bg-primary/10",
  },
  overdue: {
    icon: <AlertTriangle className="h-5 w-5" />,
    iconClassName: "text-error bg-error/10",
  },
  attendance: {
    icon: <UserX className="h-5 w-5" />,
    iconClassName: "text-warning bg-warning/10",
  },
};

const ROUTE_ROW_ICON_MAP = {
  check: CheckCircle2,
  dot: Circle,
  warning: AlertTriangle,
};

const ROUTE_ROW_BADGE_CLASSES = {
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
};

const LIVE_CAMPAIGN_ICON_MAP = {
  eye: Eye,
  map: Map,
  message: MessageSquare,
};

const WORKFORCE_ICON_MAP = {
  assign: UserPlus,
  attendance: UserX,
  shift: Clock,
  allocation: Upload,
};

function progressTone(percent) {
  if (percent >= 85) return "success";
  if (percent >= 75) return "primary";
  return "warning";
}

export function DashboardDetailPage() {
  const { dashboardId } = useParams();
  const navigate = useNavigate();
  const dashboard = getDashboard(dashboardId);
  const { regionData, areaData } = getDashboardBreakdown();
  const overview = getDashboardOverview();

  const [region, setRegion] = useState("");
  const [campaign, setCampaign] = useState("");

  const barColors = useCategoricalColors(2);
  const donutColors = useCategoricalColors(3);

  useHeaderBreadcrumb(dashboard?.title ?? null);

  if (!dashboard) {
    return (
      <ErrorState
        message="Dashboard not found."
        onRetry={() => navigate("/dashboard/view")}
      />
    );
  }

  function resetFilters() {
    setRegion("");
    setCampaign("");
  }

  return (
    <div>
      <PageHeader title={dashboard.title} />

      <FilterBar className="grid sm:grid-cols-3 gap-3">
        <FilterField label="Region">
          <select
            className="select select-bordered select-sm w-full"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            <option value="">All regions</option>
            {LOCATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Campaign">
          <select
            className="select select-bordered select-sm w-full"
            value={campaign}
            onChange={(event) => setCampaign(event.target.value)}
          >
            <option value="">All campaigns</option>
            {CAMPAIGN_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FilterField>

        <button
          type="button"
          onClick={resetFilters}
          className="btn btn-ghost btn-sm gap-2 ml-auto"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filter
        </button>
      </FilterBar>

      <div className="relative overflow-hidden rounded-box bg-linear-to-r from-primary to-secondary text-primary-content px-6 py-6 mb-6 flex items-center justify-between">
        <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-white/10" />
        <span className="relative text-sm font-medium uppercase tracking-wider text-primary-content/80">
          Total Consumer
        </span>
        <span className="relative text-4xl font-bold tracking-tight">
          {dashboard.totalConsumer.toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {overview.kpis.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            sublabel={stat.sublabel}
            delta={stat.delta}
            trend={stat.trend}
            {...KPI_ICON_MAP[stat.id]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 relative overflow-hidden rounded-box bg-linear-to-br from-primary to-secondary text-primary-content p-6 flex flex-col">
          <div className="absolute -top-12 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-content/70">
                National Route Board · Today
              </p>
              <p className="text-3xl font-bold tracking-tight mt-1">
                {overview.routeBoard.dueCount.toLocaleString()} check-ins due
                today
              </p>
              <p className="text-sm text-primary-content/70 mt-1">
                {overview.routeBoard.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wide bg-warning text-warning-content rounded-full px-3 py-1">
              {overview.routeBoard.overdueCount} overdue
            </span>
          </div>

          <div className="relative flex flex-col gap-3 mt-5">
            {overview.routeBoard.rows.map((row) => {
              const RowIcon = ROUTE_ROW_ICON_MAP[row.icon] ?? Circle;
              return (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 bg-white/10 rounded-box px-4 py-2.5"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <RowIcon className="h-4 w-4 shrink-0 text-primary-content/80" />
                    <span className="text-sm truncate">{row.label}</span>
                  </div>
                  <span
                    className={`badge badge-sm shrink-0 ${ROUTE_ROW_BADGE_CLASSES[row.tone] ?? "badge-neutral"}`}
                  >
                    {row.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative flex gap-3 mt-5">
            <button
              type="button"
              className="btn btn-sm bg-white text-primary hover:bg-white/90 border-none"
            >
              Open route board
            </button>
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "cluster-coverage-day-sheet",
                  [
                    { key: "cluster", header: "Cluster" },
                    { key: "supervisors", header: "Supervisors" },
                    { key: "outlets", header: "Outlets" },
                    {
                      key: "percent",
                      header: "Coverage",
                      render: (row) => `${row.percent}%`,
                    },
                  ],
                  overview.clusterCoverage,
                )
              }
              className="btn btn-sm btn-ghost text-primary-content hover:bg-white/10"
            >
              Export day sheet
            </button>
          </div>
        </div>

        <SectionCard title="Cluster Coverage" className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {overview.clusterCoverage.map((row) => (
              <div key={row.cluster}>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {row.cluster}
                    </p>
                    <p className="text-xs text-base-content/50">
                      {row.supervisors} supervisors ·{" "}
                      {row.outlets.toLocaleString()} outlets
                    </p>
                  </div>
                  <span className="text-sm font-semibold shrink-0">
                    {row.percent}%
                  </span>
                </div>
                <ProgressBar
                  value={row.percent}
                  tone={progressTone(row.percent)}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SectionCard
          title="Live Campaigns"
          actions={
            <button
              type="button"
              onClick={() => navigate("/campaign/list")}
              className="text-xs font-medium text-primary hover:underline"
            >
              All campaigns
            </button>
          }
        >
          <div className="flex flex-col gap-4">
            {overview.liveCampaigns.map((row) => {
              const RowIcon = LIVE_CAMPAIGN_ICON_MAP[row.icon] ?? Eye;
              return (
                <div key={row.title} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0">
                    <RowIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium truncate">
                        {row.title}
                      </p>
                      <span className="text-xs font-semibold shrink-0">
                        {row.percent}%
                      </span>
                    </div>
                    <p className="text-xs text-base-content/50 mb-1.5">
                      {row.subtitle}
                    </p>
                    <ProgressBar
                      value={row.percent}
                      tone={progressTone(row.percent)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Workforce Queue">
          <div className="flex flex-col gap-1">
            {overview.workforceQueue.map((row) => {
              const RowIcon = WORKFORCE_ICON_MAP[row.icon] ?? UserPlus;
              return (
                <div
                  key={row.title}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-base-200 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary/10 text-secondary shrink-0">
                      <RowIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {row.title}
                      </p>
                      <p className="text-xs text-base-content/50 truncate">
                        {row.subtitle}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="btn btn-xs shrink-0">
                    {row.action}
                  </button>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SectionCard
          title="Cluster-wise Check-ins"
          icon={<BarChart3 className="h-4 w-4" />}
          actions={
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "cluster-wise-checkins",
                  CLUSTER_CHECKINS_COLUMNS,
                  overview.clusterCheckins,
                )
              }
              className="btn btn-ghost btn-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          }
        >
          <Chart
            chartName="cluster_wise_checkins"
            xaxisValue={overview.clusterCheckins.map((row) => row.cluster)}
            data={[
              {
                seriesName: "Planned",
                values: overview.clusterCheckins.map((row) => row.planned),
              },
              {
                seriesName: "Completed",
                values: overview.clusterCheckins.map((row) => row.completed),
              },
            ]}
            type="bar"
            height={320}
            colors={barColors}
          />
        </SectionCard>

        <SectionCard
          title="Attendance Status Breakdown"
          icon={<PieChartIcon className="h-4 w-4" />}
        >
          <PieChart
            name="attendance_status_breakdown"
            xaxisValue={overview.attendanceBreakdown.map((row) => row.label)}
            series={overview.attendanceBreakdown.map((row) => row.value)}
            colors={donutColors}
            showLegend
            height={320}
          />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard
          title="Region Wise Total Consumer"
          actions={
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "region-wise-total-consumer",
                  REGION_COLUMNS,
                  regionData,
                )
              }
              className="btn btn-ghost btn-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          }
        >
          <DataTable
            columns={REGION_COLUMNS}
            rows={regionData}
            keyField="region"
          />
        </SectionCard>

        <SectionCard
          title="Area Wise Total Consumer"
          actions={
            <button
              type="button"
              onClick={() =>
                downloadCsv("area-wise-total-consumer", AREA_COLUMNS, areaData)
              }
              className="btn btn-ghost btn-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          }
        >
          <DataTable columns={AREA_COLUMNS} rows={areaData} keyField="area" />
        </SectionCard>
      </div>
    </div>
  );
}
