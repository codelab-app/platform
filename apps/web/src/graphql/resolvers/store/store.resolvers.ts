import { from, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import {
  DeleteInfo,
  MutationDeleteStoresArgs,
  StoreGraph,
} from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import { storeSelectionSet } from '../../selectionSets'
import { IRxTxnResolver } from '../abstract'

export const deleteStoresSubgraph: IRxTxnResolver<
  MutationDeleteStoresArgs,
  DeleteInfo
> =
  ({ where }) =>
  (txn) => {
    if (!where) {
      throw new Error('No argument provided for delete operation')
    }

    const $stores = from(
      Store().then((StoreModel) => StoreModel.find({ where })),
    )

    return $stores.pipe(
      mergeMap((stores) =>
        storeRepository.deleteStoresSubgraph(
          txn,
          stores.map((x) => x.id),
        ),
      ),
    )
  }

export const storesGraphs: IRxTxnResolver<void, StoreGraph> = () => (txn) =>
  storeRepository.getStoresGraphsEdges(txn).pipe(
    mergeMap(({ edges }) => {
      const $vertices = from(
        Store().then((StoreModel) =>
          StoreModel.find({ selectionSet: storeSelectionSet }),
        ),
      )

      return $vertices.pipe(mergeMap((vertices) => of({ edges, vertices })))
    }),
  )
