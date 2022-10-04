import { PlusOutlined } from '@ant-design/icons'
import { IComponentService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateComponentButton = observer<{
  className?: string
  componentService: IComponentService
}>(({ componentService, className }) => {
  return (
    <Button
      className={className}
      icon={<PlusOutlined />}
      key={0}
      onClick={() => componentService.createModal.open()}
      size="small"
    />
  )
})
