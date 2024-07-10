import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { useCreateDomainModal } from './create-domain-modal.state'

export const CreateDomainButton = observer<PropsWithChildren>(
  ({ children }) => {
    const createDomainModal = useCreateDomainModal()
    const icon = !children && <PlusOutlined />

    const onClick = () => {
      createDomainModal.open()
    }

    return (
      <Button icon={icon} onClick={onClick} type="primary">
        {children ?? 'Create Domain'}
      </Button>
    )
  },
)
