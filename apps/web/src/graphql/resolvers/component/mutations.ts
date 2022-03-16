import { IResolvers } from '@graphql-tools/utils'
import { getDriver } from '../../infra/driver'
import { Component } from '../../model'
import {
  ComponentWhere,
  MutationDeleteComponentsArgs,
} from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'
import { componentSelectionSet } from '../selectionSets/componentSelectionSet'

const driver = getDriver()

export const componentMutationsResolvers: IResolvers = {
  deleteComponents: async (_source, args: MutationDeleteComponentsArgs) => {
    const session = driver.rxSession()

    if (!args.where) {
      throw new Error('No argument provided for delete operation')
    }

    const components = await Component().find({
      where: args.where,
      selectionSet: componentSelectionSet,
    })

    const rootElementIds = components.map((x) => x.rootElement.id)

    await session
      .writeTransaction((txn) =>
        elementRepository.deleteElementsSubgraph(txn, rootElementIds),
      )
      .toPromise()
      .finally(() => session.close())

    return Component().delete({
      where: args.where as ComponentWhere,
      rootValue: '',
    })
  },
}
