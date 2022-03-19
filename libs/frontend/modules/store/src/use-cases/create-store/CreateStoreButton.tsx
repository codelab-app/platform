import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export interface CreateStoreButtonProps {
  storeStore: StoreStore
}

export const CreateStoreButton = observer<CreateStoreButtonProps>(
  ({ storeStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => storeStore.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
