import { Inject, Injectable } from '@nestjs/common'
import type { Transaction } from 'neo4j-driver'
import { Driver } from 'neo4j-driver'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'

type TransactionWork<T> = (txn: Transaction) => Promise<T> | T

@Injectable()
export class Neo4jService {
  constructor(@Inject(NEO4J_DRIVER_PROVIDER) public driver: Driver) {}

  async withReadTransaction<T>(readTransaction: TransactionWork<T>) {
    const session = this.driver.session()

    return session
      .readTransaction((txn) => readTransaction(txn))
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(() => session.close())
  }

  async withWriteTransaction<T>(writeTransaction: TransactionWork<T>) {
    const session = this.driver.session()

    return session
      .writeTransaction((txn) => writeTransaction(txn))
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(() => session.close())
  }
}
