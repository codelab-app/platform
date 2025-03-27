import type { IRouteType } from '../shared'

export type IActionCreateRoute =
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

export type IActionUpdateRoute =
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
