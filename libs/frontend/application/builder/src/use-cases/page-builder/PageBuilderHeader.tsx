'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import { NewRoutePaths } from '@codelab/frontend/abstract/application'
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

    const togglePreviewMode = () => {
      const url = isBuilder
        ? NewRoutePaths.Page.base({ appId: app.id, pageId: page.id })
        : NewRoutePaths.Page.builder({ appId: app.id, pageId: page.id })

      return router.push(url)
    }

    const navigatePagesPanel = useCallback(async () => {
      const url = NewRoutePaths.Page.list({
        appId: app.id,
        pageId: page.id,
      })

      await router.push(url)
    }, [router, app.id, page.id])

    const navigateAppsPage = useCallback(async () => {
      await router.push(NewRoutePaths.App.list())
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
