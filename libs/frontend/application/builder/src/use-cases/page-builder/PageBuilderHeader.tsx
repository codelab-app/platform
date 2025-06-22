'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
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

export const PageBuilderHeader = observer<IPageDetailHeaderProps>(
  ({ app, BuilderResizeMenu, page }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.includes('/builder')

    const isPageList = currentPathname.includes(
      RoutePaths.Page.list({ appId: app.id, pageId: page.id }),
    )

    const togglePreviewMode = () => {
      const url = isBuilder
        ? RoutePaths.Page.base({ appId: app.id, pageId: page.id })
        : RoutePaths.Page.builder({ appId: app.id, pageId: page.id })

      return router.push(url)
    }

    const navigatePagesPanel = useCallback(async () => {
      const url = RoutePaths.Page.builder({
        appId: app.id,
        pageId: page.id,
      })

      await router.push(url)
    }, [router, app.id, page.id])

    const navigatePageList = useCallback(async () => {
      await router.push(
        RoutePaths.Page.list({ appId: app.id, pageId: page.id }),
      )
    }, [router, app.id, page.id])

    const navigateAppsPage = useCallback(async () => {
      await router.push(RoutePaths.App.list())
    }, [router])

    const directionItems = [
      { onClick: navigateAppsPage, title: app.name },
      { onClick: navigatePageList, title: 'Pages' },
      { onClick: navigatePagesPanel, title: isPageList ? null : page.name },
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
