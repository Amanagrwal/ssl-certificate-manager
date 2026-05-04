import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  RefreshCw,
  Edit,
  Settings,
  Headphones,
  XCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLOrder, SSLStatus } from "@/data/ssl-mock-data";

export function FailedActions({
  order,
  onStatusChange,
}: {
  order: SSLOrder;
  onStatusChange: (status: SSLStatus) => void;
}) {
  const [retrying, setRetrying] = useState(false);
  const [retryResult, setRetryResult] = useState<"success" | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // TODO: Connect Retry Validation API - POST /api/ssl/orders/{id}/retry
  const handleRetry = async () => {
    setRetrying(true);
    setRetryResult(null);
    await new Promise((r) => setTimeout(r, 2500));
    setRetrying(false);
    setRetryResult("success");
    setTimeout(() => {
      onStatusChange("pending_validation");
    }, 1500);
  };

  // TODO: Connect Cancel Order API
  const handleCancel = () => {
    onStatusChange("cancelled");
  };

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-destructive">
          <AlertTriangle className="h-4 w-4" />
          Order Failed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Error reason */}
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-xs font-medium text-destructive mb-1">Failure Reason:</p>
          <p className="text-sm text-foreground">
            {order.failureReason || "Unknown error occurred during SSL certificate processing."}
          </p>
        </div>

        {retrying && (
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-status-info" />
            <p className="text-sm text-muted-foreground">Retrying validation...</p>
          </div>
        )}

        {retryResult === "success" && (
          <div className="flex items-center gap-3 rounded-lg border border-status-success/30 bg-status-success/5 p-4">
            <CheckCircle className="h-5 w-5 text-status-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Retry submitted successfully!</p>
              <p className="text-xs text-muted-foreground">Moving back to validation step...</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRetry} disabled={retrying}>
            {retrying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {retrying ? "Retrying..." : "Retry Validation"}
          </Button>

          {/* TODO: Connect Edit Details API */}
          <Link to="/ssl/create" search={{ editOrderId: order.id }}>
            <Button variant="outline">
              <Edit className="h-4 w-4" />
              Edit Details
            </Button>
          </Link>

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

          {showCancelConfirm ? (
            <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-1.5">
              <span className="text-xs text-destructive">Cancel this order?</span>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                Yes
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowCancelConfirm(false)}>
                No
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setShowCancelConfirm(true)}>
              <XCircle className="h-4 w-4" />
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
