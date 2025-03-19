import type { IBuilderRouteContext } from '../builder'
import type { IRouteType } from '../shared'

/**
 * `CreateFieldPopover` can be used in 4 places
 */
export type IFieldCreateRouteContext =
  | {
      type: IRouteType.Atom | IRouteType.Type
      params: {
        interfaceId: string
      }
    }
  | {
      type: IRouteType.Component
      params: { componentId: string; interfaceId: string }
    }
  | {
      type: IRouteType.Page
      params: {
        interfaceId: string
        appId: string
        pageId: string
      }
    }

export type IFieldUpdateRouteContext =
  | {
      type: IRouteType.Component
      params: { componentId: string; fieldId: string }
    }
  | {
      type: IRouteType.Page
      params: {
        fieldId: string
        appId: string
        pageId: string
      }
    }
  | {
      type: IRouteType.Type
      params: {
        fieldId: string
      }
    }

export type IFieldRouteContext =
  | IBuilderRouteContext
  | {
      type: IRouteType.Atom | IRouteType.Type
      // eslint-disable-next-line @typescript-eslint/ban-types
      params: {}
    }
