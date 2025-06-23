'use client'

import type { PropsWithChildren } from 'react'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

interface CreateDomainButtonProps extends PropsWithChildren {
  appId: string
}

export const CreateDomainButton = observer<CreateDomainButtonProps>(
  ({ appId, children }) => {
    const router = useRouter()
    const icon = !children && <PlusOutlined />

    const onClick = () => {
      router.push(RoutePaths.Domain.create({ appId }))
    }

    return (
      <Button icon={icon} onClick={onClick} type="primary">
        {children ?? 'Create Domain'}
      </Button>
    )
  },
)
