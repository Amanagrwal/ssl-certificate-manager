import { createFileRoute } from "@tanstack/react-router";
import { SSLOrderForm } from "@/components/ssl/SSLOrderForm";
import { z } from "zod";

const searchSchema = z.object({
  editOrderId: z.string().optional(),
  renewOrderId: z.string().optional(),
});

export const Route = createFileRoute("/ssl/create")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Create SSL Order" },
      { name: "description", content: "Order a new SSL certificate" },
    ],
  }),
  component: CreateSSLPage,
});

function CreateSSLPage() {
  const { editOrderId, renewOrderId } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SSLOrderForm editOrderId={editOrderId} renewOrderId={renewOrderId} />
      </div>
    </div>
  );
}
