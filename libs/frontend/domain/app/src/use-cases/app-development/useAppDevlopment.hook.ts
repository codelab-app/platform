import type { RendererType } from '@codelab/frontend/abstract/core'
import { rendererRef } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useAppQuery,
  usePageQuery,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import find from 'lodash/find'
import { useRouter } from 'next/router'

interface DevelopmentPageProps {
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppDevelopment = ({ rendererType }: DevelopmentPageProps) => {
  const {
    appService,
    builderService,
    pageService,
    renderService,
    userService,
  } = useStore()

  const router = useRouter()
  const { appName } = useAppQuery()
  const { pageName } = usePageQuery()
  const userId = userService.user.id

  return useAsync(async () => {
    console.debug('useDevelopmentPage', { appName, pageName })

    try {
      const appDevelopmentData =
        await appService.appDevelopmentService.getAppDevelopmentData({
          appName,
          pageName,
          userId,
        })

      const app =
        await appService.appDevelopmentService.hydrateAppDevelopmentData(
          appDevelopmentData,
        )

      const page = find(
        Array.from(pageService.pages.values()),
        (_page) => _page.name === pageName,
      )

      if (!page) {
        throw new Error('Missing page')
      }

      builderService.selectElementNode(page.rootElement.current)

      // const roots = [
      //   // This will load the custom components in the _app (provider page) for the regular pages since we also
      //   // render the elements of the provider page as part of the regular page
      //   ...(page.kind === PageKind.Regular
      //     ? [app.providerPage.rootElement.current]
      //     : []),
      //   page.rootElement.current,
      // ]

      // await loadAllTypesForElements(componentService, typeService, roots)

      // const pageRootElement = elementService.maybeElement(page.rootElement.id)

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

      console.debug(renderer)

      renderService.setActiveRenderer(rendererRef(renderer.id))
      await renderer.expressionTransformer.init()

      return {
        app,
        elementTree: page,
        page,
        renderer,
      }
    } catch (error) {
      return await router.push({ pathname: PageType.AppList, query: {} })
    }
  })
}
