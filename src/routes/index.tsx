import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SSL Certificate Management" },
      { name: "description", content: "Professional SSL certificate management dashboard" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          SSL Certificate Management
        </h1>
        <p className="mt-3 text-muted-foreground">
          Manage, order, and monitor SSL certificates for your domains with ease.
        </p>
        <Link to="/ssl" className="mt-8 inline-block">
          <Button size="lg">
            Go to SSL Orders
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
