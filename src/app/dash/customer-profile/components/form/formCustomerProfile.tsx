'use client'

import { AccountTypeWithoutOwnerEnum, ActionEnum, SubjectEnum } from "@/_domain/adapters/constants/permissionTypes"
import { Button } from "@/components/shadcn_ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn_ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn_ui/form"
import { Input } from "@/components/shadcn_ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn_ui/select"
import { Switch } from "@/components/shadcn_ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn_ui/table"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { SubmitInsertCustomerProfile } from "../../lib/insertCustomerProfile"
import { RequestPermissionSchemas, type FormData } from "../../schemas/schema"
import { useParams, useRouter } from 'next/navigation'
import { SubmitUpdateCustomerProfile } from "../../lib/updateCustomerProfile"

type FormValues = z.infer<typeof RequestPermissionSchemas>

export function FormCustomerProfile({ data }: {
  data?: FormData
}) {

  const { id } = useParams()
  const router = useRouter()

  console.log(data)
  const form = useForm<FormValues>({
    resolver: zodResolver(RequestPermissionSchemas),
    defaultValues: {
      name: data?.name ?? '',
      role: data?.role ? (data?.role !== "owner" ? data?.role : undefined) : undefined,
      permissions: data?.permissions
        ? data.permissions.reduce((acc, perm) => {
          acc[`${perm.action}_${perm.subject}`] = true;
          return acc;
        }, Object.values(SubjectEnum).reduce((acc, subject) => {
          Object.values(ActionEnum).forEach(action => {
            acc[`${action}_${subject.value}`] = false;
          });
          return acc;
        }, {} as any))
        : Object.values(SubjectEnum).reduce((acc, subject) => {
          Object.values(ActionEnum).forEach(action => {
            acc[`${action}_${subject.value}`] = false;
          });
          return acc;
        }, {} as any),
    },
  })

  const onSubmit = async (formData: FormValues) => {

    console.log(formData)

    try {
      data ?
        await SubmitUpdateCustomerProfile(id as string, formData) :
        await SubmitInsertCustomerProfile(formData)
      toast({
        title: data ? "Perfil de permissões atualizado" : "Perfil de permissões criado",
        description: data ? "O perfil de permissões foi atualizado com sucesso." : "O perfil de permissões foi criado com sucesso.",
      })

      router.push('/dash/customer-profile')

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error instanceof Error ? error.message : data ? "Erro ao atualizar perfil de permissões" : "Erro ao criar perfil de permissões",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{data ? "Atualizar" : "Criar"} Perfil de Permissões</CardTitle>
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

            {
              data ? null : (
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
              )
            }

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
            <Button type="submit">{data ? "Atualizar" : "Criar"} Perfil de Permissões</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}