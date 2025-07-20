import type { Identity, ObjectLike } from '@codelab/shared-abstract-types'

/**
 * Helper type to compute merged params
 */

type MergeRouteParams<Route, ExtraParams extends ObjectLike> = Route extends {
  params: infer P
}
  ? Identity<{ params: Identity<P & ExtraParams> }>
  : Identity<{ params: ExtraParams }>

/**
 * Utility type to add param object to all route types
 */
export type MergeParam<Route, ExtraParam extends ObjectLike> = Route extends {
  type: infer T
  searchParams: infer S
}
  ? Identity<{ type: T; searchParams: S } & MergeRouteParams<Route, ExtraParam>>
  : never

// Helper type to distribute over union
export type DistributeUnion<T, U extends ObjectLike> = T extends unknown
  ? MergeParam<T, U>
  : never
