"use server";
import type { ICustomerCreate } from "@/_domain/interfaces/customer/create";

import { createCustomer } from "@/_infra/services/customer";
import { redirect } from "next/navigation";
import type { FormData } from "../schemas/schema";

export async function SubmitInsertCustomer(formData: FormData) {
  try {
    let customerData: ICustomerCreate | undefined = undefined;

    if (formData.customerType === "individual") {
      if (!formData.individualData) {
        throw new Error('Individual data is required')
      }

      customerData = {
        name: `${formData.individualData.firstName} ${formData.individualData.lastName}`,
        identification: formData.individualData.identification,
        contact: {
          email: formData.individualData.contact.email,
          phone: formData.individualData.contact.phone,
        },
        location: {
          city: formData.locationData.city,
          neighborhood: formData.locationData.neighborhood,
          street: formData.locationData.street,
          state: formData.locationData.state,
          zip_code: formData.locationData.zip_code,
          number: formData.locationData.number,
          complement: formData.locationData.complement,
        }
      }
    }

    if (formData.customerType === "company") {
      if (!formData.companyData) {
        throw new Error('Company data is required')
      }

      customerData = {
        name: formData.companyData.name,
        fantasyName: formData.companyData.fantasyName,
        identification: formData.companyData.identification,
        contact: {
          email: formData.companyData.contact.email,
          phone: formData.companyData.contact.phone,
        },
        location: {
          city: formData.locationData.city,
          neighborhood: formData.locationData.neighborhood,
          street: formData.locationData.street,
          state: formData.locationData.state,
          zip_code: formData.locationData.zip_code,
          number: formData.locationData.number,
          complement: formData.locationData.complement,
        }
      }

      if (formData.companyData.agent) {
        customerData.agent = {
          name: `${formData.companyData.agent.firstName} ${formData.companyData.agent.lastName}`,
          email: formData.companyData.agent.email,
          phone: formData.companyData.agent.phone,
          position: formData.companyData.agent.position,
          identification: formData.companyData.agent.identification,
        }
      }
    }

    if (!customerData) {
      throw new Error('Customer data not properly initialized')
    }

    await createCustomer(customerData)

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro ao criar cliente');
  }
}