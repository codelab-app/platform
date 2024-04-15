import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useCurrentComponent } from '../routerHooks'
import { loadAllTypesForElements } from './utils'

/**
 * Fetch related data for rendering component, and load them into store
 */
export const useRenderedComponent = (rendererType: RendererType) => {
  const { builderService, componentService, rendererService, typeService } =
    useStore()

  const { componentName } = useCurrentComponent()
  const router = useRouter()

  return useAsync(async () => {
    const components = await componentService.getAll({ name: componentName })
    const component = components.find(({ name }) => name === componentName)

    if (!component) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    // const rootElement = elementService.elementDomainService.maybeElement(
    //  component.rootElement.id,
    // )

    // if (rootElement) {
    //  await elementService.loadDependantTypes(rootElement)
    // }

    // TODO: Remove this in favor of loadDependantTypes
    await loadAllTypesForElements(
      componentService,
      typeService,
      component.elements,
    )

    const renderer = rendererService.hydrate({
      containerNode: component,
      id: component.id,
      rendererType,
    })

    if (renderer.runtimeComponent) {
      builderService.selectComponentNode(renderer.runtimeComponent)
    }

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return { elementTree: component, renderer }
  })
}
