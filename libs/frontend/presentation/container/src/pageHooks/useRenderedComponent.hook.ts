import type { RendererType } from '@codelab/frontend/abstract/core'
import { rendererRef } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useStore } from '../providers'
import { useCurrentApp, useCurrentComponent } from '../routerHooks'
import { loadAllTypesForElements } from './useRenderedPage.hook'

/**
 * Fetch related data for rendering component, and load them into store
 */
export const useRenderedComponent = (rendererType: RendererType) => {
  const {
    appService,
    builderService,
    componentService,
    elementService,
    renderService,
    typeService,
  } = useStore()

  const { _compoundName } = useCurrentApp()
  const { componentName } = useCurrentComponent()
  const router = useRouter()

  return useAsync(async () => {
    const [app] = await appService.loadAppsWithNestedPreviews({ _compoundName })
    const components = await componentService.getAll({ name: componentName })
    const component = components.find(({ name }) => name === componentName)

    if (!component || !app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const roots = [component.rootElement.current]
    const rootElement = elementService.maybeElement(component.rootElement.id)

    await loadAllTypesForElements(componentService, typeService, roots)

    if (rootElement) {
      builderService.selectElementNode(rootElement)
      builderService.selectComponentNode(component)
    }

    const renderer = renderService.addRenderer({
      elementTree: component,
      id: component.id,
      rendererType,
    })

    renderService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return { app, elementTree: component, renderer }
  })
}
