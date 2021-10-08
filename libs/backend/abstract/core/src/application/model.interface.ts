/**
 * Generic class for GraphQL ObjectType
 */
export type Model<TModel> = Omit<TModel, '__typename'>
