export type BaseUniqueWhere =
  | {
      id: string
    }
  | {
      name: string
    }

export type BaseUniqueWhereCallback<T> = (data: T) => BaseUniqueWhere
