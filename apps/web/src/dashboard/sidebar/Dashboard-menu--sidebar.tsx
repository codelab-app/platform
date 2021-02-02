import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Page } from '@codelab/frontend'

const MenuItemApps = (props: any) => (
  <Menu.Item
    {...props}
    key="1"
    icon={
      <Link href={Page.APP_LIST.url}>
        <AppstoreOutlined />
      </Link>
    }
  >
    Apps
  </Menu.Item>
)

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
      style={{ height: '100%' }}
    >
      <MenuItemApps />
      <MenuItemPages />
    </Menu>
  )
}
