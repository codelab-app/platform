import { QueryStoreGraphArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver } from '../../infra'
import { storeRepository } from '../../repositories'

export const storeGraph: IFieldResolver<any, any, QueryStoreGraphArgs> = async (
  parent,
  args,
) => {
  const driver = getDriver()
  const session = driver.rxSession()

  const $storeGraph = session.readTransaction((txn) =>
    storeRepository.getStoreGraph(txn, args.input.rootId),
  )

  return await $storeGraph.toPromise()
}
