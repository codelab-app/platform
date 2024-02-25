import { Inject, Injectable } from '@nestjs/common'
import type { ManagedTransaction } from 'neo4j-driver'
import { Driver } from 'neo4j-driver'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'

type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T

@Injectable()
export class Neo4jService {
  constructor(@Inject(NEO4J_DRIVER_PROVIDER) public driver: Driver) {}

  /**
   * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
   */
  async resetData() {
    return this.withWriteTransaction((txn) =>
      txn.run(`
        MATCH (n)
        DETACH DELETE n
      `),
    )
  }

  async withReadTransaction<T>(
    readTransaction: ManagedTransactionWork<T>,
    close = true,
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
    close = true,
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
