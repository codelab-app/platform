import { withReadTransactionResolver } from '@codelab/backend/infra/adapter/neo4j'
import type { IResolvers } from '@graphql-tools/utils'
import { atoms } from './atom.resolver'

export const atomResolver: IResolvers = {
  Mutation: {},
  Query: {
    atoms: withReadTransactionResolver(atoms),
  },
}

export * from './atom.resolver'
