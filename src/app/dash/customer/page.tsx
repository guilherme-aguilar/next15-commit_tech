import { Button } from "@/components/shadcn_ui/button";
import { CustomerTable } from "./components/table/table";

export default function Dashboard() {
    return (
        <main className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Clientes
                    </h1>
                    <nav className="flex items-center gap-2 mt-2">
                       <a href="../"> <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            Dashboard
                        </span></a>
                        <span className="text-sm text-muted-foreground">/</span>
                        <span className="text-sm font-medium text-foreground">
                            Clientes
                        </span>
                    </nav>
                </div>
                <Button className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Novo Registro
                </Button>
            </div>
            <div className="bg-background rounded-lg shadow-sm">
                <CustomerTable />
            </div>
        </main>
    );
}