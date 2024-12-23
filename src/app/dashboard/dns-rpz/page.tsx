"use client";

import React, { useState } from 'react';
import { Button } from "@/components/shadcn_ui/button";
import { Checkbox } from "@/components/shadcn_ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/shadcn_ui/dialog";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator 
} from "@/components/shadcn_ui/breadcrumb";
import { Plus, Home, Eye, Edit, Trash2 } from "lucide-react";

// Tipagem para o domínio
interface Domain {
  id: string;
  idx: number;
  domain: string;
  blockedAt: string;
  registeredBy: string;
  category: string;
  status: string;
}

const DomainsBlocklist = () => {
  // Tipando o estado `domains` como um array de `Domain`
  const [domains, setDomains] = useState<Domain[]>([
    { 
      id: crypto.randomUUID(),
      idx: 1, 
      domain: 'malicious-site.com', 
      blockedAt: '2024-02-15', 
      registeredBy: 'Admin',
      category: 'Phishing',
      status: 'Blocked'
    },
    { 
      id: crypto.randomUUID(),
      idx: 2, 
      domain: 'phishing-example.org', 
      blockedAt: '2024-02-16', 
      registeredBy: 'Security Team',
      category: 'Malware',
      status: 'Blocked'
    }
  ]);

  // Tipando o estado de `page` como um número
  const [page, setPage] = useState<number>(1);

  // Tipando o estado de `visibleColumns` como um objeto com chaves de string e valores booleanos
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    domain: true,
    blockedAt: true,
    registeredBy: true,
    category: true,
    status: true
  });

  const itemsPerPage = 5;

  // Função para alternar a visibilidade das colunas
  const handleToggleColumn = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Paginando os domínios
  const paginatedDomains = domains.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );

  // Calculando o total de páginas
  const totalPages = Math.ceil(domains.length / itemsPerPage);

  // Tipagem para os rótulos das colunas
  const columnLabels: Record<string, string> = {
    domain: 'Domínio',
    blockedAt: 'Data de Bloqueio',
    registeredBy: 'Registrado Por',
    category: 'Categoria',
    status: 'Status'
  };

  return (
    <div className="p-6 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Lista de Bloqueio</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Domínios Bloqueados</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Domínio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Domínio</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium">Colunas Visíveis:</span>
        {Object.keys(visibleColumns).map((column) => (
          <div key={column} className="flex items-center space-x-2">
            <Checkbox
              checked={visibleColumns[column]}
              onCheckedChange={() => handleToggleColumn(column)}
              id={`column-${column}`}
            />
            <label 
              htmlFor={`column-${column}`} 
              className="text-sm"
            >
              {columnLabels[column]}
            </label>
          </div>
        ))}
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {Object.entries(visibleColumns)
                .filter(([_, visible]) => visible)
                .map(([column]) => (
                  <th 
                    key={column} 
                    className="p-4 text-left font-medium"
                  >
                    {columnLabels[column]}
                  </th>
                ))}
              <th className="p-4 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDomains.map((domain) => (
              <tr key={domain.id} className="border-b">
                {Object.entries(visibleColumns)
                  .filter(([_, visible]) => visible)
                  .map(([column]) => (
                    <td key={column} className="p-4">
                      {domain[column as keyof Domain]}  {/* Tipando acesso ao domínio */}
                    </td>
                  ))}
                <td className="p-4 space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Total de Registros: {domains.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPage(page - 1)} 
            disabled={page === 1}
          >
            Anterior
          </Button>
          <div className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPage(page + 1)} 
            disabled={page === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DomainsBlocklist;
