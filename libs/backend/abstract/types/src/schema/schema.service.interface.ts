import type { GraphQLSchema } from 'graphql'

export const SCHEMA_SERVICE = 'SCHEMA_SERVICE'

export interface ISchemaService {
  closeEngine(): void
  createSchema(): Promise<GraphQLSchema>
}
