import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'

import type { ComponentContextParams, PageContextParams } from './page-context'

export enum IRouteType {
  Atom = 'Atom',
  Component = 'ComponentBuilder',
  Page = 'PageBuilder',
  Type = 'Type',
}

/**
 * Use discriminated union for cleaner separation of logic, instead of testing for params
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IBuilderRouteContext<TParams extends ObjectLike = {}> =
  | {
      type: IRouteType.Component
      params: Assign<ComponentContextParams, TParams>
    }
  | {
      type: IRouteType.Page
      params: Assign<PageContextParams, TParams>
    }

/**
 * `CreateFieldPopover` can be used in 4 places
 */
export type IFieldCreateRouteContext =
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
  | {
      type: IRouteType.Type
      params: {
        interfaceId: string
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

/**
 * Generic type to extract params from a context type based on route type
 */
export type ExtractRouteContextParams<
  TContext,
  TRouteType extends IRouteType,
> = TContext extends { type: TRouteType; params: infer P } ? P : never
