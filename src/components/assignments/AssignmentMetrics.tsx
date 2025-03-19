import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { AssignmentMetrics as AssignmentMetricsType } from "@/types/delivery";
import { TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";

interface AssignmentMetricsProps {
  metrics: AssignmentMetricsType;
}

export const AssignmentMetrics = ({ metrics }: AssignmentMetricsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <p className="text-sm text-muted-foreground">Total Assigned</p>
          </div>
          <p className="text-2xl font-bold">{metrics.totalAssigned}</p>
        </Card>
        
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">Average Time</p>
          </div>
          <p className="text-2xl font-bold">{metrics.averageTime} min</p>
        </Card>
        
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
          <p className="text-2xl font-bold">{(metrics.successRate * 100).toFixed(1)}%</p>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-sm font-medium">{(metrics.successRate * 100).toFixed(1)}%</p>
          </div>
          <Progress value={metrics.successRate * 100} className="h-2" />
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">Failure Reasons</h3>
          <div className="space-y-3">
            {metrics.failureReasons.map((reason) => (
              <div key={reason.reason} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <p className="text-sm">{reason.reason}</p>
                </div>
                <p className="text-sm font-medium">{reason.count}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};