import { Maybe } from './maybe'
import { Nullable } from './nullable'

export type MaybeOrNullable<T> = Maybe<T> | Nullable<T>
