'use client'

import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiDataRecord, UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { useCreateAppModal } from '../create-app/create-app.state'
import { ImportAppDialog } from '../import-app'

export const AppListHeader = () => {
  const createAppModal = useCreateAppModal()

  const toolbarItems: Array<ToolbarItem> = [
    {
      ariaLabel: UiDataRecord.ImportAppToolbarItem.label,
      cuiKey: UiKey.ImportAppToolbarItem,
      icon: <ImportAppDialog key={0} />,
      title: 'Import an app',
    },
    {
      ariaLabel: UiDataRecord.CreateAppToolbarItem.label,
      cuiKey: UiKey.CreateAppToolbarItem,
      icon: <PlusOutlined />,
      onClick: () => createAppModal.open(),
      title: 'Create an App',
    },
    {
      ariaLabel: UiDataRecord.SignOutUserToolbarItem.label,
      cuiKey: UiKey.SignOutUserToolbarItem,
      icon: <LogoutOutlined />,
      onClick: () => {
        // redirect to /api/auth/logout
        window.location.href = '/api/auth/logout'
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
