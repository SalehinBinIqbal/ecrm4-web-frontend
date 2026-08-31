import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";

// columns: [{ key, header, render?(row), className?, isRowHeader? }]
// className: extra daisyUI table modifiers, e.g. "table-zebra table-pin-rows table-pin-cols table-sm"
// isRowHeader: renders that column's body cells as <th> instead of <td> — table-pin-cols only
// pins <th> cells, so a column needs this to actually stay fixed while scrolling horizontally.
export function DataTable({
  columns,
  rows,
  keyField = "id",
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  className = "",
}) {
  if (loading) return <LoadingState />;
  if (!rows || rows.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <div className="overflow-x-auto">
      <table className={`table ${className}`.trim()}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-[11px] uppercase tracking-wider text-base-content/40 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={
                onRowClick ? "cursor-pointer hover:bg-base-200/50" : ""
              }
            >
              {columns.map((col) => {
                const Cell = col.isRowHeader ? "th" : "td";
                return (
                  <Cell key={col.key} className={col.className ?? ""}>
                    {col.render ? col.render(row) : row[col.key]}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
