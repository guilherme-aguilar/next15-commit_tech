"use client"

import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";
import { ColumnDef } from "@tanstack/react-table"
import { CustomerActions } from "./actions"
import { CircleDot, Lock, LockOpen } from "lucide-react"


export const CustomerColumns: ColumnDef<ICustomerEntity>[] = [
  //Name
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      row.original.fantasyName ?? row.original.name
    )
  },
  //Identification
  {
    accessorKey: "identification",
    header: "Identificação",
    cell: ({ row }) => {
      const id = row.original.identification
      if (id.length === 11) {
        return id.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
      } else if (id.length === 14) {
        return id.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
      }
      return id
    }
  },
  //CreatedAt
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => (
      new Date(row.original.createdAt).toLocaleString()
    )
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
  },
  //Actions
  {
    id: "actions",
    cell: ({ row }) =>
      <CustomerActions  customer={row.original} />
  }
]