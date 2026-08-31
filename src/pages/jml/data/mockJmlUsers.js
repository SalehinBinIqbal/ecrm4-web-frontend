const REGIONS = ["Sylhet", "Dhaka South", "Dhaka North", "Rajshahi", "Khulna", "Chittagong", "MT Region", "Barishal"];

export const JML_DIRECTORY = [
  {
    email: "prodip.sharkar@v2.ltd",
    fullName: "Prodip Sharkar",
    officialPhone: "01830330659",
    lineManagerEmail: "zubaer_bin_alam@bat.com",
    designation: "KAM Senior Executive",
    effectiveDate: "2025-12-29",
    requestType: "Joiner",
    requestStatus: "Approved",
    accountType: "Agency",
    region: REGIONS,
  },
  {
    email: "salehin.iqbal@v2.ltd",
    fullName: "Salehin Bin Iqbal",
    officialPhone: "01624580318",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Senior Data Analyst",
    effectiveDate: "2026-08-23",
    requestType: "Mover",
    requestStatus: "Approved",
    accountType: "Tech Support",
    region: ["Sylhet", "Dhaka South", "Dhaka North", "Rajshahi", "Khulna", "Chittagong", "Barishal"],
  },
  {
    email: "farjana.tarin@v2.ltd",
    fullName: "Farjana Haque Tarin",
    officialPhone: "01778547869",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Operation Manager IMSL",
    effectiveDate: "2026-08-25",
    requestType: "Joiner",
    requestStatus: "Pending",
    accountType: "Agency Management",
    region: REGIONS,
  },
  {
    email: "shaivik.v2@gmail.com",
    fullName: "Shaivik",
    officialPhone: "01830330777",
    lineManagerEmail: "admin2@v2.ltd",
    designation: "Operation Manager IMSL 2",
    effectiveDate: "2026-08-23",
    requestType: "Joiner",
    requestStatus: "Approved",
    accountType: "BATB",
    region: REGIONS,
  },
];

export function findByEmail(email) {
  const query = email.trim().toLowerCase();
  return JML_DIRECTORY.find((entry) => entry.email.toLowerCase() === query) ?? null;
}

export const JML_USERS_LIST = [
  {
    id: 1,
    fullName: "Shaivik",
    phone: "01830330777",
    email: "shaivik.v2@gmail.com",
    history: [
      {
        ticketId: "TID36698101",
        requestDate: "2026-08-20",
        approvalDate: "2026-08-20",
        summary: "A new join request has been created for Shaivik (shaivik.v2@gmail.com) as Data Analyst role by Madly (admin2@v2.ltd).",
        approvalNote: "Joiner request has been approved by Madly.",
      },
    ],
  },
  {
    id: 2,
    fullName: "Prodip Sharkar",
    phone: "01457896966",
    email: "sharkarshovo111@gmail.com",
    history: [
      {
        ticketId: "TID15223942",
        requestDate: "2026-08-23",
        approvalDate: "2026-08-23",
        summary: "A new join request has been created for Prodip Sharkar (prodip.sharkar@v2.ltd) as Senior Brand Manager - AWAP by Madly (admin2@v2.ltd).",
        approvalNote: "Joiner request has been approved by Madly.",
      },
    ],
  },
  {
    id: 3,
    fullName: "Salehin Bin Iqbal",
    phone: "01624580318",
    email: "salehin.iqbal@v2.ltd",
    history: [
      {
        ticketId: "TID36698101",
        requestDate: "2026-08-20",
        approvalDate: "2026-08-20",
        summary: "A new join request has been created for Salehin Bin Iqbal (salehin.iqbal@v2.ltd) as Data Analyst role by Madly (admin2@v2.ltd).",
        approvalNote: "Joiner request has been approved by Madly.",
      },
      {
        ticketId: "TID71019755",
        requestDate: "2026-08-23",
        approvalDate: "2026-08-23",
        summary: "Leave request has been created by Madly (admin2@v2.ltd).",
        approvalNote: "Leaver request has been approved by Madly.",
      },
      {
        ticketId: "TID84534826",
        requestDate: "2026-08-23",
        approvalDate: null,
        summary: "Leave request has been created by Madly (admin2@v2.ltd).",
        approvalNote: null,
      },
    ],
  },
  {
    id: 4,
    fullName: "Tahmidul Islam",
    phone: "01847596822",
    email: "tahmidtaj.v2@gmail.com",
    history: [],
  },
];
