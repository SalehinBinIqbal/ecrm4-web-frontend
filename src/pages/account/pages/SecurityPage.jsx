import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useToast } from "../../../components/ui/ToastProvider";

const EMPTY_FORM = { current: "", next: "", confirm: "" };
const MIN_PASSWORD_LENGTH = 8;

export function SecurityPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [mfaEnabled, setMfaEnabled] = useState(false);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleVisible(field) {
    setVisible((current) => ({ ...current, [field]: !current[field] }));
  }

  function handleReset(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.current) nextErrors.current = "Current password is required.";
    if (!form.next) nextErrors.next = "New password is required.";
    else if (form.next.length < MIN_PASSWORD_LENGTH)
      nextErrors.next = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    if (!form.confirm) nextErrors.confirm = "Please confirm your new password.";
    else if (form.confirm !== form.next)
      nextErrors.confirm = "Passwords do not match.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    showToast("Password reset successfully.", "success");
    setForm(EMPTY_FORM);
  }

  return (
    <div>
      <PageHeader title="Security" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <SectionCard title="Reset Password">
          <form onSubmit={handleReset} className="space-y-4">
            <PasswordField
              label="Current Password"
              value={form.current}
              visible={visible.current}
              error={errors.current}
              onChange={(value) => setField("current", value)}
              onToggle={() => toggleVisible("current")}
            />
            <PasswordField
              label="New Password"
              value={form.next}
              visible={visible.next}
              error={errors.next}
              onChange={(value) => setField("next", value)}
              onToggle={() => toggleVisible("next")}
            />
            <PasswordField
              label="Confirm Password"
              value={form.confirm}
              visible={visible.confirm}
              error={errors.confirm}
              onChange={(value) => setField("confirm", value)}
              onToggle={() => toggleVisible("confirm")}
            />
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Enable MFA">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-base-content/70">
              Multi Factor Authentication (MFA) enables an extra layer of
              security to your account. Please scan the QR code with any
              authenticator app, e.g.{" "}
              <span className="font-medium">
                Microsoft Authenticator or Google Authenticator
              </span>
              . You won't be able to log in next time if you don't set up MFA
              after enabling it.
            </p>
            <input
              type="checkbox"
              className="toggle toggle-primary shrink-0"
              checked={mfaEnabled}
              onChange={() => setMfaEnabled((current) => !current)}
              aria-label="Enable MFA"
            />
          </div>

          {mfaEnabled && (
            <div className="mt-5 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-base-300 py-8">
              <div className="w-32 h-32 rounded-lg bg-base-200 flex items-center justify-center text-xs text-base-content/40">
                QR Code
              </div>
              <p className="text-xs text-base-content/50">
                Scan with your authenticator app to finish setup.
              </p>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function PasswordField({ label, value, visible, error, onChange, onToggle }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">
        <span className="text-error">*</span> {label}
      </span>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="input input-bordered w-full pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
    </label>
  );
}
