import {
  ArrowRight,
  CreditCard,
  Download,
  Edit,
  AlertTriangle,
  Clock,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SSLStatus } from "@/data/ssl-mock-data";
import { NEXT_ACTION_CONFIG } from "@/data/ssl-mock-data";

const iconMap: Record<string, React.ReactNode> = {
  edit: <Edit className="h-5 w-5" />,
  "credit-card": <CreditCard className="h-5 w-5" />,
  "shield-check": <ShieldCheck className="h-5 w-5" />,
  download: <Download className="h-5 w-5" />,
  "alert-triangle": <AlertTriangle className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  plus: <Plus className="h-5 w-5" />,
};

const borderColorMap: Record<SSLStatus, string> = {
  draft: "border-l-muted-foreground",
  payment_pending: "border-l-status-warning",
  pending_validation: "border-l-status-info",
  active: "border-l-status-success",
  failed: "border-l-destructive",
  expired: "border-l-status-expired",
  cancelled: "border-l-muted-foreground",
};

const iconColorMap: Record<SSLStatus, string> = {
  draft: "text-muted-foreground",
  payment_pending: "text-status-warning",
  pending_validation: "text-status-info",
  active: "text-status-success",
  failed: "text-destructive",
  expired: "text-status-expired",
  cancelled: "text-muted-foreground",
};

export function NextRecommendedAction({ status }: { status: SSLStatus }) {
  const config = NEXT_ACTION_CONFIG[status];

  return (
    <Card className={`border-l-4 ${borderColorMap[status]}`}>
      <CardContent className="flex items-center gap-4 py-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ${iconColorMap[status]}`}>
          {iconMap[config.icon]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{config.title}</h3>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
