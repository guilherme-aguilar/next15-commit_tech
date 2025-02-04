import type { IBasic } from "../entities/basic";

export interface ICustomerEntity extends IBasic {
  
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
  customerProfile?:   any

  representativeId?: string;
  representative?: any;

  responsibleFor?: any[];
}