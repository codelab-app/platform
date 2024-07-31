'use client'

import EyeOutlined from '@ant-design/icons/EyeOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import {
  ExplorerPaneType,
  MODEL_ACTION,
  PageType,
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
  useUserQuery,
} from '@codelab/frontend/presentation/container'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { type ElementType, useCallback } from 'react'

interface IPageDetailHeaderProps {
  BuilderResizeMenu: ElementType
}

export const PageDetailHeader = observer<IPageDetailHeaderProps>(
  ({ BuilderResizeMenu }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const component = useCurrentComponent()
    const isBuilder = currentPathname.endsWith('/builder')
    const isPageBuilder = currentPathname === PageType.PageBuilder
    const { componentSlug } = useUrl()
    const { appName, appSlug } = useAppQuery()
    const { pageName, pageSlug } = usePageQuery()
    const { userSlug } = useUserQuery()
    const componentName = component?.name || '?'

    const togglePreviewMode = () => {
      let path

      if (componentSlug) {
        path = isBuilder ? PageType.ComponentPreview : PageType.ComponentBuilder
        path = path.replace('[componentSlug]', componentSlug)
      } else if (userSlug && appSlug && pageSlug) {
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
      const url = queryString.stringifyUrl({
        query: {
          appSlug,
          pageSlug,
          primarySidebarKey: ExplorerPaneType.PageList,
          userSlug,
        },
        url: PageType.PageBuilder,
      })

      await router.push(url)
    }, [router])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList)
    }, [router])

    const toolbarItems: Array<ToolbarItem> = [
      isBuilder
        ? {
            cuiKey: MODEL_ACTION.OpenPreviewBuilder.key,
            icon: <EyeOutlined />,
            onClick: togglePreviewMode,
            title: 'Preview',
          }
        : {
            cuiKey: MODEL_ACTION.OpenBuilderBuilder.key,
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
        centralArea={isPageBuilder ? <BuilderResizeMenu /> : null}
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
