import type { IRef } from '@codelab/shared/abstract/core'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { Node } from 'neo4j-driver'
import { tagDescendants } from '../../../cypher'
import { Neo4jService, OgmService } from '../../../infra'
import { tagSelectionSet } from '../../../selectionSet'
import { TAG_RESOLVER_PROVIDER } from './tag.constant'

export const TagResolverProvider: FactoryProvider<
  Promise<IResolvers<IRef, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: TAG_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const descendants: IFieldResolver<IRef, unknown> = (parent) =>
      neo4jService.withReadTransaction(async (txn) => {
        /**
         * We can still use the same query, but we get ID from context instead
         */
        const { records } = await txn.run(tagDescendants, { rootId: parent.id })

        return (
          await Promise.all(
            records[0]?.get(0).map(async (descendant: Node) => {
              const id = descendant.properties['id']

              const tag = await ogmService.Tag.find({
                selectionSet: `{ ${tagSelectionSet} }`,
                where: { id },
              })

              return tag
            }),
          )
        ).flat()
      })

    return {
      Tag: {
        descendants,
      },
    }
  },
}
