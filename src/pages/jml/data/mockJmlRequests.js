export const JML_REQUESTS = [
  {
    ticketId: "TID33194876",
    fullName: "Tarin",
    phone: "01778547869",
    email: "farjana.tarin1@v2.ltd",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Operation Manager IMSL",
    accountType: "Agency Management",
    requestType: "Joiner",
    effectiveDate: "2026-08-25",
    requestStatus: "Pending",
    createdByMe: true,
    assignedToMe: true,
    region: ["Sylhet", "Dhaka South", "Dhaka North", "Rajshahi", "Khulna", "Apsis Test Region", "Chittagong", "Barishal"],
  },
  {
    ticketId: "TID96057722",
    fullName: "Salehin Bin Iqbal",
    phone: "01624580318",
    email: "salehin.iqbal@v2.ltd",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Senior Data Analyst",
    accountType: "Tech Support",
    requestType: "Mover",
    effectiveDate: "2026-08-23",
    requestStatus: "Approved",
    createdByMe: true,
    assignedToMe: true,
    region: ["Sylhet", "Dhaka South", "Dhaka North"],
  },
  {
    ticketId: "TID90415367",
    fullName: "Salehin Bin Iqbal",
    phone: "01624580318",
    email: "salehin.iqbal@v2.ltd",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Junior Data Analyst",
    accountType: "Tech Support",
    requestType: "Account activation",
    effectiveDate: "2026-08-23",
    requestStatus: "Approved",
    createdByMe: false,
    assignedToMe: true,
    region: ["Sylhet"],
  },
  {
    ticketId: "TID71019755",
    fullName: "Salehin Bin Iqbal",
    phone: "01624580318",
    email: "salehin.iqbal@v2.ltd",
    lineManagerEmail: "admin@v2.ltd",
    designation: "Junior Data Analyst",
    accountType: "Tech Support",
    requestType: "Leaver",
    effectiveDate: "2026-08-23",
    requestStatus: "Approved",
    createdByMe: true,
    assignedToMe: true,
    region: ["Sylhet"],
  },
  {
    ticketId: "TID88373450",
    fullName: "Shaivik",
    phone: "01830330777",
    email: "shaivik.v2@gmail.com",
    lineManagerEmail: "admin2@v2.ltd",
    designation: "Operation Manager IMSL 2",
    accountType: "BATB",
    requestType: "Joiner",
    effectiveDate: "2026-08-23",
    requestStatus: "Approved",
    createdByMe: false,
    assignedToMe: true,
    region: ["Dhaka South", "Chittagong"],
  },
  {
    ticketId: "TID15223942",
    fullName: "Prodip Sharkar",
    phone: "01457896966",
    email: "prodip.sharkar@v2.ltd",
    lineManagerEmail: "zubaer_bin_alam@bat.com",
    designation: "Senior Brand Manager - AWAP",
    accountType: "BATB",
    requestType: "Joiner",
    effectiveDate: "2026-08-23",
    requestStatus: "Approved",
    createdByMe: true,
    assignedToMe: false,
    region: ["Dhaka North"],
  },
  {
    ticketId: "TID15685730",
    fullName: "Test Today",
    phone: "01983987650",
    email: "testingtodayy@gmail.com",
    lineManagerEmail: "admin2@v2.ltd",
    designation: "Test26",
    accountType: "Technical Support",
    requestType: "Joiner",
    effectiveDate: "2026-02-18",
    requestStatus: "Approved",
    createdByMe: true,
    assignedToMe: false,
    region: ["Barishal"],
  },
];

let requestsState = JML_REQUESTS.map((request) => ({ ...request }));

export function getRequests() {
  return requestsState;
}

export function updateRequestStatus(ticketId, status) {
  requestsState = requestsState.map((request) =>
    request.ticketId === ticketId ? { ...request, requestStatus: status } : request,
  );
  return requestsState;
}

export function addRequest(request) {
  requestsState = [request, ...requestsState];
  return requestsState;
}
