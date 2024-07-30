import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCreateTypeModal } from './create-type.state'

export const CreateTypeButton = observer(() => {
  const createTypeModal = useCreateTypeModal()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => createTypeModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
