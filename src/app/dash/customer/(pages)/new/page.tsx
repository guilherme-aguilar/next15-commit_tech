"use client";

import { Breadcrumb } from "@/components/custom/breadcrumb";
import { useState } from "react";
import { ProgressForm } from "../../components/progress-form";
import { Button } from "@/components/shadcn_ui/button";

export default function NewCustomerPage() {

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Breadcrumb title="Novo" patch={[
          {
            name: "Clientes",
            href: "/dash/customer"
          }
        ]} />
        <Button asChild className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <a href="/dash/customer">Voltar</a>
        </Button>
      </div>
      <ProgressForm  />
    </main>
  );
}
