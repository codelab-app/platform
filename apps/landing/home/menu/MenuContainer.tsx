import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import type { StatusCode } from 'react-stickynode'
import Sticky from 'react-stickynode'

export const CodelabMenuContainer = ({ children }: PropsWithChildren<any>) => {
  // 0 STATUS_ORIGINAL
  // 1 STATUS_RELEASED
  // 2 STATUS_FIXED
  const [stickyStatus, setStickyStatus] = useState<StatusCode>(0)
  const showStickyHeader = stickyStatus === 2

  return (
    <Sticky
      activeClass="shadow"
      enabled={true}
      innerZ={50}
      onStateChange={({ status }) => {
        setStickyStatus(status)
      }}
      top={0}
    >
      <div className={`z-50 m-0 bg-white p-0 ${showStickyHeader && 'shadow'}`}>
        <div className="mx-auto xl:container">{children}</div>
      </div>
    </Sticky>
  )
}

export const menuItems = [
  {
    href: '/',
    title: 'Features',
  },
  {
    href: '/',
    title: 'Docs',
  },
  {
    href: '/pricing',
    title: 'Pricing',
  },
  {
    href: '/tutorials',
    title: 'Tutorials',
  },
]
