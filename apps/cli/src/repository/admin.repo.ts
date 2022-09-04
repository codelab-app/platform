import { getDriver } from '@codelab/backend/adapter/neo4j'

export const resetDatabase = async () => {
  const driver = getDriver()
  const session = driver.session()

  try {
    /**
     * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
     */
    const result = await session.writeTransaction((tx) =>
      tx.run('MATCH (n) DETACH DELETE n'),
    )

    console.log(result)
  } finally {
    await session.close()
  }

  await driver.close()
}
