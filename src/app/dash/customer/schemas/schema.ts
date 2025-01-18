import { z } from "zod"

export const individualCustomerSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  identification: z.string().min(11, "CPF deve ter pelo menos 11 dígitos"),
  contact: z.object({
    email: z.string().email("Endereço de e-mail inválido"),
    phone: z.string().min(10, "Número de telefone deve ter pelo menos 10 dígitos"),
  }),
})

export const legalCustomerSchema = z.object({
  name: z.string().min(1, "Nome da empresa é obrigatório"),
  fantasyName: z.string().optional(),
  identification: z.string().min(14, "CNPJ deve ter pelo menos 14 dígitos"),
  contact: z.object({
    email: z.string().email("Endereço de e-mail inválido"),
    phone: z.string().min(10, "Número de telefone deve ter pelo menos 10 dígitos"),
  }),
  agent: z.object({
    firstName: z.string().min(1, "Nome do representante é obrigatório"),
    lastName: z.string().min(1, "Sobrenome do representante é obrigatório"),
    identification: z.string().min(11, "CPF do representante deve ter pelo menos 11 dígitos"),
    email: z.string().email("Endereço de e-mail do representante inválido"),
    phone: z.string().min(10, "Número de telefone do representante deve ter pelo menos 10 dígitos"),
    position: z.string().min(1, "Cargo do representante é obrigatório"),
  }),
})

export const locationCustomerSchema = z.object({
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zip_code: z.string().min(8, "CEP deve ter pelo menos 8 dígitos"),
})

export type IndividualCustomerFormData = z.infer<typeof individualCustomerSchema>
export type LegalCustomerFormData = z.infer<typeof legalCustomerSchema>
export type LocationCustomerFormData = z.infer<typeof locationCustomerSchema>

export const combinedSchema = z.object({
  customerType: z.enum(["individual", "company"], {
    required_error: "Por favor, selecione um tipo de cliente",
  }),
  individualData: individualCustomerSchema.optional(),
  companyData: legalCustomerSchema.optional(),
  locationData: locationCustomerSchema,
}).refine((data) => {
  if (data.customerType === "individual") {
    return !!data.individualData;
  } else {
    return !!data.companyData;
  }
}, {
  message: "Por favor, preencha as informações do cliente",
  path: ["customerData"],
});

export type FormData = z.infer<typeof combinedSchema>
