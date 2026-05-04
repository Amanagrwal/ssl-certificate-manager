import { Link } from "@tanstack/react-router";
import {
  XCircle,
  Plus,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLOrder } from "@/data/ssl-mock-data";

export function CancelledActions({ order }: { order: SSLOrder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
          <XCircle className="h-4 w-4" />
          Order Cancelled
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            This order was cancelled{order.cancelledAt ? ` on ${order.cancelledAt}` : ""}.
            No further action can be taken on this order.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/ssl/create">
            <Button>
              <Plus className="h-4 w-4" />
              Create New SSL Order
            </Button>
          </Link>

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
