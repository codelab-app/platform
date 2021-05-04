export type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends object
    ? DeepNonNullable<T[P]>
    : NonNullable<T[P]>
}
