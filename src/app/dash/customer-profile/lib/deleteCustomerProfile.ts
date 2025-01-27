import { deleteCustomerProfile } from "@/_infra/services/customerProfile"

export async function SubmitDeleteCustomer(id : string) {
  try {
    await deleteCustomerProfile(id)

  } catch (error) {
    throw new Error('Error deleting customer')
  }
  
}