import type {
  Element,
  ElementRenderTypeFragment,
  TypeFragment,
} from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { ElementDependantTypesService } from '@codelab/backend/domain/element'
import { TypeFactory } from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'

import { name } from './field/element-name'
import { slug } from './field/element-slug'

export const ELEMENT_RESOLVER_PROVIDER = 'ELEMENT_RESOLVER_PROVIDER'

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ElementDependantTypesService, TypeFactory, PinoLoggerService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (
    elementDependantTypesService: ElementDependantTypesService,
    typeFactory: TypeFactory,
    loggerService: PinoLoggerService,
  ) => {
    /**
     * @returns Must return the full properties
     */
    const dependantTypes: IFieldResolver<
      Element,
      unknown,
      unknown,
      Promise<Array<TypeFragment>>
    > = async (element) => {
      const types = await elementDependantTypesService.getDependantTypes(
        element,
      )

      return types
    }

    return {
      Element: {
        dependantTypes,
        name,
        slug,
      },
      ElementRenderType: {
        __resolveType: (
          node: ElementRenderTypeFragment & { __resolveType?: string },
        ) => {
          loggerService.verbose('ElementRenderType', {
            context: 'GraphqlResolver',
            data: node,
          })

          /**
           * `__resolveType` is there by default, for ones that don't exist, we have __typename
           */
          return node.__resolveType ?? node.__typename
        },
      },
    }
  },
}
