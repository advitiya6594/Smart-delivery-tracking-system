import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { DeliveryPartner } from "@/types/delivery";
import { toast } from "sonner";

type PartnerFormProps = {
  partner?: DeliveryPartner;
  onSubmit: (data: Partial<DeliveryPartner>) => void;
  onCancel?: () => void;
};

export function PartnerForm({ partner, onSubmit, onCancel }: PartnerFormProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(partner?.areas || []);
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryPartner>({
    defaultValues: partner || {
      status: 'active',
      current_load: 0,
      rating: 5,
      completed_orders: 0,
      cancelled_orders: 0
    }
  });

  const areas = ["North", "South", "East", "West", "Central"];

  const onFormSubmit = (data: Partial<DeliveryPartner>) => {
    if (selectedAreas.length === 0) {
      toast.error("Please select at least one area");
      return;
    }
    onSubmit({ ...data, areas: selectedAreas });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label>Shift Time</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shift_start">Start Time</Label>
              <Input
                id="shift_start"
                type="time"
                {...register("shift_start", { required: "Start time is required" })}
              />
            </div>
            <div>
              <Label htmlFor="shift_end">End Time</Label>
              <Input
                id="shift_end"
                type="time"
                {...register("shift_end", { required: "End time is required" })}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Service Areas</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {areas.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={`area-${area}`}
                  checked={selectedAreas.includes(area)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAreas([...selectedAreas, area]);
                    } else {
                      setSelectedAreas(selectedAreas.filter((a) => a !== area));
                    }
                  }}
                />
                <Label htmlFor={`area-${area}`}>{area}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {partner ? "Update Partner" : "Add Partner"}
        </Button>
      </div>
    </form>
  );
}