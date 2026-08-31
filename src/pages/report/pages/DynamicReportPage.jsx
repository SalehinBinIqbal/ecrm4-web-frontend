import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { FilterBar, FilterField } from "../../../components/ui/FilterBar";
import { DateRangePicker } from "../../../components/ui/DatePicker";
import { DataTable } from "../../../components/ui/DataTable";
import { EmptyState } from "../../../components/ui/EmptyState";
import { useHeaderSearch } from "../../../components/layout/HeaderSearchContext";
import { downloadCsv } from "../../../lib/downloadCsv";
import {
  DYNAMIC_REPORTS,
  CAMPAIGN_OPTIONS,
  LOCATION_OPTIONS,
  generateDynamicReportRows,
} from "../data/mockReports";

const COLUMNS = [
  { key: "location", header: "Location" },
  { key: "campaign", header: "Campaign" },
  {
    key: "totalConsumer",
    header: "Total Consumer",
    render: (row) => row.totalConsumer.toLocaleString(),
  },
  { key: "ptrAchieved", header: "PTR Achieved" },
];

export function DynamicReportPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [location, setLocation] = useState("");
  const [campaign, setCampaign] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [rows, setRows] = useState(null);
  const [reportSearch, setReportSearch] = useState("");

  const filteredReports = useMemo(() => {
    const query = reportSearch.trim().toLowerCase();
    if (!query) return DYNAMIC_REPORTS;
    return DYNAMIC_REPORTS.filter(
      (report) =>
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query),
    );
  }, [reportSearch]);

  useHeaderSearch({
    value: reportSearch,
    onChange: setReportSearch,
    placeholder: "Search dynamic reports",
  });

  function handleSearch() {
    setRows(generateDynamicReportRows(selectedReport?.id));
  }

  function handleDownload() {
    downloadCsv(selectedReport?.title ?? "report", COLUMNS, rows);
  }

  return (
    <div>
      <PageHeader title="Dynamic Report" />

      <SectionCard className="mb-6">
        {filteredReports.length === 0 ? (
          <EmptyState message="No reports match your search." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredReports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => {
                  setSelectedReport(report);
                  setRows(null);
                }}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  selectedReport?.id === report.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-base-200 hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary mb-3">
                  <FileText className="h-4 w-4" />
                </span>
                <p className="font-medium text-sm">{report.title}</p>
                <p className="text-xs text-base-content/55 mt-1 leading-relaxed">
                  {report.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      {selectedReport && (
        <>
          <FilterBar className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            <FilterField label="Locations">
              <select
                className="select select-bordered select-sm w-full"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                <option value="">All locations</option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label="Campaigns">
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

            <FilterField label="Date Range">
              <DateRangePicker
                startDate={dateFrom}
                endDate={dateTo}
                onChange={(start, end) => {
                  setDateFrom(start);
                  setDateTo(end);
                }}
                className="input-bordered input-sm"
              />
            </FilterField>

            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-primary btn-sm gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </FilterBar>

          <SectionCard
            title={selectedReport.title}
            actions={
              rows &&
              rows.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              )
            }
          >
            {rows === null ? (
              <EmptyState message="Apply filters to view report data." />
            ) : (
              <DataTable columns={COLUMNS} rows={rows} keyField="id" />
            )}
          </SectionCard>
        </>
      )}
    </div>
  );
}
