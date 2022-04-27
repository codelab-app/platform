import { PlusOutlined } from '@ant-design/icons'
import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateTypeButton = observer<WithServices<TYPE_SERVICE>>(
  ({ typeService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => typeService.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
