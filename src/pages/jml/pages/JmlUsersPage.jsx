import { useMemo, useRef, useState } from "react";
import { History } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DataTable } from "../../../components/ui/DataTable";
import { EmptyState } from "../../../components/ui/EmptyState";
import { JML_USERS_LIST } from "../data/mockJmlUsers";
import { X } from "lucide-react";

export function JmlUsersPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const dialogRef = useRef(null);

  function openHistory(user) {
    setSelectedUser(user);
    dialogRef.current?.showModal();
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return JML_USERS_LIST;
    return JML_USERS_LIST.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [search]);

  useHeaderSearch({ value: search, onChange: setSearch });

  return (
    <div>
      <PageHeader title="JML Users" />

      <SectionCard>
        <DataTable
          className="table-zebra table-sm"
          keyField="id"
          rows={filtered}
          emptyMessage="No JML users match your search."
          columns={[
            { key: "fullName", header: "Full Name" },
            { key: "phone", header: "Phone Number" },
            { key: "email", header: "Email" },
            {
              key: "action",
              header: "Action",
              className: "w-px whitespace-nowrap text-center",
              render: (row) => (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openHistory(row);
                  }}
                  className="btn btn-ghost btn-xs btn-circle"
                  aria-label={`View history for ${row.fullName}`}
                >
                  <History className="h-3.5 w-3.5" />
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
          {selectedUser && (
            <div className="space-y-4 mt-2">
              <h3 className="font-bold text-lg">
                {selectedUser.fullName}'s History
              </h3>

              {selectedUser.history.length === 0 ? (
                <EmptyState message="No ticket history for this user." />
              ) : (
                <ul className="timeline timeline-vertical timeline-compact">
                  {selectedUser.history.map((entry, index) => (
                    <li key={entry.ticketId}>
                      {index !== 0 && <hr />}
                      <div className="timeline-middle">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </div>
                      <div className="timeline-end timeline-box text-sm bg-base-200/50 border border-base-200 shadow-none">
                        <span className="badge badge-soft badge-primary">
                          {entry.ticketId}
                        </span>
                        <p className="mt-2 text-xs text-warning font-medium">
                          Request Date: {entry.requestDate}
                        </p>
                        {entry.approvalDate && (
                          <p className="text-xs text-success font-medium">
                            Approval Date: {entry.approvalDate}
                          </p>
                        )}
                        <p className="mt-2 text-base-content/80">
                          {entry.summary}
                        </p>
                        {entry.approvalNote && (
                          <p className="mt-1 text-base-content/80">
                            {entry.approvalNote}
                          </p>
                        )}
                      </div>
                      {index !== selectedUser.history.length - 1 && <hr />}
                    </li>
                  ))}
                </ul>
              )}
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
