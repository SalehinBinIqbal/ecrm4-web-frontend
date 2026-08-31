import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DataTable } from "../../../components/ui/DataTable";
import { Pagination } from "../../../components/ui/Pagination";
import { CAMPAIGNS } from "../data/mockCampaigns";

const PAGE_SIZE = 10;

export function CampaignListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CAMPAIGNS;
    return CAMPAIGNS.filter((campaign) =>
      campaign.name.toLowerCase().includes(query),
    );
  }, [search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useHeaderSearch({
    value: search,
    onChange: (value) => {
      setSearch(value);
      setPage(1);
    },
    placeholder: "Search campaigns",
  });

  return (
    <div>
      <PageHeader title="Campaigns" />

      <SectionCard>
        <DataTable
          keyField="id"
          rows={pageRows}
          emptyMessage="No campaigns match your search."
          columns={[
            { key: "name", header: "Campaign Name" },
            { key: "parentCampaign", header: "Parent Campaign" },
            { key: "startDate", header: "Start Date" },
            { key: "endDate", header: "End Date" },
            { key: "terminalPoint", header: "Terminal Point" },
            {
              key: "action",
              header: "Action",
              className: "w-px whitespace-nowrap text-center",
              render: () => (
                <div className="space-x-0.5">
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    aria-label="Edit campaign"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle text-error"
                    aria-label="Delete campaign"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </SectionCard>
    </div>
  );
}
