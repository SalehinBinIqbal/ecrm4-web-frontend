import { useAuth } from "../../../auth/AuthContext";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { DetailCard } from "../../../components/ui/DetailCard";

const MOCK_PROFILE = {
  officialPhone: "01310986500",
  personalPhone: "—",
  dateOfBirth: "January 1, 2000",
  gender: "—",
  bloodGroup: "—",
  religion: "—",
  presentAddress: "—",
  permanentAddress: "—",
  emergency: { address: "—", contactName: "—", phone: "—", relation: "—" },
  region: [
    "Sylhet",
    "Dhaka South",
    "Dhaka North",
    "Rajshahi",
    "Khulna",
    "Chittagong",
    "MT Region",
    "Barishal",
  ],
  username: "tahmidultajislam1310986500@ecrm",
  joiningDate: "2025-12-29",
};

export function AccountProfilePage() {
  const { getUser } = useAuth();
  const user = getUser() ?? { name: "User", role: "" };

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard>
          <div className="flex items-center gap-4 -mt-1 mb-5">
            <div className="avatar avatar-placeholder">
              <div className="bg-primary/10 text-primary w-16 rounded-full ring-4 ring-primary/5">
                <span className="text-xl font-semibold">
                  {user.initials ?? user.name?.[0]}
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-base-content/55">{user.role}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {[
              ["Official Phone Number", MOCK_PROFILE.officialPhone],
              ["Personal Phone Number", MOCK_PROFILE.personalPhone],
              ["Date of Birth", MOCK_PROFILE.dateOfBirth],
              ["Gender", MOCK_PROFILE.gender],
              ["Blood Group", MOCK_PROFILE.bloodGroup],
              ["Religion", MOCK_PROFILE.religion],
              ["Present Address", MOCK_PROFILE.presentAddress],
              ["Permanent Address", MOCK_PROFILE.permanentAddress],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                  {label}
                </dt>
                <dd className="text-sm font-medium mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <div className="space-y-6">
          <DetailCard
            title="Emergency Contact"
            items={[
              { label: "Address", value: MOCK_PROFILE.emergency.address },
              {
                label: "Contact Name",
                value: MOCK_PROFILE.emergency.contactName,
              },
              { label: "Phone Number", value: MOCK_PROFILE.emergency.phone },
              {
                label: "Relation with the contact person",
                value: MOCK_PROFILE.emergency.relation,
              },
            ]}
          />
          <DetailCard
            title="Location Assigned"
            items={[
              { label: "Region", value: MOCK_PROFILE.region.join(" , ") },
            ]}
          />
          <DetailCard
            title="Employment Information"
            items={[
              { label: "Username", value: MOCK_PROFILE.username },
              { label: "Designation", value: user.role },
              { label: "Joining Date", value: MOCK_PROFILE.joiningDate },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
