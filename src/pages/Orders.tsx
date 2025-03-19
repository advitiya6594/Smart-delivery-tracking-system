import { Card } from "@/components/ui/card";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrderMetrics } from "@/components/orders/OrderMetrics";
import { OrderStatusChart } from "@/components/orders/OrderStatusChart";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Orders = () => {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load orders: " + error.message);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>Error loading orders</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <OrderMetrics orders={orders} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
          <OrderStatusChart orders={orders} />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-sm text-muted-foreground">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <span>Order {order.order_number}</span>
                <span className="font-medium">{order.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">All Orders</h2>
        <OrdersTable orders={orders} />
      </Card>
    </div>
  );
};

export default Orders;