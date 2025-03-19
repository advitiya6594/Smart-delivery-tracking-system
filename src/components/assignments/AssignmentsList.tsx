import { Assignment } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

interface AssignmentsListProps {
  assignments: Assignment[];
}

export const AssignmentsList = ({ assignments }: AssignmentsListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Partner ID</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={`${assignment.order_id}-${assignment.partner_id}`}>
            <TableCell>
              {assignment.status === "completed" ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <Badge variant="success">Success</Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <Badge variant="destructive">Failed</Badge>
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{assignment.order_id}</TableCell>
            <TableCell>{assignment.partner_id}</TableCell>
            <TableCell>
              {new Date(assignment.assigned_at).toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};