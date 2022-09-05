import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IDomain, IDomainService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { domainRef } from '../../../store/domain.model'
import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomain
  domainService: IDomainService
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain, domainService }: ItemToolsProps) => {
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
