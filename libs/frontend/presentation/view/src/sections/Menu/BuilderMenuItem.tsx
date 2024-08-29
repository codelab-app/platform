import BuildOutlined from '@ant-design/icons/BuildOutlined'
import {
  type ComponentContextParams,
  ExplorerPaneType,
  type PageContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import React from 'react'

export const pageBuilderMenuItem = (
  params?: ComponentContextParams | PageContextParams,
): NavigationBarItem => {
  const disabledBuilderMenuItem = {
    disabled: true,
    icon: <BuildOutlined title="Builder" />,
    key: ExplorerPaneType.Explorer,
    link: undefined,
    title: 'Builder',
  }

  if (!params) {
    return disabledBuilderMenuItem
  }

  if ('appId' in params) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: PageType.PageBuilder(
          { appId: params.appId, pageId: params.pageId },
          { primarySidebarKey: ExplorerPaneType.Explorer },
        ),
      },
    }
  }

  if ('componentId' in params) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: PageType.ComponentBuilder(
          { componentId: params.componentId },
          {
            primarySidebarKey: ExplorerPaneType.Explorer,
          },
        ),
      },
    }
  }

  return disabledBuilderMenuItem
}
