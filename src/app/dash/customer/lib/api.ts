"use server"
import type { IBasicResponse } from "@/_domain/interfaces/basicResponse";
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";
import { useFetch } from "@/hooks/use-fetch";

  export async function getCustomers() {
    try {
     
      const response = await useFetch.get<IBasicResponse<ICustomerEntity[]>>('http://localhost:3333/customers', {}, true)

      return response
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
