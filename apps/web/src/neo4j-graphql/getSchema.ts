import { Neo4jGraphQL } from '@neo4j/graphql'
import { Driver } from 'neo4j-driver'
import typeDefs from './type-defs'

export const getSchema = (driver: Driver) =>
  new Neo4jGraphQL({ typeDefs, driver })
