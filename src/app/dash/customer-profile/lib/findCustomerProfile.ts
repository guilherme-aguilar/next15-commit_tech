"use server"
import type { IBasicResponse } from "@/_domain/interfaces/basicResponse";
import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";
import { useFetch } from "@/hooks/use-fetch";

  export async function findAllCustomerProfile() {
    try {
     
      const response = await useFetch.get<IBasicResponse<ICustomerProfileEntity[]>>('http://localhost:3333/customer-profiles', {}, true)

      return response
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
