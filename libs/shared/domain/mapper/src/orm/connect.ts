import { whereNode, whereNodeId } from './where'

/**
 * The default way to connect is assumed to be by id's
 */
export const connectNodeId = (id: string | null | undefined) =>
  connectNode('id', id)

export const connectNodeIds = (ids: Array<string> | undefined = []) => ({
  connect: ids.map((id) => whereNodeId(id)),
})

export const connectNode = (key: string, value: string | undefined | null) => ({
  connect: value ? whereNode(key, value) : undefined,
})

export const connectAuth0Owner = (auth0Id: string | undefined) =>
  connectNode('auth0Id', auth0Id)
