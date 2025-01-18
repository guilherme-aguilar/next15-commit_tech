import { cookies } from "next/headers"

const fetchInstance = async (url: string, options: RequestInit = {}, credentials?: RequestCredentials) => {
  const cookieStore = cookies();
  const accessTokenCookie = (await cookieStore).get('accessToken');
  const token = accessTokenCookie?.value;

  const headers: Record<string, string> = {
    ...(options.method !== 'DELETE' ? { 'Content-Type': 'application/json' } : {}),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers as Record<string, string>),
  };

  // Se credentials for passado ou useCredentials for falso, usamos o valor do parâmetro credentials
  const finalCredentials = credentials ?? 'same-origin';  // O valor padrão de credentials é 'same-origin'

  const response = await fetch(url, { ...options, headers, credentials: finalCredentials });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  // Parse JSON response if the content type is JSON.
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text(); // Caso contrário, retorna o corpo como texto
};

export const useFetch = {
  get: async <T>(
    url: string,
    config: RequestInit = {},
    useCredentials: boolean = true,  // Parâmetro para definir se usará o cookie de credentials ou não
    credentials?: RequestCredentials  // Parâmetro que pode sobrescrever o valor de credentials
  ): Promise<T> => {
    // Se useCredentials for true, utilizamos a configuração padrão de credentials (já gerenciada em fetchInstance)
    // Caso contrário, utilizamos o valor de credentials passado como parâmetro
    return fetchInstance(url, { method: 'GET', ...config }, useCredentials ? 'same-origin' : credentials);
  },

  post: async <T>(
    url: string,
    body: unknown,
    config: RequestInit = {},
    useCredentials: boolean = true,
    credentials?: RequestCredentials
  ): Promise<T> => {
    return fetchInstance(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...config,
    }, useCredentials ? 'same-origin' : credentials);
  },

  put: async <T>(
    url: string,
    body: unknown,
    config: RequestInit = {},
    useCredentials: boolean = true,
    credentials?: RequestCredentials
  ): Promise<T> => {
    return fetchInstance(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...config,
    }, useCredentials ? 'same-origin' : credentials);
  },

  delete: async <T>(
    url: string,
    config: RequestInit = {},
    useCredentials: boolean = true,
    credentials?: RequestCredentials
  ): Promise<T> => {
    return fetchInstance(url, { method: 'DELETE', ...config }, useCredentials ? 'same-origin' : credentials);
  },

  patch: async <T>(
    url: string,
    body?: unknown,
    config: RequestInit = {},
    useCredentials: boolean = true,
    credentials?: RequestCredentials
  ): Promise<T> => {
    return fetchInstance(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    }, useCredentials ? 'same-origin' : credentials);
  },
};