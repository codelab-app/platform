import { rendererRef, RendererType } from '@codelab/frontend/abstract/domain'
import type { ProductionWebsiteProps } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { PageKind } from '@codelab/shared/abstract/codegen'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { loadAllTypesForElements } from './utils'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useProductionPage = (productionProps: ProductionWebsiteProps) => {
  const {
    appService,
    builderService,
    componentService,
    elementService,
    renderService,
    typeService,
  } = useStore()

  const pageName = productionProps.pageName
  const router = useRouter()

  return useAsync(async () => {
    const app = await appService.loadProductionPage(
      productionProps.renderingData,
    )

    if (!app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const page = app.pages.find((_page) => _page.current.name === pageName)
      ?.current

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

    await loadAllTypesForElements(componentService, typeService, roots, true)

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
      // TODO: doesn't do anything, need to remove
      rendererType: RendererType.Production,
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
