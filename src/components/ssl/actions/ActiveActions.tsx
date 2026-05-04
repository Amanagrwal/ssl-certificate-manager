import {
  Download,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import type { SSLOrder } from "@/data/ssl-mock-data";

export function ActiveActions({ order }: { order: SSLOrder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-status-success">
          <ShieldCheck className="h-4 w-4" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {/* TODO: Connect Renew SSL API */}
          <Link to="/ssl/create" search={{ renewOrderId: order.id }}>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4" />
              Renew SSL
            </Button>
          </Link>

          {/* TODO: Connect View Installation Guide */}
          <Button variant="outline">
            <BookOpen className="h-4 w-4" />
            View Installation Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
