import { Link } from "@tanstack/react-router";
import {
  Clock,
  Download,
  RefreshCw,
  Headphones,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SSLOrder } from "@/data/ssl-mock-data";

export function ExpiredActions({ order }: { order: SSLOrder }) {
  return (
    <Card className="border-status-expired/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-status-expired">
          <Clock className="h-4 w-4" />
          Certificate Expired
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-status-expired/20 bg-status-expired/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-status-expired" />
            <p className="text-sm font-medium text-foreground">
              Your SSL certificate expired on {order.expiresAt || "N/A"}
            </p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Your domain is no longer secured. Renew your certificate to restore HTTPS protection.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* TODO: Connect Renew SSL API - POST /api/ssl/orders/{id}/renew */}
          <Link to="/ssl/create" search={{ renewOrderId: order.id }}>
            <Button>
              <RefreshCw className="h-4 w-4" />
              Renew SSL
            </Button>
          </Link>

          {order.certificate && (
            /* TODO: Connect Download Old Certificate API */
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Download Old Certificate
            </Button>
          )}

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
