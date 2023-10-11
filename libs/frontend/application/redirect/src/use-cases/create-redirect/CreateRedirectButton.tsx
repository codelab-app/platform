import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateRedirectButton = observer(() => {
  const { redirectService } = useStore()

  return (
    <Button
      className="h-full w-full"
      icon={<PlusOutlined />}
      onClick={() => {
        redirectService.createForm.open()
      }}
      type="primary"
    />
  )
})
