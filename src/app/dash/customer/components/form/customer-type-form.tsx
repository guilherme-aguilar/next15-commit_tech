import { Label } from "@/components/shadcn_ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn_ui/radio-group"
import { useFormContext } from "react-hook-form"
import { FormData } from "../../schemas/schema"


export function CustomerTypeForm() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormData>()
  const customerType = watch("customerType")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Escolha o Tipo de Cliente</h2>
      <RadioGroup 
        value={customerType} 
        onValueChange={(value: "individual" | "company") => setValue("customerType", value, { shouldValidate: true })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="individual" id="individual" />
          <Label htmlFor="individual">Pessoa Física</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="company" id="company" />
          <Label htmlFor="company">Pessoa Jurídica</Label>
        </div>
      </RadioGroup>
      {errors.customerType && (
        <p className="text-red-500 text-sm">{errors.customerType.message as string}</p>
      )}
    </div>
  )
}