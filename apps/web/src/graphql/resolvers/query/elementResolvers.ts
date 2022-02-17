import { IResolvers } from '@graphql-tools/utils'
import { uniq } from 'lodash'
import { elementRepository } from '../../cypher/element/elementRepository'
<<<<<<< HEAD
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import { QueryElementGraphArgs } from '../../ogm-types.gen'
import { elementSelectionSet } from '../selectionSets/elementSelectionSet'
=======
import { elementSelectionSet } from '../../cypher/element/elementSelectionSet'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import { QueryElementGraphArgs } from '../../ogm-types.gen'
>>>>>>> 554af699 (feat: use reslovers for elements graph)

const driver = getDriver()

export const elementResolvers: IResolvers = {
  elementGraph: async (_source, args: QueryElementGraphArgs) => {
    Element().find({
      where: {},
    })

    const session = driver.rxSession()
    const { rootId } = args.input

    const { edges } = await session
      .readTransaction((txn) =>
        elementRepository.getElementGraphEdges(txn, rootId),
      )
      .toPromise()
      .finally(() => session.close())

    // get root element if not edge is found
    const elementIds = edges.length
      ? uniq(edges.flatMap((x) => [x.source, x.target]))
      : [rootId]

    const vertices = await Element().find({
      where: { id_IN: elementIds },
      selectionSet: elementSelectionSet,
    })

    return { edges, vertices, rootId }
  },
}
