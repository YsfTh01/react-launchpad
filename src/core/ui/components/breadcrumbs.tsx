import { clsx } from 'clsx'
import { Link, useLocation } from 'react-router'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  homeHref?: string
  homeLabel?: string
  showHome?: boolean
}

const DefaultSeparator = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-muted"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

export function Breadcrumbs({
  items = [],
  separator = <DefaultSeparator />,
  className,
  homeHref = '/',
  homeLabel = 'Home',
  showHome = true,
}: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: homeLabel, href: homeHref, icon: <HomeIcon /> }, ...items]
    : items

  if (allItems.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex items-center', className)}
    >
      <ol className="flex items-center gap-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <span className="mx-1">{separator}</span>}
              {isLast || !item.href ? (
                <span
                  className={clsx(
                    'flex items-center gap-1.5 text-sm',
                    isLast
                      ? 'font-medium text-text-primary'
                      : 'text-text-secondary'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span
                    className={
                      item.icon && index === 0 ? 'sr-only sm:not-sr-only' : ''
                    }
                  >
                    {item.label}
                  </span>
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
                >
                  {item.icon}
                  <span
                    className={
                      item.icon && index === 0 ? 'sr-only sm:not-sr-only' : ''
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  return pathSegments.map((segment: string, index: number) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      label,
      href: index === pathSegments.length - 1 ? undefined : href,
    }
  })
}
