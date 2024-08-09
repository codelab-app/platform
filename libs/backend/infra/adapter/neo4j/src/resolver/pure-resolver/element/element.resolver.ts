import type { ContainerNode } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import { name } from './field/element-name'
import { slug } from './field/element-slug'

export const elementResolver: IResolvers = {
  Element: {
    __typename: 'Element',
    // We only use the OGM resolver, but we set a dummy resolver here to hide the console errors
    dependantTypes: [],
    name,
    // renderType,
    slug,
  },
  ElementRenderType: {
    __resolveType: (node: ContainerNode) => {
      /**
       * `__resolveType` is there by default, for ones that don't exist, we have __typename
       */
      const resolveType =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node as any).__resolveType ?? (node as any).__typename

      if (!resolveType) {
        console.debug(node)

        throw new Error('Missing __resolveType')
      }

      return resolveType
    },
  },
  Mutation: {},
  Query: {},
}
