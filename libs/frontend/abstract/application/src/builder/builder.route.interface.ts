import type { TreeViewSearchParams } from '@codelab/frontend/abstract/types'
import type {
  ObjectLike,
  UnknownObjectLike,
} from '@codelab/shared/abstract/types'

import type { ComponentContextParams } from '../component'
import type { PageContextParams } from '../page'
import type { IRouteType } from '../shared'

export type BuilderContextParams<T extends ObjectLike = UnknownObjectLike> =
  ComponentContextParams & PageContextParams<T>

export type IBuilderRoute<T extends ObjectLike = UnknownObjectLike> =
  | {
      type: IRouteType.Component
      params: ComponentContextParams<T>
      searchParams: TreeViewSearchParams
    }
  | {
      type: IRouteType.Page
      params: PageContextParams<T>
      searchParams: TreeViewSearchParams
    }
