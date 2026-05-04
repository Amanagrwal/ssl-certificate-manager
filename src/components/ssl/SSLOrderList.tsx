import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Plus, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "./EmptyState";
import type { SSLStatus } from "@/data/ssl-mock-data";
import { mockSSLOrders } from "@/data/ssl-mock-data";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "payment_pending", label: "Payment Pending" },
  { value: "pending_validation", label: "Pending Validation" },
  { value: "active", label: "Active" },
  { value: "failed", label: "Failed" },
  { value: "expired", label: "Expired" },
];

export function SSLOrderList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // TODO: Replace with API call - GET /api/ssl/orders?search=...&status=...
  const filteredOrders = useMemo(() => {
    return mockSSLOrders.filter((order) => {
      const matchesSearch =
        !search || order.domain.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">SSL Certificate Orders</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor your SSL certificates</p>
          </div>
        </div>
        <Link to="/ssl/create">
          <Button>
            <Plus className="h-4 w-4" />
            Order SSL Certificate
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTERS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table / Empty */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Domain</th>
                    <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">SSL Type</th>
                    <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Validity</th>
                    <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground xl:table-cell">Validation</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Created</th>
                    <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground xl:table-cell">Expiry</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-medium">{order.id}</td>
                      <td className="px-4 py-3 font-medium">{order.domain}</td>
                      <td className="hidden px-4 py-3 md:table-cell">{order.sslType}</td>
                      <td className="hidden px-4 py-3 lg:table-cell">{order.validity}</td>
                      <td className="hidden px-4 py-3 xl:table-cell">{order.validationMethod}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">{order.createdAt}</td>
                      <td className="hidden px-4 py-3 xl:table-cell">{order.expiresAt || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to="/ssl/$orderId" params={{ orderId: order.id }}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
