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

    const [currentPage, providerPage] = app.pages
      .sort((page) => (page.isProvider ? 1 : -1))
      .map((page) => appService.load({ app, pageId: page.id }))

    if (!currentPage) {
      return null
    }

    const { pageElementTree: pageTree, page } = currentPage

    // handle case when user initially opens _app page
    // providerPage is undefined and currentPage is providers page
    const { pageElementTree: appTree } = page.isProvider
      ? currentPage
      : providerPage ?? {}

    // load types by chucks so UI is not blocked
    typeService.loadTypesByChunks(types)

    // load components trees
    componentService.loadRenderedComponentTree(components)

    // write cache for resources
    resourceService.load(resources)

    // hydrate store after types and resources
    const appStore = storeService.writeCache(app.store)
    appStore.state.setMany(appService.appsJson)

    /** 
     FIXME: mobx-keystone 1.2.0 requires frozen data must be serializable too.
    // appStore.state.set('redirectToPage', setCurrentPageId)
    */

    const renderer = await renderService.addRenderer({
      id: page.id,
      pageTree,
      appTree,
      components: componentService.componentList,
      appStore,
      isBuilder,
    })

    return {
      pageTree,
      appStore,
      page,
      renderer,
    }
  }, [])

  return commonPagesData
}
