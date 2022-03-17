import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AtomStore } from '../../store'

export interface CreateAtomButtonProps {
  atomStore: AtomStore
}

export const CreateAtomButton = observer<CreateAtomButtonProps>(
  ({ atomStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => atomStore.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
