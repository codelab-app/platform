import type { IResolvers } from '@graphql-tools/utils'
import { refKey } from './field/ref-key'
import { renderType } from './field/render-type'

export const elementResolver: IResolvers = {
  Element: {
    refKey,
    renderType,
  },
  Mutation: {},
  Query: {},
}
