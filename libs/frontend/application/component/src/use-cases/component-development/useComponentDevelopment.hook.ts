import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import { useComponentQuery } from '@codelab/frontend/presentation/container'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'

interface DevelopmentComponentProps {
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useComponentDevelopment = ({
  rendererType,
}: DevelopmentComponentProps) => {
  const { builderService, componentService, rendererService, userService } =
    useStore()

  const router = useRouter()
  const { componentName } = useComponentQuery()

  return useAsync(async () => {
    try {
      const componentDevelopmentData =
        await componentService.componentDevelopmentService.getComponentDevelopmentData(
          { componentName },
        )

      const component =
        await componentService.componentDevelopmentService.hydrateComponentDevelopmentData(
          componentDevelopmentData,
        )

      const renderer = rendererService.hydrate({
        containerNode: component,
        id: component.id,
        rendererType,
      })

      rendererService.setActiveRenderer(rendererRef(renderer.id))
      builderService.selectElementNode(
        renderer.runtimeRootContainerNode.runtimeRootElement,
      )

      await renderer.expressionTransformer.init()

      return {
        component,
        elementTree: component,
        renderer,
      }
    } catch (error) {
      console.error(error)

      await router.push({ pathname: PageType.Components, query: {} })
    }
  })
}
