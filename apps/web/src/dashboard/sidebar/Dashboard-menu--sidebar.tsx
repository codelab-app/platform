import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Page } from '@codelab/frontend'

const MenuItemApps = (props: any) => {
  const content = <Link href={Page.APP_LIST.url}>Apps</Link>

  return (
    <Menu.Item
      {...props}
      key="1"
      icon={
        <Popover content={content} trigger="click" placement="right">
          <AppstoreOutlined />
        </Popover>
        // <Link href={Page.APP_LIST.url}>
        //   <AppstoreOutlined />
        // </Link>
      }
    >
      {/* Apps */}
    </Menu.Item>
  )
}

const MenuItemPages = (props: any) => {
  const router = useRouter()

  return (
    <Menu.Item
      {...props}
      key="2"
      icon={
        <Link
          href={{
            pathname: Page.PAGE_LIST.url,
            query: { appId: router.query.appId },
          }}
        >
          <CopyOutlined />
        </Link>
      }
    >
      Pages
    </Menu.Item>
  )
}

export const DashboardMenuSidebar = () => {
  return (
    <Menu
      mode="inline"
      // inlineCollapsed
      // activeKey="1"
      // openKeys={openKeys}
      // onOpenChange={onOpenChange}
      style={{ height: '100%', width: '100%' }}
    >
      <MenuItemApps />
      <MenuItemPages />
    </Menu>
  )
}
