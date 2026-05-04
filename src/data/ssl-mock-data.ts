// SSL Certificate Orders - Mock Data
// TODO: Replace with API calls to Django backend

export type SSLStatus =
  | "draft"
  | "payment_pending"
  | "pending_validation"
  | "active"
  | "failed"
  | "expired";

export type SSLType = "DV SSL" | "OV SSL" | "EV SSL" | "Wildcard SSL";
export type Validity = "1 Year" | "2 Years";
export type ValidationMethod = "DNS Validation" | "Email Validation" | "HTTP File Validation";

export interface DNSRecord {
  type: string;
  name: string;
  value: string;
}

export interface SSLOrder {
  id: string;
  domain: string;
  sslType: SSLType;
  validity: Validity;
  validationMethod: ValidationMethod;
  status: SSLStatus;
  providerOrderId: string;
  createdAt: string;
  expiresAt: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  organization: string;
  city?: string;
  state?: string;
  country?: string;
  dnsRecord?: DNSRecord;
  csrGenerated?: boolean;
  csr?: string;
  certificate?: string;
}

export const SSL_STATUS_CONFIG: Record<
  SSLStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "gray" },
  payment_pending: { label: "Payment Pending", color: "yellow" },
  pending_validation: { label: "Pending Validation", color: "blue" },
  active: { label: "Active", color: "green" },
  failed: { label: "Failed", color: "red" },
  expired: { label: "Expired", color: "orange" },
};

export const TIMELINE_STEPS = [
  "Order Created",
  "Payment Success",
  "CSR Generated",
  "Pending Validation",
  "Certificate Issued",
  "Active",
] as const;

export const STATUS_TO_STEP: Record<SSLStatus, number> = {
  draft: 0,
  payment_pending: 1,
  pending_validation: 3,
  active: 5,
  failed: 3,
  expired: 5,
};

export const mockSSLOrders: SSLOrder[] = [
  {
    id: "SSL-1001",
    domain: "example.com",
    sslType: "DV SSL",
    validity: "1 Year",
    validationMethod: "DNS Validation",
    status: "pending_validation",
    providerOrderId: "PROV-88991",
    createdAt: "2026-05-04",
    expiresAt: null,
    contactName: "Aman Mangal",
    contactEmail: "user@example.com",
    contactPhone: "+91 9999999999",
    organization: "Demo Company",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    csrGenerated: true,
    csr: "-----BEGIN CERTIFICATE REQUEST-----\nMIICYDCCAUgCAQAwGzEZMBcGA1UEAwwQZXhhbXBsZS5jb20KLS0t\nLS1FTkQgQ0VSVElGSUNBVEUgUkVRVUVTVC0tLS0t\n-----END CERTIFICATE REQUEST-----",
    dnsRecord: {
      type: "CNAME",
      name: "_acme-challenge.example.com",
      value: "abc123.provider-validation.com",
    },
  },
  {
    id: "SSL-1002",
    domain: "mycompany.com",
    sslType: "Wildcard SSL",
    validity: "1 Year",
    validationMethod: "DNS Validation",
    status: "active",
    providerOrderId: "PROV-88992",
    createdAt: "2026-04-01",
    expiresAt: "2027-04-01",
    contactName: "Rajesh Kumar",
    contactEmail: "admin@mycompany.com",
    contactPhone: "+91 8888888888",
    organization: "My Company Pvt Ltd",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    csrGenerated: true,
    csr: "-----BEGIN CERTIFICATE REQUEST-----\nMIICYDCCAUgCAQAwGzEZMBcGA1UEAwwQbXljb21wYW55LmNvbQot\nLS0tLUVORCBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0=\n-----END CERTIFICATE REQUEST-----",
    certificate:
      "-----BEGIN CERTIFICATE-----\nFAKE_SSL_CERTIFICATE_FOR_mycompany.com\n-----END CERTIFICATE-----",
  },
  {
    id: "SSL-1003",
    domain: "shop.example.org",
    sslType: "EV SSL",
    validity: "2 Years",
    validationMethod: "Email Validation",
    status: "payment_pending",
    providerOrderId: "PROV-88993",
    createdAt: "2026-05-03",
    expiresAt: null,
    contactName: "Priya Sharma",
    contactEmail: "priya@example.org",
    contactPhone: "+91 7777777777",
    organization: "Shop Example Org",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    csrGenerated: false,
  },
  {
    id: "SSL-1004",
    domain: "oldsite.net",
    sslType: "DV SSL",
    validity: "1 Year",
    validationMethod: "HTTP File Validation",
    status: "expired",
    providerOrderId: "PROV-88994",
    createdAt: "2025-04-15",
    expiresAt: "2026-04-15",
    contactName: "Vikram Singh",
    contactEmail: "vikram@oldsite.net",
    contactPhone: "+91 6666666666",
    organization: "Old Site Networks",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    csrGenerated: true,
    certificate:
      "-----BEGIN CERTIFICATE-----\nFAKE_SSL_CERTIFICATE_FOR_oldsite.net\n-----END CERTIFICATE-----",
  },
  {
    id: "SSL-1005",
    domain: "testdomain.io",
    sslType: "OV SSL",
    validity: "1 Year",
    validationMethod: "DNS Validation",
    status: "failed",
    providerOrderId: "PROV-88995",
    createdAt: "2026-05-01",
    expiresAt: null,
    contactName: "Amit Patel",
    contactEmail: "amit@testdomain.io",
    contactPhone: "+91 5555555555",
    organization: "Test Domain Inc",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    csrGenerated: true,
  },
  {
    id: "SSL-1006",
    domain: "staging.dev",
    sslType: "DV SSL",
    validity: "1 Year",
    validationMethod: "DNS Validation",
    status: "draft",
    providerOrderId: "",
    createdAt: "2026-05-04",
    expiresAt: null,
    contactName: "Neha Gupta",
    contactEmail: "neha@staging.dev",
    contactPhone: "+91 4444444444",
    organization: "Staging Dev Co",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    csrGenerated: false,
  },
];
