import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCreateAtomModal } from './create-atom-modal.state'

export const CreateAtomButton = observer(() => {
  const createAtomModal = useCreateAtomModal()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => createAtomModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
