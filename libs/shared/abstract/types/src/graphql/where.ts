export type BaseUniqueWhere =
  | {
      id: string
    }
  | {
      [key: string]: unknown
    }

export type BaseTypeUniqueWhere =
  | {
      name: string
    }
  | BaseUniqueWhere

export type UserWhere =
  | BaseUniqueWhere
  | { auth0Id: string }
  | { email: string }

export type BaseTypeUniqueWhereCallback<T, R = BaseTypeUniqueWhere> = (
  data: T,
) => R
