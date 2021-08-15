export type MaybeArray<T> = T | Array<T>

export type UnboxArray<T> = T extends Array<infer U> ? U : T
