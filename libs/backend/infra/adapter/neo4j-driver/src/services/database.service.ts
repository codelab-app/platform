import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import { Injectable } from '@nestjs/common'

import { Neo4jService } from './neo4j.service'

/**
 * This class is tested in application layer, since it requires application seeders to create the data
 */
@Injectable()
export class DatabaseService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private logger: PinoLoggerService,
  ) {}

  async atomTypes() {
    const query = `
      MATCH (n)
      WHERE NOT (n:User
        OR (n:Atom)
        OR (n:Type)-[:ATOM_API|FIELD_TYPE*1..]-(:Atom)
        OR (n:Field)-[:ATOM_API|INTERFACE_FIELD*1..]-(:Atom)
        OR (n:EnumTypeValue)
      )
      DETACH DELETE n
    `

    return await this.neo4jService.withReadTransaction(
      (txn) => txn.run(query),
      'AtomTypes',
    )
  }

  /**
   *
   * Used by spec mostly, so we don't close the pool otherwise subsequent specs won't run
   *
   * Deletes everything in database
   *
   * @param close
   * @returns
   */
  @LogClassMethod()
  async resetDatabase(close = false) {
    // First count the nodes to be deleted
    const countQuery = 'MATCH (n) RETURN count(n) as nodeCount'

    const countResult = await this.neo4jService.withReadTransaction(
      (txn) => txn.run(countQuery),
      'CountNodesBeforeReset',
    )

    const nodeCount = countResult.records[0]?.get('nodeCount').toNumber() || 0

    return await this.logger.debugWithTiming(
      'DatabaseService.resetDatabase',
      async () => {
        const query = `
          MATCH (n)
          DETACH DELETE n
        `

        const result = await this.neo4jService.withWriteTransaction(
          (txn) => txn.run(query),
          'ResetDatabase',
          close,
        )

        return result
      },
      {
        context: 'service:database',
        data: {
          close,
          nodeCount,
        },
      },
    )
  }

  async resetDatabaseExceptUser(close = false) {
    const query = `
      MATCH (n)
      WHERE NOT n:User
      DETACH DELETE n
    `

    return this.neo4jService.withWriteTransaction(
      (txn) => txn.run(query),
      'ResetDatabaseExceptUser',
      close,
    )
  }

  /**
   * Keep the default renderType
   */
  // async resetDatabaseExceptUserAndAtom(close = false) {
  //   const query = `
  //     MATCH (n)
  //     WHERE NOT (n:User
  //       OR (n:Atom AND n.name = 'ReactFragment')
  //       OR (n:InterfaceType AND n.name = 'ReactFragment API')
  //     )
  //     DETACH DELETE n
  //   `

  //   return await this.runCypherQuery(close, query)
  // }

  /**
   * Don't remove `Type` that is related to Atom
   */
  async resetUserData(close = false) {
    const query = `
      MATCH (n)
      WHERE NOT (n:User
        OR (n:Preference)
        OR (n:Atom)
        OR (n:PrimitiveType)
        OR (n:RenderPropType)
        OR (n:ReactNodeType)
        OR (n:RichTextType)
        OR (n:CodeMirrorType)
        OR (n:Type|Field|EnumTypeValue)-[:ATOM_API|FIELD_TYPE|INTERFACE_FIELD|ALLOWED_VALUE*1..5]-(:Atom)
      )
      DETACH DELETE n
    `

    return await this.neo4jService.withWriteTransaction(
      (txn) => txn.run(query),
      'ResetUserData',
      close,
    )
  }
}
