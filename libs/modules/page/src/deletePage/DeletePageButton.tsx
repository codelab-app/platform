import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import { pageState } from '../usePage'
import { AppContext } from '@codelab/frontend/shared'
import { useDeletePageMutation, GetPagesListGql } from '@codelab/hasura'

export type DeletePageButtonProps = {
  onSuccess: () => void
}

export const DeletePageButton = ({ onSuccess }: DeletePageButtonProps) => {
  const { appId } = useContext(AppContext)
  const detailPageId = useRecoilValue(pageState)

  const [deletePage] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetPagesListGql,
        variables: {
          appId,
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
        deletePage({
          variables: { pageId: detailPageId },
        }).then(() => onSuccess())
      }
    >
      Delete
    </Button>
  )
}
