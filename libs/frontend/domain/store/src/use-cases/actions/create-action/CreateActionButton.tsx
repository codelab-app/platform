import { PlusOutlined } from '@ant-design/icons'
import { storeRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateActionButton = observer(() => {
  const { actionService, builderService } = useStore()
  const store = builderService.selectedNode?.current.store.current

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={(event) => {
        event.stopPropagation()
        store && actionService.createForm.open(storeRef(store))
      }}
      size="small"
    >
      Action
    </Button>
  )
})
