import { PlusOutlined } from '@ant-design/icons'
import { IActionService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateActionButton = observer<{ actionService: IActionService }>(
  ({ actionService }) => (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => actionService.createModal.open()}
      type="primary"
    >
      Create Action
    </Button>
  ),
)
