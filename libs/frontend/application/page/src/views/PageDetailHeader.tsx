'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import {
  useCurrentApp,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { Skeleton } from 'antd'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

type IPageDetailHeaderProps = PageContextParams & {
  /**
   * Decouples `builder` from `page`
   */
  BuilderResizeMenu: ReactNode
}

export const PageDetailHeader = observer<IPageDetailHeaderProps>(
  ({ appId, BuilderResizeMenu, pageId }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.includes('/builder')
    const app = useCurrentApp()
    const page = useCurrentPage()

    const togglePreviewMode = () => {
      const url = isBuilder
        ? PageType.PageDetail({ appId, pageId })
        : PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)

      return router.push(url)
    }

    const navigatePagesPanel = useCallback(async () => {
      const url = PageType.PageList({
        appId,
        pageId,
      })

      await router.push(url)
    }, [router])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList())
    }, [router])

    const directionItems =
      app && page
        ? [
            { onClick: navigateAppsPage, title: app.name },
            { title: 'Pages' },
            { onClick: navigatePagesPanel, title: page.name },
          ]
        : [{ title: <Skeleton /> }]

    return (
      <DetailHeader
        BuilderResizeMenu={BuilderResizeMenu}
        directionItems={directionItems}
        isBuilder={isBuilder}
        togglePreviewMode={togglePreviewMode}
      />
    )
  },
)
