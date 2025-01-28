export type BaseWhere =
  | {
      [key: string]: unknown
    }
  | {
      id: string
    }

export type BaseTypeUniqueWhere =
  | BaseWhere
  | {
      name: string
    }

export type UserWhere =
  | BaseTypeUniqueWhere
  | { auth0Id: string }
  | { email: string }

export type BaseTypeWhereCallback<T, R = BaseTypeUniqueWhere> = (data: T) => R
