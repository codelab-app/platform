import { IResolvers } from '@graphql-tools/utils'
import { elementRepository } from '../../cypher/element/elementRepository'
<<<<<<< HEAD
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import {
  MutationDeleteElementsArgs,
  MutationDuplicateElementArgs,
} from '../../ogm-types.gen'
import { elementSelectionSet } from '../selectionSets/elementSelectionSet'
=======
import { elementSelectionSet } from '../../cypher/element/elementSelectionSet'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import { MutationDuplicateElementArgs } from '../../ogm-types.gen'
>>>>>>> 554af699 (feat: use reslovers for elements graph)

const driver = getDriver()

export const elementResolvers: IResolvers = {
  duplicateElement: async (_source, args: MutationDuplicateElementArgs) => {
    const session = driver.rxSession()
    const { elementId } = args.input

    const { ids } = await session
      .writeTransaction((txn) =>
        elementRepository.duplicateElement(txn, elementId),
      )
      .toPromise()
      .finally(() => session.close())

    const elements = Element().find({
      where: { id_IN: ids },
      selectionSet: elementSelectionSet,
    })

    return { elements }
  },
<<<<<<< HEAD
  deleteElementsSubgraph: async (_source, args: MutationDeleteElementsArgs) => {
    const session = driver.rxSession()

    if (!args.where) {
      throw new Error('No argument provided for delete operation')
    }

    const elements = await Element().find({ where: args.where })
    const ids = elements.map((x) => x.id)

    return await session
      .writeTransaction((txn) =>
        elementRepository.deleteElementsSubgraph(txn, ids),
      )
      .toPromise()
      .finally(() => session.close())
  },
=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
}
