'use client'

import { useState } from 'react'
import { Button } from "@/components/shadcn_ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn_ui/avatar"
import { BarChart, Bell, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Home, Menu, LogOut, Settings, Users, HelpCircle, PhoneCall, BookOpen, UserCheck, Hammer, ShieldOff, TableProperties  } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn_ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn_ui/tooltip"
import React from 'react'

const sidebarItems = [
  { icon: 'Home', label: 'Home', href: '#' },
  { icon: 'BarChart', label: 'Dashboard', href: '#' },
  { icon: 'Users', label: 'Usuários', href: '#' },
  {  
    icon: 'HelpCircle',
    label: 'Administracao',
    href: '#',
    subItems: [
      {icon: "TableProperties", label: 'Clientes', href: './dash/customer', }
    ]
  },
  { icon: 'Settings', label: 'Configurações', href: '#' },
  {
    icon: 'HelpCircle',
    label: 'Suporte',
    href: '#',
    subItems: [
      { icon: 'PhoneCall', label: 'Chamados', href: '#', },
      { icon: 'BookOpen', label: 'Assuntos', href: '#assuntos' },
      { icon: 'UserCheck', label: 'Analistas', href: '#analistas' },
    ]
  },
  {
    icon: 'Hammer',
    label: 'Ferramentas',
    href: '#',
    subItems: [
      { icon: 'ShieldOff', label: 'DNS RPZ', href: '#', },
    ]
  }
]

const iconComponents = {
  Home, BarChart, Users, Settings, HelpCircle, PhoneCall, BookOpen, UserCheck, Hammer, ShieldOff, TableProperties
}

const cardIcons = {
  0: { icon: Users, color: 'text-primary' },
  1: { icon: Users, color: 'text-success' },
  2: { icon: BarChart, color: 'text-warning' },
  3: { icon: BarChart, color: 'text-info' },
}

export default function SidebarAndHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
    setExpandedItems([])
  }
  
  const toggleItemExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    )
  }

  const renderSidebarContent = (isMobile = false) => {
    const renderItem = (item: any, isSubItem = false) => {
      const IconComponent = iconComponents[item.icon as keyof typeof iconComponents]
      const isExpanded = expandedItems.includes(item.label)
      const hasSubItems = item.subItems && item.subItems.length > 0

      return (
        <li key={item.label} className="relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-foreground hover:text-foreground hover:bg-secondary ${
                    isSidebarCollapsed && !isMobile ? 'px-2' : 'px-4'
                  } ${isSubItem ? 'pl-8' : ''}`}
                  onClick={() => {
                    if (hasSubItems) {
                      toggleItemExpand(item.label)
                    } else {
                      window.location.href = item.href
                      if (isMobile) setIsSheetOpen(false)
                    }
                  }}
                >
                  <IconComponent className={`h-5 w-5 ${isSidebarCollapsed && !isMobile ? 'mr-0' : 'mr-2'}`} />
                  {(!isSidebarCollapsed || isMobile) && (
                    <>
                      <span className="flex-grow text-left">{item.label}</span>
                      {hasSubItems && (
                        isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              {isSidebarCollapsed && !isMobile && (
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          {hasSubItems && isExpanded && (
            <ul 
              className={`mt-2 space-y-2 ${
                isSidebarCollapsed && !isMobile
                  ? 'absolute left-full top-0 ml-2 bg-card p-2 rounded-md shadow-lg z-50 min-w-[12rem]' 
                  : 'ml-4'
              }`}
            >
              {item.subItems.map((subItem: any) => (
                <li key={subItem.label}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:text-foreground hover:bg-secondary px-4"
                    onClick={() => {
                      window.location.href = subItem.href
                      if (isMobile) setIsSheetOpen(false)
                    }}
                  >
                    {React.createElement(iconComponents[subItem.icon as keyof typeof iconComponents], {
                      className: "h-5 w-5 mr-2"
                    })}
                    <span>{subItem.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </li>
      )
    }

    return (
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between">
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebarCollapse}
              className="ml-auto"
            >
              {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          )}
         
        </div>
        <div className="flex items-center p-2 justify-center mb-8">
            {(!isSidebarCollapsed || isMobile) && (
              <img src="/LogoIcon.png" alt="Logomarca Rocketseat" className="text-xl font-bold text-foreground w-[90px] h-auto" />
            )}
          </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {sidebarItems.map(item => renderItem(item))}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-foreground hover:text-foreground hover:bg-secondary ${
              isSidebarCollapsed && !isMobile ? 'px-2' : 'px-4'
            }`}
            onClick={() => isMobile && setIsSheetOpen(false)}
          >
            <LogOut className={`h-5 w-5 ${isSidebarCollapsed && !isMobile ? 'mr-0' : 'mr-2'}`} />
            {(!isSidebarCollapsed || isMobile) && <span>Sair</span>}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside 
        className={`fixed h-full bg-card transition-all duration-300 ease-in-out z-40 hidden lg:block
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        {renderSidebarContent()}
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card p-4 flex justify-between items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-card w-[18rem]">
              {renderSidebarContent(true)}
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
      </div>
    </div>
  )
}