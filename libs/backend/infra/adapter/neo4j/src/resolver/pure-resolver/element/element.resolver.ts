import type { IResolvers } from '@graphql-tools/utils'
import { renderType } from './field/render-type'

export const elementResolver: IResolvers = {
  Element: {
    renderType,
  },
  Mutation: {},
  Query: {},
}
