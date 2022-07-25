import { PlusOutlined } from '@ant-design/icons'
import { ITypeService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateTypeButton = observer<{ typeService: ITypeService }>(
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
