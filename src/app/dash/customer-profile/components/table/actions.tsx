import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/shadcn_ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn_ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { SubmitDisableCustomer } from "../../lib/disableCustomer";
import { toast } from "@/hooks/use-toast";
import { SubmitEnableCustomer } from "../../lib/enableCustomer";
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";
import { SubmitDeleteCustomer } from "../../lib/deleteCustomer";
import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";

interface CustomerActionsProps {
  customer: ICustomerProfileEntity;
}

export function CustomerProfileActions({ customer }: CustomerActionsProps) {
  const router = useRouter();


  const handleDeactivate = async () => {
    try {
      // Desativa o cliente
      await SubmitDisableCustomer(customer?.id);

      window.location.reload();
     

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleActivate = async () => {
    try {
      // Desativa o cliente
      await SubmitEnableCustomer(customer?.id);

      window.location.reload(); // Força o reload da página

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    
    try {
      // deleta o cliente
      await SubmitDeleteCustomer(customer?.id);

      window.location.reload(); // Força o reload da página

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/dash/customer/${customer.id}`)}>
          Edit
        </DropdownMenuItem>

        {!customer.disabledAt ? (
          <DropdownMenuItem onClick={handleDeactivate}>
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleActivate}>
            Activate
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
