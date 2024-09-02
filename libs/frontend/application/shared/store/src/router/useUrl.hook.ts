'use client'

import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { Nullable } from '@codelab/shared/abstract/types'
import {
  type ReadonlyURLSearchParams,
  useParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'

/**
 * Make the return data lazy, so we have type safety while allowing un-used values to not throw error
 */
export const useUrl = () => {
  /**
   * params cannot be known during pre-rendering of a page that doesn't use getServerSideProps
   *
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#behavior
   */
  const searchParams = useSearchParams() as Nullable<ReadonlyURLSearchParams>
  const pathname = usePathname() as Nullable<string>
  const params = useParams() as Nullable<UrlParams>
  const primarySidebarKey = searchParams?.get('primarySidebarKey')
  const query = Object.fromEntries(searchParams?.entries() ?? [])

  return {
    appId: params?.appId,
    authGuardId: params?.authGuardId,
    componentId: params?.componentId,
    pageId: params?.pageId,
    params: params,
    pathname,
    primarySidebarKey,
    query,
    resourceId: params?.resourceId,
  }
}
