import { PageType } from '@codelab/frontend/abstract/types'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { sidebarWidth } from '../Dashboard/constants'
import { commonSidebarItems } from './commonSidebarItems'

export const SidebarNavigation = () => {
  const router = useRouter()

  return (
    <>
      <Menu
        defaultOpenKeys={[]}
        defaultSelectedKeys={[PageType.AppList]}
        items={commonSidebarItems}
        mode="inline"
        selectedKeys={[router.pathname]}
        style={{
          width: `${sidebarWidth}px`,
          // height: fullHeight ? '100%' : undefined,
          // maxHeight: '100vh',
        }}
      />
      {/* <Menu */}
      {/*  defaultOpenKeys={[]} */}
      {/*  defaultSelectedKeys={[PageType.AppList]} */}
      {/*  items={items} */}
      {/*  mode="inline" */}
      {/*  selectedKeys={[router.pathname]} */}
      {/*  style={{ */}
      {/*    width: `${sidebarWidth}px`, */}
      {/*    // height: fullHeight ? '100%' : undefined, */}
      {/*    maxHeight: '100vh', */}
      {/*  }} */}
      {/*/ > */}
    </>
  )
}
