import type { TreeViewSearchParams } from '@codelab/frontend/abstract/types'

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

export type IFieldCreateRouteLazyContext = ({
  interfaceId,
}: {
  interfaceId: string
}) => IFieldCreateRouteContext

export type IFieldUpdateRouteContext =
  | {
      type: IRouteType.Atom | IRouteType.Type
      params: {
        fieldId: string
      }
      searchParams: TreeViewSearchParams
    }
  | {
      type: IRouteType.Component
      params: { componentId: string; fieldId: string }
      searchParams: TreeViewSearchParams
    }
  | {
      type: IRouteType.Page
      params: {
        fieldId: string
        appId: string
        pageId: string
      }
      searchParams: TreeViewSearchParams
    }

/**
 * Inner-most function may map fields over api, which means we don't have access to field until it's mapped
 */
export type IFieldUpdateRouteLazyContext = ({
  fieldId,
}: {
  fieldId: string
}) => IFieldUpdateRouteContext

export type IFieldRouteContext =
  | IBuilderRouteContext
  | {
      type: IRouteType.Atom | IRouteType.Type
      // eslint-disable-next-line @typescript-eslint/ban-types
      params: {}
    }
