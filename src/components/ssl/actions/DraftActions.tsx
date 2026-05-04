import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLOrder } from "@/data/ssl-mock-data";

function getMissingFields(order: SSLOrder): string[] {
  const missing: string[] = [];
  if (!order.sslType) missing.push("SSL Type");
  if (!order.validity) missing.push("Validity");
  if (!order.validationMethod) missing.push("Validation Method");
  if (!order.contactName) missing.push("Contact Name");
  if (!order.contactEmail) missing.push("Contact Email");
  if (!order.organization) missing.push("Organization");
  return missing;
}

export function DraftActions({
  order,
  onDelete,
}: {
  order: SSLOrder;
  onDelete: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const missingFields = getMissingFields(order);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
          <Edit className="h-4 w-4" />
          Draft Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This SSL order is incomplete. Please complete the required details to continue.
        </p>

        {missingFields.length > 0 && (
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Missing fields:</p>
            <div className="flex flex-wrap gap-1.5">
              {missingFields.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center rounded-md bg-status-warning/10 px-2 py-0.5 text-xs font-medium text-status-warning"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {/* TODO: Connect Continue Order API */}
          <Link
            to="/ssl/create"
            search={{ editOrderId: order.id }}
          >
            <Button>
              <ArrowRight className="h-4 w-4" />
              Continue Order
            </Button>
          </Link>
          {/* TODO: Connect Edit Details API */}
          <Link
            to="/ssl/create"
            search={{ editOrderId: order.id }}
          >
            <Button variant="outline">
              <Edit className="h-4 w-4" />
              Edit Details
            </Button>
          </Link>
          {/* TODO: Connect Delete Draft API - DELETE /api/ssl/orders/{id} */}
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-1.5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-destructive">Delete this draft?</span>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Yes, Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="h-4 w-4" />
              Delete Draft
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
