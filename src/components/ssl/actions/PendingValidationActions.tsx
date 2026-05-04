import { useState } from "react";
import {
  RefreshCw,
  Loader2,
  CheckCircle,
  Clock,
  Headphones,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLStatus } from "@/data/ssl-mock-data";

export function PendingValidationActions({
  onStatusChange,
}: {
  onStatusChange: (status: SSLStatus) => void;
}) {
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<"pending" | "success" | null>(null);

  // TODO: Connect SSL status check API - POST /api/ssl/orders/{id}/check-validation
  const handleCheckStatus = async () => {
    setChecking(true);
    setCheckResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setChecking(false);
    setCheckResult("pending");
  };

  // TODO: Connect to real validation API. This is a demo-only shortcut.
  const handleSimulateSuccess = () => {
    setCheckResult("success");
    setTimeout(() => {
      onStatusChange("active");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-status-info">
          <RefreshCw className="h-4 w-4" />
          Validation Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {checking && (
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-status-info" />
            <p className="text-sm text-muted-foreground">Checking validation status...</p>
          </div>
        )}

        {checkResult === "pending" && (
          <div className="flex items-center gap-3 rounded-lg border border-status-warning/30 bg-status-warning/5 p-4">
            <Clock className="h-5 w-5 text-status-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">Validation is still pending</p>
              <p className="text-xs text-muted-foreground">
                DNS propagation may take up to 48 hours. Please try again later.
              </p>
            </div>
          </div>
        )}

        {checkResult === "success" && (
          <div className="flex items-center gap-3 rounded-lg border border-status-success/30 bg-status-success/5 p-4">
            <CheckCircle className="h-5 w-5 text-status-success" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Validation completed successfully!
              </p>
              <p className="text-xs text-muted-foreground">
                Certificate is being issued. Updating status...
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCheckStatus} disabled={checking}>
            {checking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {checking ? "Checking..." : "Check Validation Status"}
          </Button>

          {checkResult === "pending" && (
            <Button variant="secondary" onClick={handleSimulateSuccess}>
              <CheckCircle className="h-4 w-4" />
              Simulate Success (Demo)
            </Button>
          )}

          {/* TODO: Connect Change Validation Method API */}
          <Button variant="outline">
            <Settings className="h-4 w-4" />
            Change Validation Method
          </Button>

          {/* TODO: Connect Contact Support */}
          <Button variant="outline">
            <Headphones className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
