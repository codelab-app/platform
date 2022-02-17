import { IResolvers } from '@graphql-tools/utils'
import { elementRepository } from '../../cypher/element/elementRepository'
import { elementSelectionSet } from '../../cypher/element/elementSelectionSet'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import { MutationDuplicateElementArgs } from '../../ogm-types.gen'

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
}
