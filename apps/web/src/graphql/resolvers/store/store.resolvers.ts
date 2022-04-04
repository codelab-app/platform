import { from, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import {
  DeleteInfo,
  MutationDeleteStoresArgs,
  QueryStoreGraphsArgs,
} from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import { storeSelectionSet } from '../../selectionSets'
import { IRxTxnResolver } from '../abstract'

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

export const storesGraphs: IRxTxnResolver<QueryStoreGraphsArgs, DeleteInfo> =
  (parent, args, context, info) => (txn) =>
    storeRepository.getStoresGraphsEdges(txn, args).pipe(
      mergeMap(({ edges }) => {
        const $vertices = from(
          Store().then((StoreModel) =>
            StoreModel.find({ selectionSet: storeSelectionSet }),
          ),
        )

        return $vertices.pipe(mergeMap((vertices) => of({ edges, vertices })))
      }),
    )
