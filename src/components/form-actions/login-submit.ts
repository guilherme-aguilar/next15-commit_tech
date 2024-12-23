"use server"

import { ILoginResponse } from "@/_domain/interfaces/login"
import { AuthService } from "@/_infra/services/auth"
import { cookies } from "next/headers"

export async function SubmitLogin(formData: FormData) {
  try {
    const data :ILoginResponse = await AuthService.login({
      email: formData.get('email') as string,
      password: formData.get('senha') as string,
    })

    const cookieStore = await cookies()

    cookieStore.set('accessToken', data.token)
    cookieStore.set('refreshToken', data.refreshToken)

  } catch (error) {
    throw new Error(error as string)
  }

}