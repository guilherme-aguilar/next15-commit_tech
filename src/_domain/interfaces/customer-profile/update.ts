export interface ICustomerProfileUpdate {
  id: string;
  name?: string;
  permissions?: {
    action?: string;
    subject?: string;
  }[]
}