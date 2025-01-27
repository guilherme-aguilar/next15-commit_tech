"use server";

import type { ICustomerProfileCreate } from "@/_domain/interfaces/customer-profile/create";
import { createCustomerProfile } from "@/_infra/services/customerProfile";
import type { FormData } from "../schemas/schema";

export async function SubmitInsertCustomerProfile(formData: FormData) {
  try {
    let customerData: ICustomerProfileCreate | undefined = undefined;

      customerData = {
        name: formData.name,
        role: formData.role,
        permissions: formData.permissions
    }

    if (!customerData) {
      throw new Error('Customer data not properly initialized')
    }

    await createCustomerProfile(customerData)

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro ao criar cliente');
  }
}