import { DeliveryPartner } from "@/types/delivery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, UserMinus } from "lucide-react";

type PartnerListProps = {
  partners: DeliveryPartner[];
  onEdit: (partner: DeliveryPartner) => void;
  onDelete: (partnerId: string) => void;
};

export function PartnerList({ partners, onEdit, onDelete }: PartnerListProps) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px] font-semibold">ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Areas</TableHead>
            <TableHead className="font-semibold">Current Load</TableHead>
            <TableHead className="font-semibold">Shift</TableHead>
            <TableHead className="font-semibold">Rating</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-mono text-sm text-muted-foreground">
                {partner.id}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{partner.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {partner.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    partner.status === "active"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {partner.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {partner.areas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(partner.current_load / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {partner.current_load}/3
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {partner.shift_start} - {partner.shift_end}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">
                    {partner.rating?.toFixed(1) ?? "N/A"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(partner)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(partner.id!)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}