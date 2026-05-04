import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SSLOrder } from "@/data/ssl-mock-data";

export function CertificateCard({ order }: { order: SSLOrder }) {
  const [showCert, setShowCert] = useState(false);
  const [copied, setCopied] = useState(false);

  if (order.status !== "active" || !order.certificate) return null;

  const expiresAt = order.expiresAt ? new Date(order.expiresAt) : null;
  const daysUntilExpiry = expiresAt
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 30;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.certificate!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-status-success">
          <ShieldCheck className="h-5 w-5" />
          Certificate Active
        </CardTitle>
        {isExpiringSoon && (
          <div className="mt-2 flex items-center gap-2 rounded-md bg-status-warning/10 px-3 py-2 text-sm text-status-warning">
            <AlertTriangle className="h-4 w-4" />
            Certificate expires in {daysUntilExpiry} days. Consider renewing.
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {/* TODO: Connect to API - GET /api/ssl/{id}/download-certificate */}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Download Certificate
          </Button>
          {/* TODO: Connect to API - GET /api/ssl/{id}/download-ca-bundle */}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Download CA Bundle
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Certificate"}
          </Button>
          {/* TODO: Connect to API - POST /api/ssl/{id}/renew */}
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
            Renew SSL
          </Button>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 px-0 text-muted-foreground"
            onClick={() => setShowCert(!showCert)}
          >
            {showCert ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showCert ? "Hide" : "Show"} Certificate Preview
          </Button>
          {showCert && (
            <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-xs text-foreground">
              {order.certificate}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
