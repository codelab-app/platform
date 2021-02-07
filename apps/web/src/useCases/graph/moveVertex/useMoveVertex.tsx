import { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { GetPageGql, useMoveVertexMutation } from '@codelab/generated'

interface MoveVertexProps {
  currentVertexId: string
  parentVertexId: string
}

/**
 * Move vertex `from` to before `to`.
 *
 * We find the parent node of `to`, then update the edge source of `from`
 *
 */
export const useMoveVertex = ({
  currentVertexId,
  parentVertexId,
}: MoveVertexProps) => {
  const { pageId } = useContext(AppContext)
  const [moveVertex] = useMoveVertexMutation({
    refetchQueries: [{ query: GetPageGql, variables: { input: { pageId } } }],
  })

  return {
    moveVertex: () => {
      moveVertex({
        variables: {
          input: {
            currentVertexId,
            parentVertexId,
          },
        },
      })
    },
  }
}
