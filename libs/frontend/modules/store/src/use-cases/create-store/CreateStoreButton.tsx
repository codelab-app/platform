import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { StateStore } from '../../store'

export interface CreateStoreButtonProps {
  stateStore: StateStore
}

export const CreateStoreButton = observer<CreateStoreButtonProps>(
  ({ stateStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => stateStore.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
