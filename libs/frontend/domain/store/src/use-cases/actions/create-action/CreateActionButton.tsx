import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateActionButton = observer(() => {
  const { actionService } = useStore()

  return (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={(event) => {
        event.stopPropagation()
        actionService.createForm.open()
      }}
      size="small"
    >
      Action
    </Button>
  )
})
