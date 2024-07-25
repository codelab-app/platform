import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend/infra/mobx'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateTypeButton = observer(() => {
  const { typeService } = useStore()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => typeService.createModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
