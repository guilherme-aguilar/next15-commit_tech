import { ICustomerProfile } from "@shared/app/models/01_customerProfile";
import { ICustomer } from "@shared/app/models/02_customer";
import { IUserProfile } from "@shared/app/models/03_userProfile";
import { IUser } from "@shared/app/models/04_user";


export interface IUserData {
  customer: ICustomer,
  customerProfile: ICustomerProfile,
  user: IUser,
  userProfile: IUserProfile,
}
  