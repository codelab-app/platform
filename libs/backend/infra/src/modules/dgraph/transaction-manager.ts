import { ITransaction } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { DgraphService } from './dgraph.service'

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
