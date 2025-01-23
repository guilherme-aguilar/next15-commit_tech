import { EBasic, IBasic } from "./00_basic";
import { ECustomer } from "./02_customer";
import { EUserProfile } from "./03_userProfile";

export interface IUser extends IBasic{
  name: string;
  email: string;
  password?: string;
  refreshToken?: string;
  
  //relations
  customerId: string;
  customer?:  ECustomer

  userProfileId: string;
  userProfile?: EUserProfile
 
}




export class EUser extends EBasic<IUser> {

  get name() {
    return this.getProps().name
  }

  get email() {
    return this.getProps().email
  }

  get  password() {
    return this.getProps().password
  }

  get refreshToken() {
    return this.getProps().refreshToken
  }



  // =========================================
  //                Relations
  // =========================================

  get customerId() {
    return this.getProps().customerId
  }

  get customer() {
    return this.getProps().customer
  }

  get userProfileId() {
    return this.getProps().userProfileId
  }

  get userProfile() {
    return this.getProps().userProfile
  }

}

