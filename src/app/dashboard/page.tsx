'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn_ui/card";
import { Users, BarChart } from 'lucide-react';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [randomValues, setRandomValues] = useState<number[]>([]);

    useEffect(() => {
        const values = Array.from({ length: 4 }, () => Math.floor(Math.random() * 1000));
        setRandomValues(values);
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {['Total de Usuários', 'Novos Usuários', 'Vendas', 'Receita'].map((title, index) => (
                    <Card key={index} className="bg-[#202024] border-[#323238]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-[#E1E1E6]">{title}</CardTitle>
                            {/* Ícones */}
                            {index === 0 && <Users className="h-4 w-4 text-[#8257E5]" />}
                            {index === 1 && <Users className="h-4 w-4 text-[#02C59B]" />}
                            {index === 2 && <BarChart className="h-4 w-4 text-[#FBA94C]" />}
                            {index === 3 && <BarChart className="h-4 w-4 text-[#996DFF]" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {randomValues[index] ?? '...'}
                            </div>
                            <p className="text-xs text-[#8D8D99]">+20.1% em relação ao mês passado</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
