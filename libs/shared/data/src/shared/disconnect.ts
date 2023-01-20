import { whereNodeId } from './where'

export const disconnectNode = (id: string | null | undefined) => ({
  disconnect: id ? whereNodeId(id) : { where: {} },
})

export const disconnectNodes = (ids: Array<string> | undefined = []) => ({
  disconnect: ids.map((id) => whereNodeId(id)),
})
