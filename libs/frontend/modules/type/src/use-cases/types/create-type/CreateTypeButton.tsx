import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { TypeStore } from '../../../store'

export interface CreateTypeButtonProps {
  typeStore: TypeStore
}

export const CreateTypeButton = observer<CreateTypeButtonProps>(
  ({ typeStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => typeStore.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
