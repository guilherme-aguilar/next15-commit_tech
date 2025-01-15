  "use client"

  import type { ICustomer } from "@/_domain/interfaces/entities/customer"
import { ColumnDef } from "@tanstack/react-table"
import { CustomerActions } from "./actions"
import { CircleDot, Lock, LockOpen } from "lucide-react"


  export const CustomerColumns: ColumnDef<ICustomer>[] = [
    //Name
    {
      accessorKey: "name",
      header: "name"
    },
    {
      accessorKey: "identification",
      header: "identification"
    },
    //State disabledAt
    {
      accessorKey: "disabledAt",
      header: "Status",
      cell: ({ row }) => (
        <div 
          title={row.original.disabledAt ? `Desativado em: ${new Date(row.original.disabledAt).toLocaleString()}` : "Ativo"}
          className="cursor-pointer"
        >
          {row.original.disabledAt ? <Lock className="h-4 w-4 text-red-500" /> : <LockOpen className="h-4 w-4 text-green-500" />}
        </div>
      )
    },    //Actions
    {
      id: "actions",
      cell: ({ row }) => 
        <CustomerActions customerId={row.original.id as string} isActive={row.original.disabledAt ? false : true} />
    }
  ]
