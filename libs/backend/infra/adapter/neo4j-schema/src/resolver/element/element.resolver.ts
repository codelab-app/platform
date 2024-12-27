import type {
  Element,
  ElementRenderType,
  ElementRenderTypeFragment,
} from '@codelab/shared/infra/gql'
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
        slug,
      },
      ElementRenderType: {
        __resolveType: (
          node: ElementRenderTypeFragment & { __resolveType?: string },
        ) => {
          /**
           * `__resolveType` is there by default, for ones that don't exist, we have __typename
           */
          return node.__resolveType ?? node.__typename
        },
      },
      Mutation: {},
      Query: {},
    }
  },
}
