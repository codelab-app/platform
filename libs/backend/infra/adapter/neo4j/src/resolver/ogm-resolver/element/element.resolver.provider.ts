import type { IEntity } from '@codelab/shared/abstract/types'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { Node } from 'neo4j-driver'
import { getDescendantsCypher } from '../../../cypher'
import { OgmService } from '../../../infra'
import { Neo4jService } from '../../../infra/neo4j.service'
import { elementSelectionSet } from '../../../selectionSet'
import { ELEMENT_RESOLVER_PROVIDER } from './element.constant'

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<IEntity, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const descendantElements: IFieldResolver<IEntity, unknown> = (parent) =>
      neo4jService.withReadTransaction(async (txn) => {
        /**
         * We can still use the same query, but we get ID from context instead
         */
        const { records } = await txn.run(getDescendantsCypher, {
          rootId: parent.id,
        })

        const descendants = (
          await Promise.all(
            records[0]?.get(0).map((descendant: Node) => {
              const id = descendant.properties.id

              const element = ogmService.Element.find({
                selectionSet: `{ ${elementSelectionSet} }`,
                where: { id },
              })

              return element
            }),
          )
        ).flat()

        return descendants
      })

    return {
      Element: {
        descendantElements,
      },
    }
  },
}
