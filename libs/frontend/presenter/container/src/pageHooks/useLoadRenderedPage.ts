import { useAsync } from 'react-use'
import { useStore } from '../providers'
import { useCurrentAppId, useCurrentPageId } from '../routerHooks'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useLoadRenderedPage = () => {
  const {
    appService,
    storeService,
    typeService,
    componentService,
    resourceService,
    pageService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return useAsync(async () => {
    const {
      apps,
      components,
      resources,
      // Can't change shape in GraphQL so we have to use this structure
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    } = await pageService.getRenderedPage(appId, pageId)

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
    const { pageElementTree: appTree } = providerPage ?? {}

    typeService.load({
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    })

    components.map((component) =>
      componentService.loadRenderedComponentTree(component),
    )

    resources.map((resource) => resourceService.writeCache(resource))

    // hydrate after types and resources
    const appStore = storeService.writeCache(app.store)
    appStore.state.setMany(appService.appsJson)

    return { page, pageTree, appTree, appStore }
  }, [])
}
