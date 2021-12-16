import { Injectable } from '@nestjs/common'
import { DgraphClient, Txn } from 'dgraph-js-http'

export type ITransaction = Txn

@Injectable()
export class TransactionManager {
  constructor(protected readonly dgraphClient: DgraphClient) {}

  public generateTransaction(): ITransaction {
    return this.dgraphClient.newTxn()
  }

  public async commitTransaction(transaction: ITransaction): Promise<void> {
    await transaction.commit()
  }

  public async discardTransaction(transaction: ITransaction): Promise<void> {
    await transaction.discard()
  }
}
