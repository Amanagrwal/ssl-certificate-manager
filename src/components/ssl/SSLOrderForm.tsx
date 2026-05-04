import { useState } from "react";
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

export function SSLOrderForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Replace with API call - POST /api/ssl/orders
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1000));

    setSuccess(true);
    setTimeout(() => {
      // Navigate to the newly created order (using first mock order as placeholder)
      navigate({ to: "/ssl/$orderId", params: { orderId: "SSL-1001" } });
    }, 1500);
  };

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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create SSL Order</h1>
          <p className="text-sm text-muted-foreground">Fill in the details to order a new SSL certificate</p>
        </div>
      </div>

      {success && <SuccessMessage message="SSL order created successfully! Redirecting..." />}

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
              />
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
            {submitting ? "Creating..." : "Create SSL Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
