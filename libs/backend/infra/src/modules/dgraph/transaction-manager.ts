import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DgraphService } from './dgraph.service'

export type ITransaction = Txn

@Injectable()
export class TransactionManager {
  constructor(protected readonly dgraphService: DgraphService) {}

  public generateTransaction(): ITransaction {
    return this.dgraphService.client.newTxn()
  }

  public async commitTransaction(transaction: ITransaction): Promise<void> {
    await transaction.commit()
  }

  public async discardTransaction(transaction: ITransaction): Promise<void> {
    await transaction.discard()
  }
}
