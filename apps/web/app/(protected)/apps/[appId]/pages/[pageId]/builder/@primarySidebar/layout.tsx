'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import React from 'react'

/**
 * https://stackoverflow.com/questions/78254183/404-on-hard-navigation-with-parallel-routes-in-next-js-14-for-nested-route
 */
const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <>
      <nav>
        <Link href={`${pathname}/element`}>Elements Tree</Link>
        {/* <Link href="/state">State</Link> */}
      </nav>
      <div>{children}</div>
    </>
  )
}

export default Layout
