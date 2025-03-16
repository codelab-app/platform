'use client'

import type {
  UrlPathParams,
  UrlPathParamsProps,
} from '@codelab/frontend/abstract/types'

import { useParams } from 'next/navigation'

/**
 * Make the return data lazy, so we have type safety while allowing un-used values to not throw error
 *
 * Only use this at top level
 *
 * TODO: Remove this
 */
export const useUrlPathParams = (): UrlPathParams => {
  /**
   * params cannot be known during pre-rendering of a page that doesn't use getServerSideProps
   *
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#behavior
   */
  const params = useParams()

  return {
    get actionId() {
      if (!params.actionId) {
        throw new Error('actionId is required')
      }

      return params.actionId.toString()
    },
    get appId() {
      if (!params.appId) {
        throw new Error('appId is required')
      }

      return params.appId.toString()
    },
    get authGuardId() {
      if (!params.authGuardId) {
        throw new Error('authGuardId is required')
      }

      return params.authGuardId.toString()
    },
    get componentId() {
      if (!params.componentId) {
        throw new Error('componentId is required')
      }

      return params.componentId.toString()
    },
    get interfaceId() {
      if (!params.interfaceId) {
        throw new Error('interfaceId is required')
      }

      return params.interfaceId.toString()
    },
    get pageId() {
      if (!params.pageId) {
        throw new Error('pageId is required')
      }

      return params.pageId.toString()
    },
    get resourceId() {
      if (!params.resourceId) {
        throw new Error('resourceId is required')
      }

      return params.resourceId.toString()
    },
  }
}
