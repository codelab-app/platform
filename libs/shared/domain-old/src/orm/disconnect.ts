import { whereAll, whereManyAll, whereNode, whereNodeId } from './where'

/**
 * Disconnect nodes
 */
export const disconnectNodeId = (id: string | null | undefined) =>
  disconnectNode('id', id)

export const disconnectNodeIds = (ids: Array<string> | undefined = []) => ({
  disconnect: ids.map((id) => whereNodeId(id)),
})

export const disconnectNode = (
  key: string,
  value: string | null | undefined,
) => ({
  disconnect: value ? whereNode(key, value) : { where: {} },
})

/**
 * Disconnect all
 */
export const disconnectAll = () => ({
  disconnect: whereAll(),
})

export const disconnectManyAll = () => ({
  disconnect: whereManyAll(),
})
