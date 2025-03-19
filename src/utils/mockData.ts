import { Order } from "@/types/delivery";

export const generateMockOrders = (count: number = 10): Order[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `order-${index + 1}`,
    order_number: `ORD${String(index + 1001).padStart(4, '0')}`,
    customer_name: `Customer ${index + 1}`,
    customer_phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    customer_address: `${Math.floor(Math.random() * 999) + 1} Main St, Mumbai`,
    area: ['Powai', 'Andheri', 'Bandra', 'Juhu'][Math.floor(Math.random() * 4)],
    status: ['pending', 'assigned', 'picked', 'delivered'][Math.floor(Math.random() * 4)] as Order['status'],
    total_amount: Math.floor(Math.random() * 2000) + 500,
    scheduled_for: new Date(Date.now() + Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
    assigned_to: Math.random() > 0.5 ? `partner-${Math.floor(Math.random() * 5) + 1}` : null,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
    updated_at: new Date().toISOString()
  }));
};