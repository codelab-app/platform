export type WithMaybeChildren<T> = T & {
  children?: Array<WithMaybeChildren<T>>
}
