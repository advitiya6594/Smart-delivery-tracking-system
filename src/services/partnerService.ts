import { supabase } from "@/integrations/supabase/client";
import { DeliveryPartner } from "@/types/delivery";

export const partnerService = {
  async getPartners() {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as DeliveryPartner[];
  },

  async createPartner(partner: Omit<DeliveryPartner, 'id'>) {
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
        status: partner.status,
        current_load: partner.current_load,
        areas: partner.areas,
        shift_start: partner.shift_start,
        shift_end: partner.shift_end,
        rating: partner.rating,
        completed_orders: partner.completed_orders,
        cancelled_orders: partner.cancelled_orders
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePartner(id: string, updates: Partial<DeliveryPartner>) {
    const { data, error } = await supabase
      .from('partners')
      .update({
        name: updates.name,
        email: updates.email,
        phone: updates.phone,
        status: updates.status,
        current_load: updates.current_load,
        areas: updates.areas,
        shift_start: updates.shift_start,
        shift_end: updates.shift_end,
        rating: updates.rating,
        completed_orders: updates.completed_orders,
        cancelled_orders: updates.cancelled_orders
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePartner(id: string) {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};