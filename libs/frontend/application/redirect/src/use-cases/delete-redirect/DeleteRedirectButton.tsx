import { DeleteOutlined } from '@ant-design/icons'
import { redirectRef } from '@codelab/frontend/abstract/domain'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteRedirectButton = observer<DeleteButtonProps>(({ ids }) => {
  const { redirectService } = useStore()

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={() =>
        ids[0] && redirectService.deleteModal.open(redirectRef(ids[0]))
      }
    >
      Delete
    </Button>
  )
})
