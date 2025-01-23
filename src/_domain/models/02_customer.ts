import { EBasic, IBasic } from "./00_basic";
import { ECustomerProfile } from "./01_customerProfile";



export interface ICustomer extends IBasic {
  
  name: string;
  fantasyName?: string,
  identification: string,
  personType: string,
  contact: {
    email: string;
    phone: string
  }
  location: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    complement?: string;
  }
  mediaInfo?: {
    logo: string
  }
  agent?: {
    name: string;
    email: string;
    phone: string;
    position: string;
    identification: string;
  };

  //relations
  customerProfileId?: string
  customerProfile?:   ECustomerProfile

  representativeId?: string;
  representative?: ECustomer;

  responsibleFor?: ECustomer[];
}




export class ECustomer extends EBasic<ICustomer> {
  
  get name(){
    return this.getProps().name
  }

  get fantasyName() {
    return this.getProps().fantasyName
  }

  get identification() {
    return this.getProps().identification
  }

  get personType() {
    return this.getProps().personType
  }
  
  get contact() {
    return this.getProps().contact
  }

  get location() {
    return this.getProps().location
  }

  get agent() {
    return this.getProps().agent
  }
  
  get mediaInfo() {
    return this.getProps().mediaInfo
  }

  // =========================================
  //                Relations
  // =========================================
  get customerProfileId() {
    return this.getProps().customerProfileId
  }

  get customerProfile() {
    return this.getProps().customerProfile
  }

  

  get representativeId() {
    return this.getProps().representativeId
  }

  get representative() {
    return this.getProps().representative
  }



  get responsibleFor() {
    return this.getProps().responsibleFor
  }

  
}
