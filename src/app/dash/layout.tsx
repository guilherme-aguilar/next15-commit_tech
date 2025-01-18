'use client'

import SidebarAndHeader from "@/components/navigation";
import { Toaster } from "@/components/shadcn_ui/toaster";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarAndHeader>
        {children}
      </SidebarAndHeader>
      <Toaster />
    </>
  )
}