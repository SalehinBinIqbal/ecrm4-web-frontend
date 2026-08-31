// Builds a CSV blob from column definitions + rows and triggers a browser
// download. Used by the Dynamic Report and Dashboard View download actions.
export function downloadCsv(filename, columns, rows) {
  const header = columns.map((col) => escapeCsvValue(col.header)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => escapeCsvValue(col.render ? col.render(row) : row[col.key]))
        .join(","),
    )
    .join("\n");

  const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}
