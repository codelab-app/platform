import { Button } from 'antd'
import React from 'react'
import { GetPageGql, useDeleteVertexMutation } from '@codelab/generated'

interface DeleteVertexButtonProps {
  vertexId: string
  pageId: string
}

export const DeleteVertexButton = ({
  vertexId,
  pageId,
}: DeleteVertexButtonProps) => {
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
