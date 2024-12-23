
import AuthSignIn from "@/components/forms/auth/authSignIn"
import { Button } from "@/components/shadcn_ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn_ui/card"

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div
        className="w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-500"      >
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            {/* <CardDescription>
              Acesse sua conta para continuar
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthSignIn />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button variant="link" className="text-sm">
              Esqueceu sua senha?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}