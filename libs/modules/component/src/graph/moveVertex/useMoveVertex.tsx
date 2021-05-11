// import { GetPageGql, useMoveVertexMutation } from '@codelab/generated'
import { AppPageContext } from '@codelab/frontend/shared'
import { useContext } from 'react'

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
  const { pageId } = useContext(AppPageContext)
  // const [moveVertex] = useMoveVertexMutation({
  //   refetchQueries: [{ query: GetPageGql, variables: { input: { pageId } } }],
  // })

  return {
    moveVertex: () => {
      // moveVertex({
      //   variables: {
      //     input: {
      //       currentVertexId,
      //       parentVertexId,
      //     },
      //   },
      // })
    },
  }
}
