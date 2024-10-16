'use client'

import type { PageType } from '@codelab/frontend/abstract/types'

import {
  useUrlPathParams,
  useUrlQueryParams,
} from '@codelab/frontend-application-shared-store/router'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useEffect } from 'react'

import type { IBuilderPage } from '../builder-router'

import { extractPathParamsFromUrlInstance } from '../builder-router'

/**
 * Hook to handle route changes and update the query based on dynamic URL segments.
 *
 * @param pages - The pages to consider when matching the URL.
 * @param pathname - The pathname to navigate to, with dynamic segments replaced by actual values.
 * @param dynamicUrl This is the url that we want to turn into a query based on all page links
 */
export const useRouteChangeHandler = (
  pages: Array<IBuilderPage> = [],
  pathname:
    | ReturnType<typeof PageType.PageDetail>
    | ReturnType<typeof PageType.PageList>,
) => {
  const router = useRouter()
  // Usage in page router causes first pass to be undefined
  const { appId } = useUrlPathParams()
  const { primarySidebarKey } = useUrlQueryParams()

  // Define the route change handler inside useEffect or as a useMemo to avoid re-creation on each render
  useEffect(() => {
    const routeChangeHandler = async (targetUrl: string) => {
      /**
       * Builder and production url pattern are different, here we extract the query from the production URL, and add it as query to the builder url pattern
       */
      const { page, query } = extractPathParamsFromUrlInstance(pages, targetUrl)

      // If same url, we don't do anything. Otherwise will have an infinite redirect loop
      if (targetUrl === page?.builderUrlInstance) {
        return
      }

      if (!page) {
        return
      }

      const url = queryString.stringifyUrl({
        query: {
          ...query,
          appId,
          pageId: page.slug,
          primarySidebarKey,
        },
        url: pathname,
      })

      await router.push(url)
    }

    // // Register the route change event listener
    // router.events.on('routeChangeStart', routeChangeHandler)

    // // Cleanup function to remove the event listener
    // return () => {
    //   router.events.off('routeChangeStart', routeChangeHandler)
    // }
  }, [pages])
}
