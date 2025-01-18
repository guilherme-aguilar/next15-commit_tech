import { useFormContext } from "react-hook-form"

export function ConfirmStep() {
  const { watch } = useFormContext()
  const formData = watch()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Confirm Information</h2>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium text-primary mb-2">
            {formData.customerType === "individual" ? "Individual" : "Company"} Details
          </h3>
          {formData.customerType === "individual" ? (
            <>
              <p>Name: {formData.individualData.firstName} {formData.individualData.lastName}</p>
              <p>CPF: {formData.individualData.identification}</p>
              <p>Email: {formData.individualData.contact.email}</p>
              <p>Phone: {formData.individualData.contact.phone}</p>
            </>
          ) : (
            <>
              <p>Company Name: {formData.companyData.name}</p>
              <p>Fantasy Name: {formData.companyData.fantasyName}</p>
              <p>CNPJ: {formData.companyData.identification}</p>
              <p>Email: {formData.companyData.contact.email}</p>
              <p>Phone: {formData.companyData.contact.phone}</p>
              <h4 className="font-medium mt-2">Agent Information:</h4>
              <p>Name: {formData.companyData.agent.firstName} {formData.companyData.agent.lastName}</p>
              <p>CPF: {formData.companyData.agent.identification}</p>
              <p>Email: {formData.companyData.agent.email}</p>
              <p>Phone: {formData.companyData.agent.phone}</p>
            </>
          )}
        </div>
        
        <div>
          <h3 className="font-medium text-primary mb-2">Location Information</h3>
          <p>{formData.locationData.street}, {formData.locationData.number}</p>
          {formData.locationData.complement && <p>Complement: {formData.locationData.complement}</p>}
          <p>{formData.locationData.neighborhood}</p>
          <p>{formData.locationData.city}, {formData.locationData.state}</p>
          <p>ZIP Code: {formData.locationData.zip_code}</p>
        </div>
      </div>
    </div>
  )
}

