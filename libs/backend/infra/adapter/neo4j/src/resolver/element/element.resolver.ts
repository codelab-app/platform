import type { IResolvers } from '@graphql-tools/utils'
import { descendantElementsFieldResolver } from './field/descedant-elements'
import { renderType } from './field/render-type'

export const elementResolver: IResolvers = {
  Element: {
    descendantElements: descendantElementsFieldResolver,
    renderType,
  },
  Mutation: {},
  Query: {},
}
