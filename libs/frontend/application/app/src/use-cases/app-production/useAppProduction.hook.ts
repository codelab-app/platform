import type { IAppProductionDto } from '@codelab/frontend/abstract/domain'
import { rendererRef, RendererType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import find from 'lodash/find'
import { useRouter } from 'next/router'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppProduction = (appProductionData: IAppProductionDto) => {
  const { appService, pageService, renderService } = useStore()
  const { appName, pageName } = appProductionData
  const router = useRouter()

  return useAsync(async () => {
    console.debug('useAppProduction', { appName, pageName })

    const app = await appService.appProductionService.hydrateAppProductionData(
      appProductionData,
    )

    const page = find(
      Array.from(pageService.pages.values()),
      (_page) => _page.name === pageName,
    )

    if (!page) {
      throw new Error('Missing page')
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
      rendererType: RendererType.Production,
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
  })
}
