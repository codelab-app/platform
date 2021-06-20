export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface IDgraphMapper<TIn, TOut, TContext = unknown> {
  // Takes in DeepPartial on purpose, because we might not get all fields with a dql query
  map(input: DeepPartial<TIn>, context?: TContext): Promise<TOut> | TOut
}

export class DgraphArrayMapper<
  TIn extends Record<string, any>,
  TOut,
  TContext = unknown,
> implements
    IDgraphMapper<Array<TIn> | null | undefined, Array<TOut>, TContext>
{
  constructor(private mapper: IDgraphMapper<TIn, TOut>) {}

  async map(
    input: Array<DeepPartial<TIn>> | undefined | null,
    context?: TContext,
  ): Promise<Array<TOut>> {
    if (!input || !input.length) {
      return []
    }

    return Promise.all(input.map((item) => this.mapper.map(item, context)))
  }
}
