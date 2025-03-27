import type { ReactNode } from 'react'

import Link from 'next/link'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Link href="/demo/a">A</Link>
      <Link href="/demo/b">B</Link>
      {children}
    </div>
  )
}

export default Layout
