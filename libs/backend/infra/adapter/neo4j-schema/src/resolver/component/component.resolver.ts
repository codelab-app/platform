import type { GqlContext } from '@codelab/backend-abstract-types'
import type {
  Component,
  ComponentFragment,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { ComponentElementsService } from '@codelab/backend-domain-component'
import { ComponentProperties } from '@codelab/shared-domain-module-component'

export const COMPONENT_RESOLVER_PROVIDER = 'COMPONENT_RESOLVER_PROVIDER'

export const ComponentResolverProvider: FactoryProvider<
  Promise<IResolvers<GqlContext, unknown>>
> = {
  inject: [ComponentElementsService],
  provide: COMPONENT_RESOLVER_PROVIDER,
  useFactory: async (
    componentElementsService: ComponentElementsService,
  ) => {
    const name: IFieldResolver<Component, GqlContext> =
      ComponentProperties.componentNameFromCompositeKey

    const slug: IFieldResolver<Component, GqlContext> = (component) => {
      return ComponentProperties.componentSlugFromCompositeKey(component)
    }

    const elements: IFieldResolver<ComponentFragment, GqlContext> = async (
      parent,
    ) => componentElementsService.getElements(parent)

    const dependantTypes: IFieldResolver<
      Component,
      GqlContext,
      unknown,
      Promise<Array<TypeFragment>>
    > = (component, _args, context) => {
      return context.loaders.elementDependantTypesLoader.load(
        component.rootElement.id,
      )
    }

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
