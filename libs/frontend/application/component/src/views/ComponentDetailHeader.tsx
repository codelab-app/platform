'use client'

import {
  type ComponentContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'
import {
  useCurrentApp,
  useCurrentComponent,
} from '@codelab/frontend/presentation/container'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

type IComponentDetailHeaderProps = ComponentContextParams & {
  /**
   * Decouples `builder` from `page`
   */
  BuilderResizeMenu: ReactNode
}

export const ComponentDetailHeader = observer<IComponentDetailHeaderProps>(
  ({ BuilderResizeMenu, componentId }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.endsWith('/builder')
    const component = useCurrentComponent()
    const app = useCurrentApp()
    const { rendererService } = useApplicationStore()

    const togglePreviewMode = () => {
      const url = isBuilder
        ? PageType.ComponentPreview({ componentId })
        : PageType.ComponentBuilder({ componentId })

      return router.push(url)
    }

    const navigateComponentsPanel = useCallback(async () => {
      const url = PageType.ComponentBuilder({
        componentId,
      })

      await router.push(url)
    }, [router, componentId])

    const navigateAppsPage = useCallback(async () => {
      await router.push(PageType.AppList())
    }, [router])

    const directionItems = [
      { onClick: navigateAppsPage, title: app?.name },
      { title: 'Components' },
      { onClick: navigateComponentsPanel, title: component?.name },
    ]

    return (
      <DetailHeader
        BuilderResizeMenu={BuilderResizeMenu}
        directionItems={directionItems}
        isBuilder={isBuilder}
        reloadRenderer={rendererService.reloadActiveRenderer}
        togglePreviewMode={togglePreviewMode}
      />
    )
  },
)
