import type {
  DistributeUnion,
  SearchParamsClientProps,
  TreeViewClientProps,
} from '@codelab/frontend-abstract-types'

import type { IRouteType } from '../shared'

/**
 * Base routes
 */
export type IFieldRoute =
  | {
      type: IRouteType.Atom
      searchParams: SearchParamsClientProps
    }
  | {
      type: IRouteType.Component
      searchParams: TreeViewClientProps
      params: { componentId: string }
    }
  | {
      type: IRouteType.Page
      searchParams: TreeViewClientProps
      params: {
        appId: string
        pageId: string
      }
    }
  | {
      type: IRouteType.Type
      searchParams: SearchParamsClientProps
    }

/**
 * `CreateFieldPopover` can be used in 4 places
 * Utility type to add interfaceId to params of a route
 */

export type IFieldCreateRoute = DistributeUnion<
  IFieldRoute,
  { interfaceId: string }
>

export type IFieldCreateRouteLazy = ({
  interfaceId,
}: {
  interfaceId: string
}) => IFieldCreateRoute

export type IFieldCreateRouteLazyContext = ({
  interfaceId,
}: {
  interfaceId: string
}) => IFieldCreateRoute

export type IFieldUpdateRoute =
  | {
      type: IRouteType.Atom | IRouteType.Type
      params: {
        fieldId: string
      }
      searchParams: SearchParamsClientProps
    }
  | {
      type: IRouteType.Component
      params: { componentId: string; fieldId: string }
      searchParams: TreeViewClientProps
    }
  | {
      type: IRouteType.Page
      params: {
        fieldId: string
        appId: string
        pageId: string
      }
      searchParams: TreeViewClientProps
    }

/**
 * Inner-most function may map fields over api, which means we don't have access to field until it's mapped
 */
export type IFieldUpdateRouteLazy = ({
  fieldId,
}: {
  fieldId: string
}) => IFieldUpdateRoute
