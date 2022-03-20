import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ActionStore } from '../../../store'

export interface CreateActionButtonProps {
  actionStore: ActionStore
}

export const CreateActionButton = observer<CreateActionButtonProps>(
  ({ actionStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => actionStore.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
