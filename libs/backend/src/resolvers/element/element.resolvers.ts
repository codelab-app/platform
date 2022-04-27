import { QueryElementGraphArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver } from '../../infra'
import { elementRepository } from '../../repositories'

export const elementGraph: IFieldResolver<
  any,
  any,
  QueryElementGraphArgs
> = async (parent, args) => {
  const driver = getDriver()
  const session = driver.rxSession()

  const $elementGraph = session.readTransaction((txn) =>
    elementRepository.getElementGraph(txn, args.input.rootId),
  )

  return await $elementGraph.toPromise()
}
