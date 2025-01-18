import { deleteCustomer } from "@/_infra/services/customer"

export async function SubmitDeleteCustomer(id : string) {
  try {
    await deleteCustomer(id)

  } catch (error) {
    throw new Error('Error deleting customer')
  }
  
}