import { IResolvers } from '@graphql-tools/utils'
import { typename } from './atom-typename'

export const atomResolver: IResolvers = {
  Atom: {
    // __typename: typename,
  },
}
