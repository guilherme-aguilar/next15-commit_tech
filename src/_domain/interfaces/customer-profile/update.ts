export interface ICustomerCreate {
  name?: string;
  fantasyName?: string;
  identification: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  location?: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    complement?: string;
  };
  mediaInfo?: {
    logo: string;
  };
  agent?: {
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
  };
}