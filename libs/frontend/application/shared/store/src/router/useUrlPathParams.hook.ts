'use client'

import type { UrlPathParams } from '@codelab/frontend/abstract/types'

import { useParams } from 'next/navigation'

/**
 * Make the return data lazy, so we have type safety while allowing un-used values to not throw error
 *
 * Only use this at top level
 */
export const useUrlPathParams = (): UrlPathParams => {
  /**
   * params cannot be known during pre-rendering of a page that doesn't use getServerSideProps
   *
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#behavior
   */
  const params = useParams()

  return {
    actionId: params.actionId as string,
    appId: params.appId as string,
    authGuardId: params.authGuardId as string,
    componentId: params.componentId as string,
    interfaceId: params.interfaceId as string,
    pageId: params.pageId as string,
    resourceId: params.resourceId as string,
  }
}
