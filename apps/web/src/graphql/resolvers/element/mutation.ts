import { IResolvers } from '@graphql-tools/utils'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import {
  MutationDeleteElementsArgs,
  MutationDuplicateElementArgs,
} from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'
import { elementSelectionSet } from '../selectionSets/elementSelectionSet'

const driver = getDriver()

export const elementMutationsResolvers: IResolvers = {
  duplicateElement: async (_source, args: MutationDuplicateElementArgs) => {
    const session = driver.rxSession()
    const { elementId } = args.input

    const { ids } = await session
      .writeTransaction((txn) =>
        elementRepository.duplicateElement(txn, elementId),
      )
      .toPromise()
      .finally(() => session.close())

    const ElementModel = await Element()

    const elements = ElementModel.find({
      where: { id_IN: ids },
      selectionSet: elementSelectionSet,
    })

    return { elements }
  },
  deleteElementsSubgraph: async (_source, args: MutationDeleteElementsArgs) => {
    const session = driver.rxSession()
    const ElementModel = await Element()

    if (!args.where) {
      throw new Error('No argument provided for delete operation')
    }

    const elements = await ElementModel.find({ where: args.where })
    const ids = elements.map((x) => x.id)

    return await session
      .writeTransaction((txn) =>
        elementRepository.deleteElementsSubgraph(txn, ids),
      )
      .toPromise()
      .finally(() => session.close())
  },
}
