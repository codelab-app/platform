import { withReadTransactionResolver } from '@codelab/backend/infra/adapter/neo4j'
import type { IResolvers } from '@graphql-tools/utils'
import { elementDescendants, elementSlug } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    descendantElements: withReadTransactionResolver(elementDescendants),
    slug: elementSlug,
  },
}

export * from './element.resolver'
