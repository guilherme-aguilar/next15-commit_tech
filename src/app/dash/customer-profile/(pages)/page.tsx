import { Breadcrumb } from "@/components/custom/breadcrumb";
import { Button } from "@/components/shadcn_ui/button";
import { CustomerProfileTable } from "../components/table/table";



export default function Dashboard() {
    
    const urlNewRegister: string = process.env.FRONTEND_URL + "/dash" + "/customer-profile" + "/new";
    return (
        <main className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Breadcrumb title="Clientes" />
                <Button asChild className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    <a href={urlNewRegister}>Novo Registro</a>
                </Button>
            </div>
            <div className="bg-background rounded-lg shadow-sm">
                <CustomerProfileTable />
            </div>
        </main>
    );
}