import type { Driver } from 'neo4j-driver'

export class AdminService {
  constructor(private readonly driver: Driver) {}

  async reset({ close }: { close: boolean } = { close: false }) {
    const driver = this.driver
    const session = driver.session()

    try {
      /**
       * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
       */
      const result = await session.executeWrite((tx) =>
        tx.run('MATCH (n) DETACH DELETE n'),
      )

      // console.log('result', result)
    } finally {
      await session.close()
    }

    // Don't close since it doesn't work for jest specs
    if (close) {
      return await driver.close()
    }
  }
}

export type IAdminService = typeof AdminService
