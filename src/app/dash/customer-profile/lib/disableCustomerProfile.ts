import { disableCustomerProfile } from "@/_infra/services/customerProfile"

export async function SubmitDisableCustomerProfile(id : string) {
  try {
    await disableCustomerProfile(id)

  } catch (error) {
    throw new Error('Error disabling customer')
  }
  
}