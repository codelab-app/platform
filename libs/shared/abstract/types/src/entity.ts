export interface IEntity {
  id: string
}

/**
 * Allows us to know the subtype
 */
export interface IDiscriminatedEntity<T extends string> extends IEntity {
  __typename?: T
}
