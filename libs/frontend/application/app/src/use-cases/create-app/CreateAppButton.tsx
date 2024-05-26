'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'

export const CreateAppButton = observer<PropsWithChildren>(({ children }) => {
  const { appService } = useStore()
  const icon = !children && <PlusOutlined />
  const onClick = () => appService.createModal.open()

  return (
    <Button icon={icon} onClick={onClick} type="primary">
      {children ?? 'Create App'}
    </Button>
  )
})
