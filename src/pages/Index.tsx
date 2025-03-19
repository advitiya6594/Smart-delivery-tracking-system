import { Card } from "@/components/ui/card";
import { Package, Users, TrendingUp } from "lucide-react";
import { AssignmentsList } from "@/components/assignments/AssignmentsList";
import { PartnerStatus } from "@/components/assignments/PartnerStatus";
import { useQuery } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignmentService";
import { partnerService } from "@/services/partnerService";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load orders: " + error.message);
      }
    }
  });

  const { data: partners, isLoading: isLoadingPartners } = useQuery({
    queryKey: ["partners"],
    queryFn: partnerService.getPartners,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load partners: " + error.message);
      }
    }
  });

  const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: assignmentService.getAssignments,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load assignments: " + error.message);
      }
    }
  });

  if (isLoadingOrders || isLoadingPartners || isLoadingAssignments) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!orders || !partners || !assignments) return null;

  const metrics = {
    activeOrders: orders.filter(o => o.status !== 'delivered').length,
    availablePartners: partners.filter(p => p.status === 'active' && p.current_load === 0).length,
    successRate: Math.round((assignments.filter(a => a.status === 'completed').length / (assignments.length || 1)) * 100),
  };

  const partnerStatus = {
    available: partners.filter(p => p.status === 'active' && p.current_load === 0).length,
    busy: partners.filter(p => p.status === 'active' && p.current_load > 0).length,
    offline: partners.filter(p => p.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Orders</p>
              <h3 className="text-2xl font-bold">{metrics.activeOrders}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success/10 rounded-full">
              <Users className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Partners</p>
              <h3 className="text-2xl font-bold">{metrics.availablePartners}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-warning/10 rounded-full">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <h3 className="text-2xl font-bold">{metrics.successRate}%</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Partner Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PartnerStatus partners={partnerStatus} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>
          <AssignmentsList assignments={assignments.slice(0, 5)} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;