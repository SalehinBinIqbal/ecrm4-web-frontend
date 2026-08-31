import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DataTable } from "../../../components/ui/DataTable";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { getRequests } from "../data/mockJmlRequests";

export function ApproveListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const requests = useMemo(
    () => getRequests().filter((request) => request.assignedToMe),
    [],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return requests;
    return requests.filter(
      (request) =>
        request.fullName.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.ticketId.toLowerCase().includes(query),
    );
  }, [requests, search]);

  useHeaderSearch({ value: search, onChange: setSearch });

  return (
    <div>
      <PageHeader title="JML Approve List" />

      <SectionCard>
        <DataTable
          className="table-zebra table-sm"
          keyField="ticketId"
          rows={filtered}
          emptyMessage="No requests are assigned to you for approval."
          columns={[
            { key: "ticketId", header: "Ticket ID" },
            { key: "fullName", header: "Full Name" },
            { key: "phone", header: "Phone Number" },
            { key: "email", header: "Email" },
            { key: "designation", header: "Designation" },
            { key: "requestType", header: "Request Type" },
            { key: "effectiveDate", header: "Effective Date" },
            {
              key: "requestStatus",
              header: "Request Status",
              render: (row) => <StatusBadge status={row.requestStatus} />,
            },
            {
              key: "action",
              header: "Action",
              className: "w-px whitespace-nowrap text-center",
              render: (row) => (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/jml/approvals/${row.ticketId}`);
                  }}
                  className="btn btn-ghost btn-xs btn-circle"
                  aria-label={`View details for ${row.fullName}`}
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              ),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
