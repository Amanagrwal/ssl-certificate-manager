import { cn } from "@/lib/utils";
import type { SSLStatus } from "@/data/ssl-mock-data";
import { SSL_STATUS_CONFIG } from "@/data/ssl-mock-data";

const colorMap: Record<string, string> = {
  gray: "bg-muted text-muted-foreground border-border",
  yellow: "bg-status-warning/10 text-status-warning border-status-warning/20",
  blue: "bg-status-info/10 text-status-info border-status-info/20",
  green: "bg-status-success/10 text-status-success border-status-success/20",
  red: "bg-destructive/10 text-destructive border-destructive/20",
  orange: "bg-status-expired/10 text-status-expired border-status-expired/20",
};

export function StatusBadge({ status }: { status: SSLStatus }) {
  const config = SSL_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        colorMap[config.color]
      )}
    >
      {config.label}
    </span>
  );
}
