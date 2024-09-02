import {
  rendererRef,
  type RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'

export const useInitializeBuilder = ({
  containerNode,
  rendererType,
}: {
  rendererType: RendererType
  containerNode: IComponentModel | IPageModel
}) => {
  const { builderService, rendererService } = useApplicationStore()

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

    builderService.selectElementNode(
      runtimeElementRef(renderer.runtimeRootContainerNode.runtimeRootElement),
    )

    void renderer.expressionTransformer.init()
  }, [renderer.id])

  return {
    renderer,
  }
}
