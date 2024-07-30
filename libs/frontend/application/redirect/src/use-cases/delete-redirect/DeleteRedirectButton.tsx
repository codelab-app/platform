import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useDeleteRedirectModal } from './delete-redirect.state'

export const DeleteRedirectButton = observer<DeleteButtonProps>(({ ids }) => {
  const deleteRedirectModal = useDeleteRedirectModal()

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={() => ids[0] && deleteRedirectModal.open({ id: ids[0] })}
    >
      Delete
    </Button>
  )
})
