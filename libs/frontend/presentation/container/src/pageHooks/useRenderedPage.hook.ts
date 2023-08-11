import type {
  IComponentService,
  IElement,
  IPropData,
  ITypeService,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import {
  extractTypedPropValue,
  isComponentInstance,
  isTypedProp,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/core'
import type { ProductionWebsiteProps } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { PageKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import flatMap from 'lodash/flatMap'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import values from 'lodash/values'
import { useRouter } from 'next/router'
import { useStore } from '../providers'
import { useCurrentApp, useCurrentPage } from '../routerHooks'

export interface RenderedPageProps {
  /**
   * for production user websites we use slightly different flow:
   * - we prebuild pages with all required information to avoid requests to platform DB
   * - pageName and appName are not exposed in url, so we need to pass them explicitly
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

  const { _compoundName: compoundAppName } = useCurrentApp()

  const { _compoundName: compoundPageName, pageName: pageNameFromUrl } =
    useCurrentPage()

  const pageName = productionProps?.pageName ?? pageNameFromUrl
  const router = useRouter()

  return useAsync(async () => {
    const app = await (rendererType === RendererType.Production
      ? appService.getRenderedPageAndAppData
      : appService.getRenderedPageAndCommonAppData)(
      compoundAppName,
      compoundPageName,
      productionProps?.renderingData,
    )

    if (!app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const page = app.pages.find(
      (_page) => _page.current.name === pageName,
    )?.current

    if (!page) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const roots = [
      // This will load the custom components in the _app (provider page) for the regular pages since we also
      // render the elements of the provider page as part of the regular page
      ...(page.kind === PageKind.Regular
        ? [app.providerPage.rootElement.current]
        : []),
      page.rootElement.current,
    ]

    await loadAllTypesForElements(
      componentService,
      typeService,
      roots,
      rendererType,
    )

    const pageRootElement = elementService.maybeElement(page.rootElement.id)

    if (pageRootElement) {
      builderService.selectElementNode(pageRootElement)
    }

    // extract the dynamic segments from the url query params for the page url
    // build complains with the return type `RegExpMatchArray` of `match`
    const extractedUrlSegments =
      (page.url.match(/:\w+/g) as Nullable<Array<string>>) ?? []

    const urlSegments = extractedUrlSegments.reduce<Record<string, string>>(
      (acc, segment) => {
        const segmentName = segment.substring(1)

        if (router.query[segmentName]) {
          acc[segmentName] = router.query[segmentName] as string
        }

        return acc
      },
      {},
    )

    const renderer = renderService.addRenderer({
      elementTree: page,
      id: page.id,
      providerTree: app.providerPage,
      rendererType,
      urlSegments,
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

const hasComponentId = (prop: TypedProp): boolean =>
  !hasStateExpression(prop.value) &&
  [ITypeKind.ReactNodeType, ITypeKind.RenderPropType].includes(prop.kind)

const getComponentIdsFromProp = (prop: IPropData): Array<string> =>
  isTypedProp(prop) && hasComponentId(prop) && extractTypedPropValue(prop)
    ? [extractTypedPropValue(prop)!]
    : isObject(prop)
    ? values(prop).flatMap((childProp) => getComponentIdsFromProp(childProp))
    : []

/**
 * Get all component ids that could be an element or a render prop type
 */
const getComponentIdsFromElements = (elements: Array<IElement>) =>
  elements
    .reduce<Array<string>>((acc, element) => {
      // Component as an element
      if (isComponentInstance(element.renderType)) {
        acc.push(element.renderType.id)
      }

      if (element.childMapperComponent?.id) {
        acc.push(element.childMapperComponent.id)
      }

      acc.push(
        ...getComponentIdsFromProp(element.props.current).filter(isString),
      )

      return acc
    }, [])
    .filter(Boolean)

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
  roots: Array<IElement>,
  rendererType: RendererType,
) => {
  const loadedComponentElements: Array<IElement> = []

  const elements = [
    ...roots,
    ...flatMap(roots.map((root) => root.descendantElements)),
  ]

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

  if (rendererType !== RendererType.Production) {
    // Loading all the types of the elements that are used on the current page
    // This will also get the types of fields, not just interface types
    const typeIds = getTypeIdsFromElements([
      ...elements,
      ...loadedComponentElements,
    ]).filter((id) => !typeService.types.has(id))

    await typeService.getAll(typeIds)
  }
}
