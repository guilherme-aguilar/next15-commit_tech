interface BreadcrumbProps {
  title: string,
  patch?: {
    name: string,
    href: string
  }[]
}

export function Breadcrumb({
  title,
  patch
}: BreadcrumbProps
) {
  const previousPage = "Home"

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>
      <nav className="flex items-center gap-2 mt-2">
        <a href="/"> <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          {previousPage}
        </span></a>
        {patch ? patch.map((item: { name: string, href: string }, index: number) => (
          <div key={`path-${index}`}>
            <span className="text-sm text-muted-foreground">/</span>
            <a href={item.href}>
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                &nbsp;{item.name}
              </span>
            </a>
          </div>
        )) : null}
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium text-foreground">
          {title}
        </span>
      </nav>
    </div>
  )
}