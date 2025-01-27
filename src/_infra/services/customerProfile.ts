"use server";

import type { IBasicResponse } from "@/_domain/interfaces/basicResponse";
import type { ICustomerProfileCreate } from "@/_domain/interfaces/customer-profile/create";
import type { ICustomerProfileEntity } from "@/_domain/interfaces/customer-profile/entity";
import type { ICustomerProfileUpdate } from "@/_domain/interfaces/customer-profile/update";

import { useFetch } from "@/hooks/use-fetch";

const baseURL = process.env.API_URL;

export async function createCustomerProfile(data: ICustomerProfileCreate): Promise<IBasicResponse<void>> {
  return await useFetch.post<IBasicResponse<void>>(
    `${baseURL}/customer-profiles`,
    data
  );
}

export async function updateCustomerProfile(data: ICustomerProfileUpdate): Promise<IBasicResponse<void>> {
  const {id, ...rest}= data
  return await useFetch.put<IBasicResponse<void>>(
    `${baseURL}/customer-profiles/${id}`,
    rest
  );
}

export async function getCustomerProfileById(id: string): Promise<IBasicResponse<ICustomerProfileEntity>> {
  return await useFetch.get<IBasicResponse<ICustomerProfileEntity>>(
    `${baseURL}/customer-profiles/${id}`
  );
}

export async function CountCustomerProfile(): Promise<IBasicResponse<number>> {
  return await useFetch.get<IBasicResponse<number>>(
    `${baseURL}/customer-profiles/count`
  );
}

export async function disableCustomerProfile(identification: string): Promise<IBasicResponse<ICustomerProfileEntity>> {
  return await useFetch.patch<IBasicResponse<ICustomerProfileEntity>>(
    `${baseURL}/customer-profiles/${identification}/disable`, 
    {}
  );
}

export async function enableCustomerProfile(identification: string): Promise<IBasicResponse<ICustomerProfileEntity>> {
  return await useFetch.patch<IBasicResponse<ICustomerProfileEntity>>(
    `${baseURL}/customer-profiles/${identification}/enable`,
    {}
  );
}

export async function deleteCustomerProfile(identification: string): Promise<IBasicResponse<void>> {
  return await useFetch.delete<IBasicResponse<void>>(
    `${baseURL}/customer-profiles/${identification}`,
  );
}
