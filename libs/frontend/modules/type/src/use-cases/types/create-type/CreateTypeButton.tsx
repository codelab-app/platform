import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithTypeService } from '../../../store'

export const CreateTypeButton = observer<WithTypeService>(({ typeService }) => {
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
})
