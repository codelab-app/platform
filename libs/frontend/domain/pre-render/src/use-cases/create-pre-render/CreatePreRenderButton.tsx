import { PlusOutlined } from '@ant-design/icons'
import { IPreRenderService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreatePreRenderButton = observer<{
  className?: string
  preRenderService: IPreRenderService
}>(({ preRenderService, className }) => (
  <Button
    className={className}
    icon={<PlusOutlined />}
    key={0}
    onClick={() => preRenderService.createModal.open()}
    size="small"
  />
))
