import type { ManagedTransaction, QueryResult } from 'neo4j-driver'

interface CypherQueryInfo {
  operationName?: string
  params?: unknown
  query: string
  startTime: number
}

/**
 * Wraps a Neo4j transaction to track and log Cypher queries
 */
export class CypherTrackingTransaction {
  constructor(
    private readonly transaction: ManagedTransaction,
    private readonly operationName: string,
  ) {}

  public async run(query: string, parameters?: unknown): Promise<QueryResult> {
    const startTime = Date.now()

    const queryInfo: CypherQueryInfo = {
      operationName: this.operationName,
      params: parameters,
      query,
      startTime,
    }

    this.queries.push(queryInfo)

    try {
      const result = await this.transaction.run(query, parameters)
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

  private logQuery(
    queryInfo: CypherQueryInfo,
    duration: number,
    error?: Error,
  ) {
    const parts = [
      `[Cypher] ${queryInfo.operationName}`,
      `Duration: ${duration}ms`,
    ]

    if (error) {
      parts.push(`Error: ${error.message}`)
      console.error(parts.join(' | '))
    } else {
      console.log(parts.join(' | '))
    }

    // Log the query itself in debug mode
    if (process.env['CYPHER_DEBUG'] === 'true') {
      console.log(
        'Query:',
        queryInfo.query.replace(/\s+/g, ' ').substring(0, 200),
      )

      if (queryInfo.params) {
        console.log('Params:', JSON.stringify(queryInfo.params))
      }
    }
  }

  private queries: Array<CypherQueryInfo> = []
}

/**
 * Wraps a transaction work function to add Cypher query tracking
 */
export const wrapTransactionWithTracking = <T>(
  transactionWork: (tx: ManagedTransaction) => Promise<T> | T,
  operationName: string,
): ((tx: ManagedTransaction) => Promise<T> | T) => {
  return async (tx: ManagedTransaction) => {
    const trackingTx = new CypherTrackingTransaction(tx, operationName)

    // Replace the transaction with our tracking version
    return transactionWork(trackingTx as unknown as ManagedTransaction)
  }
}
