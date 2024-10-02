import type { PropsWithChildren } from 'react'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

import { useCreateDomainModal } from './create-domain.state'

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
