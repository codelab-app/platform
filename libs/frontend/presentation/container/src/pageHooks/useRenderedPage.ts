import { RendererType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useStore } from '../providers'
import { useCurrentAppId, useCurrentPageId } from '../routerHooks'

export interface RenderedPageProps {
  /**
   * for production we prebuild pages with all required information
   * so if this object exists - use it as a source of truth instead of making a request
   */
  initialData?: GetRenderedPageAndCommonAppDataQuery
  /**
   * indicates whether the hook is used inside builder page or preview page
   */
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useRenderedPage = ({
  initialData,
  rendererType,
}: RenderedPageProps) => {
  const {
    appRenderService,
    appService,
    builderRenderService,
    builderService,
    elementService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const router = useRouter()

  const renderService =
    rendererType === RendererType.Preview
      ? appRenderService
      : builderRenderService

  return useAsync(async () => {
    const app = await appService.getRenderedPageAndCommonAppData(
      appId,
      pageId,
      initialData,
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

    return {
      app,
      elementTree: page,
      page,
      renderer,
    }
  })
}