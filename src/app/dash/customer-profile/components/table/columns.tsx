"use client"

import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerProfileActions } from "./actions";
import { Lock, LockOpen } from "lucide-react";


export const CustomerProfileColumns: ColumnDef<ICustomerProfileEntity>[] = [
  //Name
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      row.original.name
    )
  },
  //role
  {
    accessorKey: "role",
    header: "Função",
    cell: ({ row }) => (
      row.original.role
    )
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
      <CustomerProfileActions  customer={row.original} />
  }
]