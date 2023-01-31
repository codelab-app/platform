export type BaseUniqueWhere =
  | {
      name: string
    }
  | {
      id: string
    }

export type BaseUniqueWhereCallback<T, R = BaseUniqueWhere> = (data: T) => R
