import { InferPromise } from '@codelab/shared/abstract/types'

/**
 * This is the Graphql port, we need to implement this to plug into Graphql
 */
export interface GraphqlPort<TIn, TOut> {
  map: (list: Array<TIn>) => InferPromise<Array<TIn>, Array<TOut>>
  mapItem: (item: TIn) => InferPromise<TIn, TOut>
}
