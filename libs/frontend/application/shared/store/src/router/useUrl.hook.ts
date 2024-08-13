'use client'

import type { UrlParams } from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'
import {
  type ReadonlyURLSearchParams,
  useParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'
import queryString from 'query-string'

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

  return {
    appSlug: params?.appSlug,
    authGuardId: params?.authGuardId,
    componentSlug: params?.componentSlug,
    pageSlug: params?.pageSlug,
    params: params,
    pathname,
    primarySidebarKey,
    query: queryString.parse(searchParams?.toString() ?? ''),
    resourceId: params?.resourceId,
    userSlug: params?.userSlug,
  }
}
