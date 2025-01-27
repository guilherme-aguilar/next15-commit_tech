import { Breadcrumb } from "@/components/custom/breadcrumb"
import { Button } from "@/components/shadcn_ui/button"
import { FormCustomerProfile } from "../../components/form/formCustomerProfile"

export default function PermissionTableForm() {



    return (

        <main className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Breadcrumb title={"Criar"} patch={[
                    {
                        name: "Perfil de Clientes",
                        href: "/dash/customer-profile"
                    }
                ]} />
                <Button asChild className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    <a href="./customer-profile/new">Novo Registro</a>
                </Button>
            </div>
            <div className="bg-background rounded-lg shadow-sm">
                <FormCustomerProfile />
            </div>
        </main>
    )


}