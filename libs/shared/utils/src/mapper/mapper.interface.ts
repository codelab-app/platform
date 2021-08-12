export interface Mapper<TIn, TOut, TContext = unknown> {
  map(input: TIn, context?: TContext): Promise<TOut> | TOut
}
