export interface IPayload {
  id: string;
  email: string;
  type?: "access" | "refresh";
}