import { PlusOutlined } from '@ant-design/icons'
import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateActionButton = observer<WithServices<ACTION_SERVICE>>(
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
