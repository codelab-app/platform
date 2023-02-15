import { connectNode, connectNodeId, connectNodeIds } from './connect'
import { disconnectAll, disconnectManyAll } from './disconnect'

/**
 * This disconnects all edges first
 */
export const reconnectNodeId = (id: string | null | undefined) => ({
  ...connectNodeId(id),
  ...disconnectAll(),
})

export const reconnectNode = (key: string, id: string | null | undefined) => ({
  ...connectNode(key, id),
  ...disconnectAll(),
})

export const reconnectNodeIds = (ids: Array<string> | undefined) =>
  ids?.map((id) => ({
    ...connectNodeIds([id]),
    ...disconnectManyAll(),
  }))
