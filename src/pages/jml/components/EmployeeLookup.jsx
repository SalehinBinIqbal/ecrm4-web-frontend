import { useState } from "react";
import { Search } from "lucide-react";
import { SectionCard } from "../../../components/ui/SectionCard";
import { DetailCard } from "../../../components/ui/DetailCard";
import { EmptyState } from "../../../components/ui/EmptyState";
import { findByEmail } from "../data/mockJmlUsers";

// Shared "search existing user by Official Email" pattern used by Move,
// Leave, and Account Activation requests. Renders the found employee's
// Basic Information / Location Assigned panels, then whatever
// action-specific section the caller passes as children.
export function EmployeeLookup({ children }) {
  const [email, setEmail] = useState("");
  const [employee, setEmployee] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    setEmployee(findByEmail(email));
    setSearched(true);
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Employment Information">
        <label className="flex flex-col gap-1 max-w-lg">
          <span className="text-sm font-medium">
            <span className="text-error">*</span> Official Email
          </span>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input input-bordered flex-1"
              placeholder="name@company.com"
            />
            <button type="button" onClick={handleSearch} className="btn btn-primary gap-2">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </label>
      </SectionCard>

      {searched && !employee && (
        <SectionCard>
          <EmptyState message="No employee found for this email." />
        </SectionCard>
      )}

      {employee && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DetailCard
              title="Basic Information"
              items={[
                { label: "Full Name", value: employee.fullName },
                { label: "Official Phone Number", value: employee.officialPhone },
                { label: "Email", value: employee.email },
                { label: "Line Manager Email", value: employee.lineManagerEmail },
                { label: "Designation", value: employee.designation },
                { label: "Effective Date", value: employee.effectiveDate },
                { label: "Request Type", value: employee.requestType },
                { label: "Request Status", value: employee.requestStatus },
                { label: "Account Type", value: employee.accountType },
              ]}
            />
            <DetailCard
              title="Location Assigned"
              items={[{ label: "Region", value: employee.region.join(" , ") }]}
            />
          </div>
          {typeof children === "function" ? children(employee) : children}
        </>
      )}
    </div>
  );
}
