import { uniq } from 'lodash'
import { from, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import { QueryStoreGraphArgs, StoreGraph } from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  RxTransactionType,
  withRxTransaction,
} from '../abstract'

const getStoreGraphResolver: IRxTxnResolver<QueryStoreGraphArgs, StoreGraph> =
  ({ input }) =>
  (txn) =>
    storeRepository.getStoreGraphEdges(txn, input.rootId).pipe(
      mergeMap(({ edges }) => {
        // get root store if not edge is found
        const storeIds = edges.length
          ? uniq(edges.flatMap((x) => [x.source, x.target]))
          : [input.rootId]

        // load vertices
        const $vertices = from(
          Store().then((StoreModel) =>
            StoreModel.find({ where: { id_IN: storeIds } }),
          ),
        )

        return $vertices.pipe(mergeMap((vertices) => of({ edges, vertices })))
      }),
    )

export const storeGraph = withRxTransaction(
  getStoreGraphResolver,
  RxTransactionType.READ,
)
