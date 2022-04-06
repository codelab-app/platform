import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { Resource, resourceRef, WithResourceService } from '../../../store'

type ActionColumnProps = WithResourceService & { resource: Resource }

export const ActionColumn = observer<ActionColumnProps>(
  ({ resource, resourceService }) => {
    const router = useRouter()
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
  },
)
