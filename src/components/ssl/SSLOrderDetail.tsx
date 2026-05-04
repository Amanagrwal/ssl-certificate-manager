import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Copy,
  Check,
  Eye,
  ShieldCheck,
  User,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { SSLTimeline } from "./SSLTimeline";
import { ValidationInstructionCard } from "./ValidationInstructionCard";
import { CertificateCard } from "./CertificateCard";
import { ErrorCard } from "./LoadingStates";
import type { SSLOrder } from "@/data/ssl-mock-data";
import { mockSSLOrders } from "@/data/ssl-mock-data";

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="min-w-[140px] text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}

export function SSLOrderDetail({ orderId }: { orderId: string }) {
  const [csrVisible, setCsrVisible] = useState(false);
  const [copiedCsr, setCopiedCsr] = useState(false);

  // TODO: Replace with API call - GET /api/ssl/orders/{orderId}
  const order = mockSSLOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="space-y-6">
        <Link to="/ssl">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <ErrorCard message={`Order ${orderId} not found.`} />
      </div>
    );
  }

  const handleCopyCsr = () => {
    if (order.csr) {
      navigator.clipboard.writeText(order.csr);
      setCopiedCsr(true);
      setTimeout(() => setCopiedCsr(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/ssl">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{order.domain}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-sm text-muted-foreground">Order {order.id}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent className="pt-6">
          <SSLTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Validation Instructions */}
      <ValidationInstructionCard order={order} />

      {/* Certificate (for active) */}
      <CertificateCard order={order} />

      {/* Info Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow label="Domain" value={order.domain} />
            <DetailRow label="SSL Type" value={order.sslType} />
            <DetailRow label="Validity" value={order.validity} />
            <DetailRow label="Validation Method" value={order.validationMethod} />
            <DetailRow label="Status" value={<StatusBadge status={order.status} />} />
            <DetailRow label="Provider Order ID" value={order.providerOrderId || "—"} />
            <DetailRow label="Created Date" value={order.createdAt} />
            <DetailRow label="Expiry Date" value={order.expiresAt || "—"} />
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow label="Name" value={order.contactName} />
            <DetailRow label="Email" value={order.contactEmail} />
            <DetailRow label="Phone" value={order.contactPhone} />
            <DetailRow label="Organization" value={order.organization} />
            <DetailRow label="City" value={order.city} />
            <DetailRow label="State" value={order.state} />
            <DetailRow label="Country" value={order.country} />
          </CardContent>
        </Card>
      </div>

      {/* CSR Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            CSR Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DetailRow
            label="CSR Status"
            value={
              order.csrGenerated ? (
                <span className="inline-flex items-center gap-1 text-status-success font-medium">
                  <Check className="h-3.5 w-3.5" /> Generated
                </span>
              ) : (
                <span className="text-muted-foreground">Not yet generated</span>
              )
            }
          />

          {order.csrGenerated && order.csr && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCsrVisible(!csrVisible)}>
                <Eye className="h-4 w-4" />
                {csrVisible ? "Hide CSR" : "View CSR"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyCsr}>
                {copiedCsr ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedCsr ? "Copied!" : "Copy CSR"}
              </Button>
            </div>
          )}

          {csrVisible && order.csr && (
            <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-xs text-foreground">
              {order.csr}
            </pre>
          )}

          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Private key is securely stored on server side.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
