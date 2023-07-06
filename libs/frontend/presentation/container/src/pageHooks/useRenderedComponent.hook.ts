import { rendererRef, RendererType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useStore } from '../providers'
import { useCurrentApp, useCurrentComponent } from '../routerHooks'
import { loadAllTypesForElements } from './useRenderedPage.hook'

/**
 * Fetch related data for rendering component, and load them into store
 */
export const useRenderedComponent = () => {
  const {
    appService,
    builderService,
    componentService,
    elementService,
    renderService,
    typeService,
  } = useStore()

  const { _compoundName: compoundAppName } = useCurrentApp()
  const { componentName } = useCurrentComponent()
  const router = useRouter()

  return useAsync(async () => {
    const [app] = await appService.getAll({ _compoundName: compoundAppName })
    const [component] = await componentService.getAll({ name: componentName })

    if (!component || !app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const pageElements = [...component.rootElement.current.descendantElements]

    await loadAllTypesForElements(componentService, typeService, pageElements)

    const rootElement = elementService.maybeElement(component.rootElement.id)

    if (rootElement) {
      builderService.selectElementNode(rootElement)
    }

    const renderer = renderService.addRenderer({
      elementTree: component,
      id: component.id,
      rendererType: RendererType.ComponentBuilder,
    })

    renderService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return { app, elementTree: component, renderer }
  })
}
