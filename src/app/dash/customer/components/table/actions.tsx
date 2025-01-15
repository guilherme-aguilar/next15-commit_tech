  "use client";

  import { MoreHorizontal } from "lucide-react";
  import { Button } from "@/components/shadcn_ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/shadcn_ui/dropdown-menu";
  import { useRouter } from "next/navigation";

  interface CustomerActionsProps {
    customerId: string;
    isActive: boolean;
  }

  export function CustomerActions({ customerId, isActive }: CustomerActionsProps) {
    const router = useRouter();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/dash/customer/${customerId}`)}
          >
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dash/customer/${customerId}/edit`)}
          >
            Edit
          </DropdownMenuItem>
          {isActive && (
            <DropdownMenuItem
              onClick={() => {/* Implement deactivate logic */}}
            >
              Deactivate
            </DropdownMenuItem>
          )}
          {!isActive && (
            <DropdownMenuItem
              onClick={() => {/* Implement activate logic */}}
            >
              Activate
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {/* Implement delete logic */}}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
