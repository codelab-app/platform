import { Txn } from 'dgraph-js-http'

export interface WithTransactionRequest {
  transaction: Txn
}
