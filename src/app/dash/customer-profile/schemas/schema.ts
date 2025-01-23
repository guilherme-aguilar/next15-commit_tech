import { AccountTypeWithoutOwnerEnum, ActionEnum, SubjectEnum } from "@/_domain/adapters/constants/permissionTypes"
import { z } from "zod"

const permissionSchema = z.object({
  action: z.enum(Object.values(ActionEnum) as [ActionEnum, ...ActionEnum[]]),
  subject: z.enum(Object.values(SubjectEnum).map((s) => s.value) as [string, ...string[]]),
})

export const RequestPermissionSchemas = z.object({
  name: z.string().min(1, "Nome é obrigatório").describe("Nome do cliente"),
  role: z.enum(Object.values(AccountTypeWithoutOwnerEnum) as [string, ...string[]]),
  permissions: z.record(z.boolean()).transform((permissions) =>
    Object.entries(permissions)
      .filter(([, value]) => value)
      .map(([key]) => {
        const [action, ...subjectParts] = key.split("_")
        const subject = subjectParts.join("_") // This ensures we get the full subject value
        return { action, subject }
      }),
  ),
})

