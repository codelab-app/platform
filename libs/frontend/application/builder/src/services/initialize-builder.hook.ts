import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'

import {
  rendererRef,
  type RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useInitializeBuilder = ({
  containerNode,
  rendererType,
}: {
  rendererType: RendererType
  containerNode: IComponentModel | IPageModel
}) => {
  const { builderService, rendererService, routerService } =
    useApplicationStore()

  const searchParams = useSearchParams()

  const renderer = rendererService.hydrate({
    containerNode: containerNode,
    id: containerNode.id,
    rendererType,
  })

  /**
   * Defer side effect to lifecycle method, to prevent https://github.com/codelab-app/platform/issues/3463
   */
  useEffect(() => {
    rendererService.setActiveRenderer(rendererRef(renderer.id))

    const { runtimeContainerNode, runtimeRootContainerNode } = renderer
    const runtimeContainer = runtimeContainerNode ?? runtimeRootContainerNode
    const runtimeRootElement = runtimeContainer.runtimeRootElement

    builderService.setSelectedNode(runtimeElementRef(runtimeRootElement))

    void renderer.expressionTransformer.init()
  }, [renderer.id])

  /**
   * Synchronize search params into router service for in-app routing
   */
  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams.entries())

    routerService.setQueryParams(queryParams)
  }, [routerService, searchParams])

  return {
    renderer,
  }
}
