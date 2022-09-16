/**
 * A generic unique where filter used by many models
 */
export type BaseUniqueWhere =
  | {
      id: string
    }
  | {
      name: string
    }

export type FieldUniqueWhere =
  | {
      id: string
    }
  | {
      key: string
    }
