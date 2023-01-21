import type { IRenderService } from '@codelab/frontend/abstract/core'
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
  isBuilder: boolean
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useRenderedPage = ({
  appId,
  pageId,
  isBuilder,
  renderService,
}: RenderedPageProps) => {
  const {
    appService,
    storeService,
    typeService,
    componentService,
    resourceService,
    pageService,
  } = useStore()

  const commonPagesData = useAsync(async () => {
    const { apps, components, resources, ...types } =
      await pageService.getRenderedPageAndCommonAppData(appId, pageId)

    const [app] = apps

    if (!app) {
      return null
    }

    const providerPage = app.pages.find((page) => page.isProvider)

    if (!providerPage) {
      // TODO: redirect to 505 page
      return null
    }

    appService.load({ app: app, pageId: providerPage.id })

    // load types by chucks so UI is not blocked
    typeService.loadTypesByChunks(types)

    // load components trees
    componentService.loadRenderedComponentsTree(components)

    // write cache for resources
    resourceService.load(resources)

    // hydrate store after types and resources
    const appStore = storeService.writeCache(app.store)
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
    if (!app.pages.find((p) => p.id === pageId)) {
      const { pages } = await pageService.getRenderedPage(pageId)
      const [loadedPage] = pages

      if (!loadedPage) {
        // TODO: redirect to 404 page
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
    const appTree = pageService.pagesList.find((p) => p.isProvider)?.elementTree
    const appStore = storeService.stores.get(app.store.id)
    const components = componentService.componentList

    if (!appStore) {
      return null
    }

    const renderer = await renderService.addRenderer({
      id: page.id,
      pageTree,
      appTree,
      components,
      appStore,
      isBuilder,
    })

    return {
      app,
      pageTree,
      page,
      renderer,
      appTree,
      components,
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
