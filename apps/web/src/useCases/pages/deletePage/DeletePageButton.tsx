import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { PropsWithIds } from '@codelab/frontend'
import { GetPagesGql, useDeletePageMutation } from '@codelab/generated'

export type DeletePageButtonProps = {
  onSuccess: Function
} & PropsWithIds<'pageId' | 'appId'>

export const DeletePageButton = ({
  pageId,
  appId,
  onSuccess,
}: DeletePageButtonProps) => {
  const [deletePage] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetPagesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      onClick={() =>
        deletePage({ variables: { input: { pageId } } }).then(() => onSuccess())
      }
    >
      Delete
    </Button>
  )
}
