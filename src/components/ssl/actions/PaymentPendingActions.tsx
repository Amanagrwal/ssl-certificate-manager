import { useState } from "react";
import {
  CreditCard,
  Edit,
  XCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLOrder, SSLStatus } from "@/data/ssl-mock-data";

export function PaymentPendingActions({
  order,
  onStatusChange,
}: {
  order: SSLOrder;
  onStatusChange: (status: SSLStatus) => void;
}) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handlePayNow = async () => {
    setShowPaymentModal(true);
  };

  // TODO: Connect Payment API - POST /api/ssl/orders/{id}/pay
  const handleConfirmPayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      onStatusChange("pending_validation");
    }, 1500);
  };

  // TODO: Connect Cancel Order API - POST /api/ssl/orders/{id}/cancel
  const handleCancelOrder = () => {
    onStatusChange("cancelled");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-status-warning">
            <CreditCard className="h-4 w-4" />
            Payment Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Payment is pending for this SSL order. Complete payment to proceed with certificate issuance.
          </p>

          <div className="rounded-lg border bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">SSL Type</span>
              <span className="text-sm font-medium">{order.sslType}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Domain</span>
              <span className="text-sm font-medium">{order.domain}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Validity</span>
              <span className="text-sm font-medium">{order.validity}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePayNow}>
              <CreditCard className="h-4 w-4" />
              Pay Now
            </Button>
            {/* TODO: Connect Edit Order API */}
            <Link to="/ssl/create" search={{ editOrderId: order.id }}>
              <Button variant="outline">
                <Edit className="h-4 w-4" />
                Edit Order
              </Button>
            </Link>
            {showCancelConfirm ? (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-1.5">
                <span className="text-xs text-destructive">Cancel this order?</span>
                <Button variant="destructive" size="sm" onClick={handleCancelOrder}>
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

      {/* Payment Modal Overlay */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">
                {paymentSuccess ? "Payment Successful" : "Confirm Payment"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentSuccess ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-status-success/10">
                    <CheckCircle className="h-8 w-8 text-status-success" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Payment completed successfully!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Redirecting to validation step...
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Domain</span>
                      <span className="font-medium">{order.domain}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">SSL Type</span>
                      <span className="font-medium">{order.sslType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Validity</span>
                      <span className="font-medium">{order.validity}</span>
                    </div>
                    <div className="mt-2 border-t pt-2 flex justify-between text-sm font-semibold">
                      <span>Total (Mock)</span>
                      <span>$49.99</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={handleConfirmPayment}
                      disabled={processing}
                    >
                      {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                      {processing ? "Processing..." : "Confirm Payment"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={processing}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
