export type BaseUniqueWhere =
  | {
      [key: string]: unknown
    }
  | {
      id: string
    }

export type BaseTypeUniqueWhere =
  | BaseUniqueWhere
  | {
      name: string
    }

export type UserWhere =
  | BaseUniqueWhere
  | { auth0Id: string }
  | { email: string }

export type BaseTypeUniqueWhereCallback<T, R = BaseTypeUniqueWhere> = (
  data: T,
) => R
