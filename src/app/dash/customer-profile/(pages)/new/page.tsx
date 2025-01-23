'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { RequestPermissionSchemas } from "../../schemas/schema"
import { ActionEnum, SubjectEnum, AccountTypeWithoutOwnerEnum } from "@/_domain/adapters/constants/permissionTypes"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn_ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn_ui/form"
import { Input } from "@/components/shadcn_ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn_ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn_ui/table"
import { Button } from "@/components/shadcn_ui/button"
import { Switch } from "@/components/shadcn_ui/switch"
import { Breadcrumb } from "@/components/custom/breadcrumb"

type FormValues = z.infer<typeof RequestPermissionSchemas>



function FormCustomerProfile() {

    const form = useForm<FormValues>({
        resolver: zodResolver(RequestPermissionSchemas),
        defaultValues: {
            name: '',
            role: 'tenant',
            permissions: Object.values(SubjectEnum).reduce((acc, subject) => {
                Object.values(ActionEnum).forEach(action => {
                    acc[`${action}_${subject.value}`] = false
                })
                return acc
            }, {} as any),
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
        toast({
            title: "Perfil de permissões criado",
            description: "O perfil de permissões foi criado com sucesso.",
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Criar Perfil de Permissões</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Perfil</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do perfil" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Função</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma função" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(AccountTypeWithoutOwnerEnum).map(([key, value]) => (
                                                <SelectItem key={value} value={value}>
                                                    {key}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <h3 className="text-lg font-medium mb-4">Permissões</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Permissões</TableHead>
                                        <TableHead className="text-center w-[100px]">Visualizar</TableHead>
                                        <TableHead className="text-center w-[100px]">Atualizar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(SubjectEnum).map((subject) => (
                                        <TableRow key={subject.value}>
                                            <TableCell>
                                                <div className="font-medium">{subject.displayName}</div>
                                                <div className="pt-1 text-xs text-muted-foreground">{subject.description}</div>
                                            </TableCell>
                                            {Object.values(ActionEnum).map((action) => (
                                                <TableCell key={`${action}_${subject.value}`} className="text-center">
                                                    <FormField
                                                        control={form.control}
                                                        //@ts-ignore
                                                        name={`permissions.${action}_${subject.value}`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Switch
                                                                        //@ts-ignore
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        aria-label={`${action} permission for ${subject.displayName}`}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <Button type="submit">Criar Perfil de Permissões</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default function PermissionTableForm() {



    return (

        <main className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Breadcrumb title="Perfil de Clientes" />
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