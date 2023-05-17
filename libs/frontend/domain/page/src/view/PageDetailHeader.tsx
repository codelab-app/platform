import { EyeOutlined, ToolOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
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
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
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

  const appName = useMemo(
    () => (appId ? appService.app(appId)?.name : ''),
    [appId],
  )

  const pageName = useMemo(
    () => (currentPage?.id ? pageService.page(currentPage.id)?.name : ''),
    [currentPage],
  )

  const switchPreviewMode = () => {
    return router.push({
      pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
      query: router.query,
    })
  }

  const navigatePagesPanel = useCallback(async () => {
    await router.push({ pathname: PageType.PageList, query: router.query })
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
            { onClick: navigatePagesPanel, title: appName || '?' },
            { onClick: navigatePagesPanel, title: pageName || '?' },
          ]}
        />
      }
      logo={<img css={tw`w-full h-full`} src="/logo.png"></img>}
      toolbar={<HeaderToolbar items={toolbarItems} title="My Header Toolbal" />}
    />
  )
})
