import { InferPromise, MaybeArray } from '@codelab/shared/abstract/types'

/**
 * This is the Graphql port, we need to implement this to plug into Graphql
 */
export interface GraphqlPort<TIn, TOut> {
  map: (input: MaybeArray<TIn>) => InferPromise<TIn, MaybeArray<TOut>>
}
