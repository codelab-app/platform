'use client'

import type { PropsWithChildren } from 'react'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  getUiDataLabel,
  PageType,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export const AppButtonOpenCreateForm = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const icon = !children && <PlusOutlined />
  const onClick = () => router.push(PageType.AppCreate())
  const label = getUiDataLabel(UiKey.AppButtonOpenCreateForm)

  return (
    <Button aria-label={label} icon={icon} onClick={onClick} type="primary">
      {children ?? label}
    </Button>
  )
}
