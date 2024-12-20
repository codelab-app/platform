import type { Neo4jService } from '@codelab/backend-infra-adapter/neo4j-driver'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Element } from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { ElementDependantTypesService } from '@codelab/backend/domain/element'

import { name } from './field/element-name'
import { slug } from './field/element-slug'

export const ELEMENT_RESOLVER_PROVIDER = 'ELEMENT_RESOLVER_PROVIDER'

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ElementDependantTypesService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (
    elementDependantTypesService: ElementDependantTypesService,
  ) => {
    const dependantTypes: IFieldResolver<Element, unknown> = async (
      element,
    ) => {
      return await elementDependantTypesService.getDependantTypes(element)
    }

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
