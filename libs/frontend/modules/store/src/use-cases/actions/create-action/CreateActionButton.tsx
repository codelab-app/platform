import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithActionService } from '../../../store'

export const CreateActionButton = observer<WithActionService>(
  ({ actionService }) => (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => actionService.createModal.open()}
      size="small"
      type="primary"
    />
  ),
)
