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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { useCallback } from 'react'
import { BuilderSizeMenu } from './BuilderSizeMenu'

export const PageDetailHeader = observer(() => {
  const router = useRouter()
  const component = useCurrentComponent()
  const isComponentBuilder = router.pathname === PageType.ComponentBuilder
  const isComponentPreview = router.pathname === PageType.ComponentPreview
  const isPageBuilder = router.pathname === PageType.PageBuilder
  const isPagePreview = router.pathname === PageType.PageDetail
  const { appName, appSlug } = useAppQuery()
  const { pageName, pageSlug } = usePageQuery()
  const { userSlug } = useUserQuery()
  const componentName = component?.name || '?'

  const togglePreviewMode = () => {
    let pathname

    if (isComponentPreview) {
      pathname = PageType.ComponentBuilder
    }

    if (isComponentBuilder) {
      pathname = PageType.ComponentPreview
    }

    if (isPagePreview) {
      pathname = PageType.PageBuilder
    }

    if (isPageBuilder) {
      pathname = PageType.PageDetail
    }

    if (!pathname) {
      return
    }

    const url = queryString.stringifyUrl({
      query,
      url: pathname,
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

  // Check if we are in preview or not
  const isBuilder = isPageBuilder || isComponentBuilder

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
      centralArea={isPageBuilder ? <BuilderSizeMenu /> : null}
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
})
