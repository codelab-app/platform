'use client'

import type { IComponentModel } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { DetailHeader } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

interface IComponentBuilderHeaderProps {
  BuilderResizeMenu: ReactNode
  /**
   * Decouples `builder` from `page`
   */
  component: IComponentModel
}

export const ComponentBuilderHeader = observer<IComponentBuilderHeaderProps>(
  ({ BuilderResizeMenu, component }) => {
    const router = useRouter()
    const currentPathname = usePathname()
    const isBuilder = currentPathname.endsWith('/builder')

    const togglePreviewMode = () => {
      const url = isBuilder
        ? RoutePaths.Component.preview({ componentId: component.id })
        : RoutePaths.Component.builder({ componentId: component.id })

      return router.push(url)
    }

    const navigateComponentsPanel = useCallback(async () => {
      const url = RoutePaths.Component.builder({
        componentId: component.id,
      })

      await router.push(url)
    }, [router, component.id])

    const navigateToComponentsList = useCallback(async () => {
      await router.push(RoutePaths.Component.base())
    }, [router])

    const directionItems = [
      { onClick: navigateToComponentsList, title: 'Components' },
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
