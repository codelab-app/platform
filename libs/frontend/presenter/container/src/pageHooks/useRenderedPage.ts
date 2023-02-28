import type { IRenderService } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { notify } from '@codelab/frontend/shared/utils'
import type {
  GetRenderedPageAndCommonAppDataQuery,
  PageBuilderAppFragment,
} from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@graphql-tools/utils/typings/types'
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
  const {
    appService,
    storeService,
    typeService,
    componentService,
    resourceService,
    pageService,
    actionService,
  } = useStore()

  const router = useRouter()

  const redirectToErrorPage = async (
    kind: IPageKind,
    app: Maybe<PageBuilderAppFragment>,
  ) => {
    const errorPage = app?.pages.find((page) => page.kind === kind)

    if (errorPage?.id === pageId) {
      return
    }

    await router.push(
      errorPage
        ? { query: { ...router.query, pageId: errorPage.id } }
        : { pathname: defaultErrorPages.get(kind), query: router.query },
    )
  }

  const notifyMissingPagesOnBuilder = (loadedPageKinds: Array<IPageKind>) => {
    if (rendererType === RendererType.Preview) {
      return
    }

    requiredPageKinds.forEach((kind) => {
      if (!loadedPageKinds.includes(kind)) {
        notify({ type: 'error', title: `Failed to load ${kind} page` })
      }
    })
  }

  const commonPagesData = useAsync(async () => {
    const { apps, components, resources, ...types } =
      initialData ??
      (await pageService.getRenderedPageAndCommonAppData(appId, pageId))

    const [app] = apps

    if (!app) {
      await router.push({ pathname: PageType.AppList, query: {} })

      return null
    }

    const providerPage = app.pages.find(
      ({ kind }) => kind === IPageKind.Provider,
    )

    notifyMissingPagesOnBuilder(app.pages.map((page) => page.kind))

    if (providerPage) {
      appService.load({ app: app, pageId: providerPage.id })
    } else if (rendererType === RendererType.Preview) {
      await redirectToErrorPage(IPageKind.InternalServerError, app)

      return null
    }

    // load types by chucks so UI is not blocked
    typeService.loadTypesByChunks(types)

    // load components trees
    componentService.loadRenderedComponentsTree(components)

    // write cache for resources
    resourceService.load(resources)

    // hydrate store after types and resources
    const appStore = storeService.add({
      ...app.store,
      actions: app.store.actions.map((action) =>
        actionService.actionFactory.fromActionFragment(action),
      ),
    })

    appStore.state.setMany(appService.appsJson)

    /**
     FIXME: mobx-keystone 1.2.0 requires frozen data to be serializable.
    // appStore.state.set('redirectToPage', setCurrentPageId)
    */

    return { app }
  }, [])

  const currentPageData = useAsync(async () => {
    if (!commonPagesData.value) {
      // commonPageData is not loaded yet
      return null
    }

    const { app } = commonPagesData.value

    /**
     * if page was not loaded before load it.
     */
    if (!app.pages.find(({ id }) => id === pageId)) {
      const { pages } = await pageService.getRenderedPage(pageId)
      const [loadedPage] = pages

      if (!loadedPage) {
        rendererType === RendererType.Preview
          ? await redirectToErrorPage(IPageKind.NotFound, app)
          : await router.push({ pathname: PageType.PageList, query: { appId } })

        return null
      }

      app.pages.push(loadedPage)
    }

    /**
     * if page.elementTree exists no need to load it again
     * NOTICE: existingPage may exist without tree check `appService.load`
     */
    const existingPage = pageService.pages.get(pageId)

    const { page, pageElementTree: pageTree } = existingPage?.elementTree
      ? {
          page: existingPage,
          pageElementTree: existingPage.elementTree,
        }
      : appService.load({ app, pageId })

    /**
     * hot-reload makes commonPagesData contains invalid values, read from mobx store.
     */
    const appTree = pageService.pagesList.find(
      ({ kind }) => kind === IPageKind.Provider,
    )?.elementTree

    const appStore = storeService.stores.get(app.store.id)

    if (!appStore) {
      await redirectToErrorPage(IPageKind.InternalServerError, app)

      return null
    }

    const renderer = await renderService.addRenderer({
      id: page.id,
      pageTree,
      appTree,
      appStore,
      rendererType,
    })

    return {
      app,
      pageTree,
      page,
      renderer,
      appTree,
      appStore,
    }
  }, [pageId, commonPagesData.loading])

  const loading = commonPagesData.loading || currentPageData.loading
  const error = commonPagesData.error ?? currentPageData.error
  const value = currentPageData.value

  return {
    loading,
    error,
    value,
  }
}
