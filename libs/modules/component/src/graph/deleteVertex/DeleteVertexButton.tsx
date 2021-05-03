import { AppContext, PropsWithIds } from '@codelab/frontend/shared'
import { useContext } from 'react'
// import { GetPageGql, useDeleteVertexMutation } from '@codelab/generated'

export const DeleteVertexButton = ({ vertexId }: PropsWithIds<'vertexId'>) => {
  const { pageId } = useContext(AppContext)
  // const [deleteVertex] = useDeleteVertexMutation({
  //   variables: {
  //     input: {
  //       vertexId,
  //     },
  //   },
  //   refetchQueries: [
  //     {
  //       query: GetPageGql,
  //       variables: {
  //         input: {
  //           pageId,
  //         },
  //       },
  //     },
  //   ],
  // })

  return null
  // <Button danger type="default" onClick={() => deleteVertex()}>
  //   Delete
  // </Button>
}
