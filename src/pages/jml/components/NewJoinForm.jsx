import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useToast } from "../../../components/ui/ToastProvider";
import { DatePicker } from "../../../components/ui/DatePicker";
import { ACCOUNT_TYPES, DESIGNATION_OPTIONS, HIERARCHY_OPTIONS } from "../data/options";
import { LOCATION_OPTIONS } from "../../report/data/mockReports";

const EMPTY_FORM = {
  accountType: "BATB",
  oneId: "",
  officialEmail: "",
  officialPhone: "",
  fullName: "",
  designation: "",
  hierarchy: "",
  location: "",
  activationDate: "",
};

export function NewJoinForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const required = ["officialEmail", "officialPhone", "fullName", "designation", "hierarchy", "location", "activationDate"];
    if (form.accountType === "BATB") required.push("oneId");

    const nextErrors = {};
    for (const field of required) {
      if (!form[field]) nextErrors[field] = "This field is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    showToast("New join request created successfully.", "success");
    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <SectionCard title="Employment Information">
        <div className="space-y-5">
          <div>
            <span className="text-sm font-medium">
              <span className="text-error">*</span> Select Account Type
            </span>
            <div className="flex gap-4 mt-2">
              {ACCOUNT_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    className="radio radio-primary radio-sm"
                    checked={form.accountType === type}
                    onChange={() => setField("accountType", type)}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {form.accountType === "BATB" && (
            <Field label="One ID" error={errors.oneId}>
              <input
                className="input input-bordered w-full"
                value={form.oneId}
                onChange={(event) => setField("oneId", event.target.value)}
              />
            </Field>
          )}

          <Field label="Official Email" error={errors.officialEmail}>
            <input
              type="email"
              className="input input-bordered w-full"
              value={form.officialEmail}
              onChange={(event) => setField("officialEmail", event.target.value)}
            />
          </Field>

          <Field label="Official Phone Number" error={errors.officialPhone}>
            <input
              className="input input-bordered w-full"
              value={form.officialPhone}
              onChange={(event) => setField("officialPhone", event.target.value)}
            />
          </Field>

          <Field label="Full Name" error={errors.fullName}>
            <input
              className="input input-bordered w-full"
              value={form.fullName}
              onChange={(event) => setField("fullName", event.target.value)}
            />
          </Field>

          <Field label="Designation" error={errors.designation}>
            <select
              className="select select-bordered w-full"
              value={form.designation}
              onChange={(event) => setField("designation", event.target.value)}
            >
              <option value="">Select designation</option>
              {DESIGNATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hierarchy" error={errors.hierarchy}>
              <select
                className="select select-bordered w-full"
                value={form.hierarchy}
                onChange={(event) => setField("hierarchy", event.target.value)}
              >
                <option value="">Select location hierarchy</option>
                {HIERARCHY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Location" error={errors.location}>
              <div className="flex gap-2">
                <select
                  className="select select-bordered w-full"
                  value={form.location}
                  onChange={(event) => setField("location", event.target.value)}
                >
                  <option value="">Select location name</option>
                  {LOCATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-primary btn-square" aria-label="Add another location">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </Field>
          </div>

          <Field label="Account Activation Date" error={errors.activationDate}>
            <DatePicker
              value={form.activationDate}
              onChange={(value) => setField("activationDate", value)}
              className="input-bordered w-full sm:w-64"
            />
          </Field>

          <div>
            <button type="submit" className="btn btn-primary">
              Create Request
            </button>
          </div>
        </div>
      </SectionCard>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">
        <span className="text-error">*</span> {label}
      </span>
      {children}
      {error && <span className="text-xs text-error">{error}</span>}
    </label>
  );
}
