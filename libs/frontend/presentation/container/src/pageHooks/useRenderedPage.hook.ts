import type {
  IComponentService,
  IElement,
  ITypeService,
  RendererType,
} from '@codelab/frontend/abstract/core'
import {
  isComponentInstance,
  rendererRef,
} from '@codelab/frontend/abstract/core'
import type { ProductionWebsiteProps } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { PageKind } from '@codelab/shared/abstract/codegen'
import { useAsync } from '@react-hookz/web'
import flatMap from 'lodash/flatMap'
import has from 'lodash/has'
import { useRouter } from 'next/router'
import { useStore } from '../providers'
import { useCurrentAppId, useCurrentPageId } from '../routerHooks'

export interface RenderedPageProps {
  /**
   * for production user websites we use slightly different flow:
   * - we prebuild pages with all required information to avoid requests to platform DB
   * - pageId and appId are not exposed in url, so we need to pass them explicitly
   */
  productionProps?: ProductionWebsiteProps

  /**
   * indicates whether the hook is used inside builder page or preview page
   */
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useRenderedPage = ({
  productionProps,
  rendererType,
}: RenderedPageProps) => {
  const {
    appService,
    builderService,
    componentService,
    elementService,
    renderService,
    typeService,
  } = useStore()

  const appIdFromUrl = useCurrentAppId()
  const pageIdFromUrl = useCurrentPageId()
  const appId = productionProps?.appId ?? appIdFromUrl
  const pageId = productionProps?.pageId ?? pageIdFromUrl
  const router = useRouter()

  return useAsync(async () => {
    const app = await appService.getRenderedPageAndCommonAppData(
      appId,
      pageId,
      productionProps?.renderingData,
    )

    if (!app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const page = app.page(pageId)

    const pageElements = [
      // This will load the custom components in the _app (provider page) for the regular pages since we also
      // render the elements of the provider page as part of the regular page
      ...(page.kind === PageKind.Regular
        ? app.providerPage.rootElement.current.descendantElements
        : []),
      ...page.rootElement.current.descendantElements,
    ]

    await loadAllTypesForElements(componentService, typeService, pageElements)

    const pageRootElement = elementService.maybeElement(page.rootElement.id)

    if (pageRootElement) {
      builderService.selectElementNode(pageRootElement)
    }

    const renderer = renderService.addRenderer({
      elementTree: page,
      id: page.id,
      providerTree: app.providerPage,
      rendererType,
    })

    renderService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return {
      app,
      elementTree: page,
      page,
      renderer,
    }
  })
}

/**
 * Get all component ids that could be an element or a render prop type
 */
const getComponentIdsFromElements = (elements: Array<IElement>) => {
  return elements.reduce<Array<string>>((acc, element) => {
    // Component as an element
    if (isComponentInstance(element.renderType)) {
      acc.push(element.renderType.id)
    }

    // Components as render prop types
    const renderPropTypeFieldValues = Object.values(
      element.props.current.values,
    )
      .filter(
        (value) =>
          has(value, 'value') &&
          has(value, 'type') &&
          typeof value['value'] === 'string' &&
          typeof value['type'] === 'string' &&
          value['value'] &&
          value['type'],
      )
      .map(({ value }) => value)

    if (renderPropTypeFieldValues.length > 0) {
      acc.push(...renderPropTypeFieldValues)
    }

    return acc
  }, [])
}

/**
 * Get all api and field type ids from the elements
 */
const getTypeIdsFromElements = (elements: Array<IElement>) => {
  return elements.reduce<Array<string>>((acc, element) => {
    if (element.renderType) {
      acc.push(element.renderType.current.api.id)

      element.renderType.current.api.current.fields.forEach((field) => {
        acc.push(field.type.id)
      })
    }

    return acc
  }, [])
}

export const loadAllTypesForElements = async (
  componentService: IComponentService,
  typeService: ITypeService,
  elements: Array<IElement>,
) => {
  const loadedComponentElements: Array<IElement> = []

  // Loading custom components
  let componentsBatch = getComponentIdsFromElements(elements).filter(
    (id) => !componentService.components.has(id),
  )

  // This makes sure the deeply nested components will also be loaded
  // e.g. When an element has a render prop type with a component, and that component
  // also has render prop type with another component, and so on
  do {
    if (componentsBatch.length > 0) {
      const components = await componentService.getAll({
        id_IN: componentsBatch,
      })

      const componentElements = [
        ...components.map((comp) => comp.rootElement.current),
        ...flatMap(
          components.map((comp) => comp.rootElement.current.descendantElements),
        ),
      ]

      loadedComponentElements.push(...componentElements)

      componentsBatch = getComponentIdsFromElements(componentElements).filter(
        (id) => !componentService.components.has(id),
      )
    }
  } while (componentsBatch.length > 0)

  // Loading all the types of the elements that are used on the current page
  // This will also get the types of fields, not just interface types
  const typeIds = getTypeIdsFromElements([
    ...elements,
    ...loadedComponentElements,
  ]).filter((id) => !typeService.types.has(id))

  await typeService.getAll(typeIds)
}
