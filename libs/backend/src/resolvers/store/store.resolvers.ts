import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import { DeleteInfo, MutationDeleteStoresArgs } from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import { IRxTxnResolver } from '../common'

export const deleteStoresSubgraph: IRxTxnResolver<
  MutationDeleteStoresArgs,
  DeleteInfo
> = (parent, args, context, info) => (txn) => {
  if (!args.where) {
    throw new Error('No argument provided for delete operation')
  }

  const { where } = args
  const $stores = from(Store().then((StoreModel) => StoreModel.find({ where })))

  return $stores.pipe(
    mergeMap((stores) =>
      storeRepository.deleteStoresSubgraph(
        txn,
        stores.map((x) => x.id),
      ),
    ),
  )
}
