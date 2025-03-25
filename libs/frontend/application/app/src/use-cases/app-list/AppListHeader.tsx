'use client'

import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { getUiDataLabel, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { useRouter } from 'next/navigation'

export const AppListHeader = () => {
  const router = useRouter()

  const toolbarItems: Array<ToolbarItem> = [
    {
      ariaLabel: getUiDataLabel(UiKey.AppToolbarItemImport),
      cuiKey: UiKey.AppToolbarItemImport,
      icon: <ImportOutlined />,
      onClick: () => router.push(RoutePaths.AppImport()),
      title: 'Import an app',
    },
    {
      ariaLabel: getUiDataLabel(UiKey.AppToolbarItemCreate),
      cuiKey: UiKey.AppToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: () => router.push(RoutePaths.AppCreate()),
      title: 'Create an App',
    },
    {
      ariaLabel: getUiDataLabel(UiKey.UserToolbarItemSignOut),
      cuiKey: UiKey.UserToolbarItemSignOut,
      icon: <LogoutOutlined />,
      onClick: () => {
        // redirect to /auth/logout
        window.location.href = '/auth/logout'
      },
      title: 'Sign Out',
    },
  ]

  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Apps' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar items={toolbarItems} title="My Header Toolbar" />
      }
    />
  )
}
