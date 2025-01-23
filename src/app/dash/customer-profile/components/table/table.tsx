'use client'

import type { ICustomerProfileEntity } from '@/_domain/interfaces/customer-profile/entity'
import { DataTable } from '@/components/shadcn_ui/data-table'
import { Suspense, useEffect, useState } from 'react'
import { CustomerProfileColumns } from './columns'
import { findAllCustomerProfile } from '../../lib/findCustomerProfile'

export function CustomerProfileTable() {
  const [data, setData] = useState<ICustomerProfileEntity[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      const response = await findAllCustomerProfile()
      setData(response.data)
    }

    fetchData()
  }, [])

  return <Suspense fallback={<div>Loading...</div>}>
    <DataTable 
      columns={CustomerProfileColumns} 
      data={data} 
      filterColumn='name'
      
    />
  </Suspense>
}
