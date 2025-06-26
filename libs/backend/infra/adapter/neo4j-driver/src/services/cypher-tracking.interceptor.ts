import type { ManagedTransaction, QueryResult } from 'neo4j-driver'

interface CypherQueryInfo {
  query: string
  params?: any
  startTime: number
  operationName?: string
}

/**
 * Wraps a Neo4j transaction to track and log Cypher queries
 */
export class CypherTrackingTransaction {
  private queries: CypherQueryInfo[] = []

  constructor(
    private readonly transaction: ManagedTransaction,
    private readonly operationName: string,
  ) {}

  async run(
    query: string,
    parameters?: any,
  ): Promise<QueryResult> {
    const startTime = Date.now()
    
    const queryInfo: CypherQueryInfo = {
      query,
      params: parameters,
      startTime,
      operationName: this.operationName,
    }
    
    this.queries.push(queryInfo)

    try {
      const result = await this.transaction.run(query, parameters)
      const duration = Date.now() - startTime
      
      // Log the query execution
      this.logQuery(queryInfo, duration, result.summary?.counters)
      
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      this.logQuery(queryInfo, duration, undefined, error as Error)
      throw error
    }
  }


  private logQuery(
    queryInfo: CypherQueryInfo,
    duration: number,
    counters?: any,
    error?: Error,
  ) {
    const parts = [
      `[Cypher] ${queryInfo.operationName}`,
      `Duration: ${duration}ms`,
    ]

    if (counters) {
      const updates = []
      if (counters.nodesCreated) updates.push(`nodes+${counters.nodesCreated}`)
      if (counters.nodesDeleted) updates.push(`nodes-${counters.nodesDeleted}`)
      if (counters.relationshipsCreated) updates.push(`rels+${counters.relationshipsCreated}`)
      if (counters.relationshipsDeleted) updates.push(`rels-${counters.relationshipsDeleted}`)
      if (counters.propertiesSet) updates.push(`props=${counters.propertiesSet}`)
      
      if (updates.length > 0) {
        parts.push(`Updates: ${updates.join(', ')}`)
      }
    }

    if (error) {
      parts.push(`Error: ${error.message}`)
      console.error(parts.join(' | '))
    } else {
      console.log(parts.join(' | '))
    }

    // Log the query itself in debug mode
    if (process.env['CYPHER_DEBUG'] === 'true') {
      console.log('Query:', queryInfo.query.replace(/\s+/g, ' ').substring(0, 200))
      if (queryInfo.params) {
        console.log('Params:', JSON.stringify(queryInfo.params))
      }
    }
  }
}

/**
 * Wraps a transaction work function to add Cypher query tracking
 */
export function wrapTransactionWithTracking<T>(
  transactionWork: (tx: ManagedTransaction) => Promise<T> | T,
  operationName: string,
): (tx: ManagedTransaction) => Promise<T> | T {
  return async (tx: ManagedTransaction) => {
    const trackingTx = new CypherTrackingTransaction(tx, operationName)
    // Replace the transaction with our tracking version
    return transactionWork(trackingTx as any)
  }
}