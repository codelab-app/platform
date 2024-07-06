'use client'

import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ImportAppDialog } from '../use-cases/import-app'

export const AppsViewHeader = observer(() => {
  const { appService } = useStore()

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.ImportApp.key,
      icon: <ImportAppDialog key={0} />,
      title: 'Import an app',
    },
    {
      cuiKey: MODEL_ACTION.CreateApp.key,
      icon: <PlusOutlined />,
      onClick: () => appService.createModal.open(),
      title: 'Create an App',
    },
    {
      cuiKey: MODEL_ACTION.SignOutUser.key,
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
})
