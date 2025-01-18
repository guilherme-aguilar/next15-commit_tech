import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verifica a presença dos cookies de autenticação
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!accessToken && !!refreshToken

  // Obtém o caminho da URL atual
  const path = request.nextUrl.pathname

  if (path === '/') {
    console.log('Middleware executado')
  }

  // Redireciona usuários autenticados tentando acessar a página de login
  if (isAuthenticated && path === '/') {
    return NextResponse.redirect(new URL('/dash', request.url))
  }

  // Redireciona usuários não autenticados tentando acessar o dashboard
  if (!isAuthenticated && path.startsWith('/dash')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Para todas as outras rotas, permite o acesso
  return NextResponse.next()
}

// Define em quais caminhos o middleware será executado
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}