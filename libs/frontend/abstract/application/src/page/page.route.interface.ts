import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'

import type { IRouteType } from '../shared'

export interface IPageBuilderRouteContext {
  params: PageContextParams
  type: IRouteType.Page
}

/**
 * These are all required because we are in context where these have been validated and needed
 */

export type PageContextParams = Pick<
  ValidatedUrlParamsProps,
  'appId' | 'pageId'
>
