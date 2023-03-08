import type {
  IRenderService,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import { useAsync } from 'react-use'
import { useStore } from '../providers'

interface RenderedPageProps {
  appId: string
  pageId: string
  /**
   * builder uses builderRenderService while preview uses appRenderService
   */
  renderService: IRenderService
  /**
   * indicates whether the hook is used inside builder page or preview page
   */
  rendererType: RendererType
  /**
   * for production we prebuild pages with all required information
   * so if this object exists - use it as a source of truth instead of making a request
   */
  initialData?: GetRenderedPageAndCommonAppDataQuery
}

const defaultErrorPages: Map<IPageKind, PageType> = new Map([
  [IPageKind.InternalServerError, PageType.Page500],
  [IPageKind.NotFound, PageType.Page404],
])

const requiredPageKinds: Array<IPageKind> = [
  IPageKind.NotFound,
  IPageKind.Provider,
  IPageKind.InternalServerError,
]

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useRenderedPage = ({
  appId,
  pageId,
  renderService,
  initialData,
  rendererType,
}: RenderedPageProps) => {
  const { appService } = useStore()
  const router = useRouter()

  // const redirectToErrorPage = async (
  //   kind: IPageKind,
  //   app: Maybe<PageBuilderAppFragment>,
  // ) => {
  //   const errorPage = app?.pages.find((page) => page.kind === kind)

  //   if (errorPage?.id === pageId) {
  //     return
  //   }

  //   await router.push(
  //     errorPage
  //       ? { query: { ...router.query, pageId: errorPage.id } }
  //       : { pathname: defaultErrorPages.get(kind), query: router.query },
  //   )
  // }

  const currentPageData = useAsync(async () => {
    const app = await appService.getRenderedPageAndCommonAppData(
      appId,
      pageId,
      initialData,
    )

    if (!app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    console.log(app)

    const page = app.page(pageId)
    const appStore = app.store.current
    const elementTree = page.elementTree

    /**
     * hot-reload makes commonPagesData contains invalid values, read from mobx store.
     */
    // const appStore = storeService.stores.get(app.store.id)

    // if (!appStore) {
    //   await redirectToErrorPage(IPageKind.InternalServerError, app)

    //   return null
    // }
    const renderer = await renderService.addRenderer({
      appStore,
      elementTree,
      id: page.id,
      providerTree: app.providerPage.elementTree,
      rendererType,
    })

    return {
      app,
      appStore,
      elementTree,
      page,
      renderer,
    }
  }, [pageId])

  const { loading, error, value } = currentPageData

  return {
    error,
    loading,
    value,
  }
}
