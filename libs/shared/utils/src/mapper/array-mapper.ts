import { Mapper } from './mapper.interface'

export class ArrayMapper<
  TIn extends Record<string, any>,
  TOut,
  TContext = unknown,
> implements Mapper<Array<TIn> | null | undefined, Array<TOut>, TContext>
{
  constructor(private mapper: Mapper<TIn, TOut>) {}

  async map(
    input: Array<TIn> | undefined | null,
    context?: TContext,
  ): Promise<Array<TOut>> {
    if (!input || !input.length) {
      return []
    }

    return Promise.all(input.map((item) => this.mapper.map(item, context)))
  }
}
