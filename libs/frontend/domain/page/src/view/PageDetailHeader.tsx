import { EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPage,
  useStore,
} from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import tw from 'twin.macro'
import { BuilderSizeMenu } from './BuilderSizeMenu'

export const PageDetailHeader = observer(() => {
  const { appService } = useStore()
  const router = useRouter()
  const appId = useCurrentAppId()
  const { pageName: currentPageName } = useCurrentPage()
  const isBuilder = router.pathname === PageType.PageBuilder

  console.log('app id: ', appId, currentPageName)

  const appName = appService.app(appId)?.name || '?'
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
        appId,
        explorerPaneKey: ExplorerPaneType.PageList,
        pageName,
        primarySidebarKey: ExplorerPaneType.PageList,
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
