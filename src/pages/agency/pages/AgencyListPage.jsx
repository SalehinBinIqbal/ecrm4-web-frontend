import { useMemo, useState } from "react";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { EmptyState } from "../../../components/ui/EmptyState";
import { AGENCIES } from "../data/mockAgencies";

export function AgencyListPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return AGENCIES;
    return AGENCIES.filter((agency) =>
      agency.name.toLowerCase().includes(query),
    );
  }, [search]);

  useHeaderSearch({
    value: search,
    onChange: setSearch,
    placeholder: "Search agencies",
  });

  return (
    <div>
      <PageHeader title="Agencies" />

      {filtered.length === 0 ? (
        <EmptyState message="No agencies match your search." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((agency) => (
            <div
              key={agency.id}
              className="bg-base-100 rounded-box border border-base-200 shadow-sm p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold truncate">{agency.name}</h3>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    aria-label="Edit agency"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle text-error"
                    aria-label="Delete agency"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                    Contact person
                  </dt>
                  <dd className="text-sm font-medium mt-1">
                    {agency.contactPerson}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                    Address
                  </dt>
                  <dd className="text-sm font-medium mt-1">{agency.address}</dd>
                </div>
                <div className="sm:col-span-2 min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                    Description
                  </dt>
                  <dd className="text-sm font-medium mt-1">
                    {agency.description}
                  </dd>
                </div>
                <div className="sm:col-span-2 min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5">
                    Resource List
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {agency.resources.map((resource) => (
                      <span
                        key={resource}
                        className="badge badge-soft badge-sm"
                      >
                        {resource}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
