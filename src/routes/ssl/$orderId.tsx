import { createFileRoute } from "@tanstack/react-router";
import { SSLOrderDetail } from "@/components/ssl/SSLOrderDetail";

export const Route = createFileRoute("/ssl/$orderId")({
  head: () => ({
    meta: [
      { title: "SSL Order Details" },
      { name: "description", content: "View SSL certificate order details" },
    ],
  }),
  component: SSLDetailPage,
});

function SSLDetailPage() {
  const { orderId } = Route.useParams();
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SSLOrderDetail orderId={orderId} />
      </div>
    </div>
  );
}
