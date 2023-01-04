export type BaseUniqueWhere =
  | {
      id: string
    }
  | {
      name: string
    }

export type BaseUniqueWhereCallback<T, R = BaseUniqueWhere> = (data: T) => R
