'use client'

import type { PropsWithChildren } from 'react'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { getUiDataLabel, UiKey } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'

import { useCreateAppModal } from './create-app.state'

export const AppButtonOpenCreateForm = ({ children }: PropsWithChildren) => {
  const createAppModal = useCreateAppModal()
  const icon = !children && <PlusOutlined />
  const onClick = () => createAppModal.open()
  const label = getUiDataLabel(UiKey.AppButtonOpenCreateForm)

  return (
    <Button aria-label={label} icon={icon} onClick={onClick} type="primary">
      {children ?? label}
    </Button>
  )
}
