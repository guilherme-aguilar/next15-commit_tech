"use client"

import { Button } from "@/components/shadcn_ui/button"
import { Card } from "@/components/shadcn_ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, Check, ClipboardCheck, MapPin, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createElement, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { combinedSchema, FormData } from "../schemas/schema"
import { SubmitInsertCustomer } from "../lib/insertCustomer"
import { SubmitUpdateCustomer } from "../lib/updateCustomer"
import { CompanyForm } from "./form/company-form"
import { ConfirmStep } from "./form/confirm-step"
import { CustomerTypeForm } from "./form/customer-type-form"
import { IndividualForm } from "./form/individual-form"
import { LocationForm } from "./form/location-form"




interface Step {
  id: number
  name: string
  status: "complete" | "current" | "upcoming"
}

interface CNPJResponse {
  razao_social: string;
  nome_fantasia: string;
}

interface CEPResponse {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}


interface ProgressFormProps {
  formData?: FormData
  showProgress?: boolean
}
export function ProgressForm({ formData, showProgress = true }: ProgressFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const { toast } = useToast()
  const [cnpjAttempts, setCnpjAttempts] = useState(0)
  const [cepAttempts, setCepAttempts] = useState(0)
  const [disabledFields, setDisabledFields] = useState<string[]>([])

  // At the top of your component:
const router = useRouter()

  useEffect(() => {
    if (formData) {
      setSteps([
        { id: 1, name: "Geral", status: "current" },
        { id: 2, name: "Localização", status: "upcoming" },
        { id: 3, name: "Confirmação", status: "upcoming" },
      ])
    } else {
      setSteps([
        { id: 1, name: "Tipo", status: "current" },
        { id: 2, name: "Geral", status: "upcoming" },
        { id: 3, name: "Localização", status: "upcoming" },
        { id: 4, name: "Confirmação", status: "upcoming" },
      ])
    }
    setCurrentStep(0)
  }, [formData])

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
    defaultValues: {
      customerType: formData?.customerType || "individual",
      individualData: {
        lastName: formData?.individualData?.lastName || "",
        firstName: formData?.individualData?.firstName || "",
        identification: formData?.individualData?.identification || "",
        contact: {
          email: formData?.individualData?.contact?.email || "",
          phone: formData?.individualData?.contact?.phone || "",
        },
      },
      companyData: {
        name: formData?.companyData?.name || "",
        fantasyName: formData?.companyData?.fantasyName || "",
        identification: formData?.companyData?.identification || "",
        agent:  formData?.companyData?.agent ? {
          firstName: formData?.companyData?.agent?.firstName  || "",
          lastName: formData?.companyData?.agent?.lastName || "",
          identification: formData?.companyData?.agent?.identification || "",
          email: formData?.companyData?.agent?.email || "",
          phone: formData?.companyData?.agent?.phone || "",
          position: formData?.companyData?.agent?.position || "",
        } : undefined,
        contact: {
          email: formData?.companyData?.contact?.email || "",
          phone: formData?.companyData?.contact?.phone || "",
        },
      },
      locationData: {
        zip_code: formData?.locationData?.zip_code || "",
        street: formData?.locationData?.street || "",
        city  : formData?.locationData?.city || "",
        state : formData?.locationData?.state || "",
        neighborhood: formData?.locationData?.neighborhood || "",
        complement: formData?.locationData?.complement || "",
        number: formData?.locationData?.number || "",
      },
    }
  })

  const { handleSubmit, watch, trigger, setValue, formState: { errors } } = methods
  const customerType = watch("customerType")
  const companyIdentification = watch("companyData.identification")
  const cep = watch("locationData.zip_code")

  const fetchCEPData = async (cep: string) => {
    try {
      const cleanCEP = cep.replace(/[^0-9]/g, '')

      if (cleanCEP.length !== 8) {
        toast({
          variant: "destructive",
          title: "CEP inválido",
          description: "O CEP deve conter 8 dígitos.",
        })
        setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state'])
        return
      }

      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCEP}`)

      // Handle 404 response specifically
      if (response.status === 404) {
        toast({
          variant: "destructive",
          title: "Serviço indisponível",
          description: "Não foi possível acessar o serviço de busca de CEP no momento.",
        })
        setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state', 'locationData.number', 'locationData.complement'])
        setValue('locationData.street', '')
        setValue('locationData.neighborhood', '')
        setValue('locationData.city', '')
        setValue('locationData.state', '')
        setValue('locationData.number', '')
        setValue('locationData.complement', '')
        setCepAttempts(0)
        return
      }

      const data = await response.json()

      if (!response.ok || data.errors || !data.city) {
        toast({
          variant: "destructive",
          title: "CEP não encontrado",
          description: "Por favor, verifique se o número está correto.",
        })
        setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state'])
        setCepAttempts(prev => prev + 1)

        // Clear fields when CEP is invalid
        setValue('locationData.street', '')
        setValue('locationData.neighborhood', '')
        setValue('locationData.city', '')
        setValue('locationData.state', '')
        return
      }

      const fieldsToDisable: string[] = []

      if (data.street) {
        setValue('locationData.street', data.street)
        fieldsToDisable.push('locationData.street')
      }

      if (data.neighborhood) {
        setValue('locationData.neighborhood', data.neighborhood)
        fieldsToDisable.push('locationData.neighborhood')
      }

      if (data.city) {
        setValue('locationData.city', data.city)
        fieldsToDisable.push('locationData.city')
      }

      if (data.state) {
        setValue('locationData.state', data.state)
        fieldsToDisable.push('locationData.state')
      }

      setDisabledFields(fieldsToDisable)
      setCepAttempts(0)
    } catch (error) {
      console.error('Erro ao buscar dados do CEP:', error)
      setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state'])

      toast({
        variant: "destructive",
        title: "Erro ao buscar CEP",
        description: "Não foi possível obter os dados do endereço. Por favor, verifique sua conexão e tente novamente.",
      })

      // Clear fields in case of error
      setValue('locationData.street', '')
      setValue('locationData.neighborhood', '')
      setValue('locationData.city', '')
      setValue('locationData.state', '')
    }
  }

  const fetchCNPJData = async (cnpj: string) => {
    try {
      const cleanCNPJ = cnpj.replace(/[^\d]/g, '')
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`)

      if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "CNPJ inválido",
          description: "Por favor, verifique se o número está correto.",
        })
        return
      }

      if (!response.ok) {
        throw new Error('CNPJ não encontrado')
      }

      const data: CNPJResponse = await response.json()

      if (data) {
        setValue('companyData.name', data.razao_social)
        setValue('companyData.fantasyName', data.nome_fantasia)
        setCnpjAttempts(0)

      }
    } catch (error) {
      console.error('Erro ao buscar dados do CNPJ:', error)
      setCnpjAttempts(prev => prev + 1)

      toast({
        variant: "destructive",
        title: "Erro ao buscar CNPJ",
        description: "Não foi possível obter os dados do CNPJ. Por favor, verifique se o número está correto.",
      })
    }
  }

  useEffect(() => {
    setValue('companyData.name', '')
    setValue('companyData.fantasyName', '')

    if (customerType === "company" && companyIdentification?.length >= 14 ) {
      fetchCNPJData(companyIdentification)
    }
  }, [companyIdentification, customerType])

  useEffect(() => {
    // Reset all location fields and block them when CEP is empty or invalid
    if (!cep || cep.replace(/[^0-9]/g, '').length !== 8) {
      setValue('locationData.street', '')
      setValue('locationData.neighborhood', '')
      setValue('locationData.city', '')
      setValue('locationData.state', '')
      setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state'])
      return
    }

    const cleanCEP = cep.replace(/[^0-9]/g, '')
    if (cleanCEP.length === 8) {
      // Reset all location fields before fetching new data
      setValue('locationData.street', '')
      setValue('locationData.neighborhood', '')
      setValue('locationData.city', '')
      setValue('locationData.state', '')
      // Block all fields while fetching
      setDisabledFields(['locationData.street', 'locationData.neighborhood', 'locationData.city', 'locationData.state'])
      fetchCEPData(cleanCEP)
    }
  }, [cep])

  const validateStep = async (step: number): Promise<boolean> => {
    let isValid = false;
    let errorFields: string[] = [];
    
    switch (step) {
      case 0:
        isValid = await trigger("customerType");
        if (!isValid) errorFields.push("Tipo de cliente");
        break;
      case 1:
        if (customerType === "individual") {
          await trigger("individualData");
          const individualErrors = errors.individualData;
          if (individualErrors?.firstName) errorFields.push("Nome");
          if (individualErrors?.lastName) errorFields.push("Sobrenome");
          if (individualErrors?.identification) errorFields.push("CPF");
          if (individualErrors?.contact?.email) errorFields.push("Email");
          if (individualErrors?.contact?.phone) errorFields.push("Telefone");
        } else {
          await trigger("companyData");
          const companyErrors = errors.companyData;
          if (companyErrors?.name) errorFields.push("Razão Social");
          if (companyErrors?.fantasyName) errorFields.push("Nome Fantasia");
          if (companyErrors?.identification) errorFields.push("CNPJ");
          if (companyErrors?.contact?.email) errorFields.push("Email");
          if (companyErrors?.contact?.phone) errorFields.push("Telefone");
        }
        isValid = errorFields.length === 0;
        break;
      case 2:
        await trigger("locationData");
        const locationFieldErrors = errors.locationData;
        if (locationFieldErrors?.zip_code) errorFields.push("CEP");
        if (locationFieldErrors?.street) errorFields.push("Rua");
        if (locationFieldErrors?.neighborhood) errorFields.push("Bairro");
        if (locationFieldErrors?.city) errorFields.push("Cidade");
        if (locationFieldErrors?.state) errorFields.push("Estado");
        if (locationFieldErrors?.number) errorFields.push("Número");
        isValid = errorFields.length === 0;
        break;
      case 3:
        // Validation for the final step (if needed)
        isValid = true;
        break;
    }
    
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios não preenchidos",
        description: `Por favor, preencha os seguintes campos: ${errorFields.join(", ")}`,
      });
    }
    
    return isValid;
  }

  const handleStepChange = async (newStep: number) => {
    if (newStep > currentStep) {
      for (let i = currentStep; i < newStep; i++) {
        const isValid = await validateStep(i);
        if (!isValid) {
          return;
        }
      }
    }

    setCurrentStep(newStep);
    setSteps(currentSteps =>
      currentSteps.map(step => ({
        ...step,
        status:
          step.id < newStep + 1
            ? "complete"
            : step.id === newStep + 1
            ? "current"
            : "upcoming",
      }))
    );
  }

  const handleNext = async () => {
    const maxStep = formData ? 2 : 3;
    const isValid = await validateStep(currentStep);

    if (isValid) {
      if (currentStep < maxStep) {
        handleStepChange(currentStep + 1);
      } else {
        const formData = methods.getValues();
        await onSubmit(formData);
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      // Permite voltar para etapas anteriores sem validação
      handleStepChange(stepIndex);
    } else if (stepIndex === currentStep + 1) {
      // Só permite avançar para a próxima etapa
      handleNext();
    }
  };


  const renderStepContent = () => {
    if (formData) {
      switch (currentStep) {
        case 0:
          return customerType === "individual" ? <IndividualForm /> : <CompanyForm cnpjAttempts={cnpjAttempts} />
        case 1:
          return <LocationForm disabledFields={disabledFields} cepAttempts={cepAttempts} />
        case 2:
          return <ConfirmStep />
        default:
          return null
      }
    } else {
      switch (currentStep) {
        case 0:
          return <CustomerTypeForm />
        case 1:
          return customerType === "individual" ? <IndividualForm /> : <CompanyForm cnpjAttempts={cnpjAttempts} />
        case 2:
          return <LocationForm disabledFields={disabledFields} cepAttempts={cepAttempts} />
        case 3:
          return <ConfirmStep />
        default:
          return null
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    try {

      if(formData) {
        await SubmitUpdateCustomer(data)
        toast({
          title: "Sucesso",
          description: "Cliente atualizado com sucesso!",
        })
      } 
      
      else {
      await SubmitInsertCustomer(data)
      toast({
        title: "Sucesso",
        description: "Cliente cadastrado com sucesso!",
      })

      router.push('/dash/customer')

    }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao cadastrar cliente",
      })
    }
  }

  const getStepIcon = (stepName: string) => {
    switch (stepName) {
      case "Tipo":
        return User
      case "Geral":
        return Building2
      case "Localização":
        return MapPin
      case "Confirmação":
        return ClipboardCheck
      default:
        return User
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full mx-auto", !showProgress && "mt-6")}>
        {showProgress && (
          <Card className="p-6 shadow-sm mb-6">
            <ol className="flex items-center" role="list">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.name}
                  className={cn(
                    "flex items-center cursor-pointer",
                    stepIdx !== steps.length - 1 && "w-full"
                  )}
                  onClick={() => handleStepChange(stepIdx)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        step.status === "complete"
                          ? "border-primary bg-primary"
                          : step.status === "current"
                          ? "border-primary"
                          : "border-gray-300"
                      )}
                    >
                      {step.status === "complete" ? (
                        <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : (
                        createElement(getStepIcon(step.name), {
                          className: cn(
                            "h-5 w-5",
                            step.status === "current"
                              ? "text-primary"
                              : "text-muted-foreground"
                          )
                        })
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-sm",
                        step.status === "complete"
                          ? "text-primary"
                          : step.status === "current"
                          ? "text-primary"
                          : "text-gray-500"
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={cn(
                        "h-[2px] w-full",
                        step.status === "complete" ? "bg-primary" : "bg-gray-300"
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </Card>
        )}

        <Card className="p-6 shadow-sm mb-6">
          {renderStepContent()}
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          <Button
            type="button"
            onClick={handleNext}
          >
            {currentStep === (formData ? 2 : 3) ? "Enviar" : "Próximo"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

