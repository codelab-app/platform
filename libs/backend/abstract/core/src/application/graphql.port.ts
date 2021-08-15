/**
 * This is the Graphql port, we need to implement this to plug into Graphql
 */ import { InferPromise, MaybeArray } from '@codelab/shared/utils'

export interface GraphqlPort<TIn, TOut> {
  map: (input: MaybeArray<TIn>) => InferPromise<TIn, MaybeArray<TOut>>
}

// /**
//  * Overload if array input
//  */
// export interface GraphqlPort<TIn extends Array<any>, TOut extends Array<any>> {
//   map: (data: UnboxArray<TIn>) => UnboxArray<TOut>
// }
