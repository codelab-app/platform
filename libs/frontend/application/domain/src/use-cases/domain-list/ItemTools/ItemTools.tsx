import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { domainRef, type IDomainModel } from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { Fragment } from 'react'

import { useDeleteDomainModal } from '../../delete-domain/delete-domain.state'
import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomainModel
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain }: ItemToolsProps) => {
    const deleteDomainModal = useDeleteDomainModal()
    const onDeleteClick = () => deleteDomainModal.open(domainRef(domain))

    return (
      <Fragment>
        <RefreshDomainButton domain={domain} />
        <Link
          href={PageType.DomainUpdate({
            appId: domain.app.id,
            domainId: domain.id,
          })}
        >
          <Button icon={<EditOutlined />} shape="circle" type="text" />
        </Link>
        <Button
          icon={<DeleteOutlined />}
          onClick={onDeleteClick}
          shape="circle"
          type="text"
        />
      </Fragment>
    )
  },
)
