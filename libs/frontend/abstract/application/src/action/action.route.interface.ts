import type { IRouteType } from '../shared'

export type IActionCreateRouteContext =
  | {
      type: IRouteType.Component
      params: {
        componentId: string
        storeId: string
      }
    }
  | {
      type: IRouteType.Page
      params: {
        pageId: string
        appId: string
        storeId: string
      }
    }

export type IActionUpdateRouteContext =
  | {
      type: IRouteType.Component
      params: {
        componentId: string
        actionId: string
      }
    }
  | {
      type: IRouteType.Page
      params: {
        pageId: string
        appId: string
        actionId: string
      }
    }
