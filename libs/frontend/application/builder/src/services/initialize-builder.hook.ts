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
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { v4 } from 'uuid'

/**
 * Don't need to return renderer, let mobx handle reactivity
 */
export const useInitializeBuilder = ({
  containerNode,
  rendererType,
  searchParams,
}: {
  rendererType: RendererType
  containerNode: IComponentModel | IPageModel
  searchParams: ReadonlyURLSearchParams
}) => {
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

    rendererService.setActiveRenderer(rendererRef(renderer.id))

    const { runtimeContainerNode, runtimeRootContainerNode } = renderer
    const runtimeContainer = runtimeContainerNode ?? runtimeRootContainerNode
    const runtimeRootElement = runtimeContainer.runtimeRootElement

    builderService.setSelectedNode(runtimeElementRef(runtimeRootElement))

    void renderer.expressionTransformer.init()
  }, [containerNode.id])

  /**
   * Synchronize search params into router service for in-app routing
   */
  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams.entries())

    routerService.setQueryParams(queryParams)
  }, [routerService, searchParams])
}
