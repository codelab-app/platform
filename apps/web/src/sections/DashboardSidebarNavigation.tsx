import {
  AppstoreOutlined,
  BlockOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/shared'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

export const DashboardSidebarNavigation = () => {
  const router = useRouter()

  // const paths = router.pathname
  //   .split('/')
  //   .filter((x) => x)
  //   .reduce((x, acc) => {
  //     console.log(x)
  //   })

  return (
    <Menu
      css={tw`w-full h-full`}
      defaultSelectedKeys={[PageType.LibraryList]}
      selectedKeys={[router.pathname]}
      defaultOpenKeys={[]}
      style={{ width: '40px' }}
      mode="inline"
    >
      <Menu.Item
        key={PageType.AppList}
        icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
      >
        <Link href={PageType.AppList}>Apps</Link>
      </Menu.Item>
      <Menu.Item
        key={PageType.Atom}
        icon={
          <DeploymentUnitOutlined
            data-testid="atom-tab-trigger"
            title="Atoms"
          />
        }
      >
        <Link href={PageType.Atom}>Atoms</Link>
      </Menu.Item>
      <Menu.Item key={PageType.Type} icon={<BlockOutlined title="Types" />}>
        <Link href={PageType.Type}>Types</Link>
      </Menu.Item>
      {/* <Menu.Item
        key={PageType.AppList}
        icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
      >
        <Link href={PageType.AppList}>Apps</Link>
      </Menu.Item> */}
    </Menu>
  )
}
