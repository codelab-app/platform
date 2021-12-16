import { Injectable } from '@nestjs/common'
import { DgraphService } from './dgraph.service'
import { ITransaction } from './transaction-manager'

@Injectable()
/**
 * Uses a single transaction for all operations.
 */
export class TestTransactionManager {
  public readonly transaction: ITransaction

  constructor(dgraphService: DgraphService) {
    this.transaction = dgraphService.client.newTxn()
  }

  public generateTransaction(): ITransaction {
    return this.transaction
  }

  public async commitTransaction(transaction: ITransaction): Promise<void> {
    // no-op, the test should handle it
  }

  public async discardTransaction(transaction: ITransaction): Promise<void> {
    // no-op, the test should handle it
  }
}
