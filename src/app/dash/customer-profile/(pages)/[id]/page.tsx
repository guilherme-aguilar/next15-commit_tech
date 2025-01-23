"use client";

import { getCustomerById } from "@/_infra/services/customer";
import { Breadcrumb } from "@/components/custom/breadcrumb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressForm } from "../../components/progress-form";
import type { FormData } from "../../schemas/schema";
import { Button } from "@/components/shadcn_ui/button";
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";

export default function ChangeCustomerPage() {

  const { id } = useParams();

  if (!id) {
    return null;
  }

  const [data, setData] = useState<ICustomerEntity | undefined>(undefined);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomerById(id as string).then(response => response.data);
      setData(response);
    }

    fetchData()
  }, [])


  let initialData: FormData | undefined

  if (data?.personType === "physical") {
    initialData = {
      customerType: "individual",
      locationData: {
        street: data.location.street,
        number: data.location.number,
        complement: data.location.complement,
        neighborhood: data.location.neighborhood,
        city: data.location.city,
        state: data.location.state,
        zip_code: data.location.zip_code,
      },
      individualData: {
        identification: data.identification,
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ").slice(1).join(" "),
        contact: {
          email: data.contact.email,
          phone: data.contact.phone,
        }
      }
    }
  }

  if (data?.personType === "juridical" && data?.agent) {
    initialData = {
      customerType: "company",
      locationData: {
        street: data.location.street,
        number: data.location.number,
        complement: data.location.complement,
        neighborhood: data.location.neighborhood,
        city: data.location.city,
        state: data.location.state,
        zip_code: data.location.zip_code,
      },
      companyData: {
        identification: data.identification,
        name: data.name,
        fantasyName: data.fantasyName,
        contact: {
          email: data.contact.email,
          phone: data.contact.phone,
        },
        agent: {
          firstName: data.agent.name.split(" ")[0],
          lastName: data.agent.name.split(" ").slice(1).join(" "),
          identification: data.agent.identification,
          email: data.agent.email,
          phone: data.agent.phone,
          position: data.agent.position,
        }
      }

    }



  }

  if (!initialData) {
    return null
  }

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
      <ProgressForm formData={initialData} />
    </main>
  );
}
