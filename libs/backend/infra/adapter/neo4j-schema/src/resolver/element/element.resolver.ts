import type { IRef } from '@codelab/shared/abstract/core'
import type { Element } from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { ElementRepository } from '@codelab/backend/domain/element'
import {
  getElementDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'

import { name } from './field/element-name'
import { slug } from './field/element-slug'

export const ELEMENT_RESOLVER_PROVIDER = 'ELEMENT_RESOLVER_PROVIDER'

export const elementDescendants =
  (neo4jService: Neo4jService, elementRepository: ElementRepository) =>
  (element: Element) => {
    return neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDescendants, {
        rootId: element.id,
      })

      const descendantIds = records[0]?.get(0) || []

      return elementRepository.find({
        where: { id_IN: [element.id].concat(descendantIds) },
      })
    })
  }

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService, ElementRepository],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (
    neo4jService: Neo4jService,
    elementRepository: ElementRepository,
  ) => {
    // TODO: Implement this
    const dependantTypes: IFieldResolver<IRef, unknown> = (parent) => []
    // getDependantTypes(neo4jService, parent)

    return {
      Element: {
        __typename: 'Element',
        dependantTypes,
        name,
        // renderType,
        slug,
      },
      ElementRenderType: {
        __resolveType: (node: Element) => {
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
  },
}
