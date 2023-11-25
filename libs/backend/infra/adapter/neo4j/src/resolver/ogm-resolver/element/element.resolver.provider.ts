import type { IRef } from '@codelab/shared/abstract/core'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import { OgmService } from '../../../infra'
import { Neo4jService } from '../../../infra/neo4j.service'
import { getDescendantElements } from '../../utils'
import { ELEMENT_RESOLVER_PROVIDER } from './element.constant'
import { getDependantTypes } from './util/get-dependant-types'

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<IRef, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const descendantElements: IFieldResolver<IRef, unknown> = (parent) =>
      getDescendantElements(neo4jService, ogmService, parent)

    const dependantTypes: IFieldResolver<IRef, unknown> = (parent) =>
      getDependantTypes(neo4jService, ogmService, parent)

    return {
      Element: {
        dependantTypes,
        descendantElements,
      },
    }
  },
}
