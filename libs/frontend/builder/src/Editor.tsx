import { Editor as CraftjsEditor } from '@craftjs/core'
import React from 'react'
import { craftjsResolver } from '@codelab/frontend/shared'
import { GetPageGql, useMoveVertexMutation } from '@codelab/generated'

export const Editor: React.FC<{ pageId: string }> = ({ children, pageId }) => {
  const [moveVertexMutation] = useMoveVertexMutation()

  return (
    <CraftjsEditor
      resolver={craftjsResolver}
      onNodesChange={(craftjsQuery) => {
        const {
          events: { dragged: draggedItemId },
          nodes,
        } = craftjsQuery.getState()

        if (draggedItemId !== null) {
          const newParentId = nodes[draggedItemId].data.parent

          moveVertexMutation({
            refetchQueries: [
              {
                query: GetPageGql,
                variables: {
                  input: {
                    pageId,
                  },
                },
              },
            ],
            variables: {
              input: {
                currentVertexId: draggedItemId,
                parentVertexId: newParentId,
              },
            },
          })
        }
      }}
    >
      {children}
    </CraftjsEditor>
  )
}
