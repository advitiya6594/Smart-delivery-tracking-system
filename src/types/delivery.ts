export type DeliveryPartner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  current_load: number;
  areas: string[];
  shift_start: string;
  shift_end: string;
  rating?: number;
  completed_orders?: number;
  cancelled_orders?: number;
  created_at?: string;
};

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  area: string;
  status: 'pending' | 'assigned' | 'picked' | 'delivered';
  total_amount: number;
  scheduled_for: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  name: string;
  quantity: number;
  price: number;
  created_at: string;
};

export type AssignmentStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export type Assignment = {
  id: string;
  order_id: string;
  partner_id: string;
  status: AssignmentStatus;
  assigned_at: string;
  completed_at?: string;
  created_at: string;
  orders?: Order;
  partners?: DeliveryPartner;
};

export type AssignmentMetrics = {
  totalAssigned: number;
  successRate: number;
  averageTime: number;
  failureReasons: {
    reason: string;
    count: number;
  }[];
};