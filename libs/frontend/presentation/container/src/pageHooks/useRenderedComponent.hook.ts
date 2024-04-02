import {
  rendererRef,
  type RendererType,
} from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { AppProperties } from '@codelab/shared/domain'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useCurrentComponent } from '../routerHooks'
import { useAppQuery } from './useAppQuery.hook'
import { loadAllTypesForElements } from './utils'

/**
 * Fetch related data for rendering component, and load them into store
 */
export const useRenderedComponent = (rendererType: RendererType) => {
  const {
    appService,
    builderService,
    componentService,
    elementService,
    rendererService,
    typeService,
    userService,
  } = useStore()

  const { componentName } = useCurrentComponent()
  const { appName } = useAppQuery()
  const user = userService.user
  const router = useRouter()

  return useAsync(async () => {
    const [app] = await appService.loadAppsPreview({
      compositeKey: AppProperties.appCompositeKey(appName, user),
    })

    const components = await componentService.getAll({ name: componentName })
    const component = components.find(({ name }) => name === componentName)

    if (!component || !app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const rootElement = elementService.elementDomainService.maybeElement(
      component.rootElement.id,
    )

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
      builderService.selectElementNode(
        renderer.runtimeRootContainerNode.runtimeRootElement,
      )
      builderService.selectComponentNode(renderer.runtimeComponent)
    }

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return { app, elementTree: component, renderer }
  })
}
