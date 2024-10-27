import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

import { whereAll, whereManyAll, whereNode, whereNodeId } from './where'

/**
 * Disconnect nodes
 */
export const disconnectNodeId = (id: string | null | undefined) =>
  disconnectNode('id', id)

export const disconnectNodeIds = (ids: Array<string> | undefined = []) => ({
  disconnect: ids.map((id) => whereNodeId(id)),
})

export const disconnectNode = (key: string, value: Nullish<string>) => ({
  disconnect: value ? whereNode(key, value) : { where: {} },
})

/**
 * Disconnect all
 */
export const disconnectAll = (options?: { omitId: Nullish<string> }) => ({
  disconnect: {
    where: {
      NOT: {
        node: {
          id: options?.omitId,
        },
      },
    },
  },
})

export const disconnectManyAll = ({
  omitIds,
}: {
  omitIds?: Array<string> | undefined
}) => ({
  disconnect: [
    {
      /**
       * Overriding disconnect from reconnectNodeIds because it disconnects everything
       *
       * Including the pages connected in previous items of the input array. This causes
       *
       * The transaction to register only the last page being connected in the input array
       *
       * TODO: Check it it's the case for other places using reconnectNodeIds and if so update it.
       */
      where: {
        NOT: {
          node: {
            id_IN: omitIds,
          },
        },
      },
    },
  ],
})
