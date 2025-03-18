import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'

import type { ComponentContextParams, PageContextParams } from './page-context'

export enum IRouteType {
  Atom = 'Atom',
  Component = 'ComponentBuilder',
  Page = 'PageBuilder',
  Type = 'Type',
}

export interface IComponentBuilderRouteContext {
  params: ComponentContextParams
  type: IRouteType.Component
}

/**
 * Use discriminated union for cleaner separation of logic, instead of testing for params
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IBuilderRouteContext<TParams extends ObjectLike = {}> =
  | IComponentBuilderRouteContext
  | IPageBuilderRouteContext

/**
 * Generic type to extract params from a context type based on route type
 */
export type ExtractRouteContextParams<
  TContext,
  TRouteType extends IRouteType,
> = TContext extends { type: TRouteType; params: infer P } ? P : never
