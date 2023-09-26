import type { IResolvers } from '@graphql-tools/utils'
import { name } from './field/element-name'
import { slug } from './field/element-slug'
import { renderType } from './field/render-type'
import { ContainerNode } from '@codelab/shared/abstract/codegen'

export const elementResolver: IResolvers = {
  Element: {
    name,
    renderType,
    slug,
  },
  ElementRenderType: {
    __resolveType: (node: ContainerNode) => {
      console.log('__resolveType', node)
      return node.__typename
    },
  },
  Mutation: {},
  Query: {},
}
