import { PlusOutlined } from '@ant-design/icons'
import { IAppService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export const CreateAppButton = observer<
  PropsWithChildren<{ appService: IAppService }>
>(({ appService, children }) => {
  const icon = !children && <PlusOutlined />
  const onClick = () => appService.createModal.open()

  return (
    <Button icon={icon} onClick={onClick} type="primary">
      {children ?? 'Create App'}
    </Button>
  )
})
