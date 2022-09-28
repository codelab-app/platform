import { whereNode, whereNodeId } from './where'

/**
 * The default way to connect is assumed to be by id's
 */
export const connectNode = (id: string | null | undefined) => ({
  connect: whereNodeId(id),
})

/**
 * This disconnects all edges first
 */
export const reconnectNode = (id: string | null | undefined) => ({
  connect: whereNodeId(id),
  // Empty where means all
  disconnect: { where: {} },
})

export const connectNodeBy = (
  key: string,
  value: string | null | undefined,
) => ({
  connect: whereNode(key, value),
})

export const connectNodes = (ids: Array<string> | undefined = []) => ({
  connect: ids.map((id) => whereNodeId(id)),
})

export const connectOwner = (auth0Id: string | undefined) => {
  return { connect: auth0Id ? whereNode('auth0Id', auth0Id) : null }
}

export const connectTypeOwner = (auth0Id: string | undefined) => {
  return {
    connect: auth0Id ? { ...whereNode('auth0Id', auth0Id), edge: {} } : null,
  }
}
