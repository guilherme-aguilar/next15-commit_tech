import { Input } from "@/components/shadcn_ui/input"
import { Label } from "@/components/shadcn_ui/label"
import { useFormContext } from "react-hook-form"
import { FormData } from "../../schemas/schema"
import { PhoneInput } from "@/components/custom/form-components/phone-input"

interface CompanyFormProps {
  cnpjAttempts: number
}

export function CompanyForm({ cnpjAttempts }: CompanyFormProps) {
  const { register, formState: { errors }, watch, setValue } = useFormContext<FormData>()

  const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Informações da Empresa</h2>
      <div className="space-y-2">
        <Label htmlFor="identification">CNPJ</Label>
        <Input
          id="identification"
          maxLength={18}
          {...register("companyData.identification", {
            onChange: (e) => {
              e.target.value = maskCNPJ(e.target.value)
            }
          })}
        />
        {errors.companyData?.identification && (
          <p className="text-red-500 text-sm">{errors.companyData.identification.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Razão Social</Label>
        <Input
          id="name"
          {...register("companyData.name")}
          disabled={cnpjAttempts < 2}
        />
        {errors.companyData?.name && (
          <p className="text-red-500 text-sm">{errors.companyData.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fantasyName">Nome Fantasia</Label>
        <Input
          id="fantasyName"
          {...register("companyData.fantasyName")}
          disabled={cnpjAttempts < 2}
        />
        {errors.companyData?.fantasyName && (
          <p className="text-red-500 text-sm">{errors.companyData.fantasyName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("companyData.contact.email")}
        />
        {errors.companyData?.contact?.email && (
          <p className="text-red-500 text-sm">{errors.companyData.contact.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <PhoneInput
          id="phone"
          defaultCountry="BR"
          value={watch("companyData.contact.phone")}
          onChange={(value) => setValue("companyData.contact.phone", value)}
        />
        {errors.companyData?.contact?.phone && (
          <p className="text-red-500 text-sm">{errors.companyData.contact.phone.message}</p>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-6">Informações do Representante</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="agentFirstName">Nome</Label>
          <Input
            id="agentFirstName"
            {...register("companyData.agent.firstName")}
          />
          {errors.companyData?.agent?.firstName && (
            <p className="text-red-500 text-sm">{errors.companyData.agent.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="agentLastName">Sobrenome</Label>
          <Input
            id="agentLastName"
            {...register("companyData.agent.lastName")}
          />
          {errors.companyData?.agent?.lastName && (
            <p className="text-red-500 text-sm">{errors.companyData.agent.lastName.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentIdentification">CPF</Label>
        <Input
          id="agentIdentification"
          maxLength={14}
          {...register("companyData.agent.identification", {
            onChange: (e) => {
              e.target.value = maskCPF(e.target.value)
            }
          })}
        />
        {errors.companyData?.agent?.identification && (
          <p className="text-red-500 text-sm">{errors.companyData.agent.identification.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentPosition">Cargo</Label>
        <Input
          id="agentPosition"
          {...register("companyData.agent.position")}
        />
        {errors.companyData?.agent?.position && (
          <p className="text-red-500 text-sm">{errors.companyData.agent.position.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentEmail">Email</Label>
        <Input
          id="agentEmail"
          type="email"
          {...register("companyData.agent.email")}
        />
        {errors.companyData?.agent?.email && (
          <p className="text-red-500 text-sm">{errors.companyData.agent.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentPhone">Telefone</Label>
        <PhoneInput
          id="agentPhone"
          defaultCountry="BR"
          value={watch("companyData.agent.phone")}
          onChange={(value) => setValue("companyData.agent.phone", value)}
        />
        {errors.companyData?.agent?.phone && (
          <p className="text-red-500 text-sm">{errors.companyData.agent.phone.message}</p>
        )}
      </div>
    </div>
  )
}