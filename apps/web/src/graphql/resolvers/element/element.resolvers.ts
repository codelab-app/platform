import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver } from '../../infra/driver'
import { Element } from '../../model'
import {
  MutationDeleteElementsArgs,
  QueryElementGraphArgs,
} from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'

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
