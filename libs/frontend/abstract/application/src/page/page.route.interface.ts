import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'

import type { IRouteType } from '../shared'

export interface IPageBuilderRouteContext {
  params: PageContextParams
  type: IRouteType.Page
}

/**
 * These are all required because we are in context where these have been validated and needed
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageContextParams<T extends object = {}> = Pick<
  ValidatedUrlParamsProps,
  'appId' | 'pageId'
> &
  T
