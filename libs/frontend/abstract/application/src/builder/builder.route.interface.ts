import type { IRouteType } from '../shared'

export type IBuilderRouteContext =
  | {
      type: IRouteType.Component
      params: ComponentContextParams
    }
  | {
      type: IRouteType.Page
      params: PageContextParams
    }
