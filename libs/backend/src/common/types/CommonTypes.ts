export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ByUniqueId = {
  id: string
}

export type ByCondition = {
  [key: string]: any
}

export const isId = (value: ByUniqueId | ByCondition): value is ByUniqueId => {
  return typeof (value as ByUniqueId).id !== 'undefined'
}
