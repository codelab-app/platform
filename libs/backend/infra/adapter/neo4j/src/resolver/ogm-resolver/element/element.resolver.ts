import type { IResolvers } from '@graphql-tools/utils'
import { descendantElementsFieldResolver } from './field/descedant-elements'

export const elementResolver: IResolvers = {
  Element: {
    descendantElements: descendantElementsFieldResolver,
  },
  Mutation: {},
  Query: {},
}
