'use client'

import SidebarAndHeader from "@/components/navigation";



export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <>
    <SidebarAndHeader >
      {children}
    </SidebarAndHeader>
    </>
  )
}