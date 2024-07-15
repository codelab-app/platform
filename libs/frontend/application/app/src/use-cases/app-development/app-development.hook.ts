import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import type { IAppDevelopmentDto } from '@codelab/frontend/abstract/domain'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { getNameFromSlug } from '@codelab/shared/utils'
import { hydrateAppDevelopment } from './app-development.hydrate'

export const useAppDev = ({
  dto,
  pageSlug,
  rendererType,
}: {
  rendererType: RendererType
  dto: IAppDevelopmentDto
  pageSlug: string
}) => {
  const domainStore = useDomainStore()
  const { builderService, rendererService } = useStore()
  const app = hydrateAppDevelopment(dto, domainStore)
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
  // await renderer.expressionTransformer.init()

  return {
    app,
    elementTree: page,
    page,
    renderer,
  }
}
