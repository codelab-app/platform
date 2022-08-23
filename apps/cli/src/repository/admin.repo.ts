import { getDriver } from '@codelab/backend'

export const resetDatabase = async () => {
  const driver = getDriver()
  const session = driver.session()

  try {
    const result = await session.writeTransaction((tx) =>
      tx.run('MATCH (n) DETACH DELETE n RETURN'),
    )

    console.log(result)
  } finally {
    await session.close()
  }

  await driver.close()
}
