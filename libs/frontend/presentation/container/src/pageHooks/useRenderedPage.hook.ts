import type { IElement } from '@codelab/frontend/abstract/core'
import {
  isComponentInstance,
  RendererType,
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
    appRenderService,
    appService,
    builderRenderService,
    builderService,
    componentService,
    elementService,
  } = useStore()

  const appIdFromUrl = useCurrentAppId()
  const pageIdFromUrl = useCurrentPageId()
  const appId = productionProps?.appId ?? appIdFromUrl
  const pageId = productionProps?.pageId ?? pageIdFromUrl
  const router = useRouter()

  const renderService =
    rendererType === RendererType.Preview
      ? appRenderService
      : builderRenderService

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

    // Loading custom components
    let componentsBatch = getComponentIdsFromElements([
      // This will load the custom components in the _app (provider page) for the regular pages since we also
      // render the elements of the provider page as part of the regular page
      ...(page.kind === PageKind.Regular
        ? app.providerPage.rootElement.current.descendantElements
        : []),
      ...page.rootElement.current.descendantElements,
    ]).filter((id) => !componentService.components.has(id))

    // This makes sure the deeply nested components will also be loaded
    // e.g. When an element has a render prop type with a component, and that component
    // also has render prop type with another component, and so on
    do {
      if (componentsBatch.length > 0) {
        const components = await componentService.getAll({
          id_IN: componentsBatch,
        })

        componentsBatch = getComponentIdsFromElements([
          ...flatMap(components, ({ rootElement }) => rootElement.current),
          ...flatMap(
            components,
            ({ rootElement }) => rootElement.current.descendantElements,
          ),
        ]).filter((id) => !componentService.components.has(id))
      }
    } while (componentsBatch.length > 0)

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
