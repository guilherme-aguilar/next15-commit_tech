import type { IBasic } from "../entities/basic";

export interface ICustomerProfileEntity extends IBasic {
  name: string;
  role: string;
  permissions: {
    action: string;
    subject: string;
  }[];
}