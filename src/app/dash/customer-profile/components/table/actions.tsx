import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";
import { SubmitEnableCustomer } from "@/app/dash/customer/lib/enableCustomer";
import { Button } from "@/components/shadcn_ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn_ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitDeleteCustomer } from "../../lib/deleteCustomerProfile";
import { SubmitDisableCustomerProfile } from "../../lib/disableCustomerProfile";

interface CustomerActionsProps {
  customer: ICustomerProfileEntity;
}

export function CustomerProfileActions({ customer }: CustomerActionsProps) {
  const router = useRouter();


  const handleDeactivate = async () => {
    try {
      // Desativa o cliente
      await SubmitDisableCustomerProfile(customer?.id);

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
        <DropdownMenuItem onClick={() => router.push(`/dash/customer-profile/${customer.id}`)}>
          Editar
        </DropdownMenuItem>

        {/* {!customer.disabledAt ? (
          <DropdownMenuItem onClick={handleDeactivate}>
            Desativar
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleActivate}>
            Ativar
          </DropdownMenuItem>
        )} */}

        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
