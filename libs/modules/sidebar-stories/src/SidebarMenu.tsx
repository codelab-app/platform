import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  APP_LIST_PAGE,
  PAGE_LIST_PAGE,
  disableSidebarMenuHoverEffects,
} from '@codelab/frontend'

type AppSidebarProps = {
  // onCollapse: any
}

export const SidebarMenu = (props: AppSidebarProps) => {
  const router = useRouter()

  const [openKeys, setOpenKeys] = React.useState(['sub1'])

  const onOpenChange = (keys: Array<React.Key>) => {
    const latestOpenKey = keys.find(
      (key) => openKeys.indexOf(key.toString()) === -1,
    ) as string

    // if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //   setOpenKeys(keys as Array<string>)
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    // }
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ height: '100%' }}
    >
      <Menu.Item
        key="1"
        icon={
          <Link href={APP_LIST_PAGE.url}>
            <AppstoreOutlined />
          </Link>
        }
        style={disableSidebarMenuHoverEffects}
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
        style={disableSidebarMenuHoverEffects}
      >
        Pages
      </Menu.Item>
    </Menu>
  )
}
