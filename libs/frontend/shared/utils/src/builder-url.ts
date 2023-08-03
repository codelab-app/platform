import type { IApp, IPage } from '@codelab/frontend/abstract/core'
import type { PageType } from '@codelab/frontend/abstract/types'
import isNil from 'lodash/isNil'
import type { NextRouter } from 'next/router'

/**
 * Extracts the builder route for the app page from the given url so that user
 * can navigate within their app in the builder/preview mode
 */
const extractBuilderRouteFromUrl = (pages: Array<IPage>, url: string) => {
  let appPageFromUrl = pages.find((appPage) => appPage.url === url)
  let matchSegments: Array<string> = []

  if (isNil(appPageFromUrl)) {
    appPageFromUrl = pages.find((appPage) => {
      const urlPattern = appPage.url
        // Convert dynamic segments to regex match group
        .replace(/:\w+/g, '([^/]+)')
        // Escape slashes
        .replace(/\//g, '\\/')
        // Convert * to regex wildcard
        .replace(/\*/g, '.*')

      const regex = new RegExp(`^${urlPattern}$`)

      if (regex.test(url)) {
        matchSegments = url.match(regex) ?? []

        return true
      }

      return false
    })
  }

  if (appPageFromUrl) {
    const segments: Array<string> = appPageFromUrl.url.match(/:\w+/g) ?? []

    const urlSegments = segments.reduce<Record<string, string | undefined>>(
      (acc, segment, index) => {
        const segmentName = segment.substring(1)
        const segmentValue = matchSegments[index + 1]

        if (!isNil(segmentValue)) {
          // first matched segment is the whole url
          acc[segmentName] = segmentValue
        }

        return acc
      },
      {},
    )

    return { page: appPageFromUrl, segments: urlSegments }
  }

  return
}

/**
 * This lets the user to navigate in the builder/preview mode
 * within the user's app when using the NextLink
 */
export const builderRouteChangeHandler = async (
  router: NextRouter,
  app: IApp,
  pages: Array<IPage>,
  url: string,
  pathname: PageType.PageBuilder | PageType.PageDetail,
) => {
  if (isNil(app)) {
    return
  }

  const builderRoute = extractBuilderRouteFromUrl(pages, url)

  if (!builderRoute) {
    return
  }

  const { page, segments } = builderRoute

  await router.push({
    pathname,
    query: {
      ...segments,
      appSlug: router.query.appSlug,
      pageSlug: page.slug,
      primarySidebarKey: router.query.primarySidebarKey,
      userName: router.query.userName,
    },
  })
}
