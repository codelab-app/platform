export const whereNodeId = (id: string) => whereNode('id', id)

export const whereNodeIds = (ids: Array<string>) =>
  ids.map((id) => whereNodeId(id))

/**
 * Not sure if we should use `null` or `undefined`
 */

/**
 * Where node
 */
export const whereNode = (key: string, value: string) => ({
  where: {
    node: {
      [key]: value,
    },
  },
})

/**
 * Used for disconnecting everything
 */
export const whereAll = () => ({ where: {} })

export const whereManyAll = () => [{ where: {} }]
