import { Button } from 'antd'
import React from 'react'
import { PropsWithIds } from '@codelab/frontend'
import { GetPageGql, useDeleteVertexMutation } from '@codelab/generated'

export const DeleteVertexButton = ({
  vertexId,
  pageId,
}: PropsWithIds<'vertexId' | 'pageId'>) => {
  const [deleteVertex] = useDeleteVertexMutation({
    variables: {
      input: {
        vertexId,
      },
    },
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
  })

  return (
    <Button danger type="default" onClick={() => deleteVertex()}>
      Delete
    </Button>
  )
}
