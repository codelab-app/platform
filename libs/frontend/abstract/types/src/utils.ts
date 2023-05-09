export type Callback<TIn, TOut = unknown> = (param: TIn) => TOut

export type WithStyleProp<T extends object> = T & {
  style?: Record<string, number | string>
}
