import { useMemo, useState } from "react";
import { Search, Phone, Clock, Eye } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { FilterBar, FilterField } from "../../../components/ui/FilterBar";
import { DatePicker } from "../../../components/ui/DatePicker";
import { DataTable } from "../../../components/ui/DataTable";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Modal } from "../../../components/ui/Modal";
import { GoogleDeckMap } from "../../../components/map/GoogleDeckMap";
import { FIELD_FORCE } from "../data/mockFieldForce";
import { CAMPAIGN_OPTIONS } from "../data/mockReports";
import { buildFieldForceLayer, DHAKA_CENTER } from "../lib/fieldForceLayer";

export function FFContactLocationReportPage() {
  const [campaign, setCampaign] = useState("");
  const [date, setDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  const results = useMemo(
    () =>
      campaign
        ? FIELD_FORCE.filter((ff) => ff.campaign === campaign)
        : FIELD_FORCE,
    [campaign],
  );

  const selectedFf = results.find((ff) => ff.code === selectedCode) ?? null;

  const columns = [
    { key: "code", header: "FF Code" },
    { key: "name", header: "FF Name" },
    { key: "mobile", header: "Mobile Number" },
    { key: "agency", header: "Agency" },
    {
      key: "actions",
      header: "View",
      className: "w-px whitespace-nowrap text-center",
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedCode(row.code)}
          className="btn btn-ghost btn-xs btn-circle"
          aria-label={`View contacts for ${row.name}`}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      ),
    },
  ];

  const layer = useMemo(
    () =>
      buildFieldForceLayer(results, {
        selectedCode,
        onClick: (object) => setSelectedCode(object.code),
      }),
    [results, selectedCode],
  );

  return (
    <div>
      <PageHeader title="FF Contact Location Report" />

      <FilterBar className="grid sm:grid-cols-3 gap-3">
        <FilterField label="Campaign">
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

        <FilterField label="Date">
          <DatePicker
            value={date}
            onChange={setDate}
            className="input-bordered input-sm"
          />
        </FilterField>

        <button
          type="button"
          onClick={() => setSearched(true)}
          className="btn btn-primary btn-sm gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </FilterBar>

      {!searched ? (
        <SectionCard>
          <EmptyState message="Select a campaign and date, then search to view FF contact locations." />
        </SectionCard>
      ) : (
        <>
          <SectionCard className="mb-6">
            <GoogleDeckMap layers={[layer]} center={DHAKA_CENTER} zoom={7} />
          </SectionCard>

          <SectionCard className="mb-6">
            <DataTable
              className="table-zebra table-sm"
              columns={columns}
              rows={results}
              keyField="code"
              emptyMessage="No field force found for this campaign."
            />
          </SectionCard>

          <Modal
            open={Boolean(selectedFf)}
            title={selectedFf && `Contacts done by ${selectedFf.name}`}
            onClose={() => setSelectedCode(null)}
            maxWidth="max-w-3xl"
          >
            {selectedFf && (
              <DataTable
                keyField="consumerNumber"
                rows={selectedFf.contacts}
                emptyMessage="No contacts recorded for this FF on the selected date."
                columns={[
                  { key: "consumerName", header: "Consumer Name" },
                  {
                    key: "consumerNumber",
                    header: "Phone Number",
                    render: (row) => (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-base-content/40" />
                        {row.consumerNumber}
                      </span>
                    ),
                  },
                  { key: "start", header: "Contact Start Time" },
                  { key: "end", header: "Contact End Time" },
                  {
                    key: "duration",
                    header: "Duration",
                    render: (row) => (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-base-content/40" />
                        {row.duration}
                      </span>
                    ),
                  },
                ]}
              />
            )}
          </Modal>
        </>
      )}
    </div>
  );
}
