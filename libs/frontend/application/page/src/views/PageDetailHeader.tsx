'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'
import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { Skeleton } from 'antd'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

interface IPageDetailHeaderProps {
  /**
   * Decouples `builder` from `page`
   */
  BuilderResizeMenu: ReactNode
  app: IAppModel
  page: IPageModel
}

export const PageDetailHeader = observer<IPageDetailHeaderProps>(
  ({ app, BuilderResizeMenu, page }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.includes('/builder')

    const togglePreviewMode = () => {
      const url = isBuilder
        ? PageType.PageDetail({ appId: app.id, pageId: page.id })
        : PageType.PageBuilder(
            { appId: app.id, pageId: page.id },
            PrimarySidebar.ElementTree,
          )

      return router.push(url)
    }

    const navigatePagesPanel = useCallback(async () => {
      const url = PageType.PageList({
        appId: app.id,
        pageId: page.id,
      })

      await router.push(url)
    }, [router])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList())
    }, [router])

    const directionItems = [
      { onClick: navigateAppsPage, title: app.name },
      { title: 'Pages' },
      { onClick: navigatePagesPanel, title: page.name },
    ]

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
