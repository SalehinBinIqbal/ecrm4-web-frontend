export const DYNAMIC_REPORTS = [
  { id: "daily-raw", title: "Dynamic Daily Raw Report", description: "Raw contact-level data for the selected date range." },
  { id: "region-summary", title: "Region Summary Report", description: "Consumer contact totals grouped by region." },
  { id: "campaign-ptr", title: "Campaign Wise Contact and PTR (Target & Achievement)", description: "Target vs. achievement per campaign." },
  { id: "national-raw", title: "National Raw Report", description: "Full national raw contact export." },
  { id: "campaign-readiness", title: "Campaign Readiness Report", description: "Cluster readiness status of a campaign." },
  { id: "ff-status", title: "FF User Status", description: "Assigned campaign history per field force user." },
];

export const CAMPAIGN_OPTIONS = [
  "General Survey",
  "Circle 1-2-1",
  "Euphoria 1-2-1",
  "Derby Range X Breakstation",
  "PJ Rebel Luckies Range CE",
];

export const LOCATION_OPTIONS = [
  "Dhaka South",
  "Dhaka North",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
];

function seedRows(reportId) {
  return LOCATION_OPTIONS.map((location, index) => ({
    id: `${reportId}-${index}`,
    location,
    campaign: CAMPAIGN_OPTIONS[index % CAMPAIGN_OPTIONS.length],
    totalConsumer: Math.round(8000 + Math.random() * 250000),
    ptrAchieved: `${Math.round(60 + Math.random() * 35)}%`,
  }));
}

export function generateDynamicReportRows(reportId) {
  return seedRows(reportId);
}
