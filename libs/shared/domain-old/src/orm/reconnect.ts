import type { Nullish } from '@codelab/shared/abstract/types'

import { connectNode, connectNodeId, connectNodeIds } from './connect'
import { disconnectAll, disconnectManyAll } from './disconnect'

/**
 * This disconnects all edges first
 *
 * https://github.com/neo4j/graphql/issues/3248
 *
 */
export const reconnectNodeId = (id: Nullish<string>) => ({
  ...disconnectAll({ omitId: id }),
  ...connectNodeId(id),
})

export const reconnectNodeIds = (ids: Array<string> | undefined) => {
  const connects = ids?.map((id) => ({
    ...connectNodeIds([id]),
  }))

  return [disconnectManyAll({ omitIds: ids }), ...(connects ?? [])]
}
