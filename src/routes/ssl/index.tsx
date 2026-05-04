import { createFileRoute } from "@tanstack/react-router";
import { SSLOrderList } from "@/components/ssl/SSLOrderList";

export const Route = createFileRoute("/ssl/")({
  head: () => ({
    meta: [
      { title: "SSL Certificate Orders" },
      { name: "description", content: "Manage and monitor your SSL certificates" },
    ],
  }),
  component: SSLPage,
});

function SSLPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SSLOrderList />
      </div>
    </div>
  );
}
