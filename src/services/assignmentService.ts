import { supabase } from "@/integrations/supabase/client";
import { Assignment, AssignmentStatus } from "@/types/delivery";

export const assignmentService = {
  async getAssignments() {
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        orders(*),
        partners(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Ensure the status is of the correct type
    return (data || []).map(assignment => ({
      ...assignment,
      status: assignment.status as AssignmentStatus
    })) as Assignment[];
  },

  async getDashboardMetrics() {
    const { data: assignments, error } = await supabase
      .from('assignments')
      .select('*');

    if (error) throw error;

    const total = assignments?.length || 0;
    const completed = assignments?.filter(a => a.status === 'completed').length || 0;
    const averageTime = assignments?.reduce((acc, curr) => {
      if (curr.completed_at && curr.assigned_at) {
        const diff = new Date(curr.completed_at).getTime() - new Date(curr.assigned_at).getTime();
        return acc + (diff / (1000 * 60)); // Convert to minutes
      }
      return acc;
    }, 0) / (completed || 1);

    return {
      totalAssigned: total,
      successRate: completed / (total || 1),
      averageTime: Math.round(averageTime),
      failureReasons: [
        { reason: "Partner unavailable", count: assignments?.filter(a => a.status === 'rejected').length || 0 },
        { reason: "Outside delivery area", count: assignments?.filter(a => a.status === 'pending').length || 0 }
      ]
    };
  }
};