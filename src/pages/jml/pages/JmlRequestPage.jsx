import { useState } from "react";
import { Plus, Repeat, LogOut, UserCheck } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { NewJoinForm } from "../components/NewJoinForm";
import { MoveRequestForm } from "../components/MoveRequestForm";
import { LeaveRequestForm } from "../components/LeaveRequestForm";
import { AccountActivationForm } from "../components/AccountActivationForm";

const TABS = [
  { key: "new-join", label: "New Join", icon: Plus, Component: NewJoinForm },
  {
    key: "move",
    label: "Move Request",
    icon: Repeat,
    Component: MoveRequestForm,
  },
  {
    key: "leave",
    label: "Leave Request",
    icon: LogOut,
    Component: LeaveRequestForm,
  },
  {
    key: "account-activation",
    label: "Account Activation Request",
    icon: UserCheck,
    Component: AccountActivationForm,
  },
];

export function JmlRequestPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const ActiveComponent = TABS.find((tab) => tab.key === activeTab).Component;

  return (
    <div>
      <PageHeader title="Create JML Request" />

      <div
        role="tablist"
        className="tabs tabs-box bg-base-200/60 p-1.5 mb-6 inline-flex w-fit gap-1"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              onClick={() => setActiveTab(tab.key)}
              className={`tab gap-1.5 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "tab-active bg-base-100! shadow-sm font-medium text-primary"
                  : "text-base-content/60"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <ActiveComponent />
    </div>
  );
}
