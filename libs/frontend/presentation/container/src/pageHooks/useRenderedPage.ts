import { RendererType } from '@codelab/frontend/abstract/core'
import type { ProductionWebsiteProps } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAsync } from '@react-hookz/web'
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
