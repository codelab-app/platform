import { DeleteFieldInput } from '@codelab/shared/abstract/codegen-v2'
import { DisconnectFieldResponse, typeRepository } from '../../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../../abstract/withRxTransaction'

export const deleteFieldEdge: IRxTxnResolver<
  DeleteFieldEdgeResolverArgs,
  DisconnectFieldResponse
> =
  ({ input: { key, interfaceId } }) =>
  (txn) =>
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
export const deleteFieldEdgeResolver = withRxTransaction<
  DeleteFieldEdgeResolverArgs,
  DisconnectFieldResponse
>(deleteFieldEdge)

export default deleteFieldEdgeResolver
