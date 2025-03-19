import { Card } from "@/components/ui/card";
import { AssignmentMetrics } from "@/components/assignments/AssignmentMetrics";
import { AssignmentsList } from "@/components/assignments/AssignmentsList";
import { PartnerStatus } from "@/components/assignments/PartnerStatus";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assignmentService } from "@/services/assignmentService";
import { partnerService } from "@/services/partnerService";
import { toast } from "sonner";

const Assignments = () => {
  const { data: assignmentData, isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: assignmentService.getAssignments,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load assignments: " + error.message);
      }
    }
  });

  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["assignment-metrics"],
    queryFn: assignmentService.getDashboardMetrics,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load metrics: " + error.message);
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

  const partnerStatus = partners ? {
    available: partners.filter(p => p.status === 'active' && p.current_load === 0).length,
    busy: partners.filter(p => p.status === 'active' && p.current_load > 0).length,
    offline: partners.filter(p => p.status === 'inactive').length,
  } : { available: 0, busy: 0, offline: 0 };

  if (isLoadingAssignments || isLoadingMetrics || isLoadingPartners) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!assignmentData || !metrics || !partners) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PartnerStatus partners={partnerStatus} />
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metrics">Metrics & Analytics</TabsTrigger>
          <TabsTrigger value="assignments">Active Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assignment Metrics</h2>
            <AssignmentMetrics metrics={metrics} />
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Active Assignments</h2>
            <AssignmentsList assignments={assignmentData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assignments;