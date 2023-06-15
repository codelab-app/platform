import { EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentApp,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import tw from 'twin.macro'
import { BuilderSizeMenu } from './BuilderSizeMenu'

export const PageDetailHeader = observer(() => {
  const router = useRouter()
  const { appName: currentAppName, appSlug, userName } = useCurrentApp()
  const { pageName: currentPageName, pageSlug } = useCurrentPage()
  const isBuilder = router.pathname === PageType.PageBuilder
  const appName = currentAppName || '?'
  const pageName = currentPageName || '?'

  const switchPreviewMode = () => {
    return router.push({
      pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
      query: router.query,
    })
  }

  const navigatePagesPanel = useCallback(async () => {
    await router.push({
      pathname: PageType.PageBuilder,
      query: {
        appSlug,
        explorerPaneKey: ExplorerPaneType.PageList,
        pageSlug,
        primarySidebarKey: ExplorerPaneType.PageList,
        userName,
      },
    })
  }, [router])

  const navigateAppsPage = useCallback(async () => {
    await router.push({ pathname: PageType.AppList })
  }, [router])

  const toolbarItems: Array<ToolbarItem> = [
    {
      icon: isBuilder ? <EyeOutlined /> : <ToolOutlined />,
      key: '1',
      onClick: switchPreviewMode,
      title: isBuilder ? 'Preview' : 'Builder',
    },
  ]

  return (
    <CuiHeader
      centralArea={isBuilder ? <BuilderSizeMenu /> : null}
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { onClick: navigateAppsPage, title: appName },
            { title: 'Pages' },
            { onClick: navigatePagesPanel, title: pageName },
          ]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar items={toolbarItems} title="My Header Toolbal" />
      }
    />
  )
})
