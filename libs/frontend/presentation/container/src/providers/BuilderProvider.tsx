'use client'

import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { ReadonlyURLSearchParams } from 'next/navigation'

import {
  rendererRef,
  type RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { tracker } from '@codelab/frontend/infra/logger'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { createContext, type ReactNode, useContext, useEffect } from 'react'
import { v4 } from 'uuid'

interface BuilderContextProps {
  containerNode: IComponentModel | IPageModel
  rendererType: RendererType
  searchParams: ReadonlyURLSearchParams
}

interface BuilderProviderProps extends BuilderContextProps {
  children: ReactNode
}

const BuilderContext = createContext<BuilderContextProps | null>(null)

/**
 * 1) Hydrate and set active renderer
 * 2) Set selected node
 * 3) Initialize expression transformer
 */
export const BuilderProvider = ({
  children,
  containerNode,
  rendererType,
  searchParams,
}: BuilderProviderProps) => {
  const { builderService, rendererService, routerService } =
    useApplicationStore()

  /**
   * Defer side effect to lifecycle method, to prevent https://github.com/codelab-app/platform/issues/3463
   */
  useEffect(() => {
    const renderer = rendererService.hydrate({
      containerNode,
      id: v4(),
      rendererType,
    })

    tracker.useEvent({
      componentName: 'BuilderProvider',
      event: 'Set active renderer',
    })
    rendererService.setActiveRenderer(rendererRef(renderer.id))

    const { runtimeContainerNode, runtimeRootContainerNode } = renderer
    const runtimeContainer = runtimeContainerNode ?? runtimeRootContainerNode
    const runtimeRootElement = runtimeContainer.runtimeRootElement

    tracker.useEvent({
      componentName: 'BuilderProvider',
      event: 'Set selected node',
    })
    builderService.setSelectedNode(runtimeElementRef(runtimeRootElement))

    tracker.useEvent({
      componentName: 'BuilderProvider',
      event: 'Expression transformer init',
    })
    void renderer.expressionTransformer.init()
  }, [containerNode.id])

  /**
   * Synchronize search params into router service for in-app routing
   */
  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams.entries())

    routerService.setQueryParams(queryParams)
  }, [routerService, searchParams])

  return (
    <BuilderContext.Provider
      value={{ containerNode, rendererType, searchParams }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

// export const useBuilder = () => {
//   const context = useContext(BuilderContext)

//   if (!context) {
//     throw new Error('useBuilder must be used within a BuilderProvider')
//   }

//   return context
// }
