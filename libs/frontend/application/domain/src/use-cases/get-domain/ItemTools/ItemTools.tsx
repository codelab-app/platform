import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomainModel
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain }: ItemToolsProps) => {
    const { domainService } = useStore()

    const onEditClick = () => {
      domainService.updateModal.open(domain)
    }

    const onDeleteClick = () => domainService.deleteModal.open(domain)

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
