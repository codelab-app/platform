import { InferPromise } from '@codelab/shared/abstract/types'
import { GraphqlPort } from './graphql.port'

export abstract class BaseAdapter<TIn, TOut> implements GraphqlPort<TIn, TOut> {
  /**
   * Maps from possible array input to it's corresponding output time
   *
   * We infer the output from the input type, otherwise the output would be Array<TOut> | TOut
   */
  public map(list: Array<TIn>) {
    return list.map((item) => this.mapItem(item)) as InferPromise<
      Array<TIn>,
      Array<TOut>
    >
  }

  /**
   * Maps a single item, this is the function we implement. The base class will use this to map maybe arrays
   */
  abstract mapItem(item: TIn): InferPromise<TIn, TOut>
}
