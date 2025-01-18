import { Input } from "@/components/shadcn_ui/input"
import { Label } from "@/components/shadcn_ui/label"
import { useFormContext } from "react-hook-form"
import { FormData } from "../../schemas/schema"
import { PhoneInput } from "@/components/custom/form-components/phone-input"

export function IndividualForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<FormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Informações do Cliente Individual</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            {...register("individualData.firstName")}
          />
          {errors.individualData?.firstName && (
            <p className="text-red-500 text-sm">{errors.individualData.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            {...register("individualData.lastName")}
          />
          {errors.individualData?.lastName && (
            <p className="text-red-500 text-sm">{errors.individualData.lastName.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="identification">CPF</Label>
        <Input
          id="identification"
          {...register("individualData.identification")}
        />
        {errors.individualData?.identification && (
          <p className="text-red-500 text-sm">{errors.individualData.identification.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("individualData.contact.email")}
        />
        {errors.individualData?.contact?.email && (
          <p className="text-red-500 text-sm">{errors.individualData.contact.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <PhoneInput
          id="phone"
          defaultCountry="BR"
          value={watch("individualData.contact.phone")}
          onChange={(value) => setValue("individualData.contact.phone", value)}
        />
        {errors.individualData?.contact?.phone && (
          <p className="text-red-500 text-sm">{errors.individualData.contact.phone.message}</p>
        )}
      </div>
    </div>
  )
}

