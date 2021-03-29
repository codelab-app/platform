import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import { pageState } from '../usePage'
import { GetAppGql, useDeletePageMutation } from '@codelab/generated'
import { AppContext } from '@codelab/frontend/shared'

export type DeletePageButtonProps = {
  onSuccess: () => void
}

export const DeletePageButton = ({ onSuccess }: DeletePageButtonProps) => {
  const { appId } = useContext(AppContext)
  const detailPageId = useRecoilValue(pageState)

  const [deletePage] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetAppGql,
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
        deletePage({
          variables: { input: { pageId: detailPageId } },
        }).then(() => onSuccess())
      }
    >
      Delete
    </Button>
  )
}
