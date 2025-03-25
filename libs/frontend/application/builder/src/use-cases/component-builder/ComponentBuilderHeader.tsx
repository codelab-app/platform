'use client'

import type {
  IAppModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

interface IComponentBuilderHeaderProps {
  BuilderResizeMenu: ReactNode
  app?: IAppModel
  /**
   * Decouples `builder` from `page`
   */
  component: IComponentModel
}

export const ComponentBuilderHeader = observer<IComponentBuilderHeaderProps>(
  ({ app, BuilderResizeMenu, component }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.endsWith('/builder')

    const togglePreviewMode = () => {
      const url = isBuilder
        ? RoutePaths.ComponentPreview({ componentId: component.id })
        : RoutePaths.ComponentBuilder({ componentId: component.id })

      return router.push(url)
    }

    const navigateComponentsPanel = useCallback(async () => {
      const url = RoutePaths.ComponentBuilder({
        componentId: component.id,
      })

      await router.push(url)
    }, [router, component.id])

    const navigateAppsPage = useCallback(async () => {
      await router.push(RoutePaths.AppList())
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
