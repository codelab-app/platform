import type { ManagedTransaction, QueryResult } from 'neo4j-driver'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { Injectable } from '@nestjs/common'

type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T

interface CypherQueryInfo {
  operationName?: string
  params?: unknown
  query: string
  startTime: number
}

/**
 * NestJS service that provides Neo4j query tracking capabilities
 */
@Injectable()
export class Neo4jTrackingService {
  constructor(private readonly logger: PinoLoggerService) {}

  wrapTransaction<T>(
    transactionWork: ManagedTransactionWork<T>,
    operationName: string,
  ): ManagedTransactionWork<T> {
    return async (tx: ManagedTransaction) => {
      // Create a proxy that intercepts the run method
      const trackingTx = new Proxy(tx, {
        get: (target, prop) => {
          if (prop === 'run') {
            return (query: string, parameters?: unknown) =>
              this.trackQuery(target, query, parameters, operationName)
          }

          return target[prop as keyof ManagedTransaction]
        },
      })

      // Replace the transaction with our tracking version
      return transactionWork(trackingTx)
    }
  }

  private logQuery(
    queryInfo: CypherQueryInfo,
    duration: number,
    error?: Error,
  ) {
    // Create namespace based on operation name
    const namespace = `neo4j:${
      queryInfo.operationName?.toLowerCase().replace(/\s+/g, '-') || 'query'
    }`

    const message = `Cypher query executed in ${duration}ms`

    const logData = {
      duration,
      params: queryInfo.params,
      query: queryInfo.query.replace(/\s+/g, ' ').substring(0, 200),
    }

    if (error) {
      this.logger.error(message, {
        context: namespace,
        data: {
          ...logData,
          error: error.message,
        },
      })
    } else {
      this.logger.debug(message, {
        context: namespace,
        data: logData,
      })
    }
  }

  private async trackQuery(
    transaction: ManagedTransaction,
    query: string,
    parameters: unknown,
    operationName: string,
  ): Promise<QueryResult> {
    const startTime = Date.now()

    const queryInfo: CypherQueryInfo = {
      operationName,
      params: parameters,
      query,
      startTime,
    }

    try {
      const result = await transaction.run(query, parameters)
      const duration = Date.now() - startTime

      // Log the query execution
      this.logQuery(queryInfo, duration)

      return result
    } catch (error) {
      const duration = Date.now() - startTime

      this.logQuery(queryInfo, duration, error as Error)
      throw error
    }
  }
}
