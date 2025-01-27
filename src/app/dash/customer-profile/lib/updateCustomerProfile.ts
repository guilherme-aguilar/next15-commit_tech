"use server";
import type { ICustomerCreate } from "@/_domain/interfaces/customer/create";

import { updateCustomer } from "@/_infra/services/customer";
import { redirect } from "next/navigation";
import type { FormData } from "../schemas/schema";
import type { ICustomerProfileUpdate } from "@/_domain/interfaces/customer-profile/update";
import { updateCustomerProfile } from "@/_infra/services/customerProfile";

export async function SubmitUpdateCustomerProfile(id : string, formData: FormData) {
  try {
    let customerData: ICustomerProfileUpdate | undefined = undefined;

    customerData = {
      id: id,
      name: formData.name,
      permissions: formData.permissions
  }

    if (!customerData) {
      throw new Error('Customer data not properly initialized')
    }

    await updateCustomerProfile(customerData)

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro ao criar cliente');
  }
}