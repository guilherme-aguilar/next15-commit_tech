"use server"
import type { IBasicResponse } from "@/_domain/interfaces/basicResponse";
import type { ICustomer } from "@/_domain/interfaces/entities/customer";
import { useFetch } from "@/hooks/use-fetch";

  export async function getCustomers() {
    try {
     
      const response = await useFetch.get<IBasicResponse<ICustomer[]>>('http://localhost:3333/customers', {}, true)

      console.log(response)
      return response
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
