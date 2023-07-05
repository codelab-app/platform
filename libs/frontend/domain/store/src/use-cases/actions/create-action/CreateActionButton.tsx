import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateActionButton = observer(() => {
  const { actionService } = useStore()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={(event) => {
        event.stopPropagation()
        actionService.createModal.open()
      }}
      size="small"
    >
      Action
    </Button>
  )
})
