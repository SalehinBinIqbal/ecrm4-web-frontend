import { useMemo, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DataTable } from "../../../components/ui/DataTable";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { DetailCard } from "../../../components/ui/DetailCard";
import { getRequests } from "../data/mockJmlRequests";
import { X } from "lucide-react";

export function RequestListPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  const requests = useMemo(
    () => getRequests().filter((request) => request.createdByMe),
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

  function openDetails(request) {
    setSelected(request);
    dialogRef.current?.showModal();
  }

  useHeaderSearch({ value: search, onChange: setSearch });

  return (
    <div>
      <PageHeader title="JML Request List" />

      <SectionCard>
        <DataTable
          className="table-zebra table-sm"
          keyField="ticketId"
          rows={filtered}
          emptyMessage="You haven't created any JML requests yet."
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
              key: "actions",
              header: "Action",
              className: "w-px whitespace-nowrap text-center",
              render: (row) => (
                <button
                  type="button"
                  onClick={() => openDetails(row)}
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

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
              <X />
            </button>
          </form>
          {selected && (
            <div className="space-y-4 mt-2">
              <h3 className="font-bold text-lg">
                Request Details — {selected.ticketId}
              </h3>
              <DetailCard
                title="Basic Information"
                items={[
                  { label: "Full Name", value: selected.fullName },
                  { label: "Official Phone Number", value: selected.phone },
                  { label: "Email", value: selected.email },
                  {
                    label: "Line Manager Email",
                    value: selected.lineManagerEmail,
                  },
                  { label: "Designation", value: selected.designation },
                  { label: "Effective Date", value: selected.effectiveDate },
                  { label: "Request Type", value: selected.requestType },
                  {
                    label: "Request Status",
                    value: <StatusBadge status={selected.requestStatus} />,
                  },
                  { label: "Account Type", value: selected.accountType },
                ]}
              />
              <DetailCard
                title="Location Assigned"
                items={[
                  { label: "Region", value: selected.region.join(" , ") },
                ]}
              />
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
