"use client";

import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";
import { getCustomerProfileById } from "@/_infra/services/customerProfile";
import { Breadcrumb } from "@/components/custom/breadcrumb";
import { Button } from "@/components/shadcn_ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormCustomerProfile } from "../../components/form/formCustomerProfile";
import type { FormData } from "../../schemas/schema";

export default function ChangeCustomerPage() {

  const { id } = useParams();

  if (!id) {
    return null;
  }

  const [data, setData] = useState<ICustomerProfileEntity | undefined>(undefined);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomerProfileById(id as string).then(response => response.data);
      setData(response);
    }

    fetchData()
  }, [])


  let initialData: FormData | undefined

  if (data) {
    initialData = {
      name: data.name,
      role: data.role,
      permissions: data.permissions,
    }
  }

  if (!initialData) {
    return null
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Breadcrumb title="Atualizar" patch={[
          {
            name: "Perfil de Clientes",
            href: "/dash/customer-profile"
          }
        ]} />
        <Button asChild className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <a href="/dash/customer">Voltar</a>
        </Button>
      </div>
      <FormCustomerProfile data={initialData} />
    </main>
  );
}
