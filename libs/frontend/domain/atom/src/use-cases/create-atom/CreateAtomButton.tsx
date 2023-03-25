import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateAtomButton = observer(() => {
  const { atomService } = useStore()

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
