import {
  InferPromise,
  MaybeArray,
  MaybePromise,
} from '@codelab/shared/abstract/types'
import { GraphqlPort } from './graphql.port'

type AdapterOutput<TIn, TOut> = TIn extends Array<any>
  ? InferPromise<TIn, Array<TOut>>
  : InferPromise<TIn, TOut>

export abstract class BaseAdapter<TIn, TOut> implements GraphqlPort<TIn, TOut> {
  /**
   * Maps from possible array input to it's corresponding output time
   *
   * We infer the output from the input type, otherwise the output would be Array<TOut> | TOut
   */
  public map(input: MaybeArray<TIn> | null) {
    return this.mapMaybeArray(input)
  }

  private mapMaybeArray(input: MaybeArray<TIn> | null) {
    if (Array.isArray(input)) {
      return input.map((item) => this.mapItem(item)) as AdapterOutput<TIn, TOut>
    }

    return this.mapItem(input) as AdapterOutput<TIn, TOut>
  }

  /**
   * Maps a single item, this is the function we implement. The base class will use this to map maybe arrays
   */
  protected abstract mapItem(input: TIn | null): MaybePromise<TOut>
}
