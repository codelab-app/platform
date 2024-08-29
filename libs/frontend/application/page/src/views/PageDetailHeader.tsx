'use client'

import EyeOutlined from '@ant-design/icons/EyeOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import {
  ExplorerPaneType,
  PageType,
  UiKey,
} from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import {
  useAppQuery,
  useCurrentComponent,
  usePageQuery,
} from '@codelab/frontend/presentation/container'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { type ReactNode, useCallback } from 'react'

interface IPageDetailHeaderProps {
  /**
   * Decouples `builder` from `page`
   */
  BuilderResizeMenu: ReactNode
}

export const PageDetailHeader = observer<IPageDetailHeaderProps>(
  ({ BuilderResizeMenu }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const component = useCurrentComponent()
    const isBuilder = currentPathname.endsWith('/builder')
    const { componentId } = useUrl()
    const { appId, appName } = useAppQuery()
    const { pageId } = usePageQuery()

    const isPageBuilder =
      currentPathname === PageType.PageBuilder({ appId, pageId })

    const componentName = component?.name || '?'

    const togglePreviewMode = () => {
      let path

      if (componentId) {
        path = isBuilder ? PageType.ComponentPreview : PageType.ComponentBuilder
        path = path.replace('[componentSlug]', componentId)
      } else if (appSlug && pageSlug) {
        path = isBuilder ? PageType.PageDetail : PageType.PageBuilder
        path = path
          .replace('[userSlug]', userSlug)
          .replace('[appSlug]', appSlug)
          .replace('[pageSlug]', pageSlug)
      }

      if (!path) {
        return
      }

      const url = queryString.stringifyUrl({
        query: { primarySidebarKey: ExplorerPaneType.Explorer },
        url: path,
      })

      return router.push(url)
    }

    const navigatePagesPanel = useCallback(async () => {
      const url = PageType.PageBuilder(
        {
          appId,
          pageId,
        },
        {
          primarySidebarKey: ExplorerPaneType.PageList,
        },
      )

      await router.push(url)
    }, [router])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList())
    }, [router])

    const toolbarItems: Array<ToolbarItem> = [
      isBuilder
        ? {
            cuiKey: UiKey.OpenPreviewBuilderToolbarItem,
            icon: <EyeOutlined />,
            onClick: togglePreviewMode,
            title: 'Preview',
          }
        : {
            cuiKey: UiKey.OpenBuilderBuilderToolbarItem,
            icon: <ToolOutlined />,
            onClick: togglePreviewMode,
            title: 'Builder',
          },
    ]

    const directionItems = pageName
      ? [
          { onClick: navigateAppsPage, title: appName },
          { title: 'Pages' },
          { onClick: navigatePagesPanel, title: pageName },
        ]
      : [
          { onClick: navigateAppsPage, title: appName },
          { title: 'Components' },
          { title: componentName },
        ]

    return (
      <CuiHeader
        centralArea={isPageBuilder ? <>{BuilderResizeMenu}</> : null}
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
  },
)
