import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { DataTable } from "../../../components/ui/DataTable";
import { Pagination } from "../../../components/ui/Pagination";
import { useToast } from "../../../components/ui/ToastProvider";
import { USERS } from "../data/mockUsers";

const PAGE_SIZE = 10;

export function UserListPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(USERS);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.designation.toLowerCase().includes(query),
    );
  }, [users, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useHeaderSearch({
    value: search,
    onChange: (value) => {
      setSearch(value);
      setPage(1);
    },
    placeholder: "Search users",
  });

  function toggleField(username, field) {
    setUsers((current) =>
      current.map((user) =>
        user.username === username ? { ...user, [field]: !user[field] } : user,
      ),
    );
    showToast("User updated successfully.", "success");
  }

  return (
    <div>
      <PageHeader title="Users" />

      <SectionCard>
        <DataTable
          className="table-zebra table-sm"
          keyField="username"
          rows={pageRows}
          emptyMessage="No users match your search."
          columns={[
            { key: "username", header: "Username" },
            { key: "fullName", header: "Full Name" },
            { key: "designation", header: "Designation" },
            { key: "phone", header: "Phone Number" },
            {
              key: "active",
              header: "Status",
              className: "w-px whitespace-nowrap text-center",
              render: (row) => (
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={row.active}
                  onChange={() => toggleField(row.username, "active")}
                />
              ),
            },
            {
              key: "locked",
              header: "Lock Status",
              className: "w-px whitespace-nowrap text-center",
              render: (row) => (
                <input
                  type="checkbox"
                  className="toggle toggle-error toggle-sm"
                  checked={row.locked}
                  onChange={() => toggleField(row.username, "locked")}
                />
              ),
            },
            {
              key: "action",
              header: "Action",
              className: "w-px whitespace-nowrap text-center",
              render: () => (
                <button
                  type="button"
                  className="btn btn-ghost btn-xs btn-circle"
                  aria-label="Edit user"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              ),
            },
          ]}
        />
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </SectionCard>
    </div>
  );
}
