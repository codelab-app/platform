import { withReadTransactionResolver } from '@codelab/backend/infra/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { getAtoms } from './atom.resolver'

export const atomResolver: IResolvers = {
  Mutation: {},
  Query: {
    getAtoms: withReadTransactionResolver(getAtoms),
  },
}

export * from './atom.resolver'
