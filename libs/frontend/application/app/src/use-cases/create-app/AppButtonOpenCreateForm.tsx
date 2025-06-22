'use client'

import type { PropsWithChildren } from 'react'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'
import { getUiDataLabel, UiKey } from '@codelab/frontend-abstract-types'
import { Button } from 'antd'
import Link from 'next/link'

export const AppButtonOpenCreateForm = ({ children }: PropsWithChildren) => {
  const icon = !children && <PlusOutlined />
  const label = getUiDataLabel(UiKey.AppButtonOpenCreateForm)

  return (
    <Link href={RoutePaths.App.create()}>
      <Button aria-label={label} icon={icon} type="primary">
        {children ?? label}
      </Button>
    </Link>
  )
}
