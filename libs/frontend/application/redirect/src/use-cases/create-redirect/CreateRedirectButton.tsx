import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCreateRedirectForm } from './create-redirect.state'

export const CreateRedirectButton = observer(() => {
  const createRedirectForm = useCreateRedirectForm()

  return (
    <Button
      className="size-full"
      icon={<PlusOutlined />}
      onClick={() => {
        createRedirectForm.open()
      }}
      type="primary"
    />
  )
})
