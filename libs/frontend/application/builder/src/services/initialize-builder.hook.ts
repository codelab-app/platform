import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useBuilderService } from './builder.service'

export const useInitializeBuilder = ({
  pageSlug,
  rendererType,
}: {
  rendererType: RendererType
  pageSlug: string
}) => {
  const { appDomainService } = useDomainStore()
  const app = useCurrentApp(appDomainService)
  const builderService = useBuilderService()
  const { rendererService } = useApplicationStore()
  const page = app.pageByName(getNameFromSlug(pageSlug))

  const renderer = rendererService.hydrate({
    containerNode: page,
    id: page.id,
    rendererType,
  })

  rendererService.setActiveRenderer(rendererRef(renderer.id))
  builderService.selectElementNode(
    renderer.runtimeRootContainerNode.runtimeRootElement,
  )

  void renderer.expressionTransformer.init()

  return {
    app,
    elementTree: page,
    page,
    renderer,
  }
}
