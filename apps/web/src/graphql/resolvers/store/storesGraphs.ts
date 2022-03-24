import { from, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import { StoreGraph } from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import { storeSelectionSet } from '../../selectionSets/storeSelectionSet'
import { IRxTxnResolver, withRxTransaction } from '../abstract'

const getStoresGraphsResolver: IRxTxnResolver<void, StoreGraph> = () => (txn) =>
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

export const storesGraphs = withRxTransaction(getStoresGraphsResolver)
