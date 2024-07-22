import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentDevelopmentDto } from '@codelab/frontend/abstract/domain'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { hydrateComponentDevelopment } from './component-development.hydrate'

interface DevelopmentComponentProps {
  componentSlug: string
  dto: IComponentDevelopmentDto
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useComponentDev = ({
  dto,
  rendererType,
}: DevelopmentComponentProps) => {
  const domainStore = useDomainStore()
  const { builderService, rendererService } = useStore()
  const component = hydrateComponentDevelopment(dto, domainStore)

  const renderer = rendererService.hydrate({
    containerNode: component,
    id: component.id,
    rendererType,
  })

  rendererService.setActiveRenderer(rendererRef(renderer.id))
  builderService.selectElementNode(
    renderer.runtimeRootContainerNode.runtimeRootElement,
  )

  void renderer.expressionTransformer.init()

  return {
    component,
    elementTree: component,
    renderer,
  }
}
