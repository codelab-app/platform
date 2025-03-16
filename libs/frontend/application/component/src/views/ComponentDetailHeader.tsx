'use client'

import type {
  IAppModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'

import {
  type ComponentContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

interface IComponentDetailHeaderProps {
  BuilderResizeMenu: ReactNode
  app?: IAppModel
  /**
   * Decouples `builder` from `page`
   */
  component: IComponentModel
}

export const ComponentDetailHeader = observer<IComponentDetailHeaderProps>(
  ({ app, BuilderResizeMenu, component }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.endsWith('/builder')

    const togglePreviewMode = () => {
      const url = isBuilder
        ? PageType.ComponentPreview({ componentId: component.id })
        : PageType.ComponentBuilder({ componentId: component.id })

      return router.push(url)
    }

    const navigateComponentsPanel = useCallback(async () => {
      const url = PageType.ComponentBuilder({
        componentId: component.id,
      })

      await router.push(url)
    }, [router, component.id])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList())
    }, [router])

    // TODO: Restore app.name
    const title = app?.name ?? 'App'

    const directionItems = [
      { onClick: navigateAppsPage, title },
      { title: 'Components' },
      { onClick: navigateComponentsPanel, title: component.name },
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
