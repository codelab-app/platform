import { DeleteFieldInput } from '@codelab/shared/abstract/codegen-v2'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { RxTransaction } from 'neo4j-driver'
import { getDriver } from '../../../infra/driver'
import { DisconnectFieldResponse, typeRepository } from '../../../repositories'

const driver = getDriver()

export const deleteFieldEdge =
  ({ key, interfaceId }: DeleteFieldInput) =>
  (txn: RxTransaction) =>
    typeRepository.disconnectField(txn, interfaceId, key)

export interface DeleteFieldEdgeResolverArgs {
  input: DeleteFieldInput
}

/**
 * A custom resolver is needed because the regular one deletes every edge between the given types.
 * So if the interface has two fields with the same target type, they will get deleted at the same time
 *
 * This is a no-op if there is no edge between the given types and it returns 0 as the deleted count
 */
export const deleteFieldEdgeResolver: IFieldResolver<
  any,
  any,
  DeleteFieldEdgeResolverArgs,
  Promise<DisconnectFieldResponse>
> = async (_, { input }) => {
  const session = driver.rxSession()

  return session
    .writeTransaction(deleteFieldEdge(input))
    .toPromise()
    .catch((error) => {
      console.error(`deleteFieldEdgeResolver:`, error)
      throw error
    })
    .finally(() => session.close())
}
