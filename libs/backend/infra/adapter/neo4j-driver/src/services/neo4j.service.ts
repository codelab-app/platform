import type { ConfigType } from '@nestjs/config'
import type { Driver, ManagedTransaction } from 'neo4j-driver'

import { Inject, Injectable } from '@nestjs/common'
import neo4j from 'neo4j-driver'

import type { Neo4jTrackingService } from './neo4j-tracking.service'

import { neo4jConfig } from '../neo4j.config'

type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T

@Injectable()
export class Neo4jService {
  readonly driver: Driver

  constructor(
    @Inject(neo4jConfig.KEY)
    private readonly config: ConfigType<typeof neo4jConfig>,
    private readonly trackingService: Neo4jTrackingService,
  ) {
    const password = this.config.password
    const uri = this.config.uri.toString()
    const username = this.config.user

    this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
      // Increase from default 100
      connectionAcquisitionTimeout: 120000,

      // 1 minute (from default 30s)
      connectionTimeout: 30000,

      // Connection pool configuration to handle high concurrency
      maxConnectionPoolSize: 200,

      // 2 minutes (from default 60s)
      maxTransactionRetryTime: 60000,

      notificationFilter: {
        disabledCategories: [
          neo4j.notificationFilterDisabledCategory.DEPRECATION,
        ],
        // optional: ignore everything below WARNING as well
        // minimumSeverityLevel:
        //   neo4j.notificationFilterMinimumSeverityLevel.WARNING,
        // 30 seconds
      },
      // logging: {
      //   level: 'debug',
      //   logger: (level, message) => {
      //     console.log(`[Neo4j ${level}]`, message)
      //   },
      // },
    })

    // Log server connectivity info periodically (for debugging in non-production)
    // if (process.env.NODE_ENV !== 'production') {
    //   setInterval(async () => {
    //     try {
    //       const serverInfo = await this.driver.getServerInfo()

    //       console.log('[Neo4j Connection Pool]', {
    //         protocolVersion: serverInfo.protocolVersion,
    //         serverAddress: serverInfo.address,
    //       })
    //     } catch (error) {
    //       // Ignore errors in monitoring
    //     }
    //     // Log every minute
    //   }, 60000)
    // }
  }

  async close(): Promise<void> {
    await this.driver.close()
  }

  async withReadTransaction<T>(
    readTransaction: ManagedTransactionWork<T>,
    operationName: string,
    close = false,
  ) {
    const session = this.driver.session()

    const wrappedTransaction = this.trackingService.wrapTransaction(
      readTransaction,
      operationName,
    )

    return session
      .executeRead((txn: ManagedTransaction) => wrappedTransaction(txn))
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
    operationName: string,
    close = false,
  ) {
    const session = this.driver.session()

    const wrappedTransaction = this.trackingService.wrapTransaction(
      writeTransaction,
      operationName,
    )

    return session
      .executeWrite((txn: ManagedTransaction) => wrappedTransaction(txn))
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
