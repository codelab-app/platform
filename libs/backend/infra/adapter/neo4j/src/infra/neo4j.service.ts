import type { ManagedTransaction } from 'neo4j-driver'

import { Inject, Injectable } from '@nestjs/common'
import { Driver } from 'neo4j-driver'

import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'

type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T

@Injectable()
export class Neo4jService {
  constructor(@Inject(NEO4J_DRIVER_PROVIDER) public driver: Driver) {}

  async withReadTransaction<T>(
    readTransaction: ManagedTransactionWork<T>,
    close = false,
  ) {
    const session = this.driver.session()

    return session
      .executeRead((txn) => readTransaction(txn))
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(async () => {
        await session.close()

        /**
         * Need to keep connection open for jest, otherwise subsequent specs won't work
         */
        if (close) {
          await this.driver.close()
        }
      })
  }

  async withWriteTransaction<T>(
    writeTransaction: ManagedTransactionWork<T>,
    close = false,
  ) {
    const session = this.driver.session()

    return session
      .executeWrite((txn) => writeTransaction(txn))
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(async () => {
        await session.close()

        /**
         * Need to keep connection open for jest, otherwise subsequent specs won't work
         */
        if (close) {
          await this.driver.close()
        }
      })
  }
}
