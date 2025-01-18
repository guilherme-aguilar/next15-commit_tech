"use server";

import type { IBasicResponse } from "@/_domain/interfaces/basicResponse";
import type { ICustomerCreate } from "@/_domain/interfaces/customer/create";
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";

import { useFetch } from "@/hooks/use-fetch";

const baseURL = process.env.API_URL;

export async function createCustomer(data: ICustomerCreate): Promise<IBasicResponse<void>> {
  return await useFetch.post<IBasicResponse<void>>(
    `${baseURL}/customers`,
    data
  );
}

export async function updateCustomer(data: ICustomerCreate): Promise<IBasicResponse<void>> {
  return await useFetch.put<IBasicResponse<void>>(
    `${baseURL}/customers`,
    data
  );
}

export async function getCustomers(): Promise<IBasicResponse<ICustomerEntity[]>> {
  const response = await useFetch.get<IBasicResponse<ICustomerEntity[]>>(
    `${baseURL}/customers`
  );

  // Ordena os clientes pelo campo createdAt em ordem decrescente
  response.data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return response;
}

export async function getCustomerById(id: string): Promise<IBasicResponse<ICustomerEntity>> {
  return await useFetch.get<IBasicResponse<ICustomerEntity>>(
    `${baseURL}/customers/${id}`
  );
}

export async function getCustomerCount(): Promise<IBasicResponse<number>> {
  return await useFetch.get<IBasicResponse<number>>(
    `${baseURL}/customers/count`
  );
}

export async function disableCustomer(identification: string): Promise<IBasicResponse<ICustomerEntity>> {
  return await useFetch.patch<IBasicResponse<ICustomerEntity>>(
    `${baseURL}/customers/${identification}/disable`, 
    {}
  );
}

export async function enableCustomer(identification: string): Promise<IBasicResponse<ICustomerEntity>> {
  return await useFetch.patch<IBasicResponse<ICustomerEntity>>(
    `${baseURL}/customers/${identification}/enable`,
    {}
  );
}

export async function deleteCustomer(identification: string): Promise<IBasicResponse<void>> {
  return await useFetch.delete<IBasicResponse<void>>(
    `${baseURL}/customers/${identification}`,
  );
}
