import { connectNode, connectNodeId, connectNodeIds } from './connect'
import { disconnectAll, disconnectManyAll } from './disconnect'

/**
 * This disconnects all edges first
 */
export const reconnectNodeId = (id: string | null | undefined) => ({
  ...disconnectAll(),
  ...connectNodeId(id),
})

export const reconnectNode = (key: string, id: string | null | undefined) => ({
  ...disconnectAll(),
  ...connectNode(key, id),
})

export const reconnectNodeIds = (ids: Array<string> | undefined) => {
  const connects = ids?.map((id) => ({
    ...connectNodeIds([id]),
  }))

  return [disconnectManyAll(), ...(connects ?? [])]
}
