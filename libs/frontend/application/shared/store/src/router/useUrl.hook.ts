'use client'

import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Validator } from '@codelab/shared/infra/schema'
import {
  type ReadonlyURLSearchParams,
  useParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'
import queryString from 'query-string'

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

  return {
    get appId() {
      return Validator.parseDefined(params?.appId)
    },
    get authGuardId() {
      return Validator.parseDefined(params?.authGuardId)
    },
    get componentId() {
      return Validator.parseDefined(params?.componentId)
    },
    get pageId() {
      return Validator.parseDefined(params?.pageId)
    },
    get params() {
      return Validator.parseDefined(params)
    },
    get pathname() {
      return Validator.parseDefined(pathname)
    },
    get primarySidebarKey() {
      return Validator.parseDefined(primarySidebarKey)
    },
    get query() {
      return queryString.parse(searchParams?.toString() ?? '')
    },
    get resourceId() {
      return Validator.parseDefined(params?.resourceId)
    },
  }
}
