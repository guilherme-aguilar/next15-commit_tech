import { IPayload } from "../constants/payload";

export interface IJwtService {
  checkToken : (
    token: string, 
    secret: string
  ) => Promise<any>;
  
  createToken: (
    payload: IPayload, 
    type: "access" | "refresh", 
    secret: string, 
    expiresIn: string
  ) =>  string;

}
