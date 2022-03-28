import { ApartmentOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IComponent } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { useRouter } from 'next/router'
import { resourceRef, Resource } from '../../..'

export const ActionColumn = ({ resource }: { resource: Resource }) => {
  const store = useStore()
  const router = useRouter()
  const resourceService = store.resourceService
  // const { openDeleteModal, openUpdateModal } = useComponentDispatch()

  const onEdit = () => {
    resourceService.updateModal.open(resourceRef(resource.id))
  }


  const onDelete = () => {
    resourceService.deleteModal.open([resourceRef(resource.id)])
  }

  return (
    <Space size="middle">
      <ListItemEditButton onClick={onEdit} />
      <ListItemDeleteButton onClick={onDelete} />
    </Space>
  )
}
