import type {
  TreeViewClientProps,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type {
  ObjectLike,
  UnknownObjectLike,
} from '@codelab/shared/abstract/types'

import type { IRouteType } from '../shared'

export interface IPageBuilderRoute {
  params: PageContextParams
  searchParams: TreeViewClientProps
  type: IRouteType.Page
}

/**
 * These are all required because we are in context where these have been validated and needed
 */

export type PageContextParams<T extends ObjectLike = UnknownObjectLike> = Pick<
  UrlParams,
  'appId' | 'pageId'
> &
  T
