import { PlusOutlined } from '@ant-design/icons'
import { IAppService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export const CreateAppButton = observer<
  PropsWithChildren<{ appService: IAppService }>
>(({ appService, children }) => {
  const icon = !children && <PlusOutlined label="" />
  const onClick = () => appService.createModal.open()

  return (
    <Button onClick={onClick} type="primary">
      {children ?? 'Create App'}
    </Button>
  )
})
