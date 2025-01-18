'use client'

import { DataTable } from '@/components/shadcn_ui/data-table'
import { getCustomers } from '../../lib/api'
import { CustomerColumns } from './columns'
import { Suspense, useEffect, useState } from 'react'
import type { ICustomerEntity } from "@/_domain/interfaces/customer/entity";

export function CustomerTable() {
  const [data, setData] = useState<ICustomerEntity[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomers()
      setData(response.data)
    }

    fetchData()
  }, [])

  return <Suspense fallback={<div>Loading...</div>}>
    <DataTable 
      columns={CustomerColumns} 
      data={data} 
      filterColumn='name'
      initialSorting={[{ id: 'createdAt', desc: false }]}
      
    />
  </Suspense>
}
