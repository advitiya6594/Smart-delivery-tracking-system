import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "@/types/delivery";

export const orderService = {
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Order[];
  },

  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>, items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[]) {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (orderError) throw orderError;

    if (!orderData) throw new Error('Failed to create order');

    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return orderData;
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async assignOrder(orderId: string, partnerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'assigned',
        assigned_to: partnerId
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};