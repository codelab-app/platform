import type { Component, ComponentFragment } from '@codelab/shared/infra/gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/legacy/helpers/types'

import { ComponentElementsService } from '@codelab/backend/domain/component'
import { ComponentProperties } from '@codelab/shared-domain-module/component'

export const COMPONENT_RESOLVER_PROVIDER = 'COMPONENT_RESOLVER_PROVIDER'

export const ComponentResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ComponentElementsService],
  provide: COMPONENT_RESOLVER_PROVIDER,
  useFactory: async (componentElementsService: ComponentElementsService) => {
    const name: IFieldResolver<Component, unknown> =
      ComponentProperties.componentNameFromCompositeKey

    const slug: IFieldResolver<Component, unknown> = (component) => {
      return ComponentProperties.componentSlugFromCompositeKey(component)
    }

    const elements: IFieldResolver<ComponentFragment, unknown> = async (
      parent,
    ) => componentElementsService.getElements(parent)

    return {
      Component: {
        elements,
        name,
        slug,
      },
      Mutation: {},
      Query: {},
    }
  },
}
