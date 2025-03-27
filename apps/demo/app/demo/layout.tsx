import type { ReactNode } from 'react'

const Layout = ({
  children,
  footer,
  header,
  sidebar,
}: {
  children: ReactNode
  sidebar: ReactNode
  footer: ReactNode
  header: ReactNode
}) => {
  return (
    <div>
      {header}
      {sidebar}
      {children}
      {footer}
    </div>
  )
}

export default Layout
