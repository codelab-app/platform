import type { ContainerNode } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import { closestContainerNodeFieldResolver } from './field/closest-container-node'
import { descendantElementsFieldResolver } from './field/descedant-elements'

export const elementResolver: IResolvers = {
  ContainerNode: {
    __resolveType: (node: ContainerNode) => {
      return node.__typename
    },
  },
  Element: {
    closestContainerNode: closestContainerNodeFieldResolver,
    descendantElements: descendantElementsFieldResolver,
  },
  Mutation: {},
  Query: {},
}
