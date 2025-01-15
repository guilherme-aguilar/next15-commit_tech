"use server"

import type { IBasicResponse } from "@/_domain/interfaces/basicResponse"
import { ILoginResponse } from "@/_domain/interfaces/login"
import { AuthService } from "@/_infra/services/auth"
import { cookies } from "next/headers"

export async function SubmitLogin(formData: FormData) {
  try {
    const data : IBasicResponse<ILoginResponse> = await AuthService.login({
      email: formData.get('email') as string,
      password: formData.get('senha') as string,
    })

    const cookieStore = await cookies()

    cookieStore.set('accessToken', data.data.accessToken)
    cookieStore.set('refreshToken', data.data.refreshToken)

  } catch (error) {
    throw new Error(error as string)
  }

}