import { useFormContext } from "react-hook-form"
import { Input } from "@/components/shadcn_ui/input"
import { Label } from "@/components/shadcn_ui/label"
import { FormData } from "../../schemas/schema"

interface LocationFormProps {
  disabledFields: string[]
  cepAttempts: number
}

export function LocationForm({ disabledFields, cepAttempts }: LocationFormProps) {
  const { register, formState: { errors }, watch } = useFormContext<FormData>()
  const zipCode = watch("locationData.zip_code")

  const isFieldDisabled = (fieldName: string) => {
    return !zipCode || (disabledFields.includes(fieldName) && cepAttempts < 2)
  }

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Informações de Localização</h2>
      <div className="space-y-2">
        <Label htmlFor="zip_code">CEP</Label>
        <Input
          id="zip_code"
          maxLength={9}
          {...register("locationData.zip_code", {
            onChange: (e) => {
              e.target.value = maskCEP(e.target.value)
            }
          })}
        />
        {errors.locationData?.zip_code && (
          <p className="text-red-500 text-sm">{errors.locationData.zip_code.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input
          id="street"
          disabled={isFieldDisabled("locationData.street")}
          {...register("locationData.street")}
        />
        {errors.locationData?.street && (
          <p className="text-red-500 text-sm">{errors.locationData.street.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            disabled={isFieldDisabled("locationData.number")}
            {...register("locationData.number")}
          />
          {errors.locationData?.number && (
            <p className="text-red-500 text-sm">{errors.locationData.number.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            disabled={isFieldDisabled("locationData.complement")}
            {...register("locationData.complement")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input
          id="neighborhood"
          disabled={isFieldDisabled("locationData.neighborhood")}
          {...register("locationData.neighborhood")}
        />
        {errors.locationData?.neighborhood && (
          <p className="text-red-500 text-sm">{errors.locationData.neighborhood.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            disabled={isFieldDisabled("locationData.city")}
            {...register("locationData.city")}
          />
          {errors.locationData?.city && (
            <p className="text-red-500 text-sm">{errors.locationData.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            disabled={isFieldDisabled("locationData.state")}
            {...register("locationData.state")}
          />
          {errors.locationData?.state && (
            <p className="text-red-500 text-sm">{errors.locationData.state.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}