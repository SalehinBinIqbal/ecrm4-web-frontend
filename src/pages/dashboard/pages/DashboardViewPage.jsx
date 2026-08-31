import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { PieChart } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { EmptyState } from "../../../components/ui/EmptyState";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DASHBOARDS } from "../data/mockDashboards";

export function DashboardViewPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return DASHBOARDS;
    return DASHBOARDS.filter(
      (dashboard) =>
        dashboard.title.toLowerCase().includes(query) ||
        dashboard.description.toLowerCase().includes(query),
    );
  }, [search]);

  useHeaderSearch({
    value: search,
    onChange: setSearch,
    placeholder: "Search dashboards",
  });

  return (
    <div>
      <PageHeader title="Dashboards" />

      {filtered.length === 0 ? (
        <EmptyState message="No dashboards match your search." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((dashboard) => (
            <div
              key={dashboard.id}
              className="group bg-base-100 rounded-box border border-base-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
            >
              <div className="h-28 bg-linear-to-br from-primary/12 to-secondary/12 flex items-center justify-center">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-base-100 shadow-sm text-primary">
                  <PieChart className="h-6 w-6" />
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold">{dashboard.title}</h3>
                <p className="text-sm text-base-content/55 mt-1.5 flex-1 leading-relaxed">
                  {dashboard.description}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/view/${dashboard.id}`)}
                  className="btn btn-primary btn-sm mt-5 self-start"
                >
                  View dashboard
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
