import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'

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

  rendererService.setActiveRenderer(rendererRef(renderer.id))

  builderService.selectElementNode(
    renderer.runtimeRootContainerNode.runtimeRootElement,
  )

  void renderer.expressionTransformer.init()

  return {
    renderer,
  }
}
