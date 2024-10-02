import type { IPage } from '@codelab/shared/abstract/core'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { OgmService } from '../../../infra'
import { Neo4jService } from '../../../infra/neo4j.service'
import { getElementWithDescendants } from '../../utils'
import { PAGE_RESOLVER_PROVIDER } from './page.constant'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<IPage, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const elements: IFieldResolver<IPage, unknown> = async (parent) => {
      const elementWithDescendants = await getElementWithDescendants(
        neo4jService,
        ogmService,
        parent.rootElement,
      )

      return elementWithDescendants
    }

    return {
      Page: {
        elements,
      },
    }
  },
}
