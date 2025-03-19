import { Order } from "@/types/delivery";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Circle } from "lucide-react";

interface OrderStatusChartProps {
  orders: Order[];
}

const COLORS = {
  pending: {
    label: "Pending",
    color: "#EAB308",
    icon: Circle,
  },
  assigned: {
    label: "Assigned",
    color: "#3B82F6",
    icon: Circle,
  },
  picked: {
    label: "Picked",
    color: "#A855F7",
    icon: Circle,
  },
  delivered: {
    label: "Delivered",
    color: "#22C55E",
    icon: Circle,
  },
};

export const OrderStatusChart = ({ orders }: OrderStatusChartProps) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ChartContainer className="h-[300px]" config={COLORS}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.name as keyof typeof COLORS].color} 
            />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  );
};