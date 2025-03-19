import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PartnerForm } from "@/components/partners/PartnerForm";
import { PartnerList } from "@/components/partners/PartnerList";
import { DeliveryPartner } from "@/types/delivery";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { partnerService } from "@/services/partnerService";
import { Loader2 } from "lucide-react";

const Partners = () => {
  const [editingPartner, setEditingPartner] = useState<DeliveryPartner | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: partnerService.getPartners,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load partners: " + error.message);
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: partnerService.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success("Partner added successfully");
      setIsFormOpen(false);
      setEditingPartner(undefined);
    },
    onError: (error: Error) => {
      toast.error("Failed to add partner: " + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<DeliveryPartner> }) =>
      partnerService.updatePartner(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success("Partner updated successfully");
      setIsFormOpen(false);
      setEditingPartner(undefined);
    },
    onError: (error: Error) => {
      toast.error("Failed to update partner: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: partnerService.deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success("Partner deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete partner: " + error.message);
    }
  });

  const handleSubmit = (data: Partial<DeliveryPartner>) => {
    if (editingPartner) {
      updateMutation.mutate({ id: editingPartner.id, updates: data });
    } else {
      createMutation.mutate(data as DeliveryPartner);
    }
  };

  const handleEdit = (partner: DeliveryPartner) => {
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const handleDelete = (partnerId: string) => {
    deleteMutation.mutate(partnerId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partners</h1>
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>
                {editingPartner ? "Edit Partner" : "Add New Partner"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <PartnerForm
                partner={editingPartner}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingPartner(undefined);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="p-6">
        <PartnerList
          partners={partners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
};

export default Partners;