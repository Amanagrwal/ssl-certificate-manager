import { ShieldOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <ShieldOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No SSL certificates found</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Get started by ordering your first SSL certificate to secure your domain.
      </p>
      <Link to="/ssl/create" className="mt-6">
        <Button>
          <Plus className="h-4 w-4" />
          Order SSL Certificate
        </Button>
      </Link>
    </div>
  );
}
