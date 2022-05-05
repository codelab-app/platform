import {
  DeleteInfo,
  MutationDeleteStoresArgs,
} from '@codelab/shared/abstract/codegen'
import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { StoreOGM } from '../../infra/model'
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
  const $stores = from(StoreOGM().then((Store) => Store.find({ where })))

  return $stores.pipe(
    mergeMap((stores) =>
      storeRepository.deleteStoresSubgraph(
        txn,
        stores.map((x) => x.id),
      ),
    ),
  )
}
