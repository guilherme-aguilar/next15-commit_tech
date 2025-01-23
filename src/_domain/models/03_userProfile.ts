
import { IPermission } from "../adapters/constants/permission";
import { EBasic, IBasic } from "./00_basic";


export interface IUserProfile extends IBasic {
  name: string
  permission: IPermission[]
 }

 

 export class EUserProfile extends EBasic<IUserProfile> {

  get name() {
    return this.getProps().name
  }

  get permission() {
    return this.getProps().permission
  }

}
