import type { ConfigType } from '@nestjs/config'
import type { Driver, ManagedTransaction } from 'neo4j-driver'

import { Inject, Injectable } from '@nestjs/common'
import neo4j from 'neo4j-driver'

import { neo4jConfig } from '../neo4j.config'

type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T

@Injectable()
export class Neo4jService {
  readonly driver: Driver

  constructor(
    @Inject(neo4jConfig.KEY)
    private readonly config: ConfigType<typeof neo4jConfig>,
  ) {
    const password = this.config.password
    const uri = this.config.uri.toString()
    const username = this.config.user

    this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
  }

  async close(): Promise<void> {
    await this.driver.close()
  }

  async withReadTransaction<T>(
    readTransaction: ManagedTransactionWork<T>,
    close = false,
  ) {
    const session = this.driver.session()

    return session
      .executeRead((txn: ManagedTransaction) => readTransaction(txn))
      .catch((error: Error) => {
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
      .executeWrite((txn: ManagedTransaction) => writeTransaction(txn))
      .catch((error: Error) => {
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
