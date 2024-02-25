import { Neo4jService } from '@codelab/backend/infra/adapter/neo4j'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AdminRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  /**
   * Deletes everything in database
   */
  async resetDatabase(close = false) {
    const query = `
      MATCH (n)
      DETACH DELETE n
    `

    return this.neo4jService.withWriteTransaction(
      (txn) => txn.run(query),
      close,
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
        OR (n:Atom)
        OR (n:Type)-[:ATOM_API|FIELD_TYPE*1..]-(:Atom)
        OR (n:Field)-[:ATOM_API|INTERFACE_FIELD*1..]-(:Atom)
      )
      DETACH DELETE n
    `

    return await this.neo4jService.withWriteTransaction(
      (txn) => txn.run(query),
      close,
    )
  }
}
