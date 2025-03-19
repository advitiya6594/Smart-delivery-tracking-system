import { Order } from "@/types/delivery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface OrdersTableProps {
  orders: Order[];
}

const statusColors = {
  pending: "bg-yellow-500",
  assigned: "bg-blue-500",
  picked: "bg-purple-500",
  delivered: "bg-green-500",
};

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled For</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.order_number}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer_phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>{order.area}</TableCell>
              <TableCell>
                <Badge
                  className={`${statusColors[order.status]} text-white`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(order.scheduled_for), 'PPp')}
              </TableCell>
              <TableCell className="text-right">
                ₹{Number(order.total_amount).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};