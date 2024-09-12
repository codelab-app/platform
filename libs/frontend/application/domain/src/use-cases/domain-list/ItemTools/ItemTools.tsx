import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { domainRef, type IDomainModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { useDeleteDomainModal } from '../../delete-domain/delete-domain.state'
import { useUpdateDomainModal } from '../../update-domain/update-domain.state'
import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomainModel
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain }: ItemToolsProps) => {
    const updateDomainModal = useUpdateDomainModal()
    const deleteDomainModal = useDeleteDomainModal()

    const onEditClick = () => {
      updateDomainModal.open(domainRef(domain))
    }

    const onDeleteClick = () => deleteDomainModal.open(domainRef(domain))

    return (
      <Fragment>
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
      </Fragment>
    )
  },
)
