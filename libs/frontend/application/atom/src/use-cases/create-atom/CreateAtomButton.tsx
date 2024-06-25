import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateAtomButton = observer(() => {
  const { atomService } = useStore()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => atomService.createModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
