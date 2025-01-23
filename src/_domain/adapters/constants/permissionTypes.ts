export enum ActionEnum {
  Update = "update",
  View = "view"
}
export type Action = `${ActionEnum}` // Isso vai gerar "update" | "view"

export const SubjectEnum = {
  ManageCustomer: {
    value: "manage_customer",
    displayName: "Gerenciar Cliente",
    description: "Permite gerenciar informações gerais dos clientes"
  },
  ManageCustomerProfile: {
    value: "manage_CustomerProfile",
    displayName: "Gerenciar Perfil do Cliente",
    description: "Permite gerenciar perfis específicos dos clientes"
  },
  ManageUser: {
    value: "manage_user",
    displayName: "Gerenciar Usuário",
    description: "Permite gerenciar usuários do sistema"
  },
  ManageUserPrrofile: {
    value: "manage_userProfile",
    displayName: "Gerenciar Perfil do Usuário",
    description: "Permite gerenciar perfis específicos dos usuários"
  }
} as const;

export type Subject = typeof SubjectEnum[keyof typeof SubjectEnum]['value'];

export enum AccountTypeWithoutOwnerEnum {
  Admin = "admin",
  Tenant = "tenant"
}

export enum AccountTypeEnum {
  Owner = "owner",
  Admin = "admin",
  Tenant = "tenant"
}

export type AccountType = `${AccountTypeEnum}` // Vai gerar "owner" | "admin" | "tenant"

export type AccountTypeWithoutOwner = `${AccountTypeWithoutOwnerEnum}`
