export type ErrorFactory<TIn = never> = (
  ...args: TIn extends never ? [] : [TIn]
) => Error
