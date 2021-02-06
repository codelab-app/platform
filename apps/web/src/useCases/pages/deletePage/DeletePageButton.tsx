import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import { AppContext } from '../../apps/AppProvider'
import { pageState } from '../usePage'
import { GetAppGql, useDeletePageMutation } from '@codelab/generated'

export type DeletePageButtonProps = {
  onSuccess: Function
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
