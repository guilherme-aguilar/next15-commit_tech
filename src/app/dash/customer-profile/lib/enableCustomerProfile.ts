import { enableCustomerProfile } from "@/_infra/services/customerProfile"

export async function SubmitEnableCustomerProfile(id : string) {
  try {
    await enableCustomerProfile(id)

  } catch (error) {
    throw new Error('Error enabling customer')
  }
  
}