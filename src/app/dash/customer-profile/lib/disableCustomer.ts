import { disableCustomer } from "@/_infra/services/customer"

export async function SubmitDisableCustomer(id : string) {
  try {
    await disableCustomer(id)

  } catch (error) {
    throw new Error('Error disabling customer')
  }
  
}