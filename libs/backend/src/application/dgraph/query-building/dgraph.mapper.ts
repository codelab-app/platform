export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface IDgraphMapper<TIn, TOut> {
  // Takes in DeepPartial on purpose, because we might not get all fields with a dql query
  map(input: DeepPartial<TIn>): Promise<TOut> | TOut
}

export class DgraphArrayMapper<TIn extends Record<string, any>, TOut>
  implements IDgraphMapper<Array<TIn> | null | undefined, Array<TOut>>
{
  constructor(private mapper: IDgraphMapper<TIn, TOut>) {}

  async map(
    input: Array<DeepPartial<TIn>> | undefined | null,
  ): Promise<Array<TOut>> {
    if (!input || !input.length) {
      return []
    }

    return Promise.all(input.map((item) => this.mapper.map(item)))
  }
}
