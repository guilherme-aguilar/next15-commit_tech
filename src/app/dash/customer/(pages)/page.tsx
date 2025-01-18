import { Button } from "@/components/shadcn_ui/button";
import { CustomerTable } from "../components/table/table";
import { Breadcrumb } from "@/components/custom/breadcrumb";


export default function Dashboard() {
    return (
        <main className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Breadcrumb title="Clientes" />
                <Button asChild className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    <a href="./customer/new">Novo Registro</a>
                </Button>
            </div>
            <div className="bg-background rounded-lg shadow-sm">
                <CustomerTable />
            </div>
        </main>
    );
}