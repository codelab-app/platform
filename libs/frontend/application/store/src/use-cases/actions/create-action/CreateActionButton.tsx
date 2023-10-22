import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateActionButton = observer(() => {
  const { actionService, builderService } = useStore()
  const store = builderService.selectedNode?.current.store

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={(event) => {
        event.stopPropagation()
        store && actionService.createForm.open(store)
      }}
      size="small"
    >
      Action
    </Button>
  )
})
