import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateRedirectButton = observer(() => {
  const { redirectService } = useStore()

  return (
    <Button
      className="size-full"
      icon={<PlusOutlined />}
      onClick={() => {
        redirectService.createForm.open()
      }}
      type="primary"
    />
  )
})
