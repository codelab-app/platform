import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import { domainRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomain
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain }: ItemToolsProps) => {
    const { domainService } = useStore()

    const onEditClick = () => {
      domainService.updateModal.open(domainRef(String(domain.id)))
    }

    const onDeleteClick = () =>
      domainService.deleteModal.open(domainRef(String(domain.id)))

    return (
      <React.Fragment>
        <RefreshDomainButton domain={domain} />
        <Button
          icon={<EditOutlined />}
          onClick={onEditClick}
          shape="circle"
          type="text"
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={onDeleteClick}
          shape="circle"
          type="text"
        />
      </React.Fragment>
    )
  },
)
