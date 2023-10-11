import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateAuthGuardButton = observer(() => {
  const { authGuardService } = useStore()

  return (
    <Button
      className="h-full w-full"
      icon={<PlusOutlined />}
      onClick={() => authGuardService.createModal.open()}
      type="primary"
    />
  )
})
