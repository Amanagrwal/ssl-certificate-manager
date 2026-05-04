import { useState } from "react";
import { Copy, Check, RefreshCw, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SSLOrder } from "@/data/ssl-mock-data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  );
}

export function ValidationInstructionCard({ order }: { order: SSLOrder }) {
  if (order.status !== "pending_validation") return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-status-info">
          <RefreshCw className="h-5 w-5" />
          Domain Validation Required
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete the domain validation to proceed with certificate issuance.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dns">
          <TabsList className="mb-4">
            <TabsTrigger value="dns">DNS Validation</TabsTrigger>
            <TabsTrigger value="email">Email Validation</TabsTrigger>
            <TabsTrigger value="http">HTTP File</TabsTrigger>
          </TabsList>

          <TabsContent value="dns">
            <p className="mb-4 text-sm text-muted-foreground">
              Please add the following CNAME record in your domain DNS panel.
            </p>
            <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Type</span>
                  <p className="text-sm font-mono font-semibold">{order.dnsRecord?.type || "CNAME"}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium text-muted-foreground">Name</span>
                  <p className="text-sm font-mono break-all">{order.dnsRecord?.name || `_acme-challenge.${order.domain}`}</p>
                </div>
                <CopyButton text={order.dnsRecord?.name || `_acme-challenge.${order.domain}`} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium text-muted-foreground">Value</span>
                  <p className="text-sm font-mono break-all">{order.dnsRecord?.value || "abc123.provider-validation.com"}</p>
                </div>
                <CopyButton text={order.dnsRecord?.value || "abc123.provider-validation.com"} />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* TODO: Connect to API - POST /api/ssl/{id}/check-validation */}
              <Button>
                <RefreshCw className="h-4 w-4" />
                I have added DNS, Check Status
              </Button>
              <span className="text-xs text-muted-foreground">DNS propagation may take some time.</span>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Verification email sent to:</p>
                  <p className="font-mono text-sm">admin@{order.domain}</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Check your inbox and follow the instructions in the verification email to validate domain ownership.
            </p>
          </TabsContent>

          <TabsContent value="http">
            <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
              <div>
                <span className="text-xs font-medium text-muted-foreground">File Path</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm break-all">http://{order.domain}/.well-known/pki-validation/fileauth.txt</p>
                  <CopyButton text={`http://${order.domain}/.well-known/pki-validation/fileauth.txt`} />
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">File Content</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm">A1B2C3D4E5F6G7H8I9J0</p>
                  <CopyButton text="A1B2C3D4E5F6G7H8I9J0" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <FileText className="mr-1 inline h-3 w-3" />
              Upload the file to the specified path on your web server, then click check status.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
