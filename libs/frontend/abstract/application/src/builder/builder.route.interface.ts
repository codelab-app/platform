import type { ObjectLike } from '@codelab/shared/abstract/types'

import type { ComponentContextParams } from '../component'
import type { PageContextParams } from '../page'
import type { IRouteType } from '../shared'

export type BuilderContextParams = ComponentContextParams & PageContextParams

// eslint-disable-next-line @typescript-eslint/ban-types
export type IBuilderRouteContext<T extends ObjectLike = {}> =
  | {
      type: IRouteType.Component
      params: ComponentContextParams & T
    }
  | {
      type: IRouteType.Page
      params: PageContextParams<T>
    }
