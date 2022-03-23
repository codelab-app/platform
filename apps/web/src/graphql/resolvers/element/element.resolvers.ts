import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import {
  MutationDeleteElementsArgs,
  MutationDuplicateElementArgs,
  QueryElementGraphArgs,
} from '../../ogm-types.gen'
import { elementRepository } from '../../repositories/element'
import { elementSelectionSet } from '../../selectionSets'

const driver = getDriver()

export const elementGraph: IFieldResolver<
  any,
  any,
  QueryElementGraphArgs
> = async (parent, args) => {
  const session = driver.rxSession()

  const $elementGraph = session.readTransaction((txn) =>
    elementRepository.getElementGraph(txn, args.input.rootId),
  )

  return await $elementGraph.toPromise()
}

export const duplicateElement: IFieldResolver<
  any,
  any,
  MutationDuplicateElementArgs
> = async (parent, args) => {
  const session = driver.rxSession()
  const { elementId } = args.input

  const { ids } = await session
    .writeTransaction((txn) =>
      elementRepository.duplicateElement(txn, elementId),
    )
    .toPromise()
    .finally(() => session.close())

  const elements = (await Element()).find({
    where: { id_IN: ids },
    selectionSet: elementSelectionSet,
  })

  return { elements }
}

export const deleteElementsSubgraph: IFieldResolver<
  any,
  any,
  MutationDeleteElementsArgs
> = async (parent, args) => {
  const session = driver.rxSession()

  if (!args.where) {
    throw new Error('No argument provided for delete operation')
  }

  const elements = await (await Element()).find({ where: args.where })
  const ids = elements.map((x) => x.id)

  return await session
    .writeTransaction((txn) =>
      elementRepository.deleteElementsSubgraph(txn, ids),
    )
    .toPromise()
    .finally(() => session.close())
}
