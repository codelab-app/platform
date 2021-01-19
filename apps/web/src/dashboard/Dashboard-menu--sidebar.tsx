import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { APP_LIST_PAGE, PAGE_LIST_PAGE } from '@codelab/frontend'

export const DashboardMenuSidebar = () => {
  const router = useRouter()

  return (
    <Menu
      mode="inline"
      inlineCollapsed
      // activeKey="1"
      // openKeys={openKeys}
      // onOpenChange={onOpenChange}
      style={{ height: '100%' }}
    >
      <Menu.Item
        key="1"
        icon={
          <Link href={APP_LIST_PAGE.url}>
            <AppstoreOutlined />
          </Link>
        }
        // style={disableSidebarMenuHoverEffects}
      >
        Apps
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={
          <Link
            href={{
              pathname: PAGE_LIST_PAGE.url,
              query: { appId: router.query.appId },
            }}
          >
            <CopyOutlined />
          </Link>
        }
        // style={disableSidebarMenuHoverEffects}
      >
        Pages
      </Menu.Item>
    </Menu>
  )
}
