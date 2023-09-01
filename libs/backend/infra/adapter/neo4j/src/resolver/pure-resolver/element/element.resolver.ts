import type { IResolvers } from '@graphql-tools/utils'
import { name } from './field/element-name'
import { slug } from './field/element-slug'
import { refKey } from './field/ref-key'
import { renderType } from './field/render-type'

export const elementResolver: IResolvers = {
  Element: {
    name,
    refKey,
    renderType,
    slug,
  },
  Mutation: {},
  Query: {},
}
