import { enableCustomer } from "@/_infra/services/customer"

export async function SubmitEnableCustomer(id : string) {
  try {
    await enableCustomer(id)

  } catch (error) {
    throw new Error('Error enabling customer')
  }
  
}