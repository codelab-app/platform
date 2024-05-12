import EyeOutlined from '@ant-design/icons/EyeOutlined'
import ToolOutlined from '@ant-design/icons/lib/icons/ToolOutlined'
import ReloadOutlined from '@ant-design/icons/ReloadOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
  type HeaderBreadcrumbItem,
  type ToolbarItem,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { type ReactNode } from 'react'

interface DetailHeaderProps {
  BuilderResizeMenu: ReactNode
  directionItems: Array<HeaderBreadcrumbItem>
  isBuilder: boolean
  reloadRenderer(): void
  togglePreviewMode(): void
}

export const DetailHeader = ({
  BuilderResizeMenu,
  directionItems,
  isBuilder,
  reloadRenderer,
  togglePreviewMode,
}: DetailHeaderProps) => {
  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.BuilderToolbarItemReload,
      icon: <ReloadOutlined />,
      onClick: reloadRenderer,
      title: 'Reload app',
    },
    isBuilder
      ? {
          cuiKey: UiKey.BuilderToolbarItemOpenPreview,
          icon: <EyeOutlined />,
          onClick: togglePreviewMode,
          title: 'Preview',
        }
      : {
          cuiKey: UiKey.BuilderToolbarItemOpenBuilder,
          icon: <ToolOutlined />,
          onClick: togglePreviewMode,
          title: 'Builder',
        },
  ]

  return (
    <CuiHeader
      centralArea={isBuilder ? <>{BuilderResizeMenu}</> : null}
      direction={<CuiHeaderBreadcrumb items={directionItems} />}
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
