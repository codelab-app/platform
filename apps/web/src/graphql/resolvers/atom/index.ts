import { IResolvers } from '@graphql-tools/utils'
import { withRxTransaction } from '../abstract/withRxTransaction'
import { exportAtom } from './atom.resolvers'

export const atomResolver: IResolvers = {
  Mutation: {},
  Query: {
    exportAtom: withRxTransaction(exportAtom),
  },
}
