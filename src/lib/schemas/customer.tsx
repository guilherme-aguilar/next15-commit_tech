import { z } from 'zod';

// Regex simplificada para validar telefone
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// Esquema de validação simplificado para inserção de cliente
export const RequestCustomerInsertSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  fantasyName: z.string().optional(),
  identification: z.string().min(11, "CPF/CNPJ deve ter no mínimo 11 dígitos"),
  personType: z.enum(['juridical', 'physical']),
  contact: z.object({
    email: z.string().email("Email inválido"),
    phone: z.string().regex(phoneRegex, "Número de telefone inválido")
  }),
  location: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),
    zip_code: z.string().min(8, "CEP deve ter no mínimo 8 dígitos"),
    complement: z.string().optional(),
  }),
  agent: z.object({
    name: z.string().min(1, "Nome do agente é obrigatório"),
    email: z.string().email("Email do agente inválido"),
    phone: z.string().regex(phoneRegex, "Número de telefone do agente inválido"),
    identification: z.string().min(11, "CPF do agente deve ter no mínimo 11 dígitos"),
    position: z.string().min(1, "Cargo do agente é obrigatório"),
  }).optional(),
  mediaInfo: z.object({
    logo: z.string().url("URL do logo inválida").optional(),
  }).optional(),
}).refine((data) => {
  if (data.personType === 'juridical') {
    return !!data.fantasyName && !!data.agent && !!data.mediaInfo?.logo;
  }
  return !data.fantasyName && !data.agent && !data.mediaInfo;
}, {
  message: "Campos inválidos para o tipo de pessoa selecionado",
  path: ['personType'],
});

