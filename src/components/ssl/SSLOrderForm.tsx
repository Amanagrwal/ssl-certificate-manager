import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SuccessMessage } from "./LoadingStates";
import { mockSSLOrders } from "@/data/ssl-mock-data";

interface FormData {
  domain: string;
  sslType: string;
  validity: string;
  validationMethod: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  organization: string;
  city: string;
  state: string;
  country: string;
}

const initialForm: FormData = {
  domain: "",
  sslType: "",
  validity: "",
  validationMethod: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  organization: "",
  city: "",
  state: "",
  country: "",
};

interface SSLOrderFormProps {
  editOrderId?: string;
  renewOrderId?: string;
}

export function SSLOrderForm({ editOrderId, renewOrderId }: SSLOrderFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isEdit = !!editOrderId;
  const isRenew = !!renewOrderId;
  const prefillId = editOrderId || renewOrderId;

  // Pre-fill form when editing or renewing
  useEffect(() => {
    if (prefillId) {
      // TODO: Replace with API call - GET /api/ssl/orders/{id}
      const order = mockSSLOrders.find((o) => o.id === prefillId);
      if (order) {
        setForm({
          domain: order.domain,
          sslType: order.sslType,
          validity: order.validity,
          validationMethod: order.validationMethod,
          contactName: order.contactName,
          contactEmail: order.contactEmail,
          contactPhone: order.contactPhone,
          organization: order.organization,
          city: order.city || "",
          state: order.state || "",
          country: order.country || "",
        });
      }
    }
  }, [prefillId]);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Replace with API call
    // Edit: PUT /api/ssl/orders/{id}
    // Renew: POST /api/ssl/orders/{id}/renew
    // Create: POST /api/ssl/orders
    await new Promise((r) => setTimeout(r, 1000));

    setSuccess(true);
    setTimeout(() => {
      const targetId = prefillId || "SSL-1001";
      navigate({ to: "/ssl/$orderId", params: { orderId: targetId } });
    }, 1500);
  };

  const pageTitle = isRenew
    ? "Renew SSL Certificate"
    : isEdit
      ? "Edit SSL Order"
      : "Create SSL Order";

  const pageDescription = isRenew
    ? "Renew your SSL certificate with existing details pre-filled"
    : isEdit
      ? "Update the details for your SSL certificate order"
      : "Fill in the details to order a new SSL certificate";

  const submitLabel = isRenew
    ? "Renew SSL Certificate"
    : isEdit
      ? "Continue to Payment"
      : "Create SSL Order";

  const successMessage = isRenew
    ? "SSL renewal order created successfully! Redirecting..."
    : isEdit
      ? "SSL order updated successfully! Redirecting..."
      : "SSL order created successfully! Redirecting...";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/ssl">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      {success && <SuccessMessage message={successMessage} />}

      <form onSubmit={handleSubmit}>
        {/* SSL Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">SSL Details</CardTitle>
            <CardDescription>Choose your SSL certificate type and validation method</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={form.domain}
                onChange={(e) => update("domain", e.target.value)}
                required
                disabled={isRenew}
              />
              {isRenew && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Domain cannot be changed during renewal.
                </p>
              )}
            </div>
            <div>
              <Label>SSL Type</Label>
              <Select value={form.sslType} onValueChange={(v) => update("sslType", v)} required>
                <SelectTrigger><SelectValue placeholder="Select SSL type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DV SSL">DV SSL</SelectItem>
                  <SelectItem value="OV SSL">OV SSL</SelectItem>
                  <SelectItem value="EV SSL">EV SSL</SelectItem>
                  <SelectItem value="Wildcard SSL">Wildcard SSL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Validity</Label>
              <Select value={form.validity} onValueChange={(v) => update("validity", v)} required>
                <SelectTrigger><SelectValue placeholder="Select validity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Year">1 Year</SelectItem>
                  <SelectItem value="2 Years">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Validation Method</Label>
              <Select value={form.validationMethod} onValueChange={(v) => update("validationMethod", v)} required>
                <SelectTrigger><SelectValue placeholder="Select validation method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DNS Validation">DNS Validation</SelectItem>
                  <SelectItem value="Email Validation">Email Validation</SelectItem>
                  <SelectItem value="HTTP File Validation">HTTP File Validation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Contact Details</CardTitle>
            <CardDescription>Contact information for the certificate owner</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" value={form.contactName} onChange={(e) => update("contactName", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" value={form.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="organization">Organization Name</Label>
              <Input id="organization" value={form.organization} onChange={(e) => update("organization", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link to="/ssl">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Processing..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
