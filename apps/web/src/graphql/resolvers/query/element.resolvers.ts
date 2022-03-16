import { IResolvers } from '@graphql-tools/utils'
import { uniq } from 'lodash'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import { QueryElementGraphArgs } from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'
import { elementSelectionSet } from '../selectionSets/elementSelectionSet'

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
