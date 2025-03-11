import type {
  Component,
  ComponentFragment,
  TypeFragment,
} from '@codelab/shared/infra/gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/legacy/helpers/types'

import { ComponentElementsService } from '@codelab/backend/domain/component'
import { ElementDependantTypesService } from '@codelab/backend/domain/element'
import { ComponentProperties } from '@codelab/shared-domain-module/component'

export const COMPONENT_RESOLVER_PROVIDER = 'COMPONENT_RESOLVER_PROVIDER'

export const ComponentResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ComponentElementsService, ElementDependantTypesService],
  provide: COMPONENT_RESOLVER_PROVIDER,
  useFactory: async (
    componentElementsService: ComponentElementsService,
    elementDependantTypesService: ElementDependantTypesService,
  ) => {
    const name: IFieldResolver<Component, unknown> =
      ComponentProperties.componentNameFromCompositeKey

    const slug: IFieldResolver<Component, unknown> = (component) => {
      return ComponentProperties.componentSlugFromCompositeKey(component)
    }

    const elements: IFieldResolver<ComponentFragment, unknown> = async (
      parent,
    ) => componentElementsService.getElements(parent)

    const dependantTypes: IFieldResolver<
      Component,
      unknown,
      unknown,
      Promise<Array<TypeFragment>>
    > = (component) =>
      elementDependantTypesService.getDependantTypes(component.rootElement)

    return {
      Component: {
        dependantTypes,
        elements,
        name,
        slug,
      },
      Mutation: {},
      Query: {},
    }
  },
}
