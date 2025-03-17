'use client'

import type {
  UrlParamsProps,
  ValidatedUrlParamsProps,
} from '@codelab/frontend/abstract/types'

import { useParams } from 'next/navigation'

/**
 * Make the return data lazy, so we have type safety while allowing un-used values to not throw error
 *
 * Only use this at top level
 *
 * Do no use in mobx since `tweakPlainObject` will access all properties during keystone class initialization
 */
/**
 * Hook that returns URL parameters without validation
 */
export const useUrlParams = (): UrlParamsProps => {
  const params = useParams()

  return {
    actionId: params.actionId?.toString(),
    appId: params.appId?.toString(),
    authGuardId: params.authGuardId?.toString(),
    componentId: params.componentId?.toString(),
    interfaceId: params.interfaceId?.toString(),
    pageId: params.pageId?.toString(),
    resourceId: params.resourceId?.toString(),
  }
}

/**
 * Make the return data lazy, so we have type safety while allowing un-used values to not throw error
 *
 * Only use this at top level
 *
 * Do no use in mobx since `tweakPlainObject` will access all properties during keystone class initialization
 */
export const useValidatedUrlParams = (): ValidatedUrlParamsProps => {
  /**
   * params cannot be known during pre-rendering of a page that doesn't use getServerSideProps
   *
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#behavior
   */
  const params = useUrlParams()

  return {
    get actionId() {
      if (!params.actionId) {
        throw new Error('actionId is required')
      }

      return params.actionId
    },
    get appId() {
      if (!params.appId) {
        throw new Error('appId is required')
      }

      return params.appId
    },
    get authGuardId() {
      if (!params.authGuardId) {
        throw new Error('authGuardId is required')
      }

      return params.authGuardId
    },
    get componentId() {
      if (!params.componentId) {
        throw new Error('componentId is required')
      }

      return params.componentId
    },
    get interfaceId() {
      if (!params.interfaceId) {
        throw new Error('interfaceId is required')
      }

      return params.interfaceId
    },
    get pageId() {
      if (!params.pageId) {
        throw new Error('pageId is required')
      }

      return params.pageId
    },
    get resourceId() {
      if (!params.resourceId) {
        throw new Error('resourceId is required')
      }

      return params.resourceId
    },
  }
}
