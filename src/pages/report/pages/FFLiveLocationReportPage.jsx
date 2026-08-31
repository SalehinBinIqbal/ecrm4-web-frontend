import { useEffect, useMemo, useState } from "react";
import { Search, Radio, Eye } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { FilterBar, FilterField } from "../../../components/ui/FilterBar";
import { DataTable } from "../../../components/ui/DataTable";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Modal } from "../../../components/ui/Modal";
import { GoogleDeckMap } from "../../../components/map/GoogleDeckMap";
import { FIELD_FORCE } from "../data/mockFieldForce";
import { CAMPAIGN_OPTIONS, LOCATION_OPTIONS } from "../data/mockReports";
import { buildFieldForceLayer, DHAKA_CENTER } from "../lib/fieldForceLayer";

const JITTER = 0.01;

export function FFLiveLocationReportPage() {
  const [location, setLocation] = useState("");
  const [campaign, setCampaign] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [liveField, setLiveField] = useState(FIELD_FORCE);

  // Simulate "live" movement by nudging each FF's position slightly on an interval.
  useEffect(() => {
    if (!searched) return undefined;
    const interval = setInterval(() => {
      setLiveField((current) =>
        current.map((ff) => ({
          ...ff,
          position: {
            lat: ff.position.lat + (Math.random() - 0.5) * JITTER,
            lng: ff.position.lng + (Math.random() - 0.5) * JITTER,
          },
        })),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [searched]);

  const results = useMemo(
    () =>
      campaign ? liveField.filter((ff) => ff.campaign === campaign) : liveField,
    [liveField, campaign],
  );

  const selectedFf = results.find((ff) => ff.code === selectedCode) ?? null;

  const columns = [
    { key: "code", header: "FF Code" },
    { key: "name", header: "FF Name" },
    { key: "mobile", header: "FF Mobile Number" },
    { key: "supervisor", header: "Supervisor Name" },
    { key: "agency", header: "Agency Name" },
    { key: "lastLocationTime", header: "Last Location Time" },
    {
      key: "actions",
      header: "View",
      className: "w-px whitespace-nowrap text-center",
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedCode(row.code)}
          className="btn btn-ghost btn-xs btn-circle"
          aria-label={`View details for ${row.name}`}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      ),
    },
  ];

  const layer = useMemo(
    () =>
      buildFieldForceLayer(results, {
        id: "ff-live",
        selectedCode,
        onClick: (object) => setSelectedCode(object.code),
      }),
    [results, selectedCode],
  );

  return (
    <div>
      <PageHeader title="FF Live Location Report" />

      <FilterBar className="grid sm:grid-cols-3 gap-3">
        <FilterField label="Location">
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
          <EmptyState message="Select filters and search to view live FF locations." />
        </SectionCard>
      ) : (
        <>
          <SectionCard
            title="FF Live Locations"
            actions={
              <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                Live
              </span>
            }
            className="mb-6"
          >
            <GoogleDeckMap layers={[layer]} center={DHAKA_CENTER} zoom={7} />
          </SectionCard>

          <SectionCard title="Field Force" className="mb-6">
            <DataTable
              className="table-zebra table-sm"
              keyField="code"
              rows={results}
              columns={columns}
              emptyMessage="No field force found for these filters."
            />
          </SectionCard>

          <Modal
            open={Boolean(selectedFf)}
            title={selectedFf && `${selectedFf.name}'s Details`}
            onClose={() => setSelectedCode(null)}
            maxWidth="max-w-2xl"
          >
            {selectedFf && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "FF Code", value: selectedFf.code },
                  { label: "Mobile Number", value: selectedFf.mobile },
                  { label: "Supervisor", value: selectedFf.supervisor },
                  { label: "Agency", value: selectedFf.agency },
                  { label: "Campaign", value: selectedFf.campaign },
                  {
                    label: "Last Location Time",
                    value: selectedFf.lastLocationTime,
                  },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium text-base-content mt-1 wrap-break-word">
                      {item.value || (
                        <span className="text-base-content/30 font-normal">
                          —
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}
