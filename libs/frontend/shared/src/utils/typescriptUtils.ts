export type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepNonNullable<T[P]>
    : NonNullable<T[P]>
}
