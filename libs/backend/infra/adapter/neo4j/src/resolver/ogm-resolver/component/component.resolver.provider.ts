import type { IComponent } from '@codelab/shared/abstract/core'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { OgmService } from '../../../infra'
import { Neo4jService } from '../../../infra/neo4j.service'
import { getElementWithDescendants } from '../../utils'
import { COMPONENT_RESOLVER_PROVIDER } from './component.constant'

export const ComponentResolverProvider: FactoryProvider<
  Promise<IResolvers<IComponent, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: COMPONENT_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const elements: IFieldResolver<IComponent, unknown> = async (parent) => {
      const elementWithDescendants = await getElementWithDescendants(
        neo4jService,
        ogmService,
        parent.rootElement,
      )

      return elementWithDescendants
    }

    return {
      Component: {
        elements,
      },
    }
  },
}
