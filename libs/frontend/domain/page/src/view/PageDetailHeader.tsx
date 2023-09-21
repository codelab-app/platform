import { EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import {
  useAppQuery,
  useCurrentApp,
  useCurrentComponent,
  useCurrentPage,
  usePageQuery,
  useUserQuery,
} from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { BuilderSizeMenu } from './BuilderSizeMenu'

export const PageDetailHeader = observer(() => {
  const router = useRouter()
  const { componentName: currentComponentName } = useCurrentComponent()
  const isComponentBuilder = router.pathname === PageType.ComponentBuilder
  const isComponentPreview = router.pathname === PageType.ComponentPreview
  const isPageBuilder = router.pathname === PageType.PageBuilder
  const isPagePreview = router.pathname === PageType.PageDetail
  const { appName, appSlug } = useAppQuery()
  const { pageName, pageSlug } = usePageQuery()
  const { userSlug } = useUserQuery()
  const componentName = currentComponentName || '?'

  const switchPreviewMode = () => {
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

    return router.push({
      pathname,
      query: router.query,
    })
  }

  const navigatePagesPanel = useCallback(async () => {
    await router.push({
      pathname: PageType.PageBuilder,
      query: {
        appSlug,
        pageSlug,
        primarySidebarKey: ExplorerPaneType.PageList,
        userSlug,
      },
    })
  }, [router])

  const navigateAppsPage = useCallback(async () => {
    await router.push({ pathname: PageType.AppList })
  }, [router])

  const toolbarItems: Array<ToolbarItem> = [
    {
      icon:
        isPageBuilder || isComponentBuilder ? (
          <EyeOutlined />
        ) : (
          <ToolOutlined />
        ),
      key: '1',
      onClick: switchPreviewMode,
      title: isPageBuilder || isComponentBuilder ? 'Preview' : 'Builder',
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
          className="h-full w-full"
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
