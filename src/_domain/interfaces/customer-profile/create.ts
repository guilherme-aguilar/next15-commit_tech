export interface ICustomerProfileCreate {
  name: string;
  role: string;
  permissions: {
    action: string;
    subject: string;
  }[]
}