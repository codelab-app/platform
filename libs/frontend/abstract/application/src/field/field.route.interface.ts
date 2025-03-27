/* eslint-disable @typescript-eslint/ban-types */
import type {
  DistributeUnion,
  TreeViewSearchParams,
} from '@codelab/frontend/abstract/types'
import type { Identity } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'

import type { IBuilderRoute } from '../builder'
import type { IRouteType } from '../shared'

/**
 * Base routes
 */
export type IFieldRoute =
  | {
      type: IRouteType.Atom
      searchParams: TreeViewSearchParams
    }
  | {
      type: IRouteType.Component
      searchParams: TreeViewSearchParams
      params: { componentId: string }
    }
  | {
      type: IRouteType.Page
      searchParams: TreeViewSearchParams
      params: {
        appId: string
        pageId: string
      }
    }
  | {
      type: IRouteType.Type
      searchParams: TreeViewSearchParams
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
export type IFieldUpdateRouteLazy = ({
  fieldId,
}: {
  fieldId: string
}) => IFieldUpdateRoute
