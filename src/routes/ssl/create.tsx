import { createFileRoute } from "@tanstack/react-router";
import { SSLOrderForm } from "@/components/ssl/SSLOrderForm";

export const Route = createFileRoute("/ssl/create")({
  head: () => ({
    meta: [
      { title: "Create SSL Order" },
      { name: "description", content: "Order a new SSL certificate" },
    ],
  }),
  component: CreateSSLPage,
});

function CreateSSLPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SSLOrderForm />
      </div>
    </div>
  );
}
