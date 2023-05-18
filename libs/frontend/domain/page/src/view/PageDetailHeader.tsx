import { EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import tw from 'twin.macro'
import { BuilderSizeMenu } from './BuilderSizeMenu'

export const PageDetailHeader = observer(() => {
  const { appService, pageService } = useStore()
  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const pagesList = pageService.pagesByApp(appId)
  const currentPage = pagesList.find((page) => page.id === pageId)
  const isBuilder = router.pathname === PageType.PageBuilder

  console.log('app id: ', appId)

  const appName = appService.app(appId)?.name || '?'
  const pageName = currentPage?.name || '?'

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
        pageId,
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
    <Header
      centralArea={isBuilder ? <BuilderSizeMenu /> : null}
      direction={
        <HeaderBreadcrumb
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
      toolbar={<HeaderToolbar items={toolbarItems} title="My Header Toolbal" />}
    />
  )
})
