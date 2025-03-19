import { Card } from "@/components/ui/card";
import { Users, UserCheck, UserMinus } from "lucide-react";

interface PartnerStatusProps {
  partners: {
    available: number;
    busy: number;
    offline: number;
  };
}

export const PartnerStatus = ({ partners }: PartnerStatusProps) => {
  return (
    <>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-success/10 rounded-full">
            <UserCheck className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Available Partners</p>
            <h3 className="text-2xl font-bold">{partners.available}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-warning/10 rounded-full">
            <Users className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Busy Partners</p>
            <h3 className="text-2xl font-bold">{partners.busy}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-muted/10 rounded-full">
            <UserMinus className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Offline Partners</p>
            <h3 className="text-2xl font-bold">{partners.offline}</h3>
          </div>
        </div>
      </Card>
    </>
  );
};