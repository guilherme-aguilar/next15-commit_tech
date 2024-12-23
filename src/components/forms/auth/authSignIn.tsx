"use client"

import { useFormStatus } from "react-dom"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/shadcn_ui/button"
import { Input } from "@/components/shadcn_ui/input"
import { Label } from "@/components/shadcn_ui/label"
import { useRouter } from 'next/navigation'
import { SubmitLogin } from "@/components/form-actions/login-submit"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button id="submitLogin" type="submit" className="w-full" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar'}
    </Button>
  )
}

export default function AuthSignIn() {
  const { toast } = useToast()
  const router = useRouter()  // Aqui é onde o erro acontece normalmente

  async function handleSubmit(formData: FormData) {
    try {
      await SubmitLogin(formData)
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso',
        duration: 2000,
      })
      
      await router.push('/dash')  // Aqui você está tentando navegar para outra página
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Erro ao realizar login: ${error}`,
        duration: 2000,
      })
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(new FormData(e.currentTarget));
    }} 
    className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" placeholder="Preencha seu email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input id="senha" name="senha" type="password" placeholder="Preencha sua senha" required />
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
)
}
