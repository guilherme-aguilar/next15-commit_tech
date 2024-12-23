import { ILoginRequest } from "@/_domain/interfaces/login";

const baseURL = process.env.API_URL;


export class AuthService {
  static async login(data: ILoginRequest) {
    try {
      const response = await fetch(`${baseURL}/auth/signin`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json()

      return responseData

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}