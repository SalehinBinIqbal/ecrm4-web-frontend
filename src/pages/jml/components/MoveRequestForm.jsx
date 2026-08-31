import { useState } from "react";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useToast } from "../../../components/ui/ToastProvider";
import { DatePicker } from "../../../components/ui/DatePicker";
import { EmployeeLookup } from "./EmployeeLookup";
import { DESIGNATION_OPTIONS, HIERARCHY_OPTIONS } from "../data/options";
import { LOCATION_OPTIONS } from "../../report/data/mockReports";

export function MoveRequestForm() {
  const { showToast } = useToast();
  const [designation, setDesignation] = useState("");
  const [hierarchy, setHierarchy] = useState("");
  const [location, setLocation] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!designation || !hierarchy || !location || !effectiveDate) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    showToast("Move request created successfully.", "success");
    setDesignation("");
    setHierarchy("");
    setLocation("");
    setEffectiveDate("");
  }

  return (
    <EmployeeLookup>
      <form onSubmit={handleSubmit}>
        <SectionCard title="Move To">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                <span className="text-error">*</span> Designation
              </span>
              <select
                className="select select-bordered w-full"
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
              >
                <option value="">Select designation</option>
                {DESIGNATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                <span className="text-error">*</span> Hierarchy
              </span>
              <select
                className="select select-bordered w-full"
                value={hierarchy}
                onChange={(event) => setHierarchy(event.target.value)}
              >
                <option value="">Select location hierarchy</option>
                {HIERARCHY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                <span className="text-error">*</span> Location
              </span>
              <select
                className="select select-bordered w-full"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                <option value="">Select location name</option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1 mt-4 max-w-xs">
            <span className="text-sm font-medium">
              <span className="text-error">*</span> Effective Date
            </span>
            <DatePicker
              value={effectiveDate}
              onChange={setEffectiveDate}
              className="input-bordered w-full"
            />
          </label>

          {error && <p className="text-xs text-error mt-2">{error}</p>}

          <div className="mt-5">
            <button type="submit" className="btn btn-primary">
              Create Request
            </button>
          </div>
        </SectionCard>
      </form>
    </EmployeeLookup>
  );
}
