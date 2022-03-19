import { DeleteInfo } from '@neo4j/graphql'
import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Store } from '../../model'
import { MutationDeleteStoresArgs } from '../../ogm-types.gen'
import { storeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  RxTransactionType,
  withRxTransaction,
} from '../abstract'

const deleteStoresSubgraphResolver: IRxTxnResolver<
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

export const deleteStoresSubgraph = withRxTransaction(
  deleteStoresSubgraphResolver,
  RxTransactionType.WRITE,
)
