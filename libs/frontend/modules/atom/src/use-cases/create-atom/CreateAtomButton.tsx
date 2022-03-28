import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithAtomService } from '../../store'

export const CreateAtomButton = observer<WithAtomService>(({ atomService }) => {
  return (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => atomService.createModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
