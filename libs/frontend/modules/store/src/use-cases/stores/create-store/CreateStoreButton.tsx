import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithStoreService } from '../../../store'

export const CreateStoreButton = observer<WithStoreService>(
  ({ storeService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => storeService.createModal.open(undefined)}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
