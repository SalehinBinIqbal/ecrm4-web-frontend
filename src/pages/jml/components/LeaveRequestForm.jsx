import { useState } from "react";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useToast } from "../../../components/ui/ToastProvider";
import { DatePicker } from "../../../components/ui/DatePicker";
import { EmployeeLookup } from "./EmployeeLookup";

export function LeaveRequestForm() {
  const { showToast } = useToast();
  const [effectiveDate, setEffectiveDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!effectiveDate) {
      setError("Effective date is required.");
      return;
    }
    setError("");
    showToast("Leave request created successfully.", "success");
    setEffectiveDate("");
  }

  return (
    <EmployeeLookup>
      <form onSubmit={handleSubmit}>
        <SectionCard title="Leaver Request">
          <label className="flex flex-col gap-1 max-w-xs">
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
