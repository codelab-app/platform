import 'server-only'
import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/client-components'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/client-components'
import { Image } from 'antd'
import React from 'react'

const AppsHeader = () => {
  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.ImportApp.key,
      //  icon: <ImportAppDialog key={0} />,
      icon: <PlusOutlined />,
      title: 'Import an app',
    },
    {
      cuiKey: MODEL_ACTION.CreateApp.key,
      icon: <PlusOutlined />,
      title: 'Create an App',
    },
    {
      cuiKey: MODEL_ACTION.SignOutUser.key,
      icon: <LogoutOutlined />,
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
      toolbar={<CuiHeaderToolbar items={toolbarItems} />}
    />
  )
}

export default AppsHeader
