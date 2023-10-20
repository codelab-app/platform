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

    return this.runCypherQuery(close, query)
  }

  async resetDatabaseExceptUser(close = false) {
    const query = `
      MATCH (n)
      WHERE NOT n:User
      DETACH DELETE n
    `

    return this.runCypherQuery(close, query)
  }

  /**
   * Keep the default renderType
   */
  async resetDatabaseExceptUserAndAtom(close = false) {
    const query = `
      MATCH (n)
      WHERE NOT (n:User
        OR (n:Atom AND n.name = 'ReactFragment')
        OR (n:InterfaceType AND n.name = 'ReactFragment API')
      )
      DETACH DELETE n
    `

    return await this.runCypherQuery(close, query)
  }

  private async runCypherQuery(close = false, cypherQuery: string) {
    const driver = this.neo4jService.driver
    const session = driver.session()

    await session
      /**
       * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
       */
      .executeWrite((txn) => txn.run(cypherQuery))
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
          await driver.close()
        }
      })
  }
}
