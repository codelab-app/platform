import {
  getClosestContainerNodeIdCypher,
  withReadTransaction,
} from '@codelab/backend/infra/adapter/neo4j'

export const getClosestContainerNodeId = (elementId: string): Promise<string> =>
  withReadTransaction(async (txn) => {
    const { records } = await txn.run(getClosestContainerNodeIdCypher, {
      elementId,
    })

    if (!records[0]?.get('id')) {
      throw new Error(`Failed to find closest container node for element $`)
    }

    return records[0]?.get('id')
  })
